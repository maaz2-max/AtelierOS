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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              filter: 'drop-shadow(0 4px 10px rgba(0, 102, 255, 0.4))'
            }}>
              <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="aiRibbonGradD" x1="30" y1="160" x2="160" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00D2FF" />
                    <stop offset="40%" stopColor="#0066FF" />
                    <stop offset="80%" stopColor="#0047E0" />
                    <stop offset="100%" stopColor="#00D2FF" />
                  </linearGradient>
                  <linearGradient id="aiArchGradD" x1="40" y1="140" x2="110" y2="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0080FF" />
                    <stop offset="50%" stopColor="#00D2FF" />
                    <stop offset="100%" stopColor="#0055FF" />
                  </linearGradient>
                  <linearGradient id="aiLoopGradD" x1="80" y1="60" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#004CD8" />
                    <stop offset="50%" stopColor="#0077FF" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                  <linearGradient id="aiDotGradD" x1="145" y1="35" x2="175" y2="65" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="60%" stopColor="#0066FF" />
                    <stop offset="100%" stopColor="#003ACC" />
                  </linearGradient>
                </defs>
                <path d="M96 54 C 106 72, 118 108, 126 132 C 134 156, 148 162, 160 148 C 170 136, 172 108, 172 84 C 172 74, 154 74, 154 84 C 154 104, 152 124, 146 134 C 142 140, 136 138, 130 120 C 122 96, 112 64, 98 42 Z" fill="url(#aiLoopGradD)" />
                <path d="M36 148 C 32 120, 52 48, 86 36 C 108 28, 122 42, 120 66 C 118 86, 102 128, 96 142 C 92 152, 78 152, 78 140 C 78 126, 86 98, 92 78 C 96 66, 92 56, 82 58 C 64 62, 52 106, 54 136 C 56 150, 40 158, 36 148 Z" fill="url(#aiArchGradD)" />
                <path d="M62 136 C 70 126, 82 124, 104 140 C 108 144, 102 152, 94 148 C 78 140, 70 142, 62 148 C 56 152, 54 144, 62 136 Z" fill="url(#aiRibbonGradD)" opacity="0.95" />
                <circle cx="158" cy="46" r="15" fill="url(#aiDotGradD)" />
                <ellipse cx="153" cy="41" rx="5" ry="3" fill="#FFFFFF" opacity="0.75" transform="rotate(-30 153 41)" />
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
