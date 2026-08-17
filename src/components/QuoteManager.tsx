// ==========================================================================
// AtelierOS - Quotation Builder & Commercial Manager
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  Plus, 
  Trash2, 
  Send, 
  Copy, 
  Check, 
  Eye, 
  User, 
  Car, 
  DollarSign, 
  Clock, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { Quote, QuoteLine, WorkOrder, Customer, Vehicle, Tenant, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { QuoteInvoiceService } from '../services/QuoteInvoiceService';
import { TaxService } from '../services/TaxService';
import { CommunicationService } from '../services/CommunicationService';
import { ConfirmationModal } from './ConfirmationModal';
import { translations } from '../i18n/translations';

interface QuoteManagerProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
  activeWorkOrderId?: string;
  onOpenCustomerApproval?: (token: string) => void;
  onOpenInvoice?: (workOrderId: string) => void;
}

export const QuoteManager: React.FC<QuoteManagerProps> = ({
  activeTenant,
  currentLanguage,
  activeWorkOrderId,
  onOpenCustomerApproval,
  onOpenInvoice
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const tq = t.quotes;

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [targetWorkOrderId, setTargetWorkOrderId] = useState<string>(activeWorkOrderId || '');

  // Builder Lines State
  const [builderLines, setBuilderLines] = useState<QuoteLine[]>([
    {
      id: 'l-1',
      type: 'LABOR',
      description: 'Atelier Labor Inspection & Diagnostics',
      quantity: 1.0,
      unitPrice: activeTenant.settings.defaultLaborRate,
      costPrice: 45.0,
      vatRate: activeTenant.settings.standardVatRate,
      totalExclVat: activeTenant.settings.defaultLaborRate,
      totalInclVat: activeTenant.settings.defaultLaborRate * (1 + activeTenant.settings.standardVatRate / 100)
    }
  ]);

  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [sentToast, setSentToast] = useState<string | null>(null);

  const loadData = () => {
    setQuotes(StorageService.getQuotes(activeTenant.id));
    setWorkOrders(StorageService.getWorkOrders(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  useEffect(() => {
    if (activeWorkOrderId) {
      setTargetWorkOrderId(activeWorkOrderId);
    }
  }, [activeWorkOrderId]);

  const handleAddLine = (type: QuoteLine['type']) => {
    const newLine: QuoteLine = {
      id: `line-${Date.now()}`,
      type,
      description: type === 'LABOR' ? 'Main d\'œuvre spécialisée' : 'Pièce détachée certifiée OEM',
      quantity: 1,
      unitPrice: type === 'LABOR' ? activeTenant.settings.defaultLaborRate : 65.0,
      costPrice: type === 'LABOR' ? 45.0 : 35.0,
      vatRate: activeTenant.settings.standardVatRate,
      totalExclVat: type === 'LABOR' ? activeTenant.settings.defaultLaborRate : 65.0,
      totalInclVat: (type === 'LABOR' ? activeTenant.settings.defaultLaborRate : 65.0) * (1 + activeTenant.settings.standardVatRate / 100)
    };
    setBuilderLines([...builderLines, newLine]);
  };

  const handleUpdateLine = (id: string, field: keyof QuoteLine, val: any) => {
    const updated = builderLines.map(line => {
      if (line.id !== id) return line;
      const copy: any = { ...line, [field]: val };
      copy.totalExclVat = copy.quantity * copy.unitPrice;
      copy.totalInclVat = copy.totalExclVat * (1 + copy.vatRate / 100);
      return copy;
    });
    setBuilderLines(updated);
  };

  const handleRemoveLine = (id: string) => {
    setBuilderLines(builderLines.filter(l => l.id !== id));
  };

  const handleCreateQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetWorkOrderId) return;

    const created = QuoteInvoiceService.createQuoteFromWorkOrder({
      tenantId: activeTenant.id,
      workOrderId: targetWorkOrderId,
      lines: builderLines
    });

    loadData();
    setIsBuilderOpen(false);
    setSelectedQuote(created);
  };

  const handleSendMagicLink = (quote: Quote) => {
    const customer = customers.find(c => c.id === quote.customerId);
    if (!customer) return;

    const portalUrl = `${window.location.origin}/quote/${quote.magicToken}`;
    CommunicationService.notifyQuoteReady(quote, customer, activeTenant, portalUrl);

    setSentToast(`Magic approval link dispatched via SMS to ${customer.phone} and Email to ${customer.email}`);
    setTimeout(() => setSentToast(null), 4000);
    loadData();
  };

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/quote/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const builderTotals = TaxService.calculateTotals(builderLines);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{tq.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{tq.subtitle}</p>
        </div>

        <button 
          onClick={() => {
            if (workOrders.length > 0) setTargetWorkOrderId(workOrders[0].id);
            setIsBuilderOpen(true);
          }}
          className="apple-btn-primary"
        >
          <Plus size={16} />
          <span>{tq.createQuote}</span>
        </button>
      </div>

      {sentToast && (
        <div style={{
          background: '#30d158',
          color: '#ffffff',
          padding: '14px 20px',
          borderRadius: '14px',
          fontWeight: 600,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(48, 209, 88, 0.3)'
        }}>
          <Check size={18} />
          <span>{sentToast}</span>
        </div>
      )}

      {/* Quotes List Table */}
      <div className="apple-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 20px' }}>Quote #</th>
                <th style={{ padding: '14px 20px' }}>Customer & Vehicle</th>
                <th style={{ padding: '14px 20px' }}>Total Amount</th>
                <th style={{ padding: '14px 20px' }}>Approval Status</th>
                <th style={{ padding: '14px 20px' }}>Magic Link Actions</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q => {
                const customer = customers.find(c => c.id === q.customerId);
                const vehicle = vehicles.find(v => v.id === q.vehicleId);

                return (
                  <tr key={q.id} style={{ borderBottom: '1px solid #f0f0f3' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ fontWeight: 700, color: '#0071e3', fontSize: '15px' }}>
                        {q.quoteNumber}
                      </span>
                      <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                        Valid: {q.validUntil}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: '#1d1d1f' }}>
                        {customer?.firstName} {customer?.lastName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6e6e73', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Car size={12} />
                        <span>{vehicle?.make} {vehicle?.model} ({vehicle?.licensePlate})</span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#1d1d1f' }}>
                        {q.totalAmount.toFixed(2)} {q.currency}
                      </div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>
                        (HT: {q.subtotalExclVat.toFixed(2)} + TVA: {q.totalVat.toFixed(2)})
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <span className={`apple-badge ${
                        q.status === 'APPROVED' ? 'apple-badge-green' :
                        q.status === 'REJECTED' ? 'apple-badge-red' : 'apple-badge-amber'
                      }`}>
                        {q.status}
                      </span>
                      {q.approvalSignature && (
                        <div style={{ fontSize: '11px', color: '#30d158', marginTop: '4px', fontWeight: 500 }}>
                          Signed: {q.approvalSignature}
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handleSendMagicLink(q)}
                          className="apple-btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '12px', minHeight: '30px' }}
                          title="Simulate dispatching SMS and Email link to customer"
                        >
                          <Send size={12} color="#0071e3" />
                          <span>Dispatch Link</span>
                        </button>
                        <button
                          onClick={() => handleCopyLink(q.magicToken)}
                          className="apple-btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '12px', minHeight: '30px' }}
                          title="Copy magic portal URL"
                        >
                          {copiedToken === q.magicToken ? <Check size={13} color="#30d158" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        {onOpenCustomerApproval && (
                          <button
                            onClick={() => onOpenCustomerApproval(q.magicToken)}
                            className="apple-btn-secondary"
                            style={{ padding: '6px 10px', minHeight: '30px', fontSize: '12px' }}
                          >
                            <Eye size={13} />
                            <span>Preview Portal</span>
                          </button>
                        )}
                        {q.status === 'APPROVED' && onOpenInvoice && (
                          <button
                            onClick={() => onOpenInvoice(q.workOrderId)}
                            className="apple-btn-primary"
                            style={{ padding: '6px 12px', minHeight: '30px', fontSize: '12px', background: '#30d158' }}
                          >
                            <span>Generate Invoice</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Builder Modal */}
      {isBuilderOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsBuilderOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-3xl" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '32px', maxWidth: '780px' }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>
              Interactive Quotation Builder
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Add labor and spare parts. Tax is deterministically calculated per country & customer profile.
            </p>

            <form onSubmit={handleCreateQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Linked Work Order */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Target Work Order
                </label>
                <select 
                  value={targetWorkOrderId} 
                  onChange={e => setTargetWorkOrderId(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea', fontWeight: 600 }}
                >
                  {workOrders.map(wo => {
                    const c = customers.find(cust => cust.id === wo.customerId);
                    const v = vehicles.find(veh => veh.id === wo.vehicleId);
                    return (
                      <option key={wo.id} value={wo.id}>
                        {wo.orderNumber} - {c?.firstName} {c?.lastName} ({v?.make} {v?.model})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Line Items Builder */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1f' }}>
                    Itemized Labor & Parts
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="button" onClick={() => handleAddLine('LABOR')} className="apple-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                      + Add Labor
                    </button>
                    <button type="button" onClick={() => handleAddLine('PART')} className="apple-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                      + Add Part
                    </button>
                    <button type="button" onClick={() => handleAddLine('CONSUMABLE')} className="apple-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                      + Add Consumable
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {builderLines.map(line => (
                    <div key={line.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px 70px 30px', gap: '8px', alignItems: 'center', background: '#f5f5f7', padding: '10px', borderRadius: '10px' }}>
                      <input 
                        type="text" 
                        value={line.description} 
                        onChange={e => handleUpdateLine(line.id, 'description', e.target.value)}
                        placeholder="Description..."
                        style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e5ea', fontSize: '13px' }}
                      />
                      <input 
                        type="number" 
                        min={0.25}
                        step={0.25}
                        value={line.quantity} 
                        onChange={e => handleUpdateLine(line.id, 'quantity', Number(e.target.value))}
                        placeholder="Qty"
                        style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e5ea', fontSize: '13px' }}
                      />
                      <input 
                        type="number" 
                        step="0.01"
                        value={line.unitPrice} 
                        onChange={e => handleUpdateLine(line.id, 'unitPrice', Number(e.target.value))}
                        placeholder="Unit Price"
                        style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e5ea', fontSize: '13px' }}
                      />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73' }}>
                        {line.vatRate}% TVA
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveLine(line.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff453a' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Summary */}
              <div style={{ background: 'rgba(0, 113, 227, 0.05)', border: '1px solid rgba(0, 113, 227, 0.15)', padding: '16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                    Subtotal HT: <strong>{builderTotals.subtotalExclVat.toFixed(2)} {activeTenant.currency}</strong>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                    Total TVA ({activeTenant.settings.standardVatRate}%): <strong>{builderTotals.totalVat.toFixed(2)} {activeTenant.currency}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#0071e3', fontWeight: 700, textTransform: 'uppercase' }}>Total TTC</span>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#1d1d1f' }}>
                    {builderTotals.totalAmount.toFixed(2)} {activeTenant.currency}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsBuilderOpen(false)} className="apple-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="apple-btn-primary">
                  Generate & Save Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
