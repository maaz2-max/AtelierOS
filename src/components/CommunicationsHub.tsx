// ==========================================================================
// AtelierOS - Omnichannel Communications Hub (SMS, Email, WhatsApp)
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldCheck, 
  Smartphone,
  Check
} from 'lucide-react';
import { CommunicationLog, Tenant, Customer, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { CommunicationService } from '../services/CommunicationService';
import { translations } from '../i18n/translations';

interface CommunicationsHubProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
}

export const CommunicationsHub: React.FC<CommunicationsHubProps> = ({
  activeTenant,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;

  const [logs, setLogs] = useState<CommunicationLog[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Composer
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [channel, setChannel] = useState<'SMS' | 'EMAIL' | 'WHATSAPP'>('SMS');
  const [templateType, setTemplateType] = useState<CommunicationLog['templateType']>('BOOKING_CONFIRMATION');
  const [customBody, setCustomBody] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const loadData = () => {
    setLogs(StorageService.getCommunications(activeTenant.id));
    const custs = StorageService.getCustomers(activeTenant.id);
    setCustomers(custs);
    if (custs.length > 0 && !selectedCustomerId) {
      setSelectedCustomerId(custs[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === selectedCustomerId);
    if (!cust) return;

    const recipient = channel === 'EMAIL' ? cust.email : cust.phone;
    const body = customBody.trim() || `${activeTenant.name}: Notification automatique concernant votre véhicule en atelier.`;

    CommunicationService.sendNotification({
      tenantId: activeTenant.id,
      customerId: cust.id,
      recipient,
      channel,
      templateType,
      subject: channel === 'EMAIL' ? `Notification - ${activeTenant.name}` : undefined,
      messageBody: body
    });

    setCustomBody('');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 2500);
    loadData();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>Omnichannel Communications Hub</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>
            Automated & direct SMS, Email, and WhatsApp dispatches with delivery tracking.
          </p>
        </div>

        <span className="apple-badge apple-badge-green" style={{ fontSize: '13px', padding: '6px 14px' }}>
          GDPR Opt-In Enforced
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Left Column: Quick Dispatcher */}
        <div className="apple-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Smartphone size={22} color="#0071e3" />
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Dispatch Customer Notification</h2>
          </div>

          {sentNotice && (
            <div style={{ background: '#30d158', color: '#ffffff', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} />
              <span>Message dispatched successfully</span>
            </div>
          )}

          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Target Customer */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                Recipient Customer
              </label>
              <select 
                value={selectedCustomerId}
                onChange={e => setSelectedCustomerId(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea', fontWeight: 600 }}
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.phone} • {c.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Channel Switcher */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                Channel
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {(['SMS', 'EMAIL', 'WHATSAPP'] as const).map(ch => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setChannel(ch)}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: channel === ch ? '2px solid #0071e3' : '1px solid #e5e5ea',
                      background: channel === ch ? 'rgba(0, 113, 227, 0.08)' : '#ffffff',
                      color: channel === ch ? '#0071e3' : '#6e6e73',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Template */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                Message Template Type
              </label>
              <select
                value={templateType}
                onChange={e => setTemplateType(e.target.value as any)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
              >
                <option value="BOOKING_CONFIRMATION">Booking Confirmation</option>
                <option value="REMINDER_24H">24-Hour Appointment Reminder</option>
                <option value="QUOTE_APPROVAL_LINK">Quote Ready for Approval</option>
                <option value="VEHICLE_READY">Vehicle Ready for Collection</option>
                <option value="INVOICE_ISSUED">Invoice Issued & Available</option>
                <option value="REVIEW_REQUEST">Review & Feedback Request</option>
              </select>
            </div>

            {/* Custom Text */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                Custom Message Override (Optional)
              </label>
              <textarea 
                value={customBody}
                onChange={e => setCustomBody(e.target.value)}
                placeholder="Leave blank to use default localized template..."
                rows={3}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea', fontSize: '14px' }}
              />
            </div>

            <button type="submit" className="apple-btn-primary" style={{ padding: '12px', fontSize: '15px', marginTop: '6px' }}>
              <Send size={16} />
              <span>Dispatch Message</span>
            </button>
          </form>
        </div>

        {/* Right Column: Communications Audit Log */}
        <div className="apple-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Transmission History</h2>
            <span className="apple-badge apple-badge-neutral">{logs.length} logged</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto' }}>
            {logs.map(log => {
              const cust = customers.find(c => c.id === log.customerId);

              return (
                <div key={log.id} style={{ background: '#f5f5f7', padding: '14px', borderRadius: '12px', border: '1px solid #e5e5ea' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`apple-badge ${
                        log.channel === 'WHATSAPP' ? 'apple-badge-green' :
                        log.channel === 'SMS' ? 'apple-badge-blue' : 'apple-badge-amber'
                      }`} style={{ fontSize: '10px' }}>
                        {log.channel}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: '#1d1d1f' }}>
                        {cust?.firstName} {cust?.lastName}
                      </span>
                    </div>

                    <span className="apple-badge apple-badge-green" style={{ fontSize: '10px' }}>
                      {log.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#333336', lineHeight: 1.4, margin: '6px 0' }}>
                    {log.messageBody}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#86868b', marginTop: '6px' }}>
                    <span>To: {log.recipient}</span>
                    <span>{new Date(log.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
