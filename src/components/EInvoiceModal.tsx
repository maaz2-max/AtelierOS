// ==========================================================================
// AtelierOS - French E-Invoicing & Factur-X Payload Modal
// ==========================================================================

import React, { useState } from 'react';
import { 
  Receipt, 
  X, 
  CheckCircle2, 
  Send, 
  Copy, 
  Check, 
  Code, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { Invoice, Tenant, Customer } from '../types';
import { EInvoiceConnector, FacturXPayload } from '../services/EInvoiceConnector';

interface EInvoiceModalProps {
  invoice: Invoice | null;
  tenant: Tenant;
  customer?: Customer;
  onClose: () => void;
  onSubmitted: () => void;
}

export const EInvoiceModal: React.FC<EInvoiceModalProps> = ({
  invoice,
  tenant,
  customer,
  onClose,
  onSubmitted
}) => {
  if (!invoice) return null;

  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'XML' | 'SUBMISSION'>('SUMMARY');
  const [copied, setCopied] = useState(false);
  const [platform, setPlatform] = useState<'CHORUS_PRO' | 'PPF' | 'PDP_GENERIC'>('CHORUS_PRO');
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const payload: FacturXPayload = EInvoiceConnector.generatePayload(invoice);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(payload.xmlPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransmit = () => {
    const result = EInvoiceConnector.submitToChorusPro(invoice.id, platform);
    setSubmissionResult(result);
    onSubmitted();
  };

  return (
    <div className="apple-modal-overlay" onClick={onClose}>
      <div 
        className="apple-modal-content p-6 max-w-3xl animate-fade-in" 
        onClick={e => e.stopPropagation()}
        style={{ padding: '32px', maxWidth: '820px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(0, 113, 227, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0071e3'
            }}>
              <Receipt size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f' }}>
                  E-Invoicing Connector
                </h2>
                <span className="apple-badge apple-badge-blue" style={{ fontSize: '11px' }}>
                  {payload.specification}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#6e6e73' }}>
                Invoice: <strong>{invoice.invoiceNumber}</strong> • Compliant with French PPF / PDP Standard
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}>
            <X size={22} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e5ea', paddingBottom: '12px', marginBottom: '20px' }}>
          {[
            { id: 'SUMMARY', label: 'Structured Payload Summary' },
            { id: 'XML', label: 'Inspect Factur-X / UBL XML' },
            { id: 'SUBMISSION', label: 'Transmit & Live Status' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(0, 113, 227, 0.1)' : 'transparent',
                color: activeTab === tab.id ? '#0071e3' : '#6e6e73',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Summary */}
        {activeTab === 'SUMMARY' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
                <h4 style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Seller (Workshop)</h4>
                <div><strong>Company:</strong> {payload.seller.name}</div>
                <div><strong>SIRET / UID:</strong> {payload.seller.siret}</div>
                <div><strong>VAT:</strong> {payload.seller.vatNumber || 'FRxx'}</div>
                <div><strong>Address:</strong> {payload.seller.address}</div>
              </div>

              <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
                <h4 style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Buyer (Customer)</h4>
                <div><strong>Name:</strong> {payload.buyer.name}</div>
                <div><strong>Legal ID:</strong> {payload.buyer.siretOrUid || 'B2C'}</div>
                <div><strong>Country:</strong> {payload.buyer.country}</div>
                <div><strong>Address:</strong> {payload.buyer.address}</div>
              </div>
            </div>

            <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
              <h4 style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Tax & Financial Breakdown</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>Total Excl. Tax: <strong>{payload.financials.subtotalExclTax.toFixed(2)} {payload.financials.currency}</strong></div>
                <div>Total VAT: <strong>{payload.financials.vatTotal.toFixed(2)} {payload.financials.currency}</strong></div>
                <div>Total Payable: <strong>{payload.financials.grandTotal.toFixed(2)} {payload.financials.currency}</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Raw XML */}
        {activeTab === 'XML' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#86868b', fontFamily: 'monospace' }}>
                Standard: Factur-X / CII EN16931 Schema
              </span>
              <button onClick={handleCopyXml} className="apple-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                {copied ? <Check size={13} color="#30d158" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy XML'}</span>
              </button>
            </div>
            <pre style={{
              background: '#1d1d1f',
              color: '#64d2ff',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '11px',
              fontFamily: 'monospace',
              maxHeight: '340px',
              overflowY: 'auto',
              lineHeight: 1.4
            }}>
              {payload.xmlPreview}
            </pre>
          </div>
        )}

        {/* Tab 3: Transmission */}
        {activeTab === 'SUBMISSION' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6e6e73', marginBottom: '6px' }}>
                Select French E-Invoicing Platform
              </label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value as any)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e5ea', fontWeight: 600 }}
              >
                <option value="CHORUS_PRO">Chorus Pro (Portail Public de Facturation - B2G & B2B)</option>
                <option value="PPF">PPF Native Direct API</option>
                <option value="PDP_GENERIC">Partner PDP Dematerialization Platform</option>
              </select>
            </div>

            {submissionResult ? (
              <div style={{ background: 'rgba(48, 209, 88, 0.12)', border: '1px solid rgba(48, 209, 88, 0.3)', padding: '20px', borderRadius: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#248a3d', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>
                  <CheckCircle2 size={20} />
                  <span>Submission Accepted & Recorded</span>
                </div>
                <div style={{ fontSize: '13px', color: '#1d1d1f', lineHeight: 1.5 }}>
                  {submissionResult.message}
                </div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#6e6e73' }}>
                  External Transaction Reference: <strong>{submissionResult.submissionId}</strong>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <button
                  onClick={handleTransmit}
                  className="apple-btn-primary"
                  style={{ padding: '12px 28px', fontSize: '15px' }}
                >
                  <Send size={16} />
                  <span>Transmit Electronic Payload to {platform}</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="apple-btn-secondary">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
