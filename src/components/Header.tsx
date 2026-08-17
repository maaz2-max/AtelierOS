// ==========================================================================
// AtelierOS - Apple Frosted Acrylic Navigation Header & System Bar
// Role-Based Navigation & Access Isolation (Guest, Manager, Mechanic, Customer, SuperAdmin)
// ==========================================================================

import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar as CalendarIcon, 
  ClipboardList, 
  Tablet, 
  Users, 
  Car, 
  FileCheck2, 
  Receipt, 
  Globe2, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  ChevronDown, 
  MessageSquare,
  Building2,
  ExternalLink,
  User,
  LogOut,
  Lock,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { StorageService } from '../services/StorageService';
import { Tenant, SupportedLanguage, AuthUser } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  activeTenant: Tenant;
  onTenantChange: (tenant: Tenant) => void;
  onOpenAiAssistant: () => void;
  onResetDemo: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentUser: AuthUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  activeTenant,
  onTenantChange,
  onOpenAiAssistant,
  onResetDemo,
  currentLanguage,
  onLanguageChange,
  currentUser,
  onOpenLogin,
  onLogout
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const tenants = StorageService.getTenants();
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Role-Isolated Navigation Items Filter
  let navItems: Array<{ id: string; label: string; icon: any; badge?: string; highlight?: boolean }> = [];

  if (!currentUser) {
    // 1. Public / Guest Mode (Before Login)
    navItems = [
      { id: 'landing', label: t.nav.landing || 'Overview', icon: Globe2 },
      { id: 'booking-portal', label: 'Online Web Booking', icon: ExternalLink, highlight: true },
      { id: 'tracking-portal', label: 'Live Repair Tracker', icon: Clock },
      { id: 'approval-portal', label: 'Quote Approval Link', icon: FileCheck2 }
    ];
  } else if (currentUser.role === 'GARAGE_ADMIN') {
    // 2. Workshop Manager / Garage Admin (Luca Sigon / Henri Meier)
    navItems = [
      { id: 'calendar', label: t.nav.calendar || 'Calendar', icon: CalendarIcon },
      { id: 'work-orders', label: t.nav.workOrders || 'Work Orders', icon: ClipboardList },
      { id: 'customers', label: t.nav.customers || 'Customers', icon: Users },
      { id: 'vehicles', label: t.nav.vehicles || 'Vehicles', icon: Car },
      { id: 'quotes', label: t.nav.quotes || 'Quotes', icon: FileCheck2 },
      { id: 'invoices', label: t.nav.invoices || 'Invoices', icon: Receipt },
      { id: 'comms-hub', label: t.nav.communications || 'Communications', icon: MessageSquare }
    ];
  } else if (currentUser.role === 'MECHANIC') {
    // 3. Mechanic / Technician Station (Marc Dupont)
    navItems = [
      { id: 'mechanic-bay', label: 'Mechanic Tablet Bay Mode', icon: Tablet, badge: 'iPad', highlight: true },
      { id: 'work-orders', label: 'Assigned Work Orders', icon: ClipboardList }
    ];
  } else if (currentUser.role === 'CUSTOMER') {
    // 4. Customer / Vehicle Owner Portal (Sophie Laurent)
    navItems = [
      { id: 'customer-portal', label: 'My Garage & Repairs', icon: Car, highlight: true },
      { id: 'booking-portal', label: 'Book New Service', icon: ExternalLink },
      { id: 'tracking-portal', label: 'Live Vehicle Status', icon: Clock }
    ];
  } else if (currentUser.role === 'SUPER_ADMIN') {
    // 5. SaaS Super Admin (Alexandre Mars - MARS Association)
    navItems = [
      { id: 'super-admin', label: t.nav.superAdmin || 'SaaS Super Admin', icon: ShieldCheck, highlight: true },
      { id: 'landing', label: 'Public Showcase', icon: Globe2 }
    ];
  }

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'GARAGE_ADMIN': return { bg: '#e1f0ff', text: '#0071e3', label: 'Manager' };
      case 'MECHANIC': return { bg: '#eaf8ed', text: '#248a3d', label: 'Mechanic' };
      case 'CUSTOMER': return { bg: '#fff2e0', text: '#c46e00', label: 'Customer' };
      case 'SUPER_ADMIN': return { bg: '#eeedff', text: '#5856d6', label: 'Super Admin' };
      default: return { bg: '#f5f5f7', text: '#86868b', label: 'Guest' };
    }
  };

  const roleInfo = getRoleBadgeColor(currentUser?.role);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      padding: '0 16px'
    }}>
      {/* Top Bar: Brand, Tenant Switcher, Language, AI & Auth Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        maxWidth: '1600px',
        margin: '0 auto',
        gap: '12px'
      }}>
        {/* Brand & Attribution Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            onClick={() => {
              if (currentUser?.role === 'CUSTOMER') onNavigate('customer-portal');
              else if (currentUser?.role === 'MECHANIC') onNavigate('mechanic-bay');
              else if (currentUser?.role === 'SUPER_ADMIN') onNavigate('super-admin');
              else onNavigate('landing');
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer',
              textDecoration: 'none' 
            }}
          >
            <img 
              src="/assets/logo.png" 
              alt="AtelierOS Official Logo" 
              style={{ 
                height: '32px', 
                width: 'auto',
                display: 'block',
                objectFit: 'contain'
              }} 
            />
          </div>
        </div>

        {/* Action Controls & Authentication Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Tenant Selector (Visible to Admin / Mechanic or Guest preview) */}
          {(!currentUser || currentUser.role === 'GARAGE_ADMIN' || currentUser.role === 'SUPER_ADMIN') && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  background: '#f5f5f7',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1d1d1f',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <Building2 size={14} color="#0071e3" />
                <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {activeTenant.name}
                </span>
                <span style={{
                  fontSize: '10px',
                  background: activeTenant.country === 'FR' ? '#0071e3' : '#d9383a',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  fontWeight: '700'
                }}>
                  {activeTenant.country}
                </span>
                <ChevronDown size={12} color="#86868b" />
              </button>

              {tenantDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '6px',
                  minWidth: '240px',
                  zIndex: 1100
                }}>
                  <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: '600', color: '#86868b', textTransform: 'uppercase' }}>
                    Switch Active Garage
                  </div>
                  {tenants.map(t => (
                    <div
                      key={t.id}
                      onClick={() => {
                        onTenantChange(t);
                        setTenantDropdownOpen(false);
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: t.id === activeTenant.id ? '#f5f5f7' : 'transparent',
                        fontSize: '13px',
                        fontWeight: t.id === activeTenant.id ? '600' : '400'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{t.name}</span>
                        <span style={{ fontSize: '11px', color: '#86868b' }}>{t.address.city} ({t.currency})</span>
                      </div>
                      <span style={{
                        fontSize: '10px',
                        background: t.country === 'FR' ? '#0071e3' : '#d9383a',
                        color: '#fff',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        fontWeight: '700'
                      }}>
                        {t.country}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                background: '#f5f5f7',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '500',
                color: '#1d1d1f',
                cursor: 'pointer'
              }}
            >
              <Globe2 size={13} color="#86868b" />
              <span>{currentLanguage.toUpperCase()}</span>
              <ChevronDown size={11} color="#86868b" />
            </button>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '4px',
                minWidth: '150px',
                zIndex: 1100
              }}>
                {[
                  { code: 'en', label: 'English (US)' },
                  { code: 'fr', label: 'Français (FR)' },
                  { code: 'fr-CH', label: 'Français (CH)' },
                  { code: 'de-CH', label: 'Deutsch (CH)' }
                ].map(l => (
                  <div
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code as SupportedLanguage);
                      setLangDropdownOpen(false);
                    }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      background: currentLanguage === l.code ? '#f5f5f7' : 'transparent',
                      fontWeight: currentLanguage === l.code ? '600' : '400'
                    }}
                  >
                    {l.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AutoAI Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'linear-gradient(135deg, #0071e3 0%, #5856d6 50%, #af52de 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(88, 86, 214, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
            <span style={{ display: 'inline', letterSpacing: '-0.01em' }}>AutoAI</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetDemo}
            title="Reset to clean initial state"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              background: '#f5f5f7',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '50%',
              color: '#86868b',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
          </button>

          {/* Authentication State Button / User Badge */}
          {!currentUser ? (
            <button
              onClick={onOpenLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                background: '#1d1d1f',
                color: '#ffffff',
                border: 'none',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'transform 0.15s ease'
              }}
            >
              <Lock size={13} color="#fff" />
              <span>Log In</span>
            </button>
          ) : (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px 4px 6px',
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
              >
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                  alt={currentUser.name}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#1d1d1f', lineHeight: 1.1 }}>
                    {currentUser.name}
                  </span>
                  <span style={{ 
                    fontSize: '9px', 
                    fontWeight: '700', 
                    color: roleInfo.text,
                    background: roleInfo.bg,
                    padding: '0 4px',
                    borderRadius: '4px',
                    lineHeight: 1.3
                  }}>
                    {roleInfo.label}
                  </span>
                </div>
                <ChevronDown size={11} color="#86868b" />
              </button>

              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.18)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '8px',
                  minWidth: '220px',
                  zIndex: 1100
                }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #f2f2f7', marginBottom: '6px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '11px', color: '#86868b' }}>{currentUser.email}</div>
                    <div style={{ fontSize: '11px', color: roleInfo.text, fontWeight: '600', marginTop: '2px' }}>
                      {currentUser.roleLabel}
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      setUserMenuOpen(false);
                      onOpenLogin();
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#0071e3',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Users size={14} />
                    <span>Switch Role / User</span>
                  </div>

                  <div 
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#d9383a',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Role-Filtered Navigation Tabs Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        overflowX: 'auto',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '6px 0',
        scrollbarWidth: 'none'
      }}>
        {navItems.map(item => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '20px',
                border: 'none',
                background: isActive 
                  ? '#1d1d1f' 
                  : item.highlight 
                  ? '#eaf4ff' 
                  : 'transparent',
                color: isActive 
                  ? '#ffffff' 
                  : item.highlight 
                  ? '#0071e3' 
                  : '#515154',
                fontSize: '13px',
                fontWeight: isActive ? '600' : '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={15} color={isActive ? '#ffffff' : item.highlight ? '#0071e3' : '#86868b'} />
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: '9px',
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#0071e3',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: '6px',
                  fontWeight: '700'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick hint for Guest mode */}
        {!currentUser && (
          <div 
            onClick={onOpenLogin}
            style={{ 
              marginLeft: 'auto', 
              fontSize: '12px', 
              color: '#0071e3', 
              fontWeight: '500', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: '12px',
              background: '#f5f5f7'
            }}
          >
            <Lock size={12} />
            <span>Sign in to unlock staff/customer tabs</span>
          </div>
        )}
      </div>
    </header>
  );
};
