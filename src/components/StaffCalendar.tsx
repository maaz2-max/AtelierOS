// ==========================================================================
// AtelierOS - Workshop Staff Calendar & Central Scheduling Agenda
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Wrench, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Car, 
  Filter,
  Layers
} from 'lucide-react';
import { Appointment, Tenant, Mechanic, WorkshopBay, Customer, Vehicle, ServiceItem, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { SchedulingService, AvailableSlot } from '../services/SchedulingService';
import { translations } from '../i18n/translations';

interface StaffCalendarProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
  onSelectWorkOrder?: (workOrderId: string) => void;
}

export const StaffCalendar: React.FC<StaffCalendarProps> = ({
  activeTenant,
  currentLanguage,
  onSelectWorkOrder
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const tc = t.calendar;

  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'DAY' | 'WEEK' | 'BAY'>('DAY');
  const [selectedMechanicFilter, setSelectedMechanicFilter] = useState<string>('ALL');
  const [selectedBayFilter, setSelectedBayFilter] = useState<string>('ALL');
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [bays, setBays] = useState<WorkshopBay[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  // Modal State for New Appointment
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formCustomerId, setFormCustomerId] = useState('');
  const [formVehicleId, setFormVehicleId] = useState('');
  const [formServiceId, setFormServiceId] = useState('');
  const [formMechanicId, setFormMechanicId] = useState('');
  const [formBayId, setFormBayId] = useState('');
  const [formDate, setFormDate] = useState(currentDate);
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formEndTime, setFormEndTime] = useState('10:00');
  const [formNotes, setFormNotes] = useState('');

  const [conflictError, setConflictError] = useState<string | null>(null);
  const [suggestedSlots, setSuggestedSlots] = useState<AvailableSlot[]>([]);

  const loadData = () => {
    setAppointments(StorageService.getAppointments(activeTenant.id));
    setMechanics(StorageService.getMechanics(activeTenant.id));
    setBays(StorageService.getBays(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setServices(StorageService.getServices(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  // Filter appointments for active date and filters
  const filteredAppointments = appointments.filter(app => {
    if (app.date !== currentDate) return false;
    if (selectedMechanicFilter !== 'ALL' && app.mechanicId !== selectedMechanicFilter) return false;
    if (selectedBayFilter !== 'ALL' && app.bayId !== selectedBayFilter) return false;
    return true;
  });

  // Handle service selection auto duration
  const handleServiceChange = (srvId: string) => {
    setFormServiceId(srvId);
    const s = services.find(item => item.id === srvId);
    if (s) {
      const startMins = SchedulingService.timeToMinutes(formStartTime);
      const endMins = startMins + s.estimatedDurationMin;
      setFormEndTime(SchedulingService.minutesToTime(endMins));

      // Check available alternative slots automatically
      const alt = SchedulingService.getAvailableSlots(activeTenant.id, srvId, formDate);
      setSuggestedSlots(alt.slice(0, 3));
    }
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    // Validate conflict using Central Scheduling Engine
    const conflict = SchedulingService.checkConflict({
      tenantId: activeTenant.id,
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      mechanicId: formMechanicId,
      bayId: formBayId
    });

    if (conflict.hasConflict) {
      setConflictError(conflict.reason || tc.conflictWarning);
      const alt = SchedulingService.getAvailableSlots(activeTenant.id, formServiceId, formDate);
      setSuggestedSlots(alt.slice(0, 3));
      return;
    }

    // Confirm Appointment
    SchedulingService.confirmAppointment({
      tenantId: activeTenant.id,
      customerId: formCustomerId,
      vehicleId: formVehicleId,
      serviceId: formServiceId,
      mechanicId: formMechanicId,
      bayId: formBayId,
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      source: 'STAFF',
      intakeNotes: formNotes
    });

    loadData();
    setIsModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Controls */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{tc.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{tc.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Date Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ffffff', border: '1px solid #e5e5ea', borderRadius: '9999px', padding: '4px 10px' }}>
            <button 
              onClick={() => {
                const prev = new Date(new Date(currentDate).getTime() - 86400000).toISOString().split('T')[0];
                setCurrentDate(prev);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <ChevronLeft size={16} />
            </button>
            <input 
              type="date" 
              value={currentDate} 
              onChange={e => setCurrentDate(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
            />
            <button 
              onClick={() => {
                const next = new Date(new Date(currentDate).getTime() + 86400000).toISOString().split('T')[0];
                setCurrentDate(next);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Filters */}
          <select 
            value={selectedMechanicFilter} 
            onChange={e => setSelectedMechanicFilter(e.target.value)}
            className="apple-card"
            style={{ padding: '8px 12px', fontSize: '13px', borderRadius: '9999px', border: '1px solid #e5e5ea', cursor: 'pointer' }}
          >
            <option value="ALL">{tc.filterMechanic}</option>
            {mechanics.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <select 
            value={selectedBayFilter} 
            onChange={e => setSelectedBayFilter(e.target.value)}
            className="apple-card"
            style={{ padding: '8px 12px', fontSize: '13px', borderRadius: '9999px', border: '1px solid #e5e5ea', cursor: 'pointer' }}
          >
            <option value="ALL">{tc.filterBay}</option>
            {bays.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <button 
            onClick={() => {
              setFormDate(currentDate);
              setFormCustomerId(customers[0]?.id || '');
              setFormVehicleId(vehicles[0]?.id || '');
              setFormServiceId(services[0]?.id || '');
              setFormMechanicId(mechanics[0]?.id || '');
              setFormBayId(bays[0]?.id || '');
              setConflictError(null);
              setIsModalOpen(true);
            }}
            className="apple-btn-primary"
          >
            <Plus size={16} />
            <span>{tc.newAppointment}</span>
          </button>
        </div>
      </div>

      {/* Main Agenda Grid */}
      <div className="apple-card" style={{ padding: '24px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e5e5ea', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarIcon size={18} color="#0071e3" />
            <span style={{ fontWeight: 600, fontSize: '16px' }}>
              Schedule for {new Date(currentDate).toLocaleDateString(currentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <span className="apple-badge apple-badge-blue">
            {filteredAppointments.length} Appointments Booked
          </span>
        </div>

        {filteredAppointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#86868b' }}>
            <CalendarIcon size={48} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: '16px', fontWeight: 500 }}>{tc.noAppointments}</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="apple-btn-secondary" 
              style={{ marginTop: '16px' }}
            >
              <Plus size={14} />
              <span>Schedule First Appointment</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
            {filteredAppointments.map(app => {
              const customer = customers.find(c => c.id === app.customerId);
              const vehicle = vehicles.find(v => v.id === app.vehicleId);
              const service = services.find(s => s.id === app.serviceId);
              const mechanic = mechanics.find(m => m.id === app.mechanicId);
              const bay = bays.find(b => b.id === app.bayId);

              return (
                <div 
                  key={app.id} 
                  className="apple-card"
                  style={{
                    padding: '18px',
                    border: '1px solid #e5e5ea',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    borderLeft: '4px solid #0071e3'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '15px', color: '#0071e3' }}>
                      <Clock size={15} />
                      <span>{app.startTime} - {app.endTime}</span>
                    </div>
                    <span className="apple-badge apple-badge-green" style={{ fontSize: '11px' }}>
                      {app.status}
                    </span>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f', marginBottom: '2px' }}>
                      {service?.name || 'Automotive Inspection'}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#6e6e73' }}>
                      Ref: <strong>{app.confirmationCode}</strong> • Source: {app.source}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', background: '#f5f5f7', padding: '10px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} color="#6e6e73" />
                      <span style={{ fontWeight: 500 }}>{customer?.firstName} {customer?.lastName} ({customer?.phone})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Car size={14} color="#6e6e73" />
                      <span>{vehicle?.make} {vehicle?.model} • <span style={{ fontWeight: 600 }}>{vehicle?.licensePlate}</span></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Wrench size={14} color="#6e6e73" />
                      <span>Mech: <strong>{mechanic?.name}</strong> | {bay?.name}</span>
                    </div>
                  </div>

                  {app.intakeNotes && (
                    <p style={{ fontSize: '12px', color: '#6e6e73', fontStyle: 'italic' }}>
                      "{app.intakeNotes}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {isModalOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-lg" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '560px' }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
              {tc.newAppointment}
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Central Scheduling Engine ensures zero mechanic and bay double bookings.
            </p>

            {conflictError && (
              <div style={{
                background: 'rgba(255, 69, 58, 0.12)',
                border: '1px solid rgba(255, 69, 58, 0.3)',
                padding: '14px',
                borderRadius: '12px',
                marginBottom: '16px',
                display: 'flex',
                gap: '10px'
              }}>
                <AlertTriangle size={20} color="#ff453a" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#ff453a' }}>{conflictError}</div>
                  {suggestedSlots.length > 0 && (
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#1d1d1f' }}>
                      <strong>{tc.suggestAlternatives}</strong>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                        {suggestedSlots.map((slot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormStartTime(slot.startTime);
                              setFormEndTime(slot.endTime);
                              setFormMechanicId(slot.mechanicId);
                              setFormBayId(slot.bayId);
                              setConflictError(null);
                            }}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #0071e3',
                              color: '#0071e3',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '11px'
                            }}
                          >
                            {slot.startTime} - {slot.endTime} ({slot.mechanicName})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleCreateAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Customer */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Customer
                </label>
                <select 
                  value={formCustomerId} 
                  onChange={e => setFormCustomerId(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.phone})</option>
                  ))}
                </select>
              </div>

              {/* Vehicle */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Vehicle
                </label>
                <select 
                  value={formVehicleId} 
                  onChange={e => setFormVehicleId(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.make} {v.model} ({v.licensePlate})</option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Service Catalog Item
                </label>
                <select 
                  value={formServiceId} 
                  onChange={e => handleServiceChange(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.estimatedDurationMin} min)</option>
                  ))}
                </select>
              </div>

              {/* Date & Times */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Date
                  </label>
                  <input 
                    type="date" 
                    value={formDate} 
                    onChange={e => setFormDate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Start Time
                  </label>
                  <input 
                    type="time" 
                    value={formStartTime} 
                    onChange={e => setFormStartTime(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    End Time
                  </label>
                  <input 
                    type="time" 
                    value={formEndTime} 
                    onChange={e => setFormEndTime(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              {/* Mechanic & Bay */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Assigned Mechanic
                  </label>
                  <select 
                    value={formMechanicId} 
                    onChange={e => setFormMechanicId(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  >
                    {mechanics.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Assigned Bay/Lift
                  </label>
                  <select 
                    value={formBayId} 
                    onChange={e => setFormBayId(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  >
                    {bays.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Intake Notes
                </label>
                <textarea 
                  value={formNotes} 
                  onChange={e => setFormNotes(e.target.value)}
                  placeholder="Customer remarks or specific diagnosis request..."
                  rows={2}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="apple-btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="apple-btn-primary"
                >
                  Confirm & Reserve Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
