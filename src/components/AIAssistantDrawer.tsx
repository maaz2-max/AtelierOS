// ==========================================================================
// AtelierOS - AutoAI Workshop Assistant (Function-Calling Architecture)
// ==========================================================================

import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Code, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  ShieldCheck,
  Bot
} from 'lucide-react';
import { Tenant, SupportedLanguage } from '../types';
import { AIService, AIResponse } from '../services/AIService';
import { SchedulingService, AvailableSlot } from '../services/SchedulingService';
import { StorageService } from '../services/StorageService';
import { translations } from '../i18n/translations';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
  onAppointmentBooked?: (slot: AvailableSlot) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeTenant,
  currentLanguage,
  onAppointmentBooked
}) => {
  if (!isOpen) return null;

  const t = (translations[currentLanguage] || translations.en) as any;
  const tai = t.aiAssistant;

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    sender: 'USER' | 'AI';
    text: string;
    aiData?: AIResponse;
  }>>([
    {
      sender: 'AI',
      text: `Hello! I am your **AutoAI Workshop Assistant** for ${activeTenant.name}. I can analyze customer symptoms, query our Central Scheduling Engine for real-time slots, and organize diagnostic checkpoints. How can I help you today?`
    }
  ]);

  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setConversation(prev => [...prev, { sender: 'USER', text: userText }]);
    setLoading(true);

    try {
      const response = await AIService.processCustomerIntake(activeTenant.id, userText);
      setConversation(prev => [
        ...prev,
        {
          sender: 'AI',
          text: response.message,
          aiData: response
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSlotFromAI = (slot: AvailableSlot, serviceId: string) => {
    const customers = StorageService.getCustomers(activeTenant.id);
    const vehicles = StorageService.getVehicles(activeTenant.id);

    const app = SchedulingService.confirmAppointment({
      tenantId: activeTenant.id,
      customerId: customers[0]?.id || 'cust-01',
      vehicleId: vehicles[0]?.id || 'veh-01',
      serviceId: serviceId || 'srv-01',
      mechanicId: slot.mechanicId,
      bayId: slot.bayId,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      source: 'AI_ASSISTANT',
      intakeNotes: 'Booked via AutoAI Reception Assistant'
    });

    setBookedSlot(`${slot.date} at ${slot.startTime}`);
    if (onAppointmentBooked) onAppointmentBooked(slot);
  };

  return (
    <div className="apple-modal-overlay" onClick={onClose}>
      <div 
        className="apple-modal-content p-6 animate-fade-in" 
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '650px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          borderRadius: '24px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e5e5ea', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0071e3 0%, #bf5af2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f' }}>{tai.title}</h2>
              <span style={{ fontSize: '11px', color: '#86868b' }}>
                Strict Function Calling Architecture • Zero DB Direct Writes
              </span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="scrollbar-none" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '4px' }}>
          {conversation.map((msg, idx) => (
            <div key={idx} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'USER' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: '16px',
                background: msg.sender === 'USER' ? '#0071e3' : '#f5f5f7',
                color: msg.sender === 'USER' ? '#ffffff' : '#1d1d1f',
                fontSize: '14px',
                lineHeight: 1.5,
                borderBottomRightRadius: msg.sender === 'USER' ? '4px' : '16px',
                borderBottomLeftRadius: msg.sender === 'AI' ? '4px' : '16px'
              }}>
                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>

              {/* Function Calls Transparency Inspector */}
              {msg.aiData && msg.aiData.functionCalls.length > 0 && (
                <div style={{ marginTop: '8px', maxWidth: '90%', background: '#1d1d1f', color: '#64d2ff', padding: '12px', borderRadius: '12px', fontSize: '11px', fontFamily: 'monospace' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#30d158', fontWeight: 700, marginBottom: '6px' }}>
                    <Code size={12} />
                    <span>{tai.simulatedFunctions}</span>
                  </div>
                  {msg.aiData.functionCalls.map((fc, i) => (
                    <div key={i} style={{ marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
                      <span style={{ color: '#ff9f0a' }}>{fc.functionName}</span>(
                      <span style={{ color: '#e5e5ea' }}>{JSON.stringify(fc.arguments)}</span>
                      ) ➔ <span style={{ color: '#30d158' }}>{JSON.stringify(fc.result)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested Slots from Central Engine */}
              {msg.aiData && msg.aiData.suggestedSlots.length > 0 && (
                <div style={{ marginTop: '10px', width: '100%', background: '#ffffff', border: '1px solid #e5e5ea', padding: '14px', borderRadius: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1d1d1f', display: 'block', marginBottom: '8px' }}>
                    {tai.availableSlotsFound}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {msg.aiData.suggestedSlots.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleBookSlotFromAI(slot, msg.aiData?.classifiedService?.id || 'srv-01')}
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          border: '1px solid #0071e3',
                          background: 'rgba(0, 113, 227, 0.05)',
                          color: '#0071e3',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {slot.date} • {slot.startTime}-{slot.endTime}
                        <div style={{ fontSize: '10px', color: '#6e6e73', marginTop: '2px' }}>
                          Mech: {slot.mechanicName} ({slot.bayName})
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ padding: '12px 16px', background: '#f5f5f7', borderRadius: '16px', maxWidth: '140px', fontSize: '13px', color: '#86868b' }}>
              Analyzing symptoms...
            </div>
          )}

          {bookedSlot && (
            <div style={{ background: '#30d158', color: '#ffffff', padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} />
              <span>Appointment successfully booked for {bookedSlot}!</span>
            </div>
          )}
        </div>

        {/* Quick Symptom Prompts - Clean Wrapped Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '10px 0 6px', borderTop: '1px solid #f2f2f7', marginTop: '8px' }}>
          {[
            'Brake pedal squeaks & vibrates',
            'Due for 60,000 km oil service',
            'Tesla Model Y battery check',
            'Check engine light code P0420'
          ].map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setInputMessage(prompt)}
              style={{
                fontSize: '11px',
                padding: '5px 10px',
                borderRadius: '20px',
                border: '1px solid #e5e5ea',
                background: '#f9f9fb',
                color: '#515154',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: '500',
                transition: 'all 0.15s ease'
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <input 
            type="text" 
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder={tai.chatPlaceholder}
            style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid #e5e5ea', fontSize: '14px' }}
          />
          <button type="submit" className="apple-btn-primary" style={{ padding: '12px 18px' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
