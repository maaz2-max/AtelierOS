// ==========================================================================
// AtelierOS - Invoice Management & Cross-Border Billing (EUR / CHF)
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  Plus, 
  Printer, 
  Send, 
  CheckCircle2, 
  Clock, 
  Car, 
  User, 
  ShieldCheck, 
  QrCode, 
  FileText,
  CreditCard,
  Building2
} from 'lucide-react';
import { Invoice, Tenant, Customer, Vehicle, WorkOrder, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { QuoteInvoiceService } from '../services/QuoteInvoiceService';
import { EInvoiceModal } from './EInvoiceModal';
import { translations } from '../i18n/translations';

interface InvoiceManagerProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
  activeWorkOrderId?: string;
}

export const InvoiceManager: React.FC<InvoiceManagerProps> = ({
  activeTenant,
  currentLanguage,
  activeWorkOrderId
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const ti = t.invoices;

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [eInvoiceModalInvoice, setEInvoiceModalInvoice] = useState<Invoice | null>(null);
  const [isPrintViewOpen, setIsPrintViewOpen] = useState(false);

  const loadData = () => {
    setInvoices(StorageService.getInvoices(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setWorkOrders(StorageService.getWorkOrders(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  useEffect(() => {
    if (activeWorkOrderId) {
      // Find if invoice already generated for this work order
      const existing = invoices.find(i => i.workOrderId === activeWorkOrderId);
      if (existing) {
        setSelectedInvoice(existing);
      } else {
        // Auto-generate invoice
        try {
          const inv = QuoteInvoiceService.generateInvoiceFromWorkOrder(activeWorkOrderId);
          loadData();
          setSelectedInvoice(inv);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [activeWorkOrderId]);

  const togglePaidStatus = (inv: Invoice) => {
    const all = StorageService.getAllInvoices();
    const target = all.find(i => i.id === inv.id);
    if (target) {
      target.paid = !target.paid;
      target.paidAt = target.paid ? new Date().toISOString() : undefined;
      StorageService.saveInvoices(all);
      loadData();
      if (selectedInvoice && selectedInvoice.id === inv.id) {
        setSelectedInvoice({ ...target });
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{ti.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{ti.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="apple-badge apple-badge-blue" style={{ fontSize: '13px', padding: '6px 14px' }}>
            {invoices.length} Invoices Issued
          </span>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="apple-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 20px' }}>Invoice #</th>
                <th style={{ padding: '14px 20px' }}>Customer & Vehicle</th>
                <th style={{ padding: '14px 20px' }}>Total Amount</th>
                <th style={{ padding: '14px 20px' }}>Payment Status</th>
                <th style={{ padding: '14px 20px' }}>E-Invoicing (Chorus Pro)</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const customer = customers.find(c => c.id === inv.customerId);
                const vehicle = vehicles.find(v => v.id === inv.vehicleId);

                return (
                  <tr key={inv.id} style={{ borderBottom: '1px solid #f0f0f3' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ fontWeight: 700, color: '#0071e3', fontSize: '15px' }}>
                        {inv.invoiceNumber}
                      </span>
                      <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                        Issued: {inv.issueDate} • Due: {inv.dueDate}
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
                        {inv.totalAmount.toFixed(2)} {inv.currency}
                      </div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>
                        (HT: {inv.subtotalExclVat.toFixed(2)} + TVA: {inv.totalVat.toFixed(2)})
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <button
                        onClick={() => togglePaidStatus(inv)}
                        className={`apple-badge ${inv.paid ? 'apple-badge-green' : 'apple-badge-amber'}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                      >
                        {inv.paid ? 'PAID / RÉGLÉ' : 'UNPAID'}
                      </button>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className={`apple-badge ${
                          inv.eInvoiceStatus === 'ACCEPTED' ? 'apple-badge-green' :
                          inv.eInvoiceStatus === 'SUBMITTED' ? 'apple-badge-blue' : 'apple-badge-neutral'
                        }`}>
                          {inv.eInvoiceStatus}
                        </span>
                        {inv.eInvoiceSubmissionId && (
                          <span style={{ fontSize: '11px', color: '#86868b' }}>
                            {inv.eInvoiceSubmissionId.substring(0, 10)}...
                          </span>
                        )}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setIsPrintViewOpen(true);
                          }}
                          className="apple-btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '12px', minHeight: '30px' }}
                          title="Print / View PDF Invoice"
                        >
                          <Printer size={13} />
                          <span>PDF</span>
                        </button>
                        <button
                          onClick={() => setEInvoiceModalInvoice(inv)}
                          className="apple-btn-primary"
                          style={{ padding: '6px 12px', fontSize: '12px', minHeight: '30px' }}
                        >
                          <Send size={13} />
                          <span>E-Invoice</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Invoice / PDF Viewer Modal */}
      {isPrintViewOpen && selectedInvoice && (
        <div className="apple-modal-overlay" onClick={() => setIsPrintViewOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-4xl" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '36px', maxWidth: '850px', background: '#ffffff' }}
          >
            {/* Action Bar (Not Printed) */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e5e5ea', paddingBottom: '14px' }}>
              <div style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '16px' }}>
                Invoice Preview: {selectedInvoice.invoiceNumber}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handlePrint} className="apple-btn-primary">
                  <Printer size={16} />
                  <span>Print / Save as PDF</span>
                </button>
                <button onClick={() => setIsPrintViewOpen(false)} className="apple-btn-secondary">
                  Close
                </button>
              </div>
            </div>

            {/* Official Printable Invoice Document */}
            <div style={{ color: '#1d1d1f', fontSize: '14px', lineHeight: 1.5 }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: '#1d1d1f' }}>
                    {activeTenant.name}
                  </h1>
                  <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
                    {activeTenant.address.street}<br />
                    {activeTenant.address.postalCode} {activeTenant.address.city}, {activeTenant.country}<br />
                    Phone: {activeTenant.phone} • Email: {activeTenant.email}
                  </div>
                  <div style={{ fontSize: '11px', color: '#86868b', marginTop: '6px' }}>
                    {activeTenant.country === 'FR' ? `SIRET: ${activeTenant.taxIdentity.siret} • N° TVA: ${activeTenant.taxIdentity.vatNumber}` : `IDE/UID: ${activeTenant.taxIdentity.uid}`}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0071e3' }}>
                    FACTURE / INVOICE
                  </h2>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>
                    {selectedInvoice.invoiceNumber}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
                    Date: {selectedInvoice.issueDate}<br />
                    Due Date: {selectedInvoice.dueDate}
                  </div>
                </div>
              </div>

              {/* Customer Box */}
              <div style={{ background: '#f5f5f7', padding: '16px 20px', borderRadius: '12px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#86868b', textTransform: 'uppercase' }}>
                    Bill To / Client :
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', marginTop: '4px' }}>
                    {customers.find(c => c.id === selectedInvoice.customerId)?.companyName || `${customers.find(c => c.id === selectedInvoice.customerId)?.firstName} ${customers.find(c => c.id === selectedInvoice.customerId)?.lastName}`}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>
                    {customers.find(c => c.id === selectedInvoice.customerId)?.address.street}<br />
                    {customers.find(c => c.id === selectedInvoice.customerId)?.address.postalCode} {customers.find(c => c.id === selectedInvoice.customerId)?.address.city}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#86868b', textTransform: 'uppercase' }}>
                    Vehicle Serviced :
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0071e3', marginTop: '4px' }}>
                    {vehicles.find(v => v.id === selectedInvoice.vehicleId)?.licensePlate}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                    {vehicles.find(v => v.id === selectedInvoice.vehicleId)?.make} {vehicles.find(v => v.id === selectedInvoice.vehicleId)?.model}
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1d1d1f', color: '#1d1d1f', fontWeight: 700, textAlign: 'left' }}>
                    <th style={{ padding: '8px 0' }}>Description</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right' }}>Unit Price HT</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>TVA %</th>
                    <th style={{ padding: '8px 0', textAlign: 'right' }}>Total HT</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.lines.map((l, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e5e5ea' }}>
                      <td style={{ padding: '10px 0', fontWeight: 500 }}>{l.description}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'center' }}>{l.quantity}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'right' }}>{l.unitPrice.toFixed(2)} {selectedInvoice.currency}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'center' }}>{l.vatRate}%</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600 }}>{l.totalExclVat.toFixed(2)} {selectedInvoice.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals & Tax Rationale */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '2px solid #e5e5ea', paddingTop: '16px' }}>
                <div style={{ maxWidth: '400px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73' }}>
                    Tax Treatment & Legal Basis:
                  </div>
                  <div style={{ fontSize: '12px', color: '#1d1d1f', marginTop: '2px' }}>
                    {selectedInvoice.taxTreatment}
                  </div>
                  <div style={{ fontSize: '11px', color: '#86868b', marginTop: '8px' }}>
                    IBAN: {activeTenant.taxIdentity.iban || 'FR76 XXXX XXXX'}<br />
                    BIC/SWIFT: {activeTenant.taxIdentity.bic || 'BNPAFRPPXXX'}
                  </div>
                </div>

                <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Subtotal HT:</span>
                    <strong>{selectedInvoice.subtotalExclVat.toFixed(2)} {selectedInvoice.currency}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Total TVA:</span>
                    <strong>{selectedInvoice.totalVat.toFixed(2)} {selectedInvoice.currency}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#1d1d1f', borderTop: '2px solid #1d1d1f', paddingTop: '8px', marginTop: '4px' }}>
                    <span>Total TTC:</span>
                    <span>{selectedInvoice.totalAmount.toFixed(2)} {selectedInvoice.currency}</span>
                  </div>
                </div>
              </div>

              {/* Swiss QR-Bill Section (if CH) */}
              {activeTenant.country === 'CH' && selectedInvoice.qrBillReference && (
                <div style={{ marginTop: '36px', borderTop: '2px dashed #000', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '90px', height: '90px', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={70} />
                    </div>
                    <div style={{ fontSize: '11px' }}>
                      <strong>Swiss QR-Bill Reference (Section paiement)</strong><br />
                      Compte / Zahlbar an: {activeTenant.taxIdentity.iban}<br />
                      Référence: {selectedInvoice.qrBillReference}<br />
                      Payable par: {customers.find(c => c.id === selectedInvoice.customerId)?.firstName} {customers.find(c => c.id === selectedInvoice.customerId)?.lastName}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>Montant / Betrag</div>
                    <div style={{ fontSize: '18px', fontWeight: 800 }}>CHF {selectedInvoice.totalAmount.toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* E-Invoice Inspector Modal */}
      <EInvoiceModal
        invoice={eInvoiceModalInvoice}
        tenant={activeTenant}
        customer={customers.find(c => c.id === eInvoiceModalInvoice?.customerId)}
        onClose={() => setEInvoiceModalInvoice(null)}
        onSubmitted={() => {
          loadData();
        }}
      />
    </div>
  );
};
