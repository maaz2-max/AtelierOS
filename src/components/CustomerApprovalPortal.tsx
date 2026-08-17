// ==========================================================================
// AtelierOS - Customer Quote Magic Approval Portal
// Digital Signature, Transparency Breakdown & Interactive Demo Selectors
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  Car, 
  User, 
  ShieldCheck, 
  Building2, 
  Check, 
  PenTool, 
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Quote, Tenant, Customer, Vehicle, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { QuoteInvoiceService } from '../services/QuoteInvoiceService';
import { translations } from '../i18n/translations';

interface CustomerApprovalPortalProps {
  token?: string;
  magicToken?: string;
  currentLanguage: SupportedLanguage;
  onApprovalComplete?: () => void;
  onBackToApp?: () => void;
}

export const CustomerApprovalPortal: React.FC<CustomerApprovalPortalProps> = ({
  token,
  magicToken,
  currentLanguage,
  onApprovalComplete,
  onBackToApp
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const tap = t.approvalPortal;

  const activeToken = token || magicToken || 'token-quote-fr-01';

  const [quote, setQuote] = useState<Quote | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const [signatureName, setSignatureName] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [actionDoneMessage, setActionDoneMessage] = useState<string | null>(null);
  const [showExplainer, setShowExplainer] = useState(true);

  const allQuotes = StorageService.getAllQuotes();

  const loadQuoteByToken = (tok: string) => {
    const target = allQuotes.find(q => q.magicToken === tok) || allQuotes[0];
    if (target) {
      setQuote(target);
      const allTenants = StorageService.getTenants();
      const allCust = StorageService.getAllCustomers();
      const allVeh = StorageService.getAllVehicles();

      setTenant(allTenants.find(t => t.id === target.tenantId) || allTenants[0]);
      setCustomer(allCust.find(c => c.id === target.customerId) || null);
      setVehicle(allVeh.find(v => v.id === target.vehicleId) || null);

      if (target.approvalSignature) {
        setSignatureName(target.approvalSignature);
      }
      setActionDoneMessage(null);
      setIsRejecting(false);
    }
  };

  useEffect(() => {
    loadQuoteByToken(activeToken);
  }, [activeToken]);

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote || !signatureName.trim()) return;

    const updated = QuoteInvoiceService.approveQuote(quote.id, signatureName.trim());
    setQuote({ ...updated });
    setActionDoneMessage(tap.approvedSuccess || "Quotation Approved! Workshop staff notified to commence repairs.");
    if (onApprovalComplete) onApprovalComplete();
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote) return;

    const updated = QuoteInvoiceService.rejectQuote(quote.id, rejectionReason.trim());
    setQuote({ ...updated });
    setActionDoneMessage(tap.rejectedSuccess || "Quotation Declined. Our team has been notified.");
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '36px 20px 80px' }}>
      {/* Educational Explainer Banner: What is a Magic Approval Link? */}
      {showExplainer && (
        <div style={{
          background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
          borderRadius: '24px',
          padding: '24px 28px',
          border: '1px solid rgba(0, 113, 227, 0.2)',
          boxShadow: '0 8px 24px rgba(0, 113, 227, 0.05)',
          marginBottom: '28px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HelpCircle size={16} color="#fff" />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#1d1d1f' }}>
              What is a Customer Magic Approval Link?
            </h3>
          </div>

          <p style={{ fontSize: '14px', color: '#515154', lineHeight: 1.5, margin: '0 0 16px' }}>
            When a workshop inspects your car and recommends necessary repairs, they send you this <strong>secure 1-click Magic Link by SMS or Email</strong>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#fff', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e5e5ea' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0071e3', marginBottom: '2px' }}>1. Zero Phone Tag</div>
              <div style={{ fontSize: '12px', color: '#6e6e73' }}>Review quotes quietly on mobile without interrupting meetings or driving.</div>
            </div>
            <div style={{ background: '#fff', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e5e5ea' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#34c759', marginBottom: '2px' }}>2. 100% Itemized Parts</div>
              <div style={{ fontSize: '12px', color: '#6e6e73' }}>Clear breakdown of spare parts, labor hours, and VAT before any work starts.</div>
            </div>
            <div style={{ background: '#fff', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e5e5ea' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#ff9500', marginBottom: '2px' }}>3. 3-Second Digital Sign</div>
              <div style={{ fontSize: '12px', color: '#6e6e73' }}>Type your name to sign. The mechanic's bay tablet instantly beeps to start!</div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Selector Strip */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '18px 24px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Select Demo Quote to Test:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {allQuotes.map(q => (
            <button
              key={q.id}
              onClick={() => loadQuoteByToken(q.magicToken)}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: quote?.id === q.id ? '2px solid #0071e3' : '1px solid #e5e5ea',
                background: quote?.id === q.id ? '#f0f7ff' : '#fbfbfd',
                color: quote?.id === q.id ? '#0071e3' : '#1d1d1f',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Quote #{q.quoteNumber} ({q.totalAmount.toFixed(2)} {q.currency})
            </button>
          ))}
        </div>
      </div>

      {quote && tenant && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quote Header Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #f2f2f7', paddingBottom: '20px' }}>
              <div>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  background: '#eaf4ff', 
                  color: '#0071e3', 
                  padding: '3px 10px', 
                  borderRadius: '12px',
                  display: 'inline-block',
                  marginBottom: '8px'
                }}>
                  OFFICIAL COMMERCIAL ESTIMATE
                </span>
                <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 4px', color: '#1d1d1f' }}>
                  {tenant.name}
                </h1>
                <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                  {tenant.address?.street}, {tenant.address?.city} • Tel: {tenant.phone}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#86868b', fontWeight: '600' }}>ESTIMATE NUMBER</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#1d1d1f' }}>#{quote.quoteNumber}</div>
                <div style={{ fontSize: '12px', color: '#86868b', marginTop: '2px' }}>Valid until: {quote.validUntil}</div>
              </div>
            </div>

            {/* Vehicle & Customer Profile */}
            <div style={{
              background: '#f9f9fb',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#86868b', fontWeight: '700', textTransform: 'uppercase' }}>Vehicle on Bay</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#1d1d1f', marginTop: '2px' }}>
                  {vehicle?.make} {vehicle?.model} ({vehicle?.year})
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: '700', color: '#0071e3' }}>
                  Plate: {vehicle?.licensePlate || 'AB-123-CD'}
                </span>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#86868b', fontWeight: '700', textTransform: 'uppercase' }}>Authorized For</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#1d1d1f', marginTop: '2px' }}>
                  {customer?.firstName} {customer?.lastName}
                </div>
                <div style={{ fontSize: '12px', color: '#6e6e73' }}>{customer?.phone}</div>
              </div>
            </div>

            {/* Itemized Line Items Table */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1d1d1f', marginBottom: '12px' }}>
                Recommended Parts &amp; Labor Operations
              </div>
              <div style={{ border: '1px solid #e5e5ea', borderRadius: '16px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea' }}>
                      <th style={{ padding: '12px 16px', fontWeight: '700', color: '#515154' }}>Item Description</th>
                      <th style={{ padding: '12px', fontWeight: '700', color: '#515154', textAlign: 'center' }}>Qty</th>
                      <th style={{ padding: '12px', fontWeight: '700', color: '#515154', textAlign: 'right' }}>Unit Price</th>
                      <th style={{ padding: '12px 16px', fontWeight: '700', color: '#515154', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.lines.map((line, idx) => (
                      <tr key={idx} style={{ borderBottom: idx < quote.lines.length - 1 ? '1px solid #f2f2f7' : 'none' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ 
                            fontSize: '10px', 
                            padding: '1px 6px', 
                            borderRadius: '4px', 
                            background: line.type === 'LABOR' ? '#eaf4ff' : '#edf9f0',
                            color: line.type === 'LABOR' ? '#0071e3' : '#248a3d',
                            fontWeight: '700',
                            marginRight: '6px'
                          }}>
                            {line.type}
                          </span>
                          <span style={{ fontWeight: '600', color: '#1d1d1f' }}>{line.description}</span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#515154' }}>{line.quantity}</td>
                        <td style={{ padding: '12px', textAlign: 'right', color: '#515154' }}>{line.unitPrice.toFixed(2)} {quote.currency}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#1d1d1f' }}>
                          {line.totalPrice.toFixed(2)} {quote.currency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tax Breakdown & Grand Total */}
            <div style={{
              background: '#f9f9fb',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxWidth: '380px',
              marginLeft: 'auto',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6e6e73' }}>
                <span>Subtotal Excl. Tax (HT):</span>
                <span style={{ fontWeight: '600', color: '#1d1d1f' }}>{quote.subtotalExclVat.toFixed(2)} {quote.currency}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6e6e73' }}>
                <span>VAT / TVA ({tenant.country === 'FR' ? '20.0%' : '8.1%'}):</span>
                <span style={{ fontWeight: '600', color: '#1d1d1f' }}>{quote.totalVat.toFixed(2)} {quote.currency}</span>
              </div>
              <div style={{ borderTop: '1.5px solid #e5e5ea', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', color: '#1d1d1f' }}>
                <span>Total Amount (TTC):</span>
                <span style={{ color: '#0071e3' }}>{quote.totalAmount.toFixed(2)} {quote.currency}</span>
              </div>
            </div>

            {/* Approval Action Form */}
            {actionDoneMessage ? (
              <div style={{
                background: quote.status === 'APPROVED_BY_CUSTOMER' ? '#edf9f0' : '#ffebeb',
                border: quote.status === 'APPROVED_BY_CUSTOMER' ? '1.5px solid #34c759' : '1.5px solid #d9383a',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: '800', 
                  color: quote.status === 'APPROVED_BY_CUSTOMER' ? '#248a3d' : '#d9383a',
                  marginBottom: '4px'
                }}>
                  {actionDoneMessage}
                </div>
                <div style={{ fontSize: '13px', color: '#515154' }}>
                  {quote.status === 'APPROVED_BY_CUSTOMER' 
                    ? `Digital Signature legally logged: "${signatureName}". The workshop has been notified in real time.`
                    : "The quotation was declined. Our service manager will contact you."}
                </div>
              </div>
            ) : (
              <div style={{ borderTop: '1px solid #f2f2f7', paddingTop: '24px' }}>
                <form onSubmit={handleApprove}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1d1d1f', marginBottom: '8px' }}>
                      Digital Authorization Signature:
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        required
                        value={signatureName}
                        onChange={e => setSignatureName(e.target.value)}
                        placeholder="Type your full legal name as authorization signature..."
                        style={{
                          width: '100%',
                          padding: '14px 16px 14px 42px',
                          fontSize: '16px',
                          borderRadius: '14px',
                          border: '2px solid #0071e3',
                          background: '#fbfbfd',
                          boxSizing: 'border-box',
                          fontWeight: '600'
                        }}
                      />
                      <PenTool size={18} color="#0071e3" style={{ position: 'absolute', left: '14px', top: '16px' }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#86868b', marginTop: '4px', display: 'block' }}>
                      By typing your name and clicking approve, you authorize {tenant.name} to perform the repair operations listed above.
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: '16px',
                        background: '#34c759',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '14px',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(52, 199, 89, 0.35)'
                      }}
                    >
                      <Check size={18} color="#fff" />
                      <span>Approve Quote &amp; Authorize Repairs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsRejecting(!isRejecting)}
                      style={{
                        padding: '16px 20px',
                        background: '#f5f5f7',
                        color: '#d9383a',
                        border: '1px solid #e5e5ea',
                        borderRadius: '14px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Decline
                    </button>
                  </div>
                </form>

                {isRejecting && (
                  <form onSubmit={handleReject} style={{ marginTop: '16px', padding: '16px', background: '#fff5f5', borderRadius: '14px', border: '1px solid #ffd2d2' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#d9383a', marginBottom: '6px' }}>
                      Reason for Declining Quotation:
                    </label>
                    <input
                      type="text"
                      value={rejectionReason}
                      onChange={e => setRejectionReason(e.target.value)}
                      placeholder="e.g. Price too high or need to postpone repair..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', marginBottom: '10px', boxSizing: 'border-box' }}
                    />
                    <button
                      type="submit"
                      style={{ padding: '10px 18px', background: '#d9383a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Confirm Decline
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
