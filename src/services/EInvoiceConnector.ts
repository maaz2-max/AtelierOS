// ==========================================================================
// AtelierOS - Provider-Neutral French E-Invoicing Connector
// Interfaces with Chorus Pro / Portail Public de Facturation (PPF) & Factur-X
// ==========================================================================

import { Invoice, Tenant, Customer, Vehicle } from '../types';
import { StorageService } from './StorageService';

export interface FacturXPayload {
  specification: 'Factur-X BASIC' | 'Factur-X EN16931' | 'ChorusPro UBL 2.1';
  invoiceNumber: string;
  issueDate: string;
  seller: {
    name: string;
    siret?: string;
    vatNumber?: string;
    country: string;
    address: string;
  };
  buyer: {
    name: string;
    siretOrUid?: string;
    vatNumber?: string;
    country: string;
    address: string;
  };
  financials: {
    currency: string;
    subtotalExclTax: number;
    vatTotal: number;
    grandTotal: number;
    taxBreakdown: Array<{ rate: number; taxableBase: number; taxAmount: number }>;
  };
  lines: Array<{
    itemDescription: string;
    quantity: number;
    unitPrice: number;
    vatRate: number;
    lineTotal: number;
  }>;
  xmlPreview: string;
}

export class EInvoiceConnector {
  /**
   * Generate Factur-X / UBL XML structured payload for any invoice
   */
  public static generatePayload(invoice: Invoice): FacturXPayload {
    const tenant = StorageService.getTenants().find(t => t.id === invoice.tenantId) || StorageService.getActiveTenant();
    const customer = StorageService.getAllCustomers().find(c => c.id === invoice.customerId);

    const xmlLines = invoice.lines.map((l, idx) => `
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>${idx + 1}</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:Name>${l.description.replace(/&/g, '&amp;')}</ram:Name>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>${l.unitPrice.toFixed(2)}</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">${l.quantity.toFixed(2)}</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:RateApplicablePercent>${l.vatRate.toFixed(2)}</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>${l.totalExclVat.toFixed(2)}</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>`).join('');

    const xmlPreview = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:factur-x.eu:1p0:basic</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${invoice.invoiceNumber}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">${invoice.issueDate.replace(/-/g, '')}</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${tenant.name}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0009">${tenant.taxIdentity.siret || tenant.taxIdentity.uid || 'SIRET_PENDING'}</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:LineOne>${tenant.address.street}</ram:LineOne>
          <ram:PostcodeCode>${tenant.address.postalCode}</ram:PostcodeCode>
          <ram:CityName>${tenant.address.city}</ram:CityName>
          <ram:CountryID>${tenant.country}</ram:CountryID>
        </ram:PostalTradeAddress>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${customer?.companyName || `${customer?.firstName} ${customer?.lastName}`}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0009">${customer?.taxIdentity?.siret || customer?.taxIdentity?.uid || 'B2C_INDIVIDUAL'}</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:LineOne>${customer?.address.street || ''}</ram:LineOne>
          <ram:PostcodeCode>${customer?.address.postalCode || ''}</ram:PostcodeCode>
          <ram:CityName>${customer?.address.city || ''}</ram:CityName>
          <ram:CountryID>${customer?.country || tenant.country}</ram:CountryID>
        </ram:PostalTradeAddress>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:IncludedSupplyChainTradeLineItems>
      ${xmlLines}
    </ram:IncludedSupplyChainTradeLineItems>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>${invoice.currency}</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${invoice.subtotalExclVat.toFixed(2)}</ram:LineTotalAmount>
        <ram:TaxTotalAmount currencyID="${invoice.currency}">${invoice.totalVat.toFixed(2)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${invoice.totalAmount.toFixed(2)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${invoice.totalAmount.toFixed(2)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

    return {
      specification: tenant.country === 'FR' ? 'ChorusPro UBL 2.1' : 'Factur-X BASIC',
      invoiceNumber: invoice.invoiceNumber,
      issueDate: invoice.issueDate,
      seller: {
        name: tenant.name,
        siret: tenant.taxIdentity.siret,
        vatNumber: tenant.taxIdentity.vatNumber,
        country: tenant.country,
        address: `${tenant.address.street}, ${tenant.address.postalCode} ${tenant.address.city}`
      },
      buyer: {
        name: customer?.companyName || `${customer?.firstName} ${customer?.lastName}`,
        siretOrUid: customer?.taxIdentity?.siret || customer?.taxIdentity?.uid,
        vatNumber: customer?.taxIdentity?.vatNumber,
        country: customer?.country || tenant.country,
        address: `${customer?.address.street || ''}, ${customer?.address.postalCode || ''} ${customer?.address.city || ''}`
      },
      financials: {
        currency: invoice.currency,
        subtotalExclTax: invoice.subtotalExclVat,
        vatTotal: invoice.totalVat,
        grandTotal: invoice.totalAmount,
        taxBreakdown: invoice.vatBreakdown.map(b => ({
          rate: b.rate,
          taxableBase: b.taxableBase,
          taxAmount: b.vatAmount
        }))
      },
      lines: invoice.lines.map(l => ({
        itemDescription: l.description,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
        vatRate: l.vatRate,
        lineTotal: l.totalExclVat
      })),
      xmlPreview
    };
  }

  /**
   * Submit to French Chorus Pro / PPF / PDP Simulator
   */
  public static submitToChorusPro(invoiceId: string, platform: 'CHORUS_PRO' | 'PPF' | 'PDP_GENERIC' = 'CHORUS_PRO'): {
    success: boolean;
    submissionId: string;
    status: 'ACCEPTED' | 'IN_PROCESSING' | 'REJECTED';
    message: string;
  } {
    const invoices = StorageService.getAllInvoices();
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) throw new Error('Invoice not found');

    const submissionId = `CP-FR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    invoice.eInvoiceStatus = 'ACCEPTED';
    invoice.eInvoicePlatform = platform;
    invoice.eInvoiceSubmissionId = submissionId;
    invoice.eInvoiceSubmittedAt = new Date().toISOString();

    StorageService.saveInvoices(invoices);

    return {
      success: true,
      submissionId,
      status: 'ACCEPTED',
      message: `Invoice ${invoice.invoiceNumber} successfully transmitted to ${platform} (Validation Code: 200 OK / Chorus ID: ${submissionId}).`
    };
  }
}
