// ==========================================================================
// AtelierOS — Ultra-Premium Responsive Liquid Glass Landing Page
// Fully Optimized for Fold Phones, Mobile, iPad/Tablet, Laptop & Desktop
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
  const tl = t.landing || {};

  // Interactive ROI Calculator State
  const [mechanicsCount, setMechanicsCount] = useState(4);
  const [monthlyOrders, setMonthlyOrders] = useState(140);
  const [pricingCurrency, setPricingCurrency] = useState<'EUR' | 'CHF'>('EUR');
  const [activeTabFeature, setActiveTabFeature] = useState<number>(0);

  // ROI Calculations
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
        width: 'clamp(300px, 50vw, 700px)',
        height: 'clamp(300px, 50vw, 700px)',
        background: 'radial-gradient(circle, rgba(0, 113, 227, 0.08) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(90px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        top: '45%',
        right: '-10%',
        width: 'clamp(300px, 50vw, 800px)',
        height: 'clamp(300px, 50vw, 800px)',
        background: 'radial-gradient(circle, rgba(88, 86, 214, 0.06) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* ==================================================================== */}
      {/* SECTION 1: HERO & 3D SHOWCASE */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(36px, 6vw, 70px) clamp(16px, 4vw, 24px) clamp(30px, 5vw, 60px)',
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Pill Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          marginBottom: '20px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          maxWidth: '100%'
        }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: '#34c759', 
            boxShadow: '0 0 8px rgba(52, 199, 89, 0.6)',
            display: 'inline-block',
            flexShrink: 0
          }}></span>
          <span style={{ 
            fontSize: 'clamp(11px, 2.5vw, 13px)', 
            fontWeight: '600', 
            color: '#1d1d1f', 
            letterSpacing: '-0.01em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            AtelierOS • Prototype Preview • Active Development
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(28px, 6vw, 64px)',
          fontWeight: '800',
          letterSpacing: '-0.03em',
          lineHeight: 1.12,
          margin: '0 auto 16px',
          maxWidth: '1100px',
          color: '#1d1d1f'
        }}>
          Precision Workshop Management for Europe's Elite Automotive Garages.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(14px, 3.5vw, 19px)',
          lineHeight: 1.55,
          color: '#6e6e73',
          maxWidth: '840px',
          margin: '0 auto 32px',
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
          gap: '12px',
          marginBottom: '40px'
        }}>
          <button
            onClick={onLaunchApp}
            style={{
              flex: '1 1 220px',
              maxWidth: '300px',
              padding: '14px 24px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #0071e3 0%, #0095ff 100%)',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(0, 113, 227, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>Launch Workshop App</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onLaunchBooking}
            style={{
              flex: '1 1 200px',
              maxWidth: '280px',
              padding: '14px 22px',
              borderRadius: '14px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              background: '#ffffff',
              boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
              color: '#1d1d1f',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <CalendarIcon size={16} color="#0071e3" />
            <span>Web Booking</span>
          </button>

          <button
            onClick={onOpenAi}
            style={{
              flex: '1 1 180px',
              maxWidth: '240px',
              padding: '14px 20px',
              borderRadius: '14px',
              border: '1px solid rgba(104, 48, 255, 0.2)',
              background: 'linear-gradient(135deg, #f7f5ff 0%, #ffffff 100%)',
              boxShadow: '0 4px 14px rgba(104, 48, 255, 0.08)',
              color: '#5856d6',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={16} color="#5856d6" />
            <span>AutoAI Receptionist</span>
          </button>
        </div>

        {/* 3D Showcase Container */}
        <div style={{
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          borderRadius: '24px',
          padding: '6px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 245, 0.6) 100%)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden'
        }}>
          {/* Main 3D Image Render */}
          <div style={{
            position: 'relative',
            borderRadius: '18px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            maxHeight: '560px',
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
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
              pointerEvents: 'none'
            }}></div>
          </div>
        </div>

        {/* Liquid Glass Highlight Cards (Responsive Grid) */}
        <div style={{
          maxWidth: '1280px',
          margin: '20px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {/* Card 1: Central Engine Pulse */}
          <div className="saas-card" style={{ padding: '18px 20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Activity size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1d1d1f' }}>ONE Central Scheduling Engine</div>
                <div style={{ fontSize: '11px', color: '#248a3d', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34c759', display: 'inline-block' }}></span>
                  Shared by Staff, Web &amp; AI
                </div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#515154', lineHeight: 1.4 }}>
              Real-time bay capacity, mechanic skills &amp; 15-min buffers verified across all channels.
            </div>
          </div>

          {/* Card 2: Cross-Border Compliance */}
          <div className="saas-card" style={{ padding: '18px 20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#86868b' }}>
                CROSS-BORDER BILLING
              </span>
              <span style={{ fontSize: '10px', background: '#e1f0ff', color: '#0071e3', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                EUR &amp; CHF
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ background: 'var(--color-surface-secondary)', padding: '8px 12px', borderRadius: '8px', flex: 1 }}>
                <div style={{ fontSize: '10px', color: '#86868b', fontWeight: '600' }}>FRANCE (TVA)</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1d1d1f' }}>20.0% Factur-X</div>
              </div>
              <div style={{ background: 'var(--color-surface-secondary)', padding: '8px 12px', borderRadius: '8px', flex: 1 }}>
                <div style={{ fontSize: '10px', color: '#86868b', fontWeight: '600' }}>SWITZERLAND</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1d1d1f' }}>8.1% QR-Bill</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2: BENTO VALUE PILLARS */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 24px)',
        maxWidth: '1320px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0071e3', display: 'block', marginBottom: '8px' }}>
            OPERATING SYSTEM ARCHITECTURE
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 42px)', fontWeight: '800', letterSpacing: '-0.03em', margin: '0 0 12px', color: '#1d1d1f' }}>
            Built Specifically for Modern Garages
          </h2>
          <p style={{ fontSize: 'clamp(13px, 2.5vw, 16px)', color: '#6e6e73', maxWidth: '640px', margin: '0 auto' }}>
            Four interconnected subsystems eliminating paperwork, phone tag, and scheduling conflicts.
          </p>
        </div>

        {/* Feature Tab Selector */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          {featureTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isSelected = activeTabFeature === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTabFeature(idx)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: isSelected ? `2px solid ${tab.color}` : '1px solid var(--color-border)',
                  background: isSelected ? 'var(--color-surface)' : 'var(--color-surface-secondary)',
                  color: isSelected ? '#1d1d1f' : '#6e6e73',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: isSelected ? '700' : '500',
                  boxShadow: isSelected ? '0 4px 14px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} color={isSelected ? tab.color : '#86868b'} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Spotlight Card */}
        <div className="saas-card" style={{
          padding: 'clamp(20px, 4vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#eaf4ff',
              color: '#0071e3',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700',
              marginBottom: '14px'
            }}>
              <Zap size={13} />
              <span>{featureTabs[activeTabFeature].metrics}</span>
            </div>

            <h3 style={{ fontSize: 'clamp(20px, 3.5vw, 28px)', fontWeight: '800', letterSpacing: '-0.02em', margin: '0 0 14px', color: '#1d1d1f' }}>
              {featureTabs[activeTabFeature].title}
            </h3>

            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#515154', margin: '0 0 20px' }}>
              {activeTabFeature === 0 && "One availability pipeline across staff calendar, customer self-service booking, and AI receptionists. Prevents double bookings by validating mechanic skills, bay weight capacities, and 15-minute buffers in real time."}
              {activeTabFeature === 1 && "Built specifically for greasy iPad screens. 48px+ large touch targets, fast OBD-II code lookup, live time-clocking with automated labor billing, and photo attachments for customer transparency."}
              {activeTabFeature === 2 && "Deterministic tax engine with automatic detection for France (20% TVA) and Switzerland (8.1% TVA). Generates compliant French Factur-X / Chorus Pro XML and structured Swiss QR-Bills."}
              {activeTabFeature === 3 && "Send instant SMS/Email approval links. Customers inspect itemized labor and spare parts on mobile and authorize repairs with a compliant digital signature in under 3 minutes."}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                activeTabFeature === 0 ? "Zero double bookings across web, phone and walk-ins" : activeTabFeature === 1 ? "Instant OBD-II diagnostic lookup & checklists" : activeTabFeature === 2 ? "Automatic EUR / CHF currency & VAT determination" : "Digital signature legally archived with timestamp",
                activeTabFeature === 0 ? "Automated 15m buffer time injection between appointments" : activeTabFeature === 1 ? "Live labor stopwatch clocks directly to work order" : activeTabFeature === 2 ? "Built-in Chorus Pro (PPF/PDP) payload validator" : "Customers review transparent parts & labor pricing"
              ].map((point, pIdx) => (
                <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1d1d1f' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={11} color="#fff" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Visual Asset preview */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.06)',
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
        padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 24px)',
        maxWidth: '1280px',
        margin: '0 auto',
        borderTop: '1px solid #e5e5ea'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#34c759', display: 'block', marginBottom: '6px' }}>
            RETURN ON INVESTMENT
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: '800', letterSpacing: '-0.03em', margin: '0 0 10px', color: '#1d1d1f' }}>
            Calculate Your Workshop ROI
          </h2>
          <p style={{ fontSize: 'clamp(13px, 2.5vw, 15px)', color: '#6e6e73', maxWidth: '650px', margin: '0 auto' }}>
            See how much administrative time and billable revenue AtelierOS recovers for your garage every single month.
          </p>
        </div>

        <div className="saas-card" style={{
          padding: 'clamp(20px, 5vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {/* Sliders Input Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1d1d1f' }}>Garage Currency</span>
              <div style={{ display: 'flex', background: '#f5f5f7', borderRadius: '8px', padding: '2px' }}>
                <button
                  onClick={() => setPricingCurrency('EUR')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: pricingCurrency === 'EUR' ? '#0071e3' : 'transparent',
                    color: pricingCurrency === 'EUR' ? '#fff' : '#6e6e73',
                    fontWeight: '700',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  EUR (€)
                </button>
                <button
                  onClick={() => setPricingCurrency('CHF')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: pricingCurrency === 'CHF' ? '#d9383a' : 'transparent',
                    color: pricingCurrency === 'CHF' ? '#fff' : '#6e6e73',
                    fontWeight: '700',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  CHF (CHF)
                </button>
              </div>
            </div>

            {/* Slider 1: Mechanics Count */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: '#515154', fontWeight: '600' }}>Number of Active Mechanics</label>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#0071e3' }}>{mechanicsCount} Technicians</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={mechanicsCount}
                onChange={e => setMechanicsCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0071e3', cursor: 'pointer', height: '6px' }}
              />
            </div>

            {/* Slider 2: Monthly Work Orders */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: '#515154', fontWeight: '600' }}>Work Orders / Month</label>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#34c759' }}>{monthlyOrders} Orders</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={monthlyOrders}
                onChange={e => setMonthlyOrders(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#34c759', cursor: 'pointer', height: '6px' }}
              />
            </div>
          </div>

          {/* Results Output Column */}
          <div style={{
            background: 'var(--color-surface-secondary)',
            borderRadius: '20px',
            padding: 'clamp(20px, 4vw, 32px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#86868b', fontWeight: '600', textTransform: 'uppercase' }}>
                Administrative Hours Saved / Month
              </div>
              <div style={{ fontSize: 'clamp(32px, 6vw, 44px)', fontWeight: '800', color: '#1d1d1f', letterSpacing: '-0.02em', margin: '4px 0' }}>
                {hoursSavedPerMonth} <span style={{ fontSize: '18px', fontWeight: '500', color: '#6e6e73' }}>Hours</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <div style={{ fontSize: '12px', color: '#86868b', fontWeight: '600', textTransform: 'uppercase' }}>
                Estimated Monthly Billable Revenue Gain
              </div>
              <div style={{ fontSize: 'clamp(32px, 6vw, 44px)', fontWeight: '800', color: '#34c759', letterSpacing: '-0.02em', margin: '4px 0' }}>
                {pricingCurrency === 'EUR' ? `€${revenueGain.toLocaleString()}` : `CHF ${revenueGain.toLocaleString()}`}
              </div>
              <div style={{ fontSize: '11px', color: '#86868b' }}>
                Based on {pricingCurrency === 'EUR' ? '€88/h (FR)' : 'CHF 148/h (CH)'} recovered technician utilization.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 4: STRUCTURED 4-COLUMN FOOTER */}
      {/* ==================================================================== */}
      <footer style={{
        background: '#f5f5f7',
        borderTop: '1px solid #e5e5ea',
        padding: 'clamp(40px, 6vw, 60px) clamp(16px, 4vw, 24px) 30px',
        color: '#6e6e73',
        fontSize: '13px'
      }}>
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          {/* Column 1: Brand & Prototype Status */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ marginBottom: '12px' }}>
              <img 
                src="/assets/logo.png" 
                alt="AtelierOS" 
                style={{ height: '32px', width: 'auto', display: 'block', objectFit: 'contain' }} 
              />
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.6, color: '#515154', margin: '0 0 14px' }}>
              The Operating System for Modern Automotive Workshops. Built with ONE central scheduling engine and grease-resistant tablet bay mode.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#eaf4ff',
              color: '#0071e3',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              <span>⚡ Prototype Preview • Active Development</span>
            </div>
          </div>

          {/* Column 2: Platform Engine */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f', marginBottom: '14px', letterSpacing: '-0.01em' }}>
              Platform Engine
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ cursor: 'pointer', color: '#515154' }} onClick={onLaunchApp}>Central Scheduling Pipeline</span>
              <span style={{ cursor: 'pointer', color: '#515154' }} onClick={onLaunchApp}>Mechanic iPad Bay Mode</span>
              <span style={{ cursor: 'pointer', color: '#515154' }} onClick={onLaunchApp}>Magic Link Quote Approvals</span>
              <span style={{ cursor: 'pointer', color: '#515154' }} onClick={onLaunchBooking}>Customer Web Booking</span>
              <span style={{ cursor: 'pointer', color: '#515154' }} onClick={onOpenAi}>AutoAI Workshop Assistant</span>
            </div>
          </div>

          {/* Column 3: Regional Governance */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f', marginBottom: '14px', letterSpacing: '-0.01em' }}>
              Regional Governance
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: '#515154' }}>France 20.0% TVA &amp; Factur-X</span>
              <span style={{ color: '#515154' }}>Chorus Pro (PPF/PDP) E-Invoicing</span>
              <span style={{ color: '#515154' }}>Switzerland 8.1% TVA &amp; QR-Bill</span>
              <span style={{ color: '#515154' }}>Swiss BVR &amp; IBAN QR Generator</span>
              <span style={{ color: '#515154' }}>Dual EUR (€) &amp; CHF Currency</span>
            </div>
          </div>

          {/* Column 4: Legal & Trust */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f', marginBottom: '14px', letterSpacing: '-0.01em' }}>
              Legal &amp; Trust
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ cursor: 'pointer', color: '#0071e3' }} onClick={() => onOpenLegal('PRIVACY')}>Privacy Policy (RGPD / nLPD)</span>
              <span style={{ cursor: 'pointer', color: '#0071e3' }} onClick={() => onOpenLegal('TERMS')}>Terms of Service</span>
              <span style={{ cursor: 'pointer', color: '#0071e3' }} onClick={() => onOpenLegal('EINVOICE_INFO')}>Factur-X &amp; QR-Bill Specs</span>
              <span style={{ color: '#515154' }}>Zero-Telemetry Local Architecture</span>
              <span style={{ color: '#515154' }}>Multi-Tenant RBAC Isolation</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          paddingTop: '20px',
          borderTop: '1px solid #e5e5ea',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          fontSize: '11px',
          color: '#86868b'
        }}>
          <div>
            © 2026 AtelierOS. Prototype Version — Under Active Development. All rights reserved.
          </div>
          <div>
            Engineered for Independent Automotive Repair Garages • France &amp; Switzerland
          </div>
        </div>
      </footer>
    </div>
  );
};
