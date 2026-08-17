// ==========================================================================
// AtelierOS — Customer Quote Magic Approval Portal (Redesigned)
// Linear/Stripe Precision Financial Layout + Safe Currency Number Formatting
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
  const tap = t.approvalPortal || {};

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

  const safeNum = (val: any): string => {
    const n = typeof val === 'number' ? val : parseFloat(val);
    return isNaN(n) ? '0.00' : n.toFixed(2);
  };

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
    setActionDoneMessage("Quote has been marked as rejected. Our service advisor will call you to discuss alternative options.");
    if (onApprovalComplete) onApprovalComplete();
  };

  if (!quote || !tenant) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '24px', textAlign: 'center' }}>
        <div style={{ padding: '40px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)' }}>
          <AlertCircle size={40} color="var(--color-warning)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px', color: 'var(--color-text-primary)' }}>Quote Not Found</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>The quote link you accessed may have expired or is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '32px 20px 80px' }}>
      {/* Educational Explainer Banner */}
      {showExplainer && (
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--brand-blue-border)',
          borderRadius: 'var(--radius-card)',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start'
        }}>
          <HelpCircle size={20} color="var(--brand-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1, fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <strong style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>
                Why do automotive workshops send Magic Approval Links?
              </strong>
              <button 
                onClick={() => setShowExplainer(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '12px' }}
              >
                Dismiss
              </button>
            </div>
            <p style={{ margin: 0 }}>
              Instead of slow phone tag, AtelierOS generates a single-use legal magic link. You get complete transparency on all parts and labor rates, with a 3-second legally binding digital authorization.
            </p>
          </div>
        </div>
      )}

      {/* Interactive Demo Quote Selector */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        padding: '12px 18px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Select Demo Estimate to Review:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {allQuotes.map(q => (
            <button
              key={q.id}
              onClick={() => loadQuoteByToken(q.magicToken)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-sm)',
                border: quote?.id === q.id ? '1px solid var(--brand-blue)' : '1px solid var(--color-border)',
                background: quote?.id === q.id ? 'var(--brand-blue-soft)' : 'var(--color-surface-secondary)',
                color: quote?.id === q.id ? 'var(--brand-blue)' : 'var(--color-text-primary)',
                fontSize: '12px',
                fontWeight: quote?.id === q.id ? '600' : '500',
                cursor: 'pointer'
              }}
            >
              #{q.quoteNumber} ({safeNum(q.totalAmount)} {q.currency})
            </button>
          ))}
        </div>
      </div>

      {/* Main Quote Document Container */}
      <div className="saas-card" style={{ padding: '28px' }}>
        {/* Document Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: '24px'
        }}>
          <div>
            <span className="saas-badge saas-badge-blue" style={{ marginBottom: '8px' }}>
              OFFICIAL WORKSHOP ESTIMATE
            </span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', margin: '4px 0', color: 'var(--color-text-primary)' }}>
              {tenant.name}
            </h1>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {tenant.address?.street}, {tenant.address?.city} • Tel: {tenant.phone}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: '600' }}>ESTIMATE NUMBER</div>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              #{quote.quoteNumber}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Valid until: {quote.validUntil}
            </div>
          </div>
        </div>

        {/* Vehicle & Customer Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          background: 'var(--color-surface-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 18px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Vehicle on Bay</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
              {vehicle?.make} {vehicle?.model} ({vehicle?.year})
            </div>
            <span className="license-plate" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--brand-blue)' }}>
              Plate: {vehicle?.licensePlate || 'AB-123-CD'}
            </span>
          </div>

          <div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Vehicle Owner</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginTop: '2px' }}>
              {customer?.firstName} {customer?.lastName}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{customer?.phone}</div>
          </div>
        </div>

        {/* Itemized Operations & Parts Table */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '10px' }}>
            Recommended Parts &amp; Labor Operations
          </div>

          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--color-surface-secondary)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '10px 14px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Description</th>
                  <th style={{ padding: '10px', fontWeight: '600', color: 'var(--color-text-secondary)', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '10px', fontWeight: '600', color: 'var(--color-text-secondary)', textAlign: 'right' }}>Unit Price</th>
                  <th style={{ padding: '10px 14px', fontWeight: '600', color: 'var(--color-text-secondary)', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {(quote.lines || []).map((line, idx) => {
                  const lineTotal = line.totalInclVat ?? line.totalExclVat ?? ((line.unitPrice || 0) * (line.quantity || 1));
                  return (
                    <tr key={idx} style={{ borderBottom: idx < quote.lines.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      <td style={{ padding: '10px 14px' }}>
                        <span className={`saas-badge ${line.type === 'LABOR' ? 'saas-badge-blue' : 'saas-badge-success'}`} style={{ marginRight: '8px' }}>
                          {line.type}
                        </span>
                        <span style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>{line.description}</span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        {line.quantity || 1}
                      </td>
                      <td className="tabular-nums font-mono" style={{ padding: '10px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                        {safeNum(line.unitPrice)} {quote.currency}
                      </td>
                      <td className="tabular-nums font-mono" style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                        {safeNum(lineTotal)} {quote.currency}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Subtotal & Total Card */}
        <div style={{
          background: 'var(--color-surface-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px 20px',
          maxWidth: '360px',
          marginLeft: 'auto',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            <span>Subtotal Excl. Tax (HT):</span>
            <span className="tabular-nums font-mono" style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {safeNum(quote.subtotalExclVat)} {quote.currency}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            <span>VAT / TVA ({tenant.country === 'FR' ? '20.0%' : '8.1%'}):</span>
            <span className="tabular-nums font-mono" style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
              {safeNum(quote.totalVat)} {quote.currency}
            </span>
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
            <span>Total Authorized (TTC):</span>
            <span className="tabular-nums font-mono" style={{ color: 'var(--brand-blue)' }}>
              {safeNum(quote.totalAmount)} {quote.currency}
            </span>
          </div>
        </div>

        {/* Status Confirmation Banner or Authorization Signature Form */}
        {actionDoneMessage ? (
          <div style={{
            background: quote.status === 'APPROVED' ? 'var(--color-success-soft)' : 'var(--color-danger-soft)',
            border: `1px solid ${quote.status === 'APPROVED' ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '15px',
              fontWeight: '700',
              color: quote.status === 'APPROVED' ? 'var(--color-success)' : 'var(--color-danger)',
              marginBottom: '4px'
            }}>
              {quote.status === 'APPROVED' ? '✓ Authorization Confirmed' : 'Quote Declined'}
            </div>
            <p style={{ fontSize: '13px', margin: 0, color: 'var(--color-text-secondary)' }}>
              {actionDoneMessage}
            </p>
          </div>
        ) : quote.status === 'APPROVED' ? (
          <div style={{
            background: 'var(--color-success-soft)',
            border: '1px solid var(--color-success-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <CheckCircle2 size={20} color="var(--color-success)" />
            <div style={{ fontSize: '13px' }}>
              <strong style={{ color: 'var(--color-success)' }}>Quote Digitally Approved</strong>
              <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                Authorized by <span style={{ fontWeight: '600' }}>{quote.approvalSignature}</span> on {quote.approvedAt || 'today'}.
              </div>
            </div>
          </div>
        ) : isRejecting ? (
          <form onSubmit={handleReject} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-danger)', margin: '0 0 8px' }}>
              Decline Repair Estimate
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
              Please let our service team know why you are declining so we can offer alternative options or budget adjustments:
            </p>
            <textarea
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="e.g. Budget too high for this month, vehicle being sold, etc."
              rows={3}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-input)',
                background: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                fontSize: '13px',
                marginBottom: '12px',
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="submit"
                style={{
                  background: 'var(--color-danger)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-button)',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Confirm Decline
              </button>
              <button
                type="button"
                onClick={() => setIsRejecting(false)}
                className="saas-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleApprove} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
              Digital Repair Authorization
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '0 0 14px' }}>
              By typing your full legal name below, you electronically authorize {tenant.name} to perform the operations itemized above.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                value={signatureName}
                onChange={e => setSignatureName(e.target.value)}
                placeholder="Type your full legal name (e.g. Sophie Laurent)"
                required
                style={{
                  flex: '1 1 260px',
                  padding: '9px 14px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-input)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />

              <button
                type="submit"
                className="saas-btn-primary"
                style={{ padding: '9px 18px', fontSize: '13px', fontWeight: '600' }}
              >
                <PenTool size={14} />
                <span>Authorize Repairs ({safeNum(quote.totalAmount)} {quote.currency})</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRejecting(true)}
                style={{
                  background: 'transparent',
                  color: 'var(--color-danger)',
                  border: '1px solid var(--color-danger-border)',
                  borderRadius: 'var(--radius-button)',
                  padding: '9px 14px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Decline Quote
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
