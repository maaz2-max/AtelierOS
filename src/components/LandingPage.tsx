// ==========================================================================
// AtelierOS - Ultra-Premium Light Liquid Glass Scrolling Landing Page
// Inspired by Apple.com & Automotive Precision Engineering Design
// ==========================================================================

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Tablet, 
  Receipt, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Globe2, 
  Wrench, 
  FileCheck2, 
  Activity, 
  Clock, 
  Cpu, 
  Check, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../i18n/translations';

interface LandingPageProps {
  onLaunchApp: () => void;
  onLaunchBooking: () => void;
  onOpenAi: () => void;
  onOpenLegal: (type: 'PRIVACY' | 'TERMS' | 'EINVOICE_INFO') => void;
  currentLanguage: SupportedLanguage;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  onLaunchBooking,
  onOpenAi,
  onOpenLegal,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const tl = t.landing;

  // Interactive ROI Calculator State
  const [mechanicsCount, setMechanicsCount] = useState(4);
  const [monthlyOrders, setMonthlyOrders] = useState(140);
  const [pricingCurrency, setPricingCurrency] = useState<'EUR' | 'CHF'>('EUR');
  const [activeTabFeature, setActiveTabFeature] = useState<number>(0);

  // ROI Math
  const hoursSavedPerMonth = Math.round(monthlyOrders * 0.85 + mechanicsCount * 12);
  const avgHourlyBillingRate = pricingCurrency === 'EUR' ? 88 : 148;
  const revenueGain = Math.round(hoursSavedPerMonth * avgHourlyBillingRate * 0.65);

