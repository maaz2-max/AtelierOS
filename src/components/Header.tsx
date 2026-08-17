// ==========================================================================
// AtelierOS — Enterprise Application Shell & Navigation
// Slim Sidebar (Linear/Vercel Aesthetic) + Command Top Bar + Public Nav
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  Calendar as CalendarIcon, 
  ClipboardList, 
  Users, 
  Car, 
  FileCheck2, 
  Receipt, 
  MessageSquare, 
  Bot, 
  ShieldCheck, 
  Tablet, 
  ExternalLink, 
  Clock, 
  Search, 
  Plus, 
  LogOut, 
  Sun, 
  Moon, 
  Command, 
  ChevronDown, 
  Check, 
  Building2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { ViewMode, SupportedLanguage, Tenant, AuthUser } from '../types';
import { translations } from '../i18n/translations';
import { StorageService } from '../services/StorageService';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  activeTenant: Tenant;
  onTenantChange: (tenant: Tenant) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenAiAssistant: () => void;
  onResetDemo: () => void;
  currentUser?: AuthUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  activeTenant,
  onTenantChange,
  currentLanguage,
  onLanguageChange,
  onOpenAiAssistant,
  onResetDemo,
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenCommandPalette
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;

  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  const tenants = StorageService.getTenants();

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    if (nextTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('atelieros_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('atelieros_theme', 'light');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('atelieros_theme');
    if (saved === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (onOpenCommandPalette) onOpenCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenCommandPalette]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on view change or resize
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentView]);

  // ========================================================================
  // PUBLIC / UN-AUTHENTICATED HEADER BAR
  // ========================================================================
  if (!currentUser) {
    return (
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        height: '56px',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('landing')} 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <img 
              src="/assets/logo.png" 
              alt="AtelierOS" 
              style={{ height: '28px', width: 'auto', display: 'block', objectFit: 'contain' }} 
            />
          </div>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => onNavigate('landing')}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentView === 'landing' ? 'var(--color-surface-hover)' : 'transparent',
                color: currentView === 'landing' ? 'var(--brand-blue)' : 'var(--color-text-secondary)',
                fontSize: '13px',
                fontWeight: currentView === 'landing' ? '600' : '500',
                cursor: 'pointer'
              }}
            >
              Overview
            </button>

            <button
              onClick={() => onNavigate('booking-portal')}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentView === 'booking-portal' ? 'var(--color-surface-hover)' : 'transparent',
                color: currentView === 'booking-portal' ? 'var(--brand-blue)' : 'var(--color-text-secondary)',
                fontSize: '13px',
                fontWeight: currentView === 'booking-portal' ? '600' : '500',
                cursor: 'pointer'
              }}
            >
              Web Booking
            </button>

            <button
              onClick={() => onNavigate('tracking-portal')}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentView === 'tracking-portal' ? 'var(--color-surface-hover)' : 'transparent',
                color: currentView === 'tracking-portal' ? 'var(--brand-blue)' : 'var(--color-text-secondary)',
                fontSize: '13px',
                fontWeight: currentView === 'tracking-portal' ? '600' : '500',
                cursor: 'pointer'
              }}
            >
              Live Status
            </button>

            <button
              onClick={() => onNavigate('approval-portal')}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentView === 'approval-portal' ? 'var(--color-surface-hover)' : 'transparent',
                color: currentView === 'approval-portal' ? 'var(--brand-blue)' : 'var(--color-text-secondary)',
                fontSize: '13px',
                fontWeight: currentView === 'approval-portal' ? '600' : '500',
                cursor: 'pointer'
              }}
            >
              Quote Approval
            </button>
          </nav>

          {/* Right Action Controls (Desktop + Mobile Trigger) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Clean Language & Country Selector Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border, #E2E8F0)',
                  borderRadius: 'var(--radius-sm, 6px)',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--color-text-primary, #0F172A)',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
                title="Select Language & Region"
              >
                <span>{currentLanguage.toUpperCase()}</span>
                <ChevronDown size={13} color="#64748B" />
              </button>

              {langDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '6px',
                  boxShadow: '0 14px 35px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
                  zIndex: 1300,
                  minWidth: '220px'
                }}>
                  {[
                    { code: 'en', label: 'English', sub: 'Global / UK' },
                    { code: 'fr', label: 'Français', sub: 'France (TVA 20.0%)' },
                    { code: 'fr-CH', label: 'Français (CH)', sub: 'Suisse (TVA 8.1%)' },
                    { code: 'de-CH', label: 'Deutsch (CH)', sub: 'Schweiz (MWST 8.1%)' }
                  ].map(l => (
                    <div
                      key={l.code}
                      onClick={() => {
                        onLanguageChange(l.code as SupportedLanguage);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: currentLanguage === l.code ? '#EFF6FF' : 'transparent',
                        color: currentLanguage === l.code ? '#2563EB' : '#1E293B',
                        fontWeight: currentLanguage === l.code ? '700' : '500',
                        fontSize: '13px',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ lineHeight: 1.2 }}>{l.label}</div>
                        <div style={{ fontSize: '11px', color: currentLanguage === l.code ? '#3B82F6' : '#64748B', fontWeight: '400', marginTop: '2px' }}>
                          {l.sub}
                        </div>
                      </div>
                      {currentLanguage === l.code && <Check size={16} color="#2563EB" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Log In Button */}
            <button
              onClick={onOpenLogin}
              style={{
                padding: '6px 14px',
                background: 'var(--brand-blue)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Log In
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-nav-toggle"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                background: 'var(--color-surface-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer'
              }}
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <span style={{ fontSize: '18px', lineHeight: 1 }}>☰</span>}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '56px',
            left: 0,
            right: 0,
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: '16px',
            boxShadow: 'var(--shadow-dropdown)',
            zIndex: 1100,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <button
              onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentView === 'landing' ? 'var(--brand-blue-soft)' : 'var(--color-surface-secondary)',
                color: currentView === 'landing' ? 'var(--brand-blue)' : 'var(--color-text-primary)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Overview
            </button>

            <button
              onClick={() => { onNavigate('booking-portal'); setMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentView === 'booking-portal' ? 'var(--brand-blue-soft)' : 'var(--color-surface-secondary)',
                color: currentView === 'booking-portal' ? 'var(--brand-blue)' : 'var(--color-text-primary)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Customer Web Booking
            </button>

            <button
              onClick={() => { onNavigate('tracking-portal'); setMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentView === 'tracking-portal' ? 'var(--brand-blue-soft)' : 'var(--color-surface-secondary)',
                color: currentView === 'tracking-portal' ? 'var(--brand-blue)' : 'var(--color-text-primary)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Live Vehicle Tracker
            </button>

            <button
              onClick={() => { onNavigate('approval-portal'); setMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentView === 'approval-portal' ? 'var(--brand-blue-soft)' : 'var(--color-surface-secondary)',
                color: currentView === 'approval-portal' ? 'var(--brand-blue)' : 'var(--color-text-primary)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Quote Approval Portal
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
              {[
                { code: 'en', flag: '🇬🇧', label: 'English (UK)' },
                { code: 'fr', flag: '🇫🇷', label: 'Français (FR)' },
                { code: 'fr-CH', flag: '🇨🇭', label: 'Français (CH)' },
                { code: 'de-CH', flag: '🇨🇭', label: 'Deutsch (CH)' }
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => { onLanguageChange(l.code as SupportedLanguage); setMobileMenuOpen(false); }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: currentLanguage === l.code ? '1px solid var(--brand-blue)' : '1px solid var(--color-border)',
                    background: currentLanguage === l.code ? 'var(--brand-blue-soft)' : 'var(--color-surface)',
                    color: currentLanguage === l.code ? 'var(--brand-blue)' : 'var(--color-text-primary)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    );
  }

  // ========================================================================
  // AUTHENTICATED SLIM SIDEBAR + TOP BAR NAVIGATION
  // ========================================================================
  const isManager = currentUser.role === 'GARAGE_ADMIN';
  const isMechanic = currentUser.role === 'MECHANIC';
  const isCustomer = currentUser.role === 'CUSTOMER';
  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';

  const navGroups = isManager ? [
    {
      label: 'WORKSHOP',
      items: [
        { id: 'calendar', label: 'Staff Calendar', icon: CalendarIcon },
        { id: 'work-orders', label: 'Work Orders', icon: ClipboardList }
      ]
    },
    {
      label: 'CRM & FLEET',
      items: [
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'vehicles', label: 'Vehicles', icon: Car }
      ]
    },
    {
      label: 'COMMERCIAL',
      items: [
        { id: 'quotes', label: 'Quotes & Estimates', icon: FileCheck2 },
        { id: 'invoices', label: 'Invoices & Factur-X', icon: Receipt }
      ]
    },
    {
      label: 'OPERATIONS',
      items: [
        { id: 'comms-hub', label: 'Communications', icon: MessageSquare }
      ]
    }
  ] : isMechanic ? [
    {
      label: 'STATION',
      items: [
        { id: 'mechanic-bay', label: 'Tablet Bay Mode', icon: Tablet },
        { id: 'work-orders', label: 'Assigned Orders', icon: ClipboardList }
      ]
    }
  ] : isCustomer ? [
    {
      label: 'MY GARAGE',
      items: [
        { id: 'customer-portal', label: 'My Vehicles & Repairs', icon: Car },
        { id: 'booking-portal', label: 'Book Service', icon: ExternalLink },
        { id: 'tracking-portal', label: 'Live Vehicle Status', icon: Clock }
      ]
    }
  ] : [
    {
      label: 'GOVERNANCE',
      items: [
        { id: 'super-admin', label: 'SaaS Platform Admin', icon: ShieldCheck },
        { id: 'landing', label: 'Public Showcase', icon: ExternalLink }
      ]
    }
  ];

  return (
    <>
      {/* Top Application Bar */}
      <div style={{
        marginLeft: '240px',
        height: '48px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 900
      }}>
        {/* Breadcrumb / Search trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{activeTenant.name}</span>
            <span>/</span>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: '600' }}>
              {currentView.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          {/* Command Search Bar (Ctrl+K) */}
          <button
            onClick={onOpenCommandPalette}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-muted)',
              fontSize: '12px',
              cursor: 'pointer',
              minWidth: '220px'
            }}
          >
            <Search size={13} />
            <span>Search orders, plates, VIN...</span>
            <span style={{ 
              marginLeft: 'auto', 
              fontSize: '10px', 
              background: 'var(--color-surface)', 
              padding: '1px 5px', 
              borderRadius: '3px', 
              border: '1px solid var(--color-border)', 
              fontFamily: 'var(--font-mono)' 
            }}>
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Quick Create Dropdown (Manager) */}
          {isManager && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setQuickCreateOpen(!quickCreateOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  background: 'var(--brand-blue)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Plus size={13} />
                <span>New</span>
                <ChevronDown size={12} />
              </button>

              {quickCreateOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px',
                  boxShadow: 'var(--shadow-dropdown)',
                  zIndex: 1100,
                  minWidth: '160px'
                }}>
                  <div 
                    onClick={() => { onNavigate('calendar'); setQuickCreateOpen(false); }}
                    style={{ padding: '6px 10px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', color: 'var(--color-text-primary)' }}
                  >
                    + New Appointment
                  </div>
                  <div 
                    onClick={() => { onNavigate('work-orders'); setQuickCreateOpen(false); }}
                    style={{ padding: '6px 10px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', color: 'var(--color-text-primary)' }}
                  >
                    + New Work Order
                  </div>
                  <div 
                    onClick={() => { onNavigate('quotes'); setQuickCreateOpen(false); }}
                    style={{ padding: '6px 10px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', color: 'var(--color-text-primary)' }}
                  >
                    + New Quote
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AutoAI Quick Trigger */}
          <button
            onClick={onOpenAiAssistant}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 10px',
              background: 'var(--color-ai-soft)',
              border: '1px solid var(--color-ai-border)',
              color: 'var(--color-ai)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Bot size={13} />
            <span>AI Assistant</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            style={{
              padding: '4px 8px',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer'
            }}
          >
            {currentLanguage.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Slim Desktop Sidebar (Fixed Left, 240px) */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '240px',
        background: 'var(--color-sidebar)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000
      }}>
        {/* Brand Header */}
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src="/assets/logo.png" 
              alt="AtelierOS" 
              style={{ height: '26px', width: 'auto', display: 'block', objectFit: 'contain' }} 
            />
          </div>
        </div>

        {/* Workshop Switcher (Manager Only) */}
        {isManager && (
          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  background: 'var(--color-surface-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                  <Building2 size={14} color="var(--brand-blue)" />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {activeTenant.name}
                  </span>
                </div>
                <span style={{
                  fontSize: '10px',
                  background: activeTenant.country === 'FR' ? '#0071e3' : '#d9383a',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  fontWeight: '700'
                }}>
                  {activeTenant.country}
                </span>
              </button>

              {tenantDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px',
                  boxShadow: 'var(--shadow-dropdown)',
                  zIndex: 1100
                }}>
                  {tenants.map(t => (
                    <div
                      key={t.id}
                      onClick={() => {
                        onTenantChange(t);
                        setTenantDropdownOpen(false);
                      }}
                      style={{
                        padding: '6px 8px',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        background: t.id === activeTenant.id ? 'var(--brand-blue-soft)' : 'transparent',
                        color: t.id === activeTenant.id ? 'var(--brand-blue)' : 'var(--color-text-primary)'
                      }}
                    >
                      <span>{t.name}</span>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{t.country} ({t.currency})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Group Items */}
        <div style={{ flex: 1, padding: '14px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navGroups.map((grp, gIdx) => (
            <div key={gIdx}>
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                color: 'var(--color-text-muted)',
                padding: '0 8px 6px'
              }}>
                {grp.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {grp.items.map(item => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id as ViewMode)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '7px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        background: isActive ? 'var(--brand-blue-soft)' : 'transparent',
                        color: isActive ? 'var(--brand-blue)' : 'var(--color-text-secondary)',
                        fontSize: '13px',
                        fontWeight: isActive ? '600' : '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.12s ease'
                      }}
                    >
                      <Icon size={16} color={isActive ? 'var(--brand-blue)' : 'var(--color-text-muted)'} />
                      <span style={{ flex: 1 }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom User & Theme Footer */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--brand-navy)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700'
              }}>
                {currentUser.name.charAt(0)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                  {currentUser.roleLabel}
                </div>
              </div>
            </div>

            {/* Dark/Light Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Light/Dark Theme"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          <button
            onClick={onLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11px',
              fontWeight: '500',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer'
            }}
          >
            <LogOut size={12} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
