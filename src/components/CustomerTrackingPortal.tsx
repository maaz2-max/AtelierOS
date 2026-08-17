// ==========================================================================
// AtelierOS - Customer Live Repair Status Tracking Portal
// Live 6-Stage Telemetry, OBD-II Diagnostics & Interactive Demo Selector
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  Search, 
  User, 
  FileText,
  Phone,
  ArrowRight,
  AlertCircle,
  Activity,
  Check
} from 'lucide-react';
import { WorkOrder, Tenant, Customer, Vehicle, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { translations } from '../i18n/translations';

interface CustomerTrackingPortalProps {
  workOrderId?: string;
  activeTenant?: Tenant;
  currentLanguage: SupportedLanguage;
}

export const CustomerTrackingPortal: React.FC<CustomerTrackingPortalProps> = ({
  workOrderId,
  activeTenant,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  
  const [plateQuery, setPlateQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<WorkOrder | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(activeTenant || null);
  const [notFound, setNotFound] = useState(false);

  // Load all available work orders for interactive demo quick switching
  const allOrders = StorageService.getAllWorkOrders();

  const selectOrder = (order: WorkOrder) => {
    setActiveOrder(order);
    setNotFound(false);

    const allVehicles = StorageService.getAllVehicles();
    const allCustomers = StorageService.getAllCustomers();
    const allTenants = StorageService.getTenants();

    const veh = allVehicles.find(v => v.id === order.vehicleId) || allVehicles[0];
    const cust = allCustomers.find(c => c.id === order.customerId) || allCustomers[0];
    const ten = allTenants.find(t => t.id === order.tenantId) || allTenants[0];

    setVehicle(veh || null);
    setCustomer(cust || null);
    setTenant(ten || null);
    if (veh) setPlateQuery(veh.licensePlate);
  };

  useEffect(() => {
    if (workOrderId) {
      const found = allOrders.find(o => o.id === workOrderId);
      if (found) {
        selectOrder(found);
        return;
      }
    }
    // Default to first open order if none specified
    if (allOrders.length > 0) {
      selectOrder(allOrders[0]);
    }
  }, [workOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const q = plateQuery.trim().toUpperCase();

    const allVehicles = StorageService.getAllVehicles();
    const matchedVeh = allVehicles.find(v => v.licensePlate.toUpperCase().replace(/\s+/g, '') === q.replace(/\s+/g, ''));
    
    if (matchedVeh) {
      const order = allOrders.find(w => w.vehicleId === matchedVeh.id);
      if (order) {
        selectOrder(order);
        return;
      }
    }

    // Try searching by order number
    const matchedOrder = allOrders.find(o => o.orderNumber.toUpperCase().includes(q));
    if (matchedOrder) {
      selectOrder(matchedOrder);
      return;
    }

    setNotFound(true);
  };

  const STAGES_PROGRESS = [
    { key: 'REQUEST', label: '1. Request Received', desc: 'Appointment booked and vehicle checked in' },
    { key: 'DIAGNOSIS', label: '2. OBD-II Inspection', desc: 'Multipoint safety check & electronic diagnostics' },
    { key: 'QUOTE', label: '3. Quote Approved', desc: 'Digitally authorized by customer' },
    { key: 'IN_PROGRESS', label: '4. Active Bay Repair', desc: 'Mechanic active on lift with replacement parts' },
    { key: 'QUALITY_CHECK', label: '5. Quality & Road Test', desc: 'Final torque specs and road safety verification' },
    { key: 'READY', label: '6. Ready for Collection', desc: 'Vehicle washed, keys and invoice ready' }
  ];

  const getStageIndex = (stage: string) => {
    if (stage === 'REQUEST' || stage === 'APPOINTMENT') return 0;
    if (stage === 'DIAGNOSIS') return 1;
    if (stage === 'QUOTE' || stage === 'AWAITING_APPROVAL' || stage === 'APPROVED') return 2;
    if (stage === 'IN_PROGRESS') return 3;
    if (stage === 'QUALITY_CHECK') return 4;
    return 5;
  };

  const currentProgressIndex = activeOrder ? getStageIndex(activeOrder.stage) : 3;

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '36px 20px 80px' }}>
      {/* Header Banner */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#eaf4ff',
          color: '#0071e3',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '700',
          marginBottom: '12px'
        }}>
          <Activity size={14} />
          <span>Live Vehicle Status Telemetry</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em', margin: '0 0 8px', color: '#1d1d1f' }}>
          Real-Time Repair Tracking Portal
        </h1>
        <p style={{ fontSize: '15px', color: '#6e6e73', margin: '0 0 24px', maxWidth: '600px', marginInline: 'auto' }}>
          Search your vehicle license plate or select a sample live repair order to track workshop progress in real time.
        </p>

        {/* 1-Click Interactive Demo Selector Strip */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#86868b', display: 'block', marginBottom: '8px' }}>
            Quick Demo Orders (Click to Track Live):
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {allOrders.slice(0, 4).map(o => (
              <button
                key={o.id}
                onClick={() => selectOrder(o)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: activeOrder?.id === o.id ? '2px solid #0071e3' : '1px solid #e5e5ea',
                  background: activeOrder?.id === o.id ? '#f0f7ff' : '#fbfbfd',
                  color: activeOrder?.id === o.id ? '#0071e3' : '#1d1d1f',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>#{o.orderNumber}</span>
                <span style={{ 
                  fontSize: '10px', 
                  padding: '1px 5px', 
                  borderRadius: '4px', 
                  background: o.status === 'IN_PROGRESS' ? '#0071e3' : o.status === 'READY' ? '#34c759' : '#86868b',
                  color: '#fff'
                }}>
                  {o.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', maxWidth: '520px', margin: '0 auto' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              value={plateQuery}
              onChange={e => setPlateQuery(e.target.value)}
              placeholder="Enter License Plate (e.g. AB-123-CD or GE 452 891)..."
              style={{
                width: '100%',
                padding: '14px 16px 14px 42px',
                fontSize: '15px',
                borderRadius: '14px',
                border: '1.5px solid #d2d2d7',
                background: '#fbfbfd',
                boxSizing: 'border-box',
                outline: 'none',
                fontWeight: '600',
                letterSpacing: '0.02em'
              }}
            />
            <Search size={18} color="#86868b" style={{ position: 'absolute', left: '14px', top: '16px' }} />
          </div>
          <button
            type="submit"
            style={{
              padding: '14px 22px',
              background: '#0071e3',
              color: '#fff',
              border: 'none',
              borderRadius: '14px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 113, 227, 0.3)'
            }}
          >
            Track Status
          </button>
        </form>

        {notFound && (
          <div style={{ marginTop: '16px', color: '#d9383a', fontSize: '13px', fontWeight: '500' }}>
            No active repair order found for "{plateQuery}". Try selecting one of the demo orders above.
          </div>
        )}
      </div>

      {/* Active Order Details */}
      {activeOrder && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Vehicle & Garage Summary Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '16px', 
                  fontWeight: '800', 
                  background: '#f5f5f7', 
                  padding: '4px 10px', 
                  borderRadius: '8px', 
                  border: '1px solid #d2d2d7' 
                }}>
                  {vehicle?.licensePlate || 'AB-123-CD'}
                </span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#1d1d1f' }}>
                  {vehicle?.make} {vehicle?.model} ({vehicle?.year})
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#6e6e73' }}>
                Customer: <strong style={{ color: '#1d1d1f' }}>{customer?.firstName} {customer?.lastName}</strong> • Garage: <strong style={{ color: '#1d1d1f' }}>{tenant?.name}</strong>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#86868b', textTransform: 'uppercase', fontWeight: '700' }}>Estimated Completion</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0071e3' }}>Today, 17:30</div>
            </div>
          </div>

          {/* 6-Stage Animated Progress Pipeline */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 24px', color: '#1d1d1f' }}>
              Workshop Progress Milestones
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {STAGES_PROGRESS.map((stg, idx) => {
                const isPassed = idx <= currentProgressIndex;
                const isCurrent = idx === currentProgressIndex;

                return (
                  <div 
                    key={stg.key}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      padding: '14px 16px',
                      borderRadius: '16px',
                      background: isCurrent ? '#f0f7ff' : isPassed ? '#f9f9fb' : '#ffffff',
                      border: isCurrent ? '1.5px solid #0071e3' : '1px solid #e5e5ea'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isPassed ? '#34c759' : '#e5e5ea',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontWeight: '700',
                      fontSize: '12px'
                    }}>
                      {isPassed ? <Check size={14} color="#fff" /> : idx + 1}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '15px', fontWeight: isCurrent ? '800' : '600', color: isPassed ? '#1d1d1f' : '#86868b' }}>
                          {stg.label}
                        </span>
                        {isCurrent && (
                          <span style={{ 
                            fontSize: '10px', 
                            background: '#0071e3', 
                            color: '#fff', 
                            padding: '2px 8px', 
                            borderRadius: '10px', 
                            fontWeight: '700' 
                          }}>
                            IN PROGRESS NOW
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>
                        {stg.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Notes & Replaced Parts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
            }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 12px', color: '#1d1d1f' }}>
                Technician Inspection Notes
              </h4>
              <p style={{ fontSize: '14px', color: '#515154', lineHeight: 1.5, margin: 0 }}>
                {activeOrder.diagnosisNotes || "Multipoint safety check completed. Front brake pads at 2mm thickness. Fluid levels topped up to manufacturer specifications."}
              </p>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
            }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 12px', color: '#1d1d1f' }}>
                Garage Hotline
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Phone size={16} color="#0071e3" />
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1d1d1f' }}>{tenant?.phone || "+33 1 42 68 55 00"}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                {tenant?.address?.street}, {tenant?.address?.city}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
