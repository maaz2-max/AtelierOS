// ==========================================================================
// AtelierOS - Main Application Master Component
// Role-Based Access Control (RBAC) & Isolated Workspaces
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { StorageService } from './services/StorageService';
import { Tenant, SupportedLanguage, AuthUser } from './types';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { StaffCalendar } from './components/StaffCalendar';
import { WorkOrderBoard } from './components/WorkOrderBoard';
import { MechanicTabletMode } from './components/MechanicTabletMode';
import { CustomerDirectory } from './components/CustomerDirectory';
import { VehicleDirectory } from './components/VehicleDirectory';
import { QuoteManager } from './components/QuoteManager';
import { InvoiceManager } from './components/InvoiceManager';
import { CustomerBookingPortal } from './components/CustomerBookingPortal';
import { CustomerApprovalPortal } from './components/CustomerApprovalPortal';
import { CustomerTrackingPortal } from './components/CustomerTrackingPortal';
import { CustomerPortalView } from './components/CustomerPortalView';
import { CommunicationsHub } from './components/CommunicationsHub';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { LegalModal } from './components/LegalModals';
import { ConfirmationModal } from './components/ConfirmationModal';
import { LoginModal } from './components/LoginModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';

export const App: React.FC = () => {
  // Initialize storage
  useEffect(() => {
    StorageService.init();
  }, []);

  const [activeTenant, setActiveTenant] = useState<Tenant>(() => StorageService.getActiveTenant());
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => StorageService.getLanguage() as SupportedLanguage || 'en');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => StorageService.getAuthUser());
  const [currentView, setCurrentView] = useState<string>(() => {
    const user = StorageService.getAuthUser();
    if (!user) return 'landing';
    if (user.role === 'MECHANIC') return 'mechanic-bay';
    if (user.role === 'CUSTOMER') return 'customer-portal';
    if (user.role === 'SUPER_ADMIN') return 'super-admin';
    return 'calendar';
  });

  // Cross-view parameters
  const [targetWorkOrderId, setTargetWorkOrderId] = useState<string | undefined>(undefined);
  const [magicQuoteToken, setMagicQuoteToken] = useState<string | undefined>(undefined);

  // Modals
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'PRIVACY' | 'TERMS' | 'EINVOICE_INFO' | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Event listeners for storage and authentication changes
  useEffect(() => {
    const handleTenantChange = () => {
      setActiveTenant(StorageService.getActiveTenant());
    };
    const handleLanguageChange = () => {
      setCurrentLanguage(StorageService.getLanguage() as SupportedLanguage);
    };
    const handleAuthChange = () => {
      const user = StorageService.getAuthUser();
      setCurrentUser(user);
    };

    window.addEventListener('tenantChanged', handleTenantChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('authChanged', handleAuthChange);
    return () => {
      window.removeEventListener('tenantChanged', handleTenantChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, []);

  const handleNavigate = (view: string, params?: any) => {
    if (params?.workOrderId) {
      setTargetWorkOrderId(params.workOrderId);
    }
    if (params?.token) {
      setMagicQuoteToken(params.token);
    }

    // Role-based view guards
    const publicViews = ['landing', 'booking-portal', 'tracking-portal', 'approval-portal'];
    if (!currentUser && !publicViews.includes(view)) {
      setIsLoginOpen(true);
      return;
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    if (user.role === 'MECHANIC') {
      setCurrentView('mechanic-bay');
    } else if (user.role === 'CUSTOMER') {
      setCurrentView('customer-portal');
    } else if (user.role === 'SUPER_ADMIN') {
      setCurrentView('super-admin');
    } else {
      setCurrentView('calendar');
    }
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleConfirmReset = () => {
    StorageService.resetDemoData();
    setActiveTenant(StorageService.getActiveTenant());
    setConfirmResetOpen(false);
    alert('Demo data has been reset to default clean state.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f7' }}>
      {/* Dynamic Header with Role-Based Navigation */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        activeTenant={activeTenant}
        onTenantChange={(t) => {
          StorageService.setActiveTenantId(t.id);
          setActiveTenant(t);
        }}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        onResetDemo={() => setConfirmResetOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => {
          StorageService.setLanguage(lang);
          setCurrentLanguage(lang);
        }}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onOpenCommandPalette={() => setIsCmdPaletteOpen(true)}
      />

      {/* Main View Router */}
      <main style={{ 
        flex: 1, 
        marginLeft: (currentUser && !['landing', 'booking-portal', 'tracking-portal', 'approval-portal'].includes(currentView)) ? '240px' : '0',
        transition: 'margin-left 0.15s ease'
      }}>
        {/* Public / Landing Showcase */}
        {currentView === 'landing' && (
          <LandingPage
            onLaunchApp={() => {
              if (currentUser) {
                if (currentUser.role === 'CUSTOMER') setCurrentView('customer-portal');
                else if (currentUser.role === 'MECHANIC') setCurrentView('mechanic-bay');
                else if (currentUser.role === 'SUPER_ADMIN') setCurrentView('super-admin');
                else setCurrentView('calendar');
              } else {
                setIsLoginOpen(true);
              }
            }}
            onLaunchBooking={() => handleNavigate('booking-portal')}
            onOpenAi={() => setIsAiOpen(true)}
            onOpenLegal={(type) => setLegalModalType(type)}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Garage Admin / Manager: Calendar */}
        {currentView === 'calendar' && (
          <StaffCalendar
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            onSelectWorkOrder={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('work-orders');
            }}
          />
        )}

        {/* Garage Admin & Mechanic: Work Orders */}
        {currentView === 'work-orders' && (
          <WorkOrderBoard
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            highlightWorkOrderId={targetWorkOrderId}
            onOpenMechanicTablet={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('mechanic-bay');
            }}
            onGenerateQuote={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('quotes');
            }}
          />
        )}

        {/* Mechanic Tablet Mode (Grease-resistant iPad station) */}
        {currentView === 'mechanic-bay' && (
          <MechanicTabletMode
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            initialWorkOrderId={targetWorkOrderId}
            onOpenQuote={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('quotes');
            }}
          />
        )}

        {/* Garage Admin: Customer Directory */}
        {currentView === 'customers' && (
          <CustomerDirectory
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            onSelectCustomer={(cId) => {
              // Quick filter by customer
            }}
          />
        )}

        {/* Garage Admin: Vehicle Directory */}
        {currentView === 'vehicles' && (
          <VehicleDirectory
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Garage Admin: Commercial Quotations */}
        {currentView === 'quotes' && (
          <QuoteManager
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            targetWorkOrderId={targetWorkOrderId}
            onOpenApprovalPortal={(token) => {
              setMagicQuoteToken(token);
              setCurrentView('approval-portal');
            }}
            onGenerateInvoice={(qId) => {
              setCurrentView('invoices');
            }}
          />
        )}

        {/* Garage Admin: Invoices & Factur-X / Chorus Pro */}
        {currentView === 'invoices' && (
          <InvoiceManager
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Customer Portal: Isolated Customer Vehicle & Repair Hub */}
        {currentView === 'customer-portal' && currentUser && (
          <CustomerPortalView
            currentUser={currentUser}
            onNavigate={handleNavigate}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Public & Customer: Central Online Web Booking Portal */}
        {currentView === 'booking-portal' && (
          <CustomerBookingPortal
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            onBookingComplete={(woId) => {
              setTargetWorkOrderId(woId);
              if (currentUser?.role === 'CUSTOMER') {
                setCurrentView('customer-portal');
              } else {
                setCurrentView('tracking-portal');
              }
            }}
          />
        )}

        {/* Public & Customer: Magic Quote Approval Portal */}
        {currentView === 'approval-portal' && (
          <CustomerApprovalPortal
            token={magicQuoteToken}
            currentLanguage={currentLanguage}
            onApprovalComplete={() => {
              if (currentUser?.role === 'CUSTOMER') {
                setCurrentView('customer-portal');
              } else {
                setCurrentView('quotes');
              }
            }}
          />
        )}

        {/* Public & Customer: Live Repair Status Tracker */}
        {currentView === 'tracking-portal' && (
          <CustomerTrackingPortal
            workOrderId={targetWorkOrderId}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Garage Admin: Omnichannel Communications Hub */}
        {currentView === 'comms-hub' && (
          <CommunicationsHub
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
          />
        )}

        {/* SaaS Super Admin Platform */}
        {currentView === 'super-admin' && (
          <SuperAdminDashboard
            currentLanguage={currentLanguage}
            onSwitchTenant={(tenantId) => {
              StorageService.setActiveTenantId(tenantId);
              setActiveTenant(StorageService.getActiveTenant());
            }}
          />
        )}
      </main>

      {/* AutoAI Workshop Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        activeTenant={activeTenant}
        currentLanguage={currentLanguage}
        onBookSlot={(slot) => {
          setIsAiOpen(false);
          setCurrentView('calendar');
        }}
      />

      {/* Login / Role Switching Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentLanguage={currentLanguage}
      />

      {/* Legal & Compliance Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        currentLanguage={currentLanguage}
      />

      {/* Global Command Palette (Ctrl+K / ⌘K) */}
      <CommandPaletteModal
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Floating AutoAI Assistant Action Widget */}
      <button
        onClick={() => setIsAiOpen(true)}
        aria-label="Open AutoAI Assistant"
        className="floating-ai-fab"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1200,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
          border: '2px solid rgba(168, 85, 247, 0.6)',
          boxShadow: '0 10px 28px rgba(124, 58, 237, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
          transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease',
          outline: 'none'
        }}
        title="AutoAI Assistant"
      >
        {/* Direct Inline Vector AutoAI Logo */}
        <svg width="42" height="42" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="aiHexGradApp" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="aiCarGlowApp" x1="50" y1="100" x2="150" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#C7D2FE" />
            </linearGradient>
          </defs>
          <path d="M100 16 L168 54 L168 128 L116 166 L110 188 L90 166 L32 128 L32 54 Z" fill="url(#aiHexGradApp)" />
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
          
          <path d="M54 126 C54 120, 60 116, 68 116 L132 116 C140 116, 146 120, 146 126 L144 136 C144 140, 140 142, 134 142 L66 142 C60 142, 56 140, 56 136 Z" fill="url(#aiCarGlowApp)" />
          
          <polygon points="62,126 78,126 74,130 62,128" fill="#38BDF8" />
          <polygon points="138,126 122,126 126,130 138,128" fill="#38BDF8" />
          <path d="M84 134 L116 134 L112 138 L88 138 Z" fill="#0B1220" />
        </svg>

        {/* Soft Online Pulse Badge */}
        <span style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#10B981',
          border: '2px solid #FFFFFF',
          boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)'
        }}></span>
      </button>

      {/* Reset Confirmation Dialog */}
      <ConfirmationModal
        isOpen={confirmResetOpen}
        title="Reset All Demo Data?"
        message="This will re-initialize all multi-tenant garages, appointments, repair orders, and customer records to their default seed state."
        confirmLabel="Reset Everything"
        cancelLabel="Cancel"
        onConfirm={handleConfirmReset}
        onCancel={() => setConfirmResetOpen(false)}
        isDestructive={true}
      />
    </div>
  );
};
