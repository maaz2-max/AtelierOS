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
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
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
