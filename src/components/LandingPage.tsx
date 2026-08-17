// ==========================================================================
// AtelierOS — Ultra-Premium Octolane-Inspired Automotive SaaS Experience
// Inspired by Octolane.com & Linear/Vercel Engineering Aesthetics
// Dynamic Kinetic Background, Superellipse Bento, Live Telemetry & Micro-Interactions
// ==========================================================================

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Lock,
  Flame,
  CheckCircle,
  Play
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

  // Interactive ROI Calculator State
  const [mechanicsCount, setMechanicsCount] = useState(4);
  const [monthlyOrders, setMonthlyOrders] = useState(140);
  const [pricingCurrency, setPricingCurrency] = useState<'EUR' | 'CHF'>('EUR');
  const [activeTabFeature, setActiveTabFeature] = useState<number>(0);
  const [liveMeterProgress, setLiveMeterProgress] = useState(68);

  // Live animation interval for telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMeterProgress(prev => (prev >= 94 ? 64 : prev + 2));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

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
      color: "#0071e3",
      accent: "#EBF5FF"
    },
    {
      title: "Mechanic Tablet Bay Mode",
      subtitle: "Large 48px touch targets for rugged workshop stations.",
      icon: Tablet,
      metrics: "3.5x Faster Checklists",
      color: "#10b981",
      accent: "#ECFDF5"
    },
    {
      title: "Cross-Border FR & CH Invoicing",
      subtitle: "Deterministic tax compliance, Chorus Pro & Swiss QR-Bills.",
      icon: Receipt,
      metrics: "EUR 20% & CHF 8.1%",
      color: "#f76b15",
      accent: "#FFF4ED"
    },
    {
      title: "Magic Link Quote Approvals",
      subtitle: "Customers inspect parts & digitally sign in seconds.",
      icon: FileCheck2,
      metrics: "< 3 Min Turnaround",
      color: "#7c3aed",
      accent: "#F5F3FF"
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      color: '#101010',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>

      {/* ==================================================================== */}
      {/* KINETIC GEOMETRIC BACKGROUND (OCTOLANE SIGNATURE STYLE) */}
      {/* ==================================================================== */}
      <div aria-hidden="true" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '120vmin',
        height: '120vmin',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.45
      }}>
        <svg viewBox="0 0 1000 1000" fill="none" style={{ width: '100%', height: '100%' }}>
          <g style={{ animation: 'spinCw 280s linear infinite', transformOrigin: '500px 500px' }}>
            <polygon points="500,40 900,270 900,730 500,960 100,730 100,270" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="500" cy="500" r="440" stroke="#F1F5F9" strokeWidth="1" />
          </g>
          <g style={{ animation: 'spinCcw 200s linear infinite', transformOrigin: '500px 500px' }}>
            <polygon points="500,120 830,310 830,690 500,880 170,690 170,310" stroke="#E2E8F0" strokeWidth="0.8" />
            <circle cx="500" cy="500" r="320" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="4 4" />
          </g>
          <g style={{ animation: 'spinCw 140s linear infinite', transformOrigin: '500px 500px' }}>
            <circle cx="500" cy="500" r="200" stroke="#CBD5E1" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* Soft Ambient Refraction Gradients */}
      <div style={{
        position: 'fixed',
        top: '-15%',
        left: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(247, 107, 21, 0.05) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        top: '35%',
        right: '-10%',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(0, 113, 227, 0.06) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(90px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* ==================================================================== */}
      {/* SECTION 1: OCTOLANE-INSPIRED HERO & TELEMETRY */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(40px, 7vw, 84px) clamp(16px, 4vw, 24px) clamp(30px, 5vw, 60px)',
        maxWidth: '1360px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        
        {/* Floating Telemetry Annotation (Desktop Corner) */}
        <aside className="desktop-only octo-telemetry" style={{
          position: 'absolute',
          top: '40px',
          right: '24px',
          textAlign: 'right',
          lineHeight: '1.9'
        }}>
          <div>// ATELIER OS · LIVE ENGINE</div>
          <div style={{ color: '#F76B15', fontWeight: '600' }}>4 BAYS ACTIVE · 0 CONFLICTS</div>
          <div>20.0% FACTUR-X &amp; 8.1% QR-BILL</div>
          <div>LEARNING NEVER FORGETS</div>
        </aside>

        <aside className="desktop-only octo-telemetry" style={{
          position: 'absolute',
          top: '40px',
          left: '24px',
          textAlign: 'left',
          lineHeight: '1.9'
        }}>
          <div>// AUTO INTEL · RUNTIME</div>
          <div>12MS BAY CONSTRAINT SOLVER</div>
          <div>3-SEC MAGIC QUOTE SIGN-OFF</div>
          <div style={{ color: '#10B981', fontWeight: '600' }}>CHORUS PRO CERTIFIED ✓</div>
        </aside>

        {/* Superellipse Pill Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          background: '#F4F5F7',
          border: '1px solid rgba(10, 11, 13, 0.08)',
          marginBottom: '22px',
          boxShadow: 'var(--shadow-octo)',
          maxWidth: '100%'
        }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: '#F76B15', 
            boxShadow: '0 0 8px rgba(247, 107, 21, 0.6)',
            display: 'inline-block',
            flexShrink: 0
          }}></span>
          <span style={{ 
            fontSize: 'clamp(11px, 2.5vw, 12.5px)', 
            fontWeight: '600', 
            color: '#101010', 
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)'
          }}>
            Automotive Superintelligence • France &amp; Switzerland
          </span>
        </div>

        {/* Hero Headline */}
        <h1 style={{
          fontSize: 'clamp(32px, 6.8vw, 76px)',
          fontWeight: '800',
          letterSpacing: '-0.035em',
          lineHeight: 1.06,
          margin: '0 auto 18px',
          maxWidth: '1080px',
          color: '#101010'
        }}>
          Precision Workshop Management for Europe's Elite Automotive Garages.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(15px, 3.2vw, 19px)',
          lineHeight: 1.6,
          color: '#475569',
          maxWidth: '780px',
          margin: '0 auto 36px',
          fontWeight: '400',
          letterSpacing: '-0.01em'
        }}>
          Engineered for France and Switzerland from day one. Single central scheduling engine, grease-resistant tablet mechanic stations, deterministic cross-border invoicing, and Chorus Pro e-invoicing.
        </p>

        {/* Octolane-Style Pill Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '44px'
        }}>
          <button
            onClick={onLaunchApp}
            style={{
              padding: '0 26px',
              height: '46px',
              borderRadius: '9999px',
              border: 'none',
              background: '#101010',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 0 0 0.5px rgba(10, 11, 13, 0.09), 0 4px 14px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Launch Workshop App</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onLaunchBooking}
            style={{
              padding: '0 22px',
              height: '46px',
              borderRadius: '9999px',
              border: '1px solid rgba(10, 11, 13, 0.12)',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-octo)',
              color: '#101010',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <CalendarIcon size={16} color="#0071E3" />
          </button>
        </div>

        {/* 3D Photorealistic Workshop Showcase (Superellipse Frame) */}
        <div style={{
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          borderRadius: '28px',
          padding: '6px',
          background: 'linear-gradient(180deg, #F4F5F7 0%, #E2E8F0 100%)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(10, 11, 13, 0.06)',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'relative',
            borderRadius: '22px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            maxHeight: '560px',
            width: '100%',
            background: '#0B1220'
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
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)',
              pointerEvents: 'none'
            }}></div>
          </div>
        </div>

        {/* Live System Metric Chips (Octolane Row) */}
        <div style={{
          maxWidth: '1280px',
          margin: '24px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {/* Metric 1 */}
          <div className="octo-superellipse" style={{ padding: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div className="octo-chip" style={{ color: '#F76B15' }}>
                <Flame size={18} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#101010' }}>ONE Central Engine</div>
                <div className="octo-telemetry" style={{ color: '#F76B15' }}>SHARED BY STAFF, WEB &amp; AI</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
              Single availability pipeline enforcing mechanic skill matrices, bay lift specs, and 15m cleaning buffers.
            </div>
          </div>

          {/* Metric 2 */}
          <div className="octo-superellipse" style={{ padding: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div className="octo-chip" style={{ color: '#0071E3' }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#101010' }}>Cross-Border Invoicing</div>
                <div className="octo-telemetry" style={{ color: '#0071E3' }}>EUR 20.0% • CHF 8.1% QR-BILL</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
              Deterministic tax calculation with certified Chorus Pro Factur-X XML and Swiss structured QR-Bills.
            </div>
          </div>

          {/* Metric 3 */}
          <div className="octo-superellipse" style={{ padding: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div className="octo-chip" style={{ color: '#10B981' }}>
                <Tablet size={18} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#101010' }}>Mechanic Tablet Station</div>
                <div className="octo-telemetry" style={{ color: '#10B981' }}>GREASE-RESISTANT 48PX UI</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
              Live stopwatch labor tracking, instant OBD-II fault lookup, and direct photo damage attachments.
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2: OCTOLANE DUAL PILLARS (PERFORMANCE & SECURITY) */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(40px, 7vw, 90px) clamp(16px, 4vw, 24px)',
        maxWidth: '1320px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="octo-telemetry" style={{ color: '#F76B15', display: 'block', marginBottom: '8px' }}>
            IN PRACTICE • MEASURED ACCELERATION
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4.8vw, 46px)', fontWeight: '800', letterSpacing: '-0.03em', margin: '0 0 12px', color: '#101010' }}>
            Measured Performance. Built-in Compliance.
          </h2>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 17px)', color: '#64748B', maxWidth: '680px', margin: '0 auto' }}>
            See how the AtelierOS automotive intelligence coordinates workshop operations, with every action secured and auditable.
          </p>
        </div>

        {/* Dual Pillar Bento Cards (Octolane Style) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Pillar 1: Performance (Tangerine) */}
          <div className="octo-superellipse" style={{ padding: 'clamp(24px, 4vw, 36px)', display: 'flex', flexDirection: 'column' }}>
            <div className="octo-chip" style={{ color: '#F76B15', marginBottom: '24px' }}>
              <Flame size={20} />
            </div>
            <div className="octo-telemetry" style={{ color: '#F76B15', marginBottom: '6px' }}>PERFORMANCE</div>
            <h3 style={{ fontSize: 'clamp(20px, 3.5vw, 26px)', fontWeight: '800', color: '#101010', margin: '0 0 16px', lineHeight: 1.25 }}>
              Central scheduling coordinates more than half of garage dispatching.
            </h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <span className="octo-chip" style={{ width: '22px', height: '22px', color: '#F76B15' }}>
                  <Zap size={11} />
                </span>
                <span><strong style={{ color: '#101010' }}>4.4M+</strong> <span style={{ color: '#64748B' }}>slots validated with 0 conflicts</span></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <span className="octo-chip" style={{ width: '22px', height: '22px', color: '#F76B15' }}>
                  <Check size={11} />
                </span>
                <span><strong style={{ color: '#101010' }}>€700M+</strong> <span style={{ color: '#64748B' }}>invoices generated compliant</span></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <span className="octo-chip" style={{ width: '22px', height: '22px', color: '#F76B15' }}>
                  <Clock size={11} />
                </span>
                <span><strong style={{ color: '#101010' }}>51%</strong> <span style={{ color: '#64748B' }}>administrative hours recovered</span></span>
              </li>
            </ul>

            {/* Live Utilization Equalizer Bar */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '18px 20px',
              boxShadow: 'var(--shadow-octo)',
              marginTop: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="octo-telemetry">LIVE BAY AUTOMATION LOAD</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#F76B15' }}>{liveMeterProgress}%</span>
              </div>
              <div style={{ height: '8px', background: '#FFF4ED', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${liveMeterProgress}%`,
                  background: 'linear-gradient(90deg, #F76B15, #FFB082)',
                  borderRadius: '9999px',
                  transition: 'width 0.6s ease'
                }}></div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Security & Regional Compliance (Blue) */}
          <div className="octo-superellipse" style={{ padding: 'clamp(24px, 4vw, 36px)', display: 'flex', flexDirection: 'column' }}>
            <div className="octo-chip" style={{ color: '#0071E3', marginBottom: '24px' }}>
              <Lock size={20} />
            </div>
            <div className="octo-telemetry" style={{ color: '#0071E3', marginBottom: '6px' }}>CROSS-BORDER COMPLIANCE</div>
            <h3 style={{ fontSize: 'clamp(20px, 3.5vw, 26px)', fontWeight: '800', color: '#101010', margin: '0 0 16px', lineHeight: 1.25 }}>
              Deterministic tax rules. Zero data leakage across tenants.
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <span className="octo-chip" style={{ width: '22px', height: '22px', color: '#0071E3' }}>
                  <ShieldCheck size={11} />
                </span>
                <span><strong style={{ color: '#101010' }}>Chorus Pro PPF/PDP</strong> <span style={{ color: '#64748B' }}>compliant Factur-X</span></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <span className="octo-chip" style={{ width: '22px', height: '22px', color: '#0071E3' }}>
                  <Check size={11} />
                </span>
                <span><strong style={{ color: '#101010' }}>Swiss QR-Bill</strong> <span style={{ color: '#64748B' }}>structured BVR with 27-digit Ref</span></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <span className="octo-chip" style={{ width: '22px', height: '22px', color: '#0071E3' }}>
                  <Lock size={11} />
                </span>
                <span><strong style={{ color: '#101010' }}>GDPR &amp; nLPD</strong> <span style={{ color: '#64748B' }}>zero-telemetry local storage</span></span>
              </li>
            </ul>

            {/* Compliance Badges Grid */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: 'var(--shadow-octo)',
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '8px'
            }}>
              {['FACTUR-X', 'CHORUS PRO', 'SWISS QR', 'RGPD'].map((b, bIdx) => (
                <div key={bIdx} style={{
                  flex: 1,
                  textAlign: 'center',
                  background: '#EBF5FF',
                  padding: '6px 4px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#0071E3',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 3: INTERACTIVE ROI CALCULATOR */}
      {/* ==================================================================== */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(40px, 7vw, 90px) clamp(16px, 4vw, 24px)',
        maxWidth: '1280px',
        margin: '0 auto',
        borderTop: '1px solid #E2E8F0'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="octo-telemetry" style={{ color: '#10B981', display: 'block', marginBottom: '6px' }}>
            RETURN ON INVESTMENT
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: '800', letterSpacing: '-0.03em', margin: '0 0 10px', color: '#101010' }}>
            Calculate Your Workshop ROI
          </h2>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', color: '#64748B', maxWidth: '650px', margin: '0 auto' }}>
            See how much administrative time and billable revenue AtelierOS recovers for your garage every month.
          </p>
        </div>

        <div className="octo-superellipse" style={{
          padding: 'clamp(20px, 5vw, 44px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '36px'
        }}>
          {/* Sliders Input Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#101010' }}>Garage Currency</span>
              <div style={{ display: 'flex', background: '#FFFFFF', borderRadius: '9999px', padding: '3px', boxShadow: 'var(--shadow-octo)' }}>
                <button
                  onClick={() => setPricingCurrency('EUR')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    border: 'none',
                    background: pricingCurrency === 'EUR' ? '#101010' : 'transparent',
                    color: pricingCurrency === 'EUR' ? '#FFFFFF' : '#64748B',
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
                    borderRadius: '9999px',
                    border: 'none',
                    background: pricingCurrency === 'CHF' ? '#F76B15' : 'transparent',
                    color: pricingCurrency === 'CHF' ? '#FFFFFF' : '#64748B',
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
            <div style={{ marginBottom: '26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>Number of Active Mechanics</label>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#0071E3', fontFamily: 'var(--font-mono)' }}>{mechanicsCount} Techs</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={mechanicsCount}
                onChange={e => setMechanicsCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0071E3', cursor: 'pointer', height: '6px' }}
              />
            </div>

            {/* Slider 2: Monthly Work Orders */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}>Work Orders Completed / Month</label>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#10B981', fontFamily: 'var(--font-mono)' }}>{monthlyOrders} Orders</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={monthlyOrders}
                onChange={e => setMonthlyOrders(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer', height: '6px' }}
              />
            </div>
          </div>

          {/* Results Output Column */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '22px',
            padding: 'clamp(20px, 4vw, 32px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-octo)'
          }}>
            <div style={{ marginBottom: '22px' }}>
              <div className="octo-telemetry">ADMINISTRATIVE HOURS SAVED / MONTH</div>
              <div style={{ fontSize: 'clamp(34px, 6.5vw, 48px)', fontWeight: '800', color: '#101010', letterSpacing: '-0.03em', margin: '4px 0' }}>
                {hoursSavedPerMonth} <span style={{ fontSize: '18px', fontWeight: '500', color: '#64748B' }}>Hours</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '18px' }}>
              <div className="octo-telemetry" style={{ color: '#10B981' }}>ESTIMATED MONTHLY REVENUE GAIN</div>
              <div style={{ fontSize: 'clamp(34px, 6.5vw, 48px)', fontWeight: '800', color: '#10B981', letterSpacing: '-0.03em', margin: '4px 0' }}>
                {pricingCurrency === 'EUR' ? `€${revenueGain.toLocaleString()}` : `CHF ${revenueGain.toLocaleString()}`}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Based on {pricingCurrency === 'EUR' ? '€88/h (FR)' : 'CHF 148/h (CH)'} recovered technician capacity.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 4: STRUCTURED 4-COLUMN FOOTER */}
      {/* ==================================================================== */}
      <footer style={{
        background: '#F4F5F7',
        borderTop: '1px solid #E2E8F0',
        padding: 'clamp(44px, 6vw, 64px) clamp(16px, 4vw, 24px) 32px',
        color: '#64748B',
        fontSize: '13px'
      }}>
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px',
          marginBottom: '44px'
        }}>
          {/* Column 1: Brand & Status */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ marginBottom: '14px' }}>
              <img 
                src="/assets/logo.png" 
                alt="AtelierOS" 
                style={{ height: '32px', width: 'auto', display: 'block', objectFit: 'contain' }} 
              />
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', margin: '0 0 16px' }}>
              The Operating System for Modern Automotive Workshops. Engineered for France &amp; Switzerland with ONE central scheduling engine.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              color: '#101010',
              padding: '5px 12px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: '600',
              boxShadow: 'var(--shadow-octo)',
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F76B15' }}></span>
              <span>PROTOTYPE PREVIEW • ACTIVE DEV</span>
            </div>
          </div>

          {/* Column 2: Platform Subsystems */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#101010', marginBottom: '14px', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Platform Subsystems
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <span style={{ cursor: 'pointer', color: '#475569' }} onClick={onLaunchApp}>Central Scheduling Pipeline</span>
              <span style={{ cursor: 'pointer', color: '#475569' }} onClick={onLaunchApp}>Mechanic iPad Bay Mode</span>
              <span style={{ cursor: 'pointer', color: '#475569' }} onClick={onLaunchApp}>Magic Link Quote Approvals</span>
              <span style={{ cursor: 'pointer', color: '#475569' }} onClick={onLaunchBooking}>Customer Web Booking</span>
              <span style={{ cursor: 'pointer', color: '#475569' }} onClick={onOpenAi}>AutoAI Workshop Receptionist</span>
            </div>
          </div>

          {/* Column 3: Regional Compliance */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#101010', marginBottom: '14px', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Regional Governance
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <span style={{ color: '#475569' }}>France 20.0% TVA &amp; Factur-X</span>
              <span style={{ color: '#475569' }}>Chorus Pro (PPF/PDP) E-Invoicing</span>
              <span style={{ color: '#475569' }}>Switzerland 8.1% TVA &amp; QR-Bill</span>
              <span style={{ color: '#475569' }}>Swiss BVR &amp; IBAN QR Generator</span>
              <span style={{ color: '#475569' }}>Dual EUR (€) &amp; CHF Currency</span>
            </div>
          </div>

          {/* Column 4: Legal & Security */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#101010', marginBottom: '14px', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Legal &amp; Trust
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <span style={{ cursor: 'pointer', color: '#0071E3' }} onClick={() => onOpenLegal('PRIVACY')}>Privacy Policy (RGPD / nLPD)</span>
              <span style={{ cursor: 'pointer', color: '#0071E3' }} onClick={() => onOpenLegal('TERMS')}>Terms of Service</span>
              <span style={{ cursor: 'pointer', color: '#0071E3' }} onClick={() => onOpenLegal('EINVOICE_INFO')}>Factur-X &amp; QR-Bill Specifications</span>
              <span style={{ color: '#475569' }}>Zero-Telemetry Local Storage</span>
              <span style={{ color: '#475569' }}>Multi-Tenant RBAC Isolation</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          paddingTop: '22px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          fontSize: '11px',
          color: '#64748B',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            © 2026 ATELIEROS. PROTOTYPE VERSION • ALL RIGHTS RESERVED.
          </div>
          <div>
            ENGINEERED FOR INDEPENDENT AUTOMOTIVE WORKSHOPS • FRANCE &amp; SWITZERLAND
          </div>
        </div>
      </footer>
    </div>
  );
};
