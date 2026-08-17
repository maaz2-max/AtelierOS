// ==========================================================================
// AtelierOS - Quotation & Invoice Management Service
// ==========================================================================

import { Quote, Invoice, QuoteLine, WorkOrder, Customer, Vehicle, Tenant } from '../types';
import { StorageService } from './StorageService';
import { TaxService } from './TaxService';

export class QuoteInvoiceService {
  /**
   * Create a structured Quote from a Work Order
   */
  public static createQuoteFromWorkOrder(params: {
    tenantId: string;
    workOrderId: string;
    lines: QuoteLine[];
  }): Quote {
    const tenant = StorageService.getTenants().find(t => t.id === params.tenantId) || StorageService.getActiveTenant();
    const workOrders = StorageService.getAllWorkOrders();
    const workOrder = workOrders.find(w => w.id === params.workOrderId);
    if (!workOrder) throw new Error('Work order not found');

    const customer = StorageService.getAllCustomers().find(c => c.id === workOrder.customerId);
    const totals = TaxService.calculateTotals(params.lines);

    const quoteNumber = `DEV-${tenant.country}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const magicToken = `tok-magic-quote-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Expiry: 30 days
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const quote: Quote = {
      id: `quote-${Date.now()}`,
      tenantId: params.tenantId,
      quoteNumber,
      workOrderId: params.workOrderId,
      customerId: workOrder.customerId,
      vehicleId: workOrder.vehicleId,
      currency: tenant.currency,
      lines: params.lines,
      subtotalExclVat: totals.subtotalExclVat,
      vatBreakdown: totals.vatBreakdown,
      totalVat: totals.totalVat,
      totalAmount: totals.totalAmount,
      status: 'SENT_AWAITING_APPROVAL',
      magicToken,
      validUntil,
      createdAt: new Date().toISOString()
    };

    const quotes = StorageService.getAllQuotes();
    quotes.push(quote);
    StorageService.saveQuotes(quotes);

    // Update Work Order
    workOrder.quoteId = quote.id;
    workOrder.stage = 'AWAITING_APPROVAL';
    workOrder.updatedAt = new Date().toISOString();
    StorageService.saveWorkOrders(workOrders);

    return quote;
  }

  /**
   * Approve a Quote (Customer Action)
   */
  public static approveQuote(quoteId: string, signature: string): Quote {
    const quotes = StorageService.getAllQuotes();
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) throw new Error('Quote not found');

    quote.status = 'APPROVED';
    quote.approvalSignature = signature;
    quote.approvedAt = new Date().toISOString();
    StorageService.saveQuotes(quotes);

    // Auto-advance linked work order to APPROVED
    const workOrders = StorageService.getAllWorkOrders();
    const workOrder = workOrders.find(w => w.id === quote.workOrderId);
    if (workOrder) {
      workOrder.stage = 'APPROVED';
      workOrder.updatedAt = new Date().toISOString();
      StorageService.saveWorkOrders(workOrders);
    }

    return quote;
  }

  /**
   * Reject a Quote (Customer Action)
   */
  public static rejectQuote(quoteId: string, reason: string): Quote {
    const quotes = StorageService.getAllQuotes();
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) throw new Error('Quote not found');

    quote.status = 'REJECTED';
    quote.approvalRejectionReason = reason;
    StorageService.saveQuotes(quotes);

    return quote;
  }

  /**
   * Generate an immutable Invoice from a completed Work Order
   */
  public static generateInvoiceFromWorkOrder(workOrderId: string): Invoice {
    const workOrders = StorageService.getAllWorkOrders();
    const workOrder = workOrders.find(w => w.id === workOrderId);
    if (!workOrder) throw new Error('Work order not found');

    const tenant = StorageService.getTenants().find(t => t.id === workOrder.tenantId) || StorageService.getActiveTenant();
    const customer = StorageService.getAllCustomers().find(c => c.id === workOrder.customerId);
    const quotes = StorageService.getAllQuotes();
    const quote = quotes.find(q => q.id === workOrder.quoteId);

    // Lines from quote or fallback from work order parts & labor
    let lines: QuoteLine[] = [];
    if (quote && quote.lines.length > 0) {
      lines = quote.lines;
    } else {
      const taxRes = TaxService.determineTaxRule({
        sellerCountry: tenant.country,
        customerCountry: customer?.country || tenant.country,
        customerType: customer?.type || 'INDIVIDUAL',
        customerVatNumber: customer?.taxIdentity?.vatNumber
      });

      // Default labor line
      lines.push({
        id: `inv-l-labor`,
        type: 'LABOR',
        description: `Main d'œuvre atelier (${workOrder.laborTimeRecordedMin || 60} min)`,
        quantity: Math.max(0.5, (workOrder.laborTimeRecordedMin || 60) / 60),
        unitPrice: tenant.settings.defaultLaborRate,
        vatRate: taxRes.vatRate,
        totalExclVat: ((workOrder.laborTimeRecordedMin || 60) / 60) * tenant.settings.defaultLaborRate,
        totalInclVat: ((workOrder.laborTimeRecordedMin || 60) / 60) * tenant.settings.defaultLaborRate * (1 + taxRes.vatRate / 100)
      });

      // Parts lines
      for (const p of workOrder.partsUsed) {
        lines.push({
          id: `inv-l-${p.partId}`,
          type: 'PART',
          description: p.name,
          quantity: p.quantity,
          unitPrice: p.unitPrice,
          vatRate: taxRes.vatRate,
          totalExclVat: p.total,
          totalInclVat: p.total * (1 + taxRes.vatRate / 100)
        });
      }
    }

    const totals = TaxService.calculateTotals(lines);
    const taxRes = TaxService.determineTaxRule({
      sellerCountry: tenant.country,
      customerCountry: customer?.country || tenant.country,
      customerType: customer?.type || 'INDIVIDUAL',
      customerVatNumber: customer?.taxIdentity?.vatNumber
    });

    const invoiceNumber = `FAC-${tenant.country}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const issueDate = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      tenantId: tenant.id,
      invoiceNumber,
      quoteId: quote?.id,
      workOrderId: workOrder.id,
      customerId: workOrder.customerId,
      vehicleId: workOrder.vehicleId,
      currency: tenant.currency,
      issueDate,
      dueDate,
      lines,
      subtotalExclVat: totals.subtotalExclVat,
      vatBreakdown: totals.vatBreakdown,
      totalVat: totals.totalVat,
      totalAmount: totals.totalAmount,
      taxTreatment: taxRes.taxTreatment,
      paid: false,
      eInvoiceStatus: 'NOT_SUBMITTED',
      qrBillReference: tenant.country === 'CH' ? `21 00000 00003 ${Math.floor(10000000000 + Math.random() * 90000000000)}` : undefined,
      createdAt: new Date().toISOString()
    };

    const invoices = StorageService.getAllInvoices();
    invoices.push(invoice);
    StorageService.saveInvoices(invoices);

    // Update Work Order to INVOICED
    workOrder.invoiceId = invoice.id;
    workOrder.stage = 'INVOICED';
    workOrder.updatedAt = new Date().toISOString();
    StorageService.saveWorkOrders(workOrders);

    return invoice;
  }
}
