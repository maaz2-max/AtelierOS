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

      {/* Floating AutoAI Assistant 3D Ribbon Logo (No Background Circle) */}
      <button
        onClick={() => setIsAiOpen(true)}
        aria-label="Open AutoAI Assistant"
        className="floating-ai-fab"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1200,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
          outline: 'none',
          filter: 'drop-shadow(0 10px 22px rgba(0, 102, 255, 0.5)) drop-shadow(0 2px 8px rgba(0, 210, 255, 0.4))',
          transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), filter 0.25s ease'
        }}
        title="AutoAI Assistant"
      >
        {/* Standalone 3D Ribbon "Ai" Vector Logo */}
        <svg width="68" height="68" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="aiRibbonGradA" x1="30" y1="160" x2="160" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="40%" stopColor="#0066FF" />
              <stop offset="80%" stopColor="#0047E0" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>
            <linearGradient id="aiArchGradA" x1="40" y1="140" x2="110" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0080FF" />
              <stop offset="50%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#0055FF" />
            </linearGradient>
            <linearGradient id="aiLoopGradA" x1="80" y1="60" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#004CD8" />
              <stop offset="50%" stopColor="#0077FF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            <linearGradient id="aiDotGradA" x1="145" y1="35" x2="175" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="60%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#003ACC" />
            </linearGradient>
          </defs>
          
          {/* Right Leg of A transitioning down into i stem */}
          <path 
            d="M96 54 C 106 72, 118 108, 126 132 C 134 156, 148 162, 160 148 C 170 136, 172 108, 172 84 C 172 74, 154 74, 154 84 C 154 104, 152 124, 146 134 C 142 140, 136 138, 130 120 C 122 96, 112 64, 98 42 Z" 
            fill="url(#aiLoopGradA)" 
          />

          {/* Main 3D Ribbon Arch forming A */}
          <path 
            d="M36 148 C 32 120, 52 48, 86 36 C 108 28, 122 42, 120 66 C 118 86, 102 128, 96 142 C 92 152, 78 152, 78 140 C 78 126, 86 98, 92 78 C 96 66, 92 56, 82 58 C 64 62, 52 106, 54 136 C 56 150, 40 158, 36 148 Z" 
            fill="url(#aiArchGradA)" 
          />

          {/* Dynamic 3D Cross-Fold */}
          <path 
            d="M62 136 C 70 126, 82 124, 104 140 C 108 144, 102 152, 94 148 C 78 140, 70 142, 62 148 C 56 152, 54 144, 62 136 Z" 
            fill="url(#aiRibbonGradA)" 
            opacity="0.95"
          />

          {/* Floating 3D Dot of i with luminous highlight */}
          <circle cx="158" cy="46" r="15" fill="url(#aiDotGradA)" />
          <ellipse cx="153" cy="41" rx="5" ry="3" fill="#FFFFFF" opacity="0.75" transform="rotate(-30 153 41)" />
        </svg>

        {/* Soft Online Pulse Spark */}
        <span style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#10B981',
          border: '2px solid #FFFFFF',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.9)'
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
