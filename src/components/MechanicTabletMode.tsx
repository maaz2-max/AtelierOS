// ==========================================================================
// AtelierOS - Tablet-First Mechanic Bay Station Mode (iPad Optimized)
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  Tablet, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Camera, 
  Wrench, 
  Clock, 
  Plus, 
  Trash2, 
  Car, 
  User, 
  Cpu, 
  ShieldCheck, 
  Save,
  Check
} from 'lucide-react';
import { WorkOrder, Tenant, Mechanic, Customer, Vehicle, QualityCheckItem, OBDErrorRecord, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { translations } from '../i18n/translations';

interface MechanicTabletModeProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
  activeWorkOrderId?: string;
  onWorkOrderFinished?: () => void;
}

const COMMON_OBD_DATABASE: Record<string, { desc: string; check: string }> = {
  P0300: { desc: 'Random/Multiple Cylinder Misfire Detected', check: 'Test ignition coils, spark plugs, and injector pulse signals.' },
  P0420: { desc: 'Catalyst System Efficiency Below Threshold (Bank 1)', check: 'Inspect downstream O2 sensor output and catalytic converter integrity.' },
  P0171: { desc: 'System Too Lean (Bank 1)', check: 'Check MAF sensor, intake vacuum leaks, and fuel pump pressure.' },
  C0035: { desc: 'Left Front Wheel Speed Sensor Circuit', check: 'Inspect ABS reluctor ring, wiring harness, and sensor resistance.' },
  P0A80: { desc: 'Replace Hybrid / EV Battery Pack', check: 'Check individual cell module voltages, cooling fan, and contactor relays.' }
};

