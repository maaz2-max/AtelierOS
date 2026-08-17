// ==========================================================================
// AtelierOS - Customer Self-Service Portal & Vehicle Garage View
// Strictly isolated to the logged-in customer's vehicles, quotes, and invoices
// ==========================================================================

import React, { useState } from 'react';
import { 
  Car, 
  Wrench, 
  FileCheck2, 
  Receipt, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Plus, 
  FileText, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { StorageService } from '../services/StorageService';
import { AuthUser, SupportedLanguage, Vehicle, WorkOrder, Quote, Invoice } from '../types';
import { translations } from '../i18n/translations';

interface CustomerPortalViewProps {
  currentUser: AuthUser;
  onNavigate: (view: string, params?: any) => void;
  currentLanguage: SupportedLanguage;
}

export const CustomerPortalView: React.FC<CustomerPortalViewProps> = ({
  currentUser,
  onNavigate,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const customerId = currentUser.customerId || 'cust-fr-01';

  // Load customer-isolated data
  const vehicles = StorageService.getCustomerVehicles(customerId);
  const workOrders = StorageService.getCustomerWorkOrders(customerId);
  const quotes = StorageService.getCustomerQuotes(customerId);
  const invoices = StorageService.getCustomerInvoices(customerId);

  const [activeTab, setActiveTab] = useState<'repairs' | 'quotes' | 'invoices' | 'vehicles'>('repairs');

  const pendingQuotes = quotes.filter(q => q.status === 'PENDING_CUSTOMER_APPROVAL' || q.status === 'SENT_TO_CUSTOMER');
  const activeRepairs = workOrders.filter(wo => wo.status !== 'DELIVERED' && wo.status !== 'INVOICED');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px 80px' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1d1d1f 0%, #2c2c2e 100%)',
        borderRadius: '24px',
        padding: '32px',
        color: '#ffffff',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '32px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.12)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', marginBottom: '12px' }}>
            <ShieldCheck size={14} color="#34c759" />
            <span>Secure Customer Portal • {currentUser.name}</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', margin: '0 0 8px', color: '#fff' }}>
            My Garage &amp; Vehicle Hub
          </h1>
          <p style={{ margin: 0, fontSize: '15px', color: '#a1a1a6', lineHeight: 1.5 }}>
            Track active workshop repairs in real time, review and digitally authorize service quotes, and access certified invoices.
          </p>
        </div>

        <button
          onClick={() => onNavigate('booking-portal')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#0071e3',
            color: '#fff',
            border: 'none',
            borderRadius: '14px',
            padding: '14px 22px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 113, 227, 0.4)',
            transition: 'transform 0.15s ease'
          }}
        >
          <Plus size={18} />
          <span>Book New Service Appointment</span>
        </button>
      </div>

      {/* Overview Metric Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div 
          onClick={() => setActiveTab('repairs')}
          style={{
            background: '#fff',
            borderRadius: '18px',
            padding: '20px',
            border: activeTab === 'repairs' ? '2px solid #0071e3' : '1px solid #e5e5ea',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#86868b' }}>Active Repairs</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eaf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wrench size={16} color="#0071e3" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1d1d1f' }}>{activeRepairs.length}</div>
          <div style={{ fontSize: '12px', color: '#86868b', marginTop: '4px' }}>In progress or scheduled</div>
        </div>

        <div 
          onClick={() => setActiveTab('quotes')}
          style={{
            background: '#fff',
            borderRadius: '18px',
            padding: '20px',
            border: activeTab === 'quotes' ? '2px solid #ff9500' : '1px solid #e5e5ea',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#86868b' }}>Pending Quotes</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fff4e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck2 size={16} color="#ff9500" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1d1d1f' }}>{pendingQuotes.length}</div>
          <div style={{ fontSize: '12px', color: pendingQuotes.length > 0 ? '#ff9500' : '#86868b', marginTop: '4px', fontWeight: pendingQuotes.length > 0 ? '600' : '400' }}>
            {pendingQuotes.length > 0 ? 'Awaiting your approval' : 'All quotes approved'}
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('vehicles')}
          style={{
            background: '#fff',
            borderRadius: '18px',
            padding: '20px',
            border: activeTab === 'vehicles' ? '2px solid #34c759' : '1px solid #e5e5ea',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#86868b' }}>Registered Vehicles</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#edf9f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={16} color="#34c759" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1d1d1f' }}>{vehicles.length}</div>
          <div style={{ fontSize: '12px', color: '#86868b', marginTop: '4px' }}>Linked to your profile</div>
        </div>

        <div 
          onClick={() => setActiveTab('invoices')}
          style={{
            background: '#fff',
            borderRadius: '18px',
            padding: '20px',
            border: activeTab === 'invoices' ? '2px solid #5856d6' : '1px solid #e5e5ea',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#86868b' }}>Invoices &amp; Receipts</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Receipt size={16} color="#5856d6" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1d1d1f' }}>{invoices.length}</div>
          <div style={{ fontSize: '12px', color: '#86868b', marginTop: '4px' }}>Total issued records</div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e5ea', paddingBottom: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('repairs')}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            border: 'none',
            background: activeTab === 'repairs' ? '#1d1d1f' : '#f5f5f7',
            color: activeTab === 'repairs' ? '#fff' : '#1d1d1f',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Active Repairs ({workOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('quotes')}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            border: 'none',
            background: activeTab === 'quotes' ? '#1d1d1f' : '#f5f5f7',
            color: activeTab === 'quotes' ? '#fff' : '#1d1d1f',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Quotations ({quotes.length})
        </button>
        <button
          onClick={() => setActiveTab('vehicles')}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            border: 'none',
            background: activeTab === 'vehicles' ? '#1d1d1f' : '#f5f5f7',
            color: activeTab === 'vehicles' ? '#fff' : '#1d1d1f',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          My Vehicles ({vehicles.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            border: 'none',
            background: activeTab === 'invoices' ? '#1d1d1f' : '#f5f5f7',
            color: activeTab === 'invoices' ? '#fff' : '#1d1d1f',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Invoices &amp; Billing ({invoices.length})
        </button>
      </div>

      {/* Tab 1: Repairs */}
      {activeTab === 'repairs' && (
        <div>
          {workOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '20px', border: '1px solid #e5e5ea' }}>
              <Wrench size={40} color="#86868b" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 6px', color: '#1d1d1f' }}>No active repairs</h3>
              <p style={{ color: '#86868b', fontSize: '14px', margin: '0 0 16px' }}>You have no open repair orders in the workshop.</p>
              <button
                onClick={() => onNavigate('booking-portal')}
                style={{ padding: '10px 20px', background: '#0071e3', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
              >
                Schedule an Appointment
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {workOrders.map(wo => (
                <div 
                  key={wo.id}
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '1px solid #e5e5ea',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#1d1d1f' }}>
                        Order #{wo.orderNumber}
                      </span>
                      <span style={{ 
                        fontSize: '11px', 
                        padding: '3px 8px', 
                        borderRadius: '6px', 
                        fontWeight: '600',
                        background: wo.status === 'IN_PROGRESS' ? '#e1f0ff' : wo.status === 'READY' ? '#eaf8ed' : '#f5f5f7',
                        color: wo.status === 'IN_PROGRESS' ? '#0071e3' : wo.status === 'READY' ? '#248a3d' : '#86868b'
                      }}>
                        {wo.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#1d1d1f', fontWeight: '500', marginBottom: '4px' }}>
                      {wo.complaintDescription || 'General Maintenance & Multipoint Check'}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#86868b' }}>
                      <span>Estimated Duration: {wo.estimatedDurationMinutes} mins</span>
                      <span>Labor: {wo.actualLaborMinutes} mins logged</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onNavigate('tracking-portal', { workOrderId: wo.id })}
                      style={{
                        padding: '10px 18px',
                        background: '#0071e3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Live Repair Tracker</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Quotes */}
      {activeTab === 'quotes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {quotes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '20px', border: '1px solid #e5e5ea' }}>
              <FileCheck2 size={40} color="#86868b" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 6px', color: '#1d1d1f' }}>No quotations yet</h3>
              <p style={{ color: '#86868b', fontSize: '14px', margin: 0 }}>You will receive quotes here after vehicle inspection.</p>
            </div>
          ) : (
            quotes.map(q => (
              <div 
                key={q.id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '24px',
                  border: q.status === 'PENDING_CUSTOMER_APPROVAL' ? '1.5px solid #ff9500' : '1px solid #e5e5ea',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#1d1d1f' }}>
                      Quote #{q.quoteNumber}
                    </span>
                    <span style={{ 
                      fontSize: '11px', 
                      padding: '3px 8px', 
                      borderRadius: '6px', 
                      fontWeight: '600',
                      background: q.status === 'APPROVED_BY_CUSTOMER' ? '#eaf8ed' : '#fff4e5',
                      color: q.status === 'APPROVED_BY_CUSTOMER' ? '#248a3d' : '#ff9500'
                    }}>
                      {q.status === 'APPROVED_BY_CUSTOMER' ? '✓ Approved' : '⏳ Action Required: Review & Sign'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#86868b', marginBottom: '8px' }}>
                    Valid until: {q.validUntil} • Created: {q.createdAt}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#1d1d1f' }}>
                    {q.totalAmount.toFixed(2)} {q.currency}
                    <span style={{ fontSize: '13px', fontWeight: '400', color: '#86868b', marginLeft: '6px' }}>
                      (incl. {q.totalVat.toFixed(2)} {q.currency} VAT)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => onNavigate('approval-portal', { token: q.magicToken })}
                    style={{
                      padding: '12px 20px',
                      background: q.status === 'APPROVED_BY_CUSTOMER' ? '#f5f5f7' : '#ff9500',
                      color: q.status === 'APPROVED_BY_CUSTOMER' ? '#1d1d1f' : '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: q.status === 'APPROVED_BY_CUSTOMER' ? 'none' : '0 4px 12px rgba(255, 149, 0, 0.3)'
                    }}
                  >
                    <span>{q.status === 'APPROVED_BY_CUSTOMER' ? 'View Signed Quote' : 'Review & Approve Quote'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Vehicles */}
      {activeTab === 'vehicles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {vehicles.map(v => (
            <div
              key={v.id}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #e5e5ea',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Car size={22} color="#0071e3" />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px', fontSize: '17px', fontWeight: '700', color: '#1d1d1f' }}>
                    {v.make} {v.model}
                  </h4>
                  <span style={{ fontSize: '13px', color: '#86868b' }}>{v.year} • {v.fuelType}</span>
                </div>
              </div>

              <div style={{
                background: '#f9f9fb',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '12px', color: '#86868b', fontWeight: '500' }}>License Plate</span>
                <span style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '14px', 
                  fontWeight: '700', 
                  background: '#fff', 
                  padding: '3px 8px', 
                  borderRadius: '6px',
                  border: '1px solid #d2d2d7'
                }}>
                  {v.licensePlate}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#86868b', marginBottom: '16px' }}>
                <span>Mileage: {v.mileageKm?.toLocaleString() || 'N/A'} km</span>
                <span>VIN: ...{v.vin?.slice(-6) || ''}</span>
              </div>

              <button
                onClick={() => onNavigate('booking-portal')}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#f5f5f7',
                  color: '#0071e3',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Schedule Service for this Vehicle
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Invoices */}
      {activeTab === 'invoices' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {invoices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '20px', border: '1px solid #e5e5ea' }}>
              <Receipt size={40} color="#86868b" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 6px', color: '#1d1d1f' }}>No invoices issued yet</h3>
              <p style={{ color: '#86868b', fontSize: '14px', margin: 0 }}>Invoices will appear here once service is completed.</p>
            </div>
          ) : (
            invoices.map(inv => (
              <div 
                key={inv.id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid #e5e5ea',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#1d1d1f' }}>
                      Invoice #{inv.invoiceNumber}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      background: inv.paid ? '#eaf8ed' : '#ffebeb',
                      color: inv.paid ? '#248a3d' : '#d9383a'
                    }}>
                      {inv.paid ? '✓ Paid' : 'Pending Payment'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#86868b', marginBottom: '6px' }}>
                    Date: {inv.issueDate} • Treatment: {inv.taxTreatment}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#1d1d1f' }}>
                    {inv.totalAmount.toFixed(2)} {inv.currency}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => onNavigate('invoices')}
                    style={{
                      padding: '10px 18px',
                      background: '#f5f5f7',
                      color: '#1d1d1f',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FileText size={15} />
                    <span>View Official Receipt</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
