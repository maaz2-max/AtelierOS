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
  onBookSlot?: (slot: AvailableSlot) => void;
  onAppointmentBooked?: (slot: AvailableSlot) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeTenant,
  currentLanguage,
  onBookSlot,
  onAppointmentBooked
}) => {
  if (!isOpen) return null;

  const t = (translations[currentLanguage] || translations.en) as any;
  const tai = t.aiAssistant;

  const tenantName = activeTenant?.name || 'Auto Workshop';

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    sender: 'USER' | 'AI';
    text: string;
    aiData?: AIResponse;
  }>>([
    {
      sender: 'AI',
      text: `Hello! I am your **AutoAI Workshop Assistant** for ${tenantName}. I can analyze customer symptoms, query our Central Scheduling Engine for real-time slots, and organize diagnostic checkpoints. How can I help you today?`
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
      const response = await AIService.processCustomerIntake(activeTenant?.id || 'tenant-fr-paris', userText);
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
    const tenantId = activeTenant?.id || 'tenant-fr-paris';
    const customers = StorageService.getCustomers(tenantId);
    const vehicles = StorageService.getVehicles(tenantId);

    const app = SchedulingService.confirmAppointment({
      tenantId: tenantId,
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

    setBookedSlot(slot.id);
    if (onAppointmentBooked) {
      onAppointmentBooked(slot);
    }
  };

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div 
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.25)',
          maxWidth: '660px',
          width: '100%',
          height: '85vh',
          maxHeight: '740px',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#0F172A',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
            }}>
              <svg width="34" height="34" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="aiHexGradDrawer" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="50%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                  <linearGradient id="aiCarGlowDrawer" x1="50" y1="100" x2="150" y2="150" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#C7D2FE" />
                  </linearGradient>
                </defs>
                <path d="M100 16 L168 54 L168 128 L116 166 L110 188 L90 166 L32 128 L32 54 Z" fill="url(#aiHexGradDrawer)" />
                <path d="M100 28 L156 60 L156 122 L112 152 L106 170 L94 152 L44 122 L44 60 Z" fill="#0B1220" />
                <line x1="100" y1="50" x2="100" y2="90" stroke="#C084FC" strokeWidth="3" strokeLinecap="round" />
                <circle cx="100" cy="48" r="6" fill="#C084FC" />
                <circle cx="100" cy="48" r="2.5" fill="#FFFFFF" />
                <path d="M68 64 L86 64 L94 88" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="68" cy="64" r="5" fill="#A855F7" />
                <circle cx="68" cy="64" r="2" fill="#FFFFFF" />
                <path d="M132 64 L114 64 L106 88" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="132" cy="64" r="5" fill="#818CF8" />
                <circle cx="132" cy="64" r="2" fill="#FFFFFF" />
                <path d="M68 116 C74 98, 86 94, 100 94 C114 94, 126 98, 132 116 Z" fill="#1E293B" stroke="#A855F7" strokeWidth="2" />
                <path d="M78 112 C82 102, 90 98, 100 98 C104 98, 108 99, 112 101" stroke="#E0E7FF" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M54 126 C54 120, 60 116, 68 116 L132 116 C140 116, 146 120, 146 126 L144 136 C144 140, 140 142, 134 142 L66 142 C60 142, 56 140, 56 136 Z" fill="url(#aiCarGlowDrawer)" />
                <polygon points="62,126 78,126 74,130 62,128" fill="#38BDF8" />
                <polygon points="138,126 122,126 126,130 138,128" fill="#38BDF8" />
                <path d="M84 134 L116 134 L112 138 L88 138 Z" fill="#0B1220" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#101010', margin: 0, letterSpacing: '-0.02em' }}>{tai.title}</h2>
              <span style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                Strict Function Calling Architecture • 12ms Slot Solver
              </span>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{ 
              background: '#F1F5F9', 
              border: 'none', 
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer', 
              color: '#64748B' 
            }}
          >
            <X size={18} />
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
