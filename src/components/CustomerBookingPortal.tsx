// ==========================================================================
// AtelierOS - Public Customer Online Web Booking Portal
// Powered by ONE Central Scheduling Engine (No WhatsApp Required)
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Calendar as CalendarIcon, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Wrench, 
  Phone, 
  Mail, 
  User, 
  AlertCircle,
  Timer
} from 'lucide-react';
import { Tenant, ServiceItem, Vehicle, Customer, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { SchedulingService, AvailableSlot } from '../services/SchedulingService';
import { CommunicationService } from '../services/CommunicationService';
import { translations } from '../i18n/translations';

interface CustomerBookingPortalProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
  onBookingCompleted?: (refCode: string) => void;
}

export const CustomerBookingPortal: React.FC<CustomerBookingPortalProps> = ({
  activeTenant,
  currentLanguage,
  onBookingCompleted
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const tb = t.bookingPortal;

  const [step, setStep] = useState<number>(1);
  const [services, setServices] = useState<ServiceItem[]>([]);

  // Form State
  const [plate, setPlate] = useState('');
  const [makeModel, setMakeModel] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [intakeAnswers, setIntakeAnswers] = useState<Record<string, any>>({});
  
  // Slot selection & Hold
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [activeHoldId, setActiveHoldId] = useState<string | null>(null);
  const [holdCountdownSeconds, setHoldCountdownSeconds] = useState<number>(600); // 10 minutes

  // Customer Contact
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState(activeTenant.country === 'FR' ? '+33 ' : '+41 ');
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(true);

  // Success
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  useEffect(() => {
    const s = StorageService.getServices(activeTenant.id).filter(item => item.onlineBookable && item.active);
    setServices(s);
    if (s.length > 0) setSelectedServiceId(s[0].id);
  }, [activeTenant.id]);

  // Load available slots whenever service or date changes
  useEffect(() => {
    if (selectedServiceId && selectedDate) {
      const slots = SchedulingService.getAvailableSlots(activeTenant.id, selectedServiceId, selectedDate);
      setAvailableSlots(slots);
    }
  }, [activeTenant.id, selectedServiceId, selectedDate]);

  // Hold Timer countdown
  useEffect(() => {
    if (!activeHoldId) return;
    const interval = setInterval(() => {
      setHoldCountdownSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveHoldId(null);
          setSelectedSlot(null);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeHoldId]);

  const handleSelectSlot = (slot: AvailableSlot) => {
    if (activeHoldId) {
      SchedulingService.releaseSlotHold(activeHoldId);
    }

    const hold = SchedulingService.createSlotHold({
      tenantId: activeTenant.id,
      serviceId: selectedServiceId,
      mechanicId: slot.mechanicId,
      bayId: slot.bayId,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime
    });

    if (hold) {
      setActiveHoldId(hold.id);
      setSelectedSlot(slot);
      setHoldCountdownSeconds(600);
    }
  };

  const handleFinalConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !selectedServiceId) return;

    // 1. Create or Find Customer
    let customer = StorageService.getCustomers(activeTenant.id).find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!customer) {
      customer = {
        id: `cust-web-${Date.now()}`,
        tenantId: activeTenant.id,
        type: 'INDIVIDUAL',
        firstName,
        lastName,
        email,
        phone,
        country: activeTenant.country,
        address: {
          street: 'Registered via Web Portal',
          city: activeTenant.address.city,
          postalCode: activeTenant.address.postalCode,
          country: activeTenant.country === 'FR' ? 'France' : 'Switzerland'
        },
        preferredLanguage: activeTenant.country === 'FR' ? 'fr' : 'fr-CH',
        gdprConsent: {
          consentedAt: new Date().toISOString(),
          marketingConsent: true,
          smsConsent: true,
          whatsappConsent: true
        },
        createdAt: new Date().toISOString()
      };
      const allCust = StorageService.getAllCustomers();
      allCust.push(customer);
      StorageService.saveCustomers(allCust);
    }

    // 2. Create Vehicle
    let vehicle = StorageService.getVehicles(activeTenant.id).find(v => v.licensePlate.toUpperCase() === plate.toUpperCase());
    if (!vehicle) {
      vehicle = {
        id: `veh-web-${Date.now()}`,
        tenantId: activeTenant.id,
        customerId: customer.id,
        licensePlate: plate.toUpperCase(),
        vin: 'VF3' + Math.random().toString(36).substring(2, 16).toUpperCase(),
        make: makeModel.split(' ')[0] || 'Vehicle',
        model: makeModel.split(' ').slice(1).join(' ') || 'Standard',
        year: 2022,
        fuelType: 'PETROL',
        transmission: 'AUTOMATIC',
        mileage: 50000,
        notes: 'Online customer booking'
      };
      const allVeh = StorageService.getAllVehicles();
      allVeh.push(vehicle);
      StorageService.saveVehicles(allVeh);
    }

    // 3. Confirm Appointment via Central Scheduling Engine
    const app = SchedulingService.confirmAppointment({
      tenantId: activeTenant.id,
      customerId: customer.id,
      vehicleId: vehicle.id,
      serviceId: selectedServiceId,
      mechanicId: selectedSlot.mechanicId,
      bayId: selectedSlot.bayId,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      source: 'ONLINE_WEB',
      customerAnswers: intakeAnswers,
      holdId: activeHoldId || undefined
    });

    // 4. Dispatch Notifications
    CommunicationService.notifyBookingConfirmed(app, customer, activeTenant);

    setConfirmedCode(app.confirmationCode);
    if (onBookingCompleted) onBookingCompleted(app.confirmationCode);
  };

  const selectedServiceObj = services.find(s => s.id === selectedServiceId);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Garage Header */}
      <div className="apple-card" style={{ padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
        <span className="apple-badge apple-badge-blue" style={{ marginBottom: '8px' }}>
          Official Online Booking
        </span>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1d1d1f' }}>{activeTenant.name}</h1>
        <p style={{ fontSize: '13px', color: '#6e6e73', marginTop: '4px' }}>
          {activeTenant.address.street}, {activeTenant.address.city} • Phone: {activeTenant.phone}
        </p>
      </div>

      {confirmedCode ? (
        /* Confirmation Screen */
        <div className="apple-card animate-fade-in" style={{ padding: '40px 24px', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(48, 209, 88, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#30d158',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1d1d1f', marginBottom: '8px' }}>
            {tb.successTitle}
          </h2>
          <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '24px' }}>
            Your appointment has been registered directly into our central workshop agenda.
          </p>

          <div style={{
            background: '#f5f5f7',
            padding: '20px',
            borderRadius: '16px',
            maxWidth: '380px',
            margin: '0 auto 24px',
            border: '1px dashed #0071e3'
          }}>
            <span style={{ fontSize: '12px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {tb.successRef}
            </span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0071e3', letterSpacing: '0.05em', marginTop: '4px' }}>
              {confirmedCode}
            </div>
            <div style={{ fontSize: '13px', color: '#1d1d1f', marginTop: '8px' }}>
              Date: <strong>{selectedSlot?.date}</strong> ({selectedSlot?.startTime} - {selectedSlot?.endTime})
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', color: '#30d158', fontWeight: 600 }}>
            <ShieldCheck size={18} />
            <span>{tb.smsNotice}</span>
          </div>

          <button 
            onClick={() => {
              setStep(1);
              setConfirmedCode(null);
              setSelectedSlot(null);
              setActiveHoldId(null);
            }}
            className="apple-btn-secondary"
            style={{ marginTop: '32px' }}
          >
            Book Another Appointment
          </button>
        </div>
      ) : (
        /* Stepper Form */
        <div className="apple-card" style={{ padding: '32px' }}>
          {/* Hold Countdown Badge if slot held */}
          {activeHoldId && (
            <div style={{
              background: 'rgba(0, 113, 227, 0.08)',
              border: '1px solid rgba(0, 113, 227, 0.25)',
              padding: '10px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '13px',
              color: '#0071e3',
              fontWeight: 600
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Timer size={16} />
                <span>Temporary Slot Reservation Active:</span>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 800 }}>{formatTimer(holdCountdownSeconds)}</span>
            </div>
          )}

          {/* Stepper Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid #e5e5ea', paddingBottom: '16px' }}>
            {[tb.step1, tb.step2, tb.step3, tb.step4].map((label, idx) => (
              <div key={idx} style={{
                fontSize: '12px',
                fontWeight: step === idx + 1 ? 700 : 500,
                color: step === idx + 1 ? '#0071e3' : '#86868b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: step === idx + 1 ? '#0071e3' : 'rgba(0,0,0,0.08)',
                  color: step === idx + 1 ? '#fff' : '#6e6e73',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px'
                }}>
                  {idx + 1}
                </span>
                <span style={{ display: 'none', sm: 'inline' }}>{label.split('. ')[1]}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Vehicle Plate */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tb.step1}</h3>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '6px' }}>
                  License Plate / Immatriculation
                </label>
                <input 
                  type="text" 
                  value={plate} 
                  onChange={e => setPlate(e.target.value.toUpperCase())}
                  placeholder={tb.platePlaceholder}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea', fontSize: '18px', fontWeight: 800, textTransform: 'uppercase' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '6px' }}>
                  Vehicle Make & Model
                </label>
                <input 
                  type="text" 
                  value={makeModel} 
                  onChange={e => setMakeModel(e.target.value)}
                  placeholder={tb.makeModelPlaceholder}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <button 
                type="button" 
                onClick={() => setStep(2)}
                disabled={!plate.trim()}
                className="apple-btn-primary" 
                style={{ marginTop: '12px', padding: '12px 24px', fontSize: '15px' }}
              >
                <span>Continue to Service Selection</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Select Service */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tb.step2}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {services.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      border: selectedServiceId === s.id ? '2px solid #0071e3' : '1px solid #e5e5ea',
                      background: selectedServiceId === s.id ? 'rgba(0, 113, 227, 0.04)' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1d1d1f' }}>{s.name}</h4>
                      <p style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>{s.description}</p>
                      <div style={{ fontSize: '12px', color: '#0071e3', fontWeight: 600, marginTop: '6px' }}>
                        Estimated Duration: ~{s.estimatedDurationMin} minutes
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: '#1d1d1f' }}>
                        {s.baseLaborPrice.toFixed(2)} {activeTenant.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button onClick={() => setStep(1)} className="apple-btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button onClick={() => setStep(3)} className="apple-btn-primary">
                  <span>Choose Date & Time</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Slot Selection from Central Scheduling Engine */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tb.step3}</h3>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '6px' }}>
                  Select Preferred Date
                </label>
                <input 
                  type="date" 
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setSelectedDate(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea', fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '8px' }}>
                  Available Live Slots (Central Agenda):
                </label>
                {availableSlots.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px', background: '#f5f5f7', borderRadius: '12px', color: '#86868b' }}>
                    No slots available for this date. Please choose another day.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                    {availableSlots.map((slot, idx) => {
                      const isSelected = selectedSlot?.startTime === slot.startTime && selectedSlot?.date === slot.date;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectSlot(slot)}
                          style={{
                            padding: '12px 8px',
                            borderRadius: '10px',
                            border: isSelected ? '2px solid #0071e3' : '1px solid #e5e5ea',
                            background: isSelected ? '#0071e3' : '#ffffff',
                            color: isSelected ? '#ffffff' : '#1d1d1f',
                            fontWeight: 700,
                            fontSize: '14px',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
                          {slot.startTime}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button onClick={() => setStep(2)} className="apple-btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button 
                  onClick={() => setStep(4)} 
                  disabled={!selectedSlot}
                  className="apple-btn-primary"
                >
                  <span>Confirm Contact Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact & GDPR Consent */}
          {step === 4 && (
            <form onSubmit={handleFinalConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tb.step4}</h3>

              <div style={{ background: '#f5f5f7', padding: '14px', borderRadius: '12px', fontSize: '13px' }}>
                <div><strong>Service:</strong> {selectedServiceObj?.name}</div>
                <div><strong>Slot:</strong> {selectedSlot?.date} at {selectedSlot?.startTime} - {selectedSlot?.endTime}</div>
                <div><strong>Vehicle:</strong> {plate} ({makeModel})</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    First Name
                  </label>
                  <input 
                    type="text" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Mobile Phone (For SMS Confirmation)
                  </label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Email Address (For Calendar Invite)
                  </label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              {/* GDPR Consent */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginTop: '6px' }}>
                <input 
                  type="checkbox" 
                  id="gdpr"
                  checked={gdprConsent}
                  onChange={e => setGdprConsent(e.target.checked)}
                  required
                  style={{ marginTop: '4px' }}
                />
                <label htmlFor="gdpr" style={{ fontSize: '12px', color: '#6e6e73', lineHeight: 1.4 }}>
                  {tb.consentGdpr}
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button type="button" onClick={() => setStep(3)} className="apple-btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button type="submit" className="apple-btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
                  <span>{tb.confirmBooking}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
