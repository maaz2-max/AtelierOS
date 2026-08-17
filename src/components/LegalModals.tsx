// ==========================================================================
// AtelierOS - Legal Modals (Privacy Policy, GDPR, Terms of Service)
// ==========================================================================

import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'PRIVACY' | 'TERMS' | 'EINVOICE_INFO' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="apple-modal-overlay" onClick={onClose}>
      <div 
        className="apple-modal-content p-6 max-w-2xl animate-fade-in" 
        onClick={e => e.stopPropagation()}
        style={{ padding: '32px', borderRadius: '24px', maxWidth: '680px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 113, 227, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0071e3'
            }}>
              {type === 'PRIVACY' ? <ShieldCheck size={24} /> : <FileText size={24} />}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f' }}>
                {type === 'PRIVACY' && 'GDPR & Data Privacy Policy'}
                {type === 'TERMS' && 'Terms of Service & SaaS Agreement'}
                {type === 'EINVOICE_INFO' && 'French & Swiss E-Invoicing Compliance'}
              </h2>
              <span style={{ fontSize: '12px', color: '#86868b' }}>
                Developed by MARS Association • Compliant with EU / Swiss Data Laws
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}
          >
            <X size={22} />
          </button>
        </div>

        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px', color: '#333336', fontSize: '14px', lineHeight: 1.6 }}>
          {type === 'PRIVACY' && (
            <div>
              <h4 style={{ fontWeight: 600, marginTop: '12px', color: '#1d1d1f' }}>1. EU Hosting & Data Sovereignty</h4>
              <p>All tenant databases, customer vehicle service histories, quotes, and billing snapshots are hosted exclusively within certified European Union datacenters (Paris / Frankfurt) and Swiss sovereign data boundaries, complying fully with EU Regulation 2016/679 (GDPR) and the Swiss Federal Act on Data Protection (FADP/nLPD).</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>2. Right to Access, Export & Erasure</h4>
              <p>Automotive workshop customers have the full legal right to request a complete JSON export of their service records or request immediate anonymization/deletion of contact details upon written notice.</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>3. Customer Consent Management</h4>
              <p>Transactional communications (Appointment confirmations, Quote approval links, Vehicle Ready notifications) are dispatched strictly based on explicit customer opt-in consent recorded at intake.</p>
            </div>
          )}

          {type === 'TERMS' && (
            <div>
              <h4 style={{ fontWeight: 600, marginTop: '12px', color: '#1d1d1f' }}>1. Platform License & SLA</h4>
              <p>AtelierOS provides multi-tenant SaaS operating software for automotive repair facilities. Uptime commitment is 99.9% with continuous automated backups.</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>2. AI Assistant Boundaries & Disclaimers</h4>
              <p>The AutoAI intake and diagnostic assistant functions purely as a triaging tool via bounded API calls. Official mechanical diagnostics, parts quotes, and quality control sign-offs remain the sole responsibility of the certified workshop technician.</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>3. Multi-Tenant Data Isolation</h4>
              <p>Each garage tenant possesses strict row-level cryptographic isolation. No garage can view or access customer records, pricing, or calendar events of another facility.</p>
            </div>
          )}

          {type === 'EINVOICE_INFO' && (
            <div>
              <h4 style={{ fontWeight: 600, marginTop: '12px', color: '#1d1d1f' }}>1. France: Chorus Pro & Factur-X / PPF</h4>
              <p>AtelierOS generates standard Factur-X (CII hybrid XML/PDF) and UBL 2.1 payloads ready for direct transmission to the French Portail Public de Facturation (PPF) and registered Plateformes de Dématérialisation Partenaire (PDP).</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>2. Switzerland: QR-Bill Standard</h4>
              <p>Invoices issued under Swiss jurisdiction (CHF) feature standardized QR-Bill data payloads including structured reference numbers (QR-IBAN) conforming to Swiss Payment Standards 2024.</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="apple-btn-primary" onClick={onClose}>
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