export const MechanicTabletMode: React.FC<MechanicTabletModeProps> = ({
  activeTenant,
  currentLanguage,
  activeWorkOrderId,
  onWorkOrderFinished
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const tm = t.mechanicTablet;

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(activeWorkOrderId || '');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);

  // Current Working State
  const [currentOrder, setCurrentOrder] = useState<WorkOrder | null>(null);
  const [newObdCode, setNewObdCode] = useState('');
  const [newPartName, setNewPartName] = useState('');
  const [newPartQty, setNewPartQty] = useState(1);
  const [newPartPrice, setNewPartPrice] = useState(45.0);
  const [successToast, setSuccessToast] = useState(false);

  const loadData = () => {
    const orders = StorageService.getWorkOrders(activeTenant.id);
    setWorkOrders(orders);
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setMechanics(StorageService.getMechanics(activeTenant.id));

    if (orders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(orders[0].id);
      setCurrentOrder(orders[0]);
    } else if (selectedOrderId) {
      const match = orders.find(o => o.id === selectedOrderId);
      if (match) setCurrentOrder(match);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  useEffect(() => {
    if (selectedOrderId) {
      const match = workOrders.find(o => o.id === selectedOrderId);
      if (match) setCurrentOrder(match);
    }
  }, [selectedOrderId, workOrders]);

  const saveCurrentOrder = (updated: WorkOrder) => {
    const all = StorageService.getAllWorkOrders();
    const index = all.findIndex(w => w.id === updated.id);
    if (index !== -1) {
      all[index] = { ...updated, updatedAt: new Date().toISOString() };
      StorageService.saveWorkOrders(all);
      setCurrentOrder(updated);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 2000);
    }
  };

  const toggleChecklist = (checkId: string, status: 'PASS' | 'FAIL' | 'NOT_APPLICABLE') => {
    if (!currentOrder) return;
    const updatedChecklist = currentOrder.checklist.map(item => 
      item.id === checkId ? { ...item, status } : item
    );
    saveCurrentOrder({ ...currentOrder, checklist: updatedChecklist });
  };

  const handleAddObdCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder || !newObdCode.trim()) return;

    const codeUpper = newObdCode.trim().toUpperCase();
    const known = COMMON_OBD_DATABASE[codeUpper] || {
      desc: 'Vehicle Diagnostic Trouble Code',
      check: 'Perform pinpoint electrical and mechanical component testing.'
    };

    const newEntry: OBDErrorRecord = {
      code: codeUpper,
      description: known.desc,
      severity: 'WARNING',
      suggestedCheck: known.check,
      verifiedByTech: true
    };

    const updated = {
      ...currentOrder,
      obdCodes: [...currentOrder.obdCodes, newEntry]
    };
    saveCurrentOrder(updated);
    setNewObdCode('');
  };

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder || !newPartName.trim()) return;

    const newPart = {
      partId: `p-${Date.now()}`,
      name: newPartName.trim(),
      quantity: newPartQty,
      unitPrice: newPartPrice,
      total: newPartQty * newPartPrice
    };

    const updated = {
      ...currentOrder,
      partsUsed: [...currentOrder.partsUsed, newPart]
    };
    saveCurrentOrder(updated);
    setNewPartName('');
    setNewPartQty(1);
    setNewPartPrice(45.0);
  };

  const handleAddLaborMinutes = (mins: number) => {
    if (!currentOrder) return;
    const updated = {
      ...currentOrder,
      laborTimeRecordedMin: (currentOrder.laborTimeRecordedMin || 0) + mins
    };
    saveCurrentOrder(updated);
  };

  const handleQualitySignOff = () => {
    if (!currentOrder) return;
    const updated: WorkOrder = {
      ...currentOrder,
      stage: 'READY',
      updatedAt: new Date().toISOString()
    };
    saveCurrentOrder(updated);
    if (onWorkOrderFinished) onWorkOrderFinished();
  };

  const customer = customers.find(c => c.id === currentOrder?.customerId);
  const vehicle = vehicles.find(v => v.id === currentOrder?.vehicleId);
  const mechanic = mechanics.find(m => m.id === currentOrder?.mechanicId);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px' }}>
      {/* Tablet Top Station Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '20px',
        border: '1px solid #e5e5ea',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0071e3 0%, #30d158 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Tablet size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f' }}>{tm.title}</h1>
            <span style={{ fontSize: '12px', color: '#6e6e73' }}>
              Station Active: <strong>{activeTenant.name}</strong> • Touch-Optimized
            </span>
          </div>
        </div>

        {/* Work Order Switcher Dropdown for Tablet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#6e6e73' }}>Active Vehicle:</label>
          <select
            value={selectedOrderId}
            onChange={e => setSelectedOrderId(e.target.value)}
            style={{
              padding: '10px 16px',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '12px',
              border: '2px solid #0071e3',
              background: '#ffffff',
              cursor: 'pointer'
            }}
          >
            {workOrders.map(wo => {
              const v = vehicles.find(veh => veh.id === wo.vehicleId);
              return (
                <option key={wo.id} value={wo.id}>
                  {wo.orderNumber} - {v?.make} {v?.model} ({v?.licensePlate}) [{wo.stage}]
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {successToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#30d158',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(48, 209, 88, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 9999
        }}>
          <Check size={18} />
          <span>Work Order Updated</span>
        </div>
      )}

      {currentOrder && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {/* Left Column: Vehicle Banner, Symptoms & Diagnostics Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Vehicle Profile Card */}
            <div className="apple-card" style={{ padding: '24px', borderLeft: '6px solid #0071e3' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span className="apple-badge apple-badge-blue" style={{ marginBottom: '6px' }}>
                    {currentOrder.orderNumber}
                  </span>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1d1d1f' }}>
                    {vehicle?.make} {vehicle?.model} ({vehicle?.year})
                  </h2>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#0071e3', letterSpacing: '0.05em', marginTop: '4px' }}>
                    {vehicle?.licensePlate}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="apple-badge apple-badge-green" style={{ fontSize: '13px', padding: '6px 12px' }}>
                    {currentOrder.stage}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#6e6e73', background: '#f5f5f7', padding: '14px', borderRadius: '12px' }}>
                <div><strong>VIN:</strong> {vehicle?.vin}</div>
                <div><strong>Fuel:</strong> {vehicle?.fuelType}</div>
                <div><strong>Odometer:</strong> {vehicle?.mileage?.toLocaleString()} km</div>
                <div><strong>Customer:</strong> {customer?.firstName} {customer?.lastName}</div>
              </div>

              {currentOrder.symptoms.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#86868b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Client Reported Symptoms:
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #e5e5ea', padding: '12px', borderRadius: '10px', fontSize: '14px', color: '#1d1d1f' }}>
                    {currentOrder.symptoms.join(', ')}
                  </div>
                </div>
              )}
            </div>

            {/* Diagnostic Findings & Notes */}
            <div className="apple-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Wrench size={20} color="#0071e3" />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Technician Diagnostic Notes</h3>
              </div>
              <textarea
                value={currentOrder.diagnosisNotes}
                onChange={e => setCurrentOrder({ ...currentOrder, diagnosisNotes: e.target.value })}
                onBlur={() => saveCurrentOrder(currentOrder)}
                placeholder="Type your physical inspection findings, measurements (e.g. pad thickness mm, tire tread depth, battery SOH)..."
                rows={4}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea', fontSize: '15px' }}
              />
            </div>

            {/* OBD-II Diagnostic Error Scanner */}
            <div className="apple-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Cpu size={20} color="#ff453a" />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tm.obdScannerTitle}</h3>
              </div>

              <form onSubmit={handleAddObdCode} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                  type="text"
                  value={newObdCode}
                  onChange={e => setNewObdCode(e.target.value)}
                  placeholder={tm.obdCodePlaceholder}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                />
                <button type="submit" className="apple-btn-primary" style={{ padding: '10px 18px' }}>
                  {tm.addCode}
                </button>
              </form>

              {/* Logged Codes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentOrder.obdCodes.map((code, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 69, 58, 0.08)', border: '1px solid rgba(255, 69, 58, 0.2)', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '15px', color: '#ff453a' }}>{code.code}</span>
                      <span className="apple-badge apple-badge-red" style={{ fontSize: '10px' }}>VERIFIED</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#1d1d1f', marginTop: '2px' }}>{code.description}</div>
                    <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
                      <strong>Action:</strong> {code.suggestedCheck}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Multipoint Checklist, Labor Tracker, Parts, and Quality Sign-off */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Multipoint Safety Checklist */}
            <div className="apple-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <ShieldCheck size={20} color="#30d158" />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tm.checklistTitle}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentOrder.checklist.map(item => (
                  <div 
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f9f9fb',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid #e5e5ea'
                    }}
                  >
                    <div style={{ flex: 1, paddingRight: '12px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{item.title}</div>
                      {item.notes && <div style={{ fontSize: '11px', color: '#86868b' }}>{item.notes}</div>}
                    </div>

                    {/* Touch Segmented Button for PASS / FAIL / N/A */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => toggleChecklist(item.id, 'PASS')}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          background: item.status === 'PASS' ? '#30d158' : 'rgba(0,0,0,0.06)',
                          color: item.status === 'PASS' ? '#ffffff' : '#6e6e73'
                        }}
                      >
                        PASS
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleChecklist(item.id, 'FAIL')}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          background: item.status === 'FAIL' ? '#ff453a' : 'rgba(0,0,0,0.06)',
                          color: item.status === 'FAIL' ? '#ffffff' : '#6e6e73'
                        }}
                      >
                        FAIL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labor Time & Parts Logger */}
            <div className="apple-card" style={{ padding: '24px' }}>
              {/* Labor Tracker */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} color="#0071e3" />
                    <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{tm.recordLaborTime}</h3>
                  </div>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#0071e3' }}>
                    {currentOrder.laborTimeRecordedMin || 0} min
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => handleAddLaborMinutes(mins)}
                      className="apple-btn-secondary"
                      style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 700 }}
                    >
                      +{mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Parts Tracker */}
              <div style={{ borderTop: '1px solid #e5e5ea', paddingTop: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>{tm.partsTrackerTitle}</h3>
                
                <form onSubmit={handleAddPart} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  <input 
                    type="text" 
                    value={newPartName}
                    onChange={e => setNewPartName(e.target.value)}
                    placeholder="Part description (e.g. Total Quartz 5W30, Purflux Filter)..."
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="number" 
                      min={1} 
                      value={newPartQty} 
                      onChange={e => setNewPartQty(Number(e.target.value))}
                      placeholder="Qty"
                      style={{ width: '80px', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                    />
                    <input 
                      type="number" 
                      step="0.01" 
                      value={newPartPrice} 
                      onChange={e => setNewPartPrice(Number(e.target.value))}
                      placeholder="Unit Price"
                      style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                    />
                    <button type="submit" className="apple-btn-primary" style={{ padding: '8px 16px' }}>
                      {tm.addPart}
                    </button>
                  </div>
                </form>

                {/* Used Parts List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {currentOrder.partsUsed.map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', background: '#f5f5f7', padding: '8px 12px', borderRadius: '8px' }}>
                      <span>{p.quantity}x {p.name}</span>
                      <span style={{ fontWeight: 700 }}>{p.total.toFixed(2)} {activeTenant.currency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Pass & Ready Sign-off Button (Huge Touch Target) */}
            <button
              onClick={handleQualitySignOff}
              className="apple-btn-primary tablet-touch-btn"
              style={{
                background: 'linear-gradient(135deg, #30d158 0%, #248a3d 100%)',
                boxShadow: '0 8px 24px rgba(48, 209, 88, 0.35)',
                fontSize: '17px'
              }}
            >
              <CheckCircle2 size={22} />
              <span>{tm.signOffQuality}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