  const featureTabs = [
    {
      title: "Central Scheduling Engine",
      subtitle: "Single availability pipeline for staff, web bookings, and AI.",
      icon: CalendarIcon,
      metrics: "100% Conflict-Free",
      color: "#0071e3"
    },
    {
      title: "Mechanic Tablet Bay Mode",
      subtitle: "Large 48px touch targets for rugged workshop stations.",
      icon: Tablet,
      metrics: "3.5x Faster Checklists",
      color: "#34c759"
    },
    {
      title: "Cross-Border FR & CH Invoicing",
      subtitle: "Deterministic tax compliance, Chorus Pro & Swiss QR-Bills.",
      icon: Receipt,
      metrics: "EUR 20% & CHF 8.1%",
      color: "#5856d6"
    },
    {
      title: "Magic Link Quote Approvals",
      subtitle: "Customers inspect parts & digitally sign in seconds.",
      icon: FileCheck2,
      metrics: "< 3 Min Turnaround",
      color: "#ff9500"
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fbfbfd', 
      color: '#1d1d1f',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Background Soft Refractive Glows */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        left: '15%',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(0, 113, 227, 0.08) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(90px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        top: '45%',
        right: '-10%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(88, 86, 214, 0.06) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* ==================================================================== */}
      {/* SECTION 1: HERO & 3D LIQUID GLASS SHOWCASE */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: '70px 24px 60px',
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Pill Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          marginBottom: '24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
        }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: '#34c759', 
            boxShadow: '0 0 8px rgba(52, 199, 89, 0.6)',
            display: 'inline-block' 
          }}></span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
            AtelierOS 3.0 • Prototype Preview • Under Active Development
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(38px, 5.5vw, 68px)',
          fontWeight: '800',
          letterSpacing: '-0.035em',
          lineHeight: 1.08,
          margin: '0 auto 20px',
          maxWidth: '1100px',
          color: '#1d1d1f'
        }}>
          Precision Workshop Management for Europe's Elite Automotive Garages.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(16px, 1.8vw, 20px)',
          lineHeight: 1.55,
          color: '#6e6e73',
          maxWidth: '840px',
          margin: '0 auto 36px',
          fontWeight: '400',
          letterSpacing: '-0.01em'
        }}>
          Engineered for France and Switzerland from day one. Single central scheduling engine, grease-resistant tablet mechanic stations, deterministic cross-border invoicing, and Chorus Pro e-invoicing.
        </p>

        {/* Hero CTAs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          marginBottom: '50px'
        }}>
          <button
            onClick={onLaunchApp}
            style={{
              padding: '16px 32px',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #0071e3 0%, #0095ff 100%)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(0, 113, 227, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>Launch Workshop App</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onLaunchBooking}
            style={{
              padding: '16px 28px',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              background: '#ffffff',
              boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
              color: '#1d1d1f',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CalendarIcon size={18} color="#0071e3" />
            <span>Customer Web Booking</span>
          </button>

          <button
            onClick={onOpenAi}
            style={{
              padding: '16px 24px',
              borderRadius: '16px',
              border: '1px solid rgba(104, 48, 255, 0.2)',
              background: 'linear-gradient(135deg, #f7f5ff 0%, #ffffff 100%)',
              boxShadow: '0 4px 14px rgba(104, 48, 255, 0.08)',
              color: '#5856d6',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={18} color="#5856d6" />
            <span>AutoAI Receptionist</span>
          </button>
        </div>

        {/* 3D Photorealistic Workshop & Liquid Glass Tilted Cards Showcase */}
        <div style={{
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          borderRadius: '32px',
          padding: '10px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 245, 0.6) 100%)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden'
        }}>
          {/* Main 3D Workshop Image Render */}
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            maxHeight: '620px',
            width: '100%',
            background: '#111'
          }}>
            <img 
              src="/assets/workshop_3d_hero.jpg" 
              alt="AtelierOS 3D Precision Automotive Engineering Workshop"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Subtle Gradient Blend */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)',
              pointerEvents: 'none'
            }}></div>

            {/* Floating Liquid Glass Overlay Card 1: Central Engine Pulse */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              background: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              borderRadius: '20px',
              padding: '18px 22px',
              textAlign: 'left',
              boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
              maxWidth: '320px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={16} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f' }}>ONE Central Engine</div>
                  <div style={{ fontSize: '11px', color: '#248a3d', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34c759', display: 'inline-block' }}></span>
                    Live Syncing 4 Bays
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#515154', lineHeight: 1.4 }}>
                Real-time bay capacity, mechanic skills &amp; customer holds verified in 12ms.
              </div>
            </div>

            {/* Floating Liquid Glass Overlay Card 2: Cross-Border Compliance */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              borderRadius: '20px',
              padding: '18px 22px',
              textAlign: 'left',
              boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
              maxWidth: '340px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#86868b' }}>
                  Cross-Border Billing
                </span>
                <span style={{ fontSize: '10px', background: '#e1f0ff', color: '#0071e3', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                  EUR &amp; CHF
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                <div style={{ background: '#f5f5f7', padding: '8px 12px', borderRadius: '10px', flex: 1 }}>
                  <div style={{ fontSize: '10px', color: '#86868b', fontWeight: '600' }}>FRANCE (TVA)</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#1d1d1f' }}>20.0% Factur-X</div>
                </div>
                <div style={{ background: '#f5f5f7', padding: '8px 12px', borderRadius: '10px', flex: 1 }}>
                  <div style={{ fontSize: '10px', color: '#86868b', fontWeight: '600' }}>SWITZERLAND</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#1d1d1f' }}>8.1% QR-Bill</div>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#248a3d', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                <CheckCircle2 size={13} color="#34c759" />
                <span>Chorus Pro &amp; Swiss BVR Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Hero Stats Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          maxWidth: '1280px',
          margin: '32px auto 0'
        }}>
          {[
            { num: "1 Engine", label: "Shared by Staff, Customer Web & AI Intake", icon: Cpu },
            { num: "100%", label: "Conflict-Free Bay & Lift Capacity Guarantee", icon: ShieldCheck },
            { num: "< 3 Min", label: "From Inspection to Signed Quote Approval", icon: Clock },
            { num: "EUR & CHF", label: "Native Cross-Border Multi-Tenant Compliance", icon: Globe2 }
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '22px',
                  padding: '24px 20px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#eaf4ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} color="#0071e3" />
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.3, marginTop: '2px' }}>
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2: INTERACTIVE SCROLLING FEATURE SHOWCASE */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: '90px 24px',
        maxWidth: '1400px',
        margin: '0 auto',
        borderTop: '1px solid #e5e5ea'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0071e3', display: 'block', marginBottom: '8px' }}>
            ENGINEERED FOR WORKSHOP VELOCITY
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', letterSpacing: '-0.03em', margin: '0 0 16px', color: '#1d1d1f' }}>
            Crafted for speed, clarity, and zero administrative friction.
          </h2>
          <p style={{ fontSize: '17px', color: '#6e6e73', maxWidth: '700px', margin: '0 auto' }}>
            Everything your garage needs to digitize bay operations, automate appointments, and ensure tax compliance.
          </p>
        </div>

        {/* Feature Tab Selector */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          {featureTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isSelected = activeTabFeature === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTabFeature(idx)}
                style={{
                  padding: '14px 22px',
                  borderRadius: '16px',
                  border: isSelected ? `2px solid ${tab.color}` : '1px solid #e5e5ea',
                  background: isSelected ? '#ffffff' : '#f5f5f7',
                  color: isSelected ? '#1d1d1f' : '#6e6e73',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  fontWeight: isSelected ? '700' : '500',
                  boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={18} color={isSelected ? tab.color : '#86868b'} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Content Spotlight Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '30px',
          padding: '44px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.05)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
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
              marginBottom: '16px'
            }}>
              <Zap size={14} />
              <span>{featureTabs[activeTabFeature].metrics}</span>
            </div>

            <h3 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em', margin: '0 0 16px', color: '#1d1d1f' }}>
              {featureTabs[activeTabFeature].title}
            </h3>

            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#515154', margin: '0 0 24px' }}>
              {activeTabFeature === 0 && "One availability pipeline across staff calendar, customer self-service booking, and AI receptionists. Prevents double bookings by validating mechanic skills, bay weight capacities, and 15-minute buffers in real time."}
              {activeTabFeature === 1 && "Built specifically for greasy iPad screens. 48px+ large touch targets, fast OBD-II code lookup, live time-clocking with automated labor billing, and photo attachments for customer transparency."}
              {activeTabFeature === 2 && "Deterministic tax engine with automatic detection for France (20% TVA) and Switzerland (8.1% TVA). Generates compliant French Factur-X / Chorus Pro XML and structured Swiss QR-Bills."}
              {activeTabFeature === 3 && "Send instant SMS/Email approval links. Customers inspect itemized labor and spare parts on mobile and authorize repairs with a compliant digital signature in under 3 minutes."}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                activeTabFeature === 0 ? "Zero double bookings across web, phone and walk-ins" : activeTabFeature === 1 ? "Instant OBD-II diagnostic lookup & checklists" : activeTabFeature === 2 ? "Automatic EUR / CHF currency & VAT determination" : "Digital signature legally archived with timestamp",
                activeTabFeature === 0 ? "Automated 15m buffer time injection between appointments" : activeTabFeature === 1 ? "Live labor stopwatch clocks directly to work order" : activeTabFeature === 2 ? "Built-in Chorus Pro (PPF/PDP) payload validator" : "Customers review transparent parts & labor pricing"
              ].map((point, pIdx) => (
                <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#1d1d1f' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} color="#fff" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Visual Asset preview */}
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
            background: '#111'
          }}>
            <img 
              src="/assets/tablet_bay_3d.jpg" 
              alt="AtelierOS 3D Tablet & Mobile Bay Station"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 3: INTERACTIVE ROI CALCULATOR */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: '90px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        borderTop: '1px solid #e5e5ea'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#34c759', display: 'block', marginBottom: '8px' }}>
            RETURN ON INVESTMENT
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', letterSpacing: '-0.03em', margin: '0 0 16px', color: '#1d1d1f' }}>
            Calculate Your Workshop ROI
          </h2>
          <p style={{ fontSize: '16px', color: '#6e6e73', maxWidth: '650px', margin: '0 auto' }}>
            See how much administrative time and billable revenue AtelierOS recovers for your garage every single month.
          </p>
        </div>

        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '30px',
          padding: '44px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.05)'
        }}>
          {/* Sliders Input Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#1d1d1f' }}>Garage Currency</span>
              <div style={{ display: 'flex', background: '#f5f5f7', borderRadius: '10px', padding: '3px' }}>
                <button
                  onClick={() => setPricingCurrency('EUR')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: pricingCurrency === 'EUR' ? '#0071e3' : 'transparent',
                    color: pricingCurrency === 'EUR' ? '#fff' : '#6e6e73',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  EUR (€)
                </button>
                <button
                  onClick={() => setPricingCurrency('CHF')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: pricingCurrency === 'CHF' ? '#d9383a' : 'transparent',
                    color: pricingCurrency === 'CHF' ? '#fff' : '#6e6e73',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  CHF (CHF)
                </button>
              </div>
            </div>

            {/* Slider 1: Mechanics Count */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontSize: '14px', color: '#515154', fontWeight: '600' }}>Number of Active Mechanics</label>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#0071e3' }}>{mechanicsCount} Technicians</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={mechanicsCount}
                onChange={e => setMechanicsCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0071e3', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 2: Monthly Work Orders */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontSize: '14px', color: '#515154', fontWeight: '600' }}>Work Orders Completed / Month</label>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#34c759' }}>{monthlyOrders} Orders</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={monthlyOrders}
                onChange={e => setMonthlyOrders(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#34c759', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Results Output Column */}
          <div style={{
            background: 'linear-gradient(135deg, #f0f7ff 0%, #edf9f0 100%)',
            border: '1px solid rgba(0, 113, 227, 0.15)',
            borderRadius: '22px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', color: '#6e6e73', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Administrative Hours Saved / Month
              </span>
              <div style={{ fontSize: '38px', fontWeight: '800', color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {hoursSavedPerMonth} <span style={{ fontSize: '20px', fontWeight: '500', color: '#6e6e73' }}>Hours</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '20px' }}>
              <span style={{ fontSize: '13px', color: '#248a3d', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                Estimated Monthly Billable Revenue Gain
              </span>
              <div style={{ fontSize: '42px', fontWeight: '800', color: '#248a3d', letterSpacing: '-0.03em' }}>
                {pricingCurrency === 'EUR' ? `€${revenueGain.toLocaleString()}` : `CHF ${revenueGain.toLocaleString()}`}
              </div>
              <span style={{ fontSize: '12px', color: '#6e6e73', marginTop: '6px', display: 'block' }}>
                Based on €88/h (FR) or CHF 148/h (CH) recovered technician utilization.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 4: TRANSPARENT PRICING TIERS */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: '90px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        borderTop: '1px solid #e5e5ea'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0071e3', display: 'block', marginBottom: '8px' }}>
            SIMPLE, PREDICTABLE SUBSCRIPTIONS
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', letterSpacing: '-0.03em', margin: '0 0 16px', color: '#1d1d1f' }}>
            Transparent pricing for modern workshops.
          </h2>
          <p style={{ fontSize: '16px', color: '#6e6e73', maxWidth: '600px', margin: '0 auto' }}>
            Switch between EUR (€) and CHF (CHF) anytime. No hidden fees or lock-in contracts.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Tier 1: Starter */}
          <div style={{
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '24px',
            padding: '36px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
          }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 6px', color: '#1d1d1f' }}>Starter</h3>
              <p style={{ fontSize: '13px', color: '#6e6e73', margin: '0 0 20px' }}>For independent single-bay garages digitizing bookings.</p>
              <div style={{ fontSize: '38px', fontWeight: '800', color: '#1d1d1f', marginBottom: '24px' }}>
                {pricingCurrency === 'EUR' ? '€89' : 'CHF 99'}
                <span style={{ fontSize: '14px', color: '#6e6e73', fontWeight: '400' }}> / month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                {["Up to 3 Mechanics & 2 Bays", "Central Calendar & Web Booking", "Quotes, Invoices & PDF Export", "SMS & Email Notifications"].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#515154' }}>
                    <Check size={14} color="#0071e3" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onLaunchApp}
              style={{
                width: '100%',
                padding: '14px',
                background: '#f5f5f7',
                color: '#1d1d1f',
                border: 'none',
                borderRadius: '14px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Get Started
            </button>
          </div>

          {/* Tier 2: Pro Workshop (Glowing Highlight) */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #0071e3',
            borderRadius: '24px',
            padding: '36px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 20px 50px rgba(0, 113, 227, 0.15)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '28px',
              background: '#0071e3',
              color: '#fff',
              padding: '3px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700'
            }}>
              MOST POPULAR
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 6px', color: '#1d1d1f' }}>Pro Workshop</h3>
              <p style={{ fontSize: '13px', color: '#6e6e73', margin: '0 0 20px' }}>For growing workshops needing tablet bay mode &amp; e-invoicing.</p>
              <div style={{ fontSize: '38px', fontWeight: '800', color: '#1d1d1f', marginBottom: '24px' }}>
                {pricingCurrency === 'EUR' ? '€189' : 'CHF 199'}
                <span style={{ fontSize: '14px', color: '#6e6e73', fontWeight: '400' }}> / month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                {[
                  "Unlimited Mechanics & Bays",
                  "Tablet Bay Station & OBD-II Codes",
                  "Customer Magic-Link Approvals",
                  "French Chorus Pro / Factur-X",
                  "Swiss QR-Bill Invoicing"
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1d1d1f' }}>
                    <Check size={14} color="#34c759" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onLaunchApp}
              style={{
                width: '100%',
                padding: '14px',
                background: '#0071e3',
                color: '#fff',
                border: 'none',
                borderRadius: '14px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 113, 227, 0.35)'
              }}
            >
              Launch Pro Workshop
            </button>
          </div>

          {/* Tier 3: AI Enterprise */}
          <div style={{
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '24px',
            padding: '36px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
          }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 6px', color: '#1d1d1f' }}>AI Enterprise</h3>
              <p style={{ fontSize: '13px', color: '#6e6e73', margin: '0 0 20px' }}>For large dealerships and multi-garage networks.</p>
              <div style={{ fontSize: '38px', fontWeight: '800', color: '#1d1d1f', marginBottom: '24px' }}>
                {pricingCurrency === 'EUR' ? '€299' : 'CHF 329'}
                <span style={{ fontSize: '14px', color: '#6e6e73', fontWeight: '400' }}> / month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                {[
                  "Everything in Pro Workshop",
                  "AI Voice & Symptom Intake",
                  "AI Diagnostic Assistant & OBD",
                  "Multi-Garage Super Admin",
                  "Dedicated Priority Support & API"
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#515154' }}>
                    <Check size={14} color="#5856d6" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onLaunchApp}
              style={{
                width: '100%',
                padding: '14px',
                background: '#f5f5f7',
                color: '#1d1d1f',
                border: 'none',
                borderRadius: '14px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Contact Enterprise
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 5: FOOTER */}
      {/* ==================================================================== */}
      {/* ==================================================================== */}
      {/* SECTION 5: STRUCTURED PREMIUM FOOTER */}
      {/* ==================================================================== */}
      <footer style={{
        borderTop: '1px solid #e5e5ea',
        background: '#ffffff',
        padding: '70px 24px 40px',
        color: '#6e6e73',
        fontSize: '13px'
      }}>
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Column 1: Brand & Prototype Status */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ marginBottom: '14px' }}>
              <img 
                src="/assets/logo.png" 
                alt="AtelierOS" 
                style={{ height: '36px', width: 'auto', display: 'block', objectFit: 'contain' }} 
              />
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#515154', margin: '0 0 16px' }}>
              The Next-Generation Automotive Workshop Operating System. Built with ONE central scheduling engine and grease-resistant tablet bay mode.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              background: '#f5f5f7',
              border: '1px solid #e5e5ea',
              fontSize: '11px',
              fontWeight: '600',
              color: '#86868b'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff9500', display: 'inline-block' }}></span>
              <span>Prototype Preview • Active Development</span>
            </div>
          </div>

          {/* Column 2: Core Platform Capabilities */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d1d1f', marginBottom: '14px' }}>
              Platform Engine
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ color: '#515154' }}>Central Scheduling Pipeline</span>
              <span style={{ color: '#515154' }}>Mechanic iPad Bay Mode</span>
              <span style={{ color: '#515154' }}>Magic Link Quote Approvals</span>
              <span style={{ color: '#515154' }}>Live Vehicle Status Telemetry</span>
              <span style={{ color: '#515154' }}>AutoAI Natural Intake Assistant</span>
            </div>
          </div>

          {/* Column 3: Regional Compliance */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d1d1f', marginBottom: '14px' }}>
              Regional Governance
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ color: '#515154' }}>France 20.0% TVA Compliance</span>
              <span style={{ color: '#515154' }}>Chorus Pro &amp; Factur-X XML</span>
              <span style={{ color: '#515154' }}>Switzerland 8.1% TVA Compliance</span>
              <span style={{ color: '#515154' }}>Swiss QR-Bill (BVR) Invoicing</span>
              <span style={{ color: '#515154' }}>Dual EUR (€) &amp; CHF Multi-Currency</span>
            </div>
          </div>

          {/* Column 4: Legal & Architecture */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d1d1f', marginBottom: '14px' }}>
              Legal &amp; Trust
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span onClick={() => onOpenLegal('PRIVACY')} style={{ cursor: 'pointer', color: '#0071e3', fontWeight: '500' }}>Privacy Policy</span>
              <span onClick={() => onOpenLegal('TERMS')} style={{ cursor: 'pointer', color: '#0071e3', fontWeight: '500' }}>Terms of Service</span>
              <span onClick={() => onOpenLegal('EINVOICE_INFO')} style={{ cursor: 'pointer', color: '#0071e3', fontWeight: '500' }}>Factur-X &amp; E-Invoicing Specs</span>
              <span style={{ color: '#515154' }}>GDPR Zero-Telemetry Model</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #f2f2f7',
          paddingTop: '24px',
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12px',
          color: '#86868b'
        }}>
          <div>
            © 2026 AtelierOS. Prototype version under active development. All rights reserved.
          </div>
          <div>
            Built for independent automotive workshops across France and Switzerland.
          </div>
        </div>
      </footer>
    </div>
  );
};
