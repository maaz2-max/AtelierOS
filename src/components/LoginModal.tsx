// ==========================================================================
// AtelierOS - Authentication & Account Creation Modal
// Dual-Tab Interface: Sign In (with 1-Click Demo Profiles) & Create Account (by Role)
// ==========================================================================

import React, { useState } from 'react';
import { 
  Building2, 
  Wrench, 
  User, 
  ShieldCheck, 
  X, 
  ArrowRight, 
  Check, 
  Lock, 
  Mail, 
  Sparkles,
  Car,
  Globe2,
  CheckCircle2
} from 'lucide-react';
import { StorageService, DEMO_USERS } from '../services/StorageService';
import { AuthUser, SupportedLanguage, Tenant, Customer, Vehicle } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  currentLanguage: SupportedLanguage;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentLanguage
}) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'SIGN_IN' | 'REGISTER'>('SIGN_IN');
  const [registerRole, setRegisterRole] = useState<'GARAGE_ADMIN' | 'CUSTOMER' | 'MECHANIC'>('GARAGE_ADMIN');

  // Sign In State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Register State - Garage Admin
  const [regGarageName, setRegGarageName] = useState('');
  const [regGarageCountry, setRegGarageCountry] = useState<'FR' | 'CH'>('FR');
  const [regGarageCity, setRegGarageCity] = useState('');
  const [regAdminName, setRegAdminName] = useState('');
  const [regAdminEmail, setRegAdminEmail] = useState('');

  // Register State - Customer
  const [regCustName, setRegCustName] = useState('');
  const [regCustEmail, setRegCustEmail] = useState('');
  const [regCustPhone, setRegCustPhone] = useState('');
  const [regPlate, setRegPlate] = useState('');
  const [regMakeModel, setRegMakeModel] = useState('');

  const handleSelectPreset = (userId: string) => {
    const user = StorageService.loginWithDemo(userId);
    onLoginSuccess(user);
    onClose();
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!emailInput) {
      setErrorMsg('Please enter an email address.');
      return;
    }

    const matched = DEMO_USERS.find(u => u.email.toLowerCase() === emailInput.trim().toLowerCase());
    if (matched) {
      StorageService.setAuthUser(matched);
      onLoginSuccess(matched);
      onClose();
    } else {
      const customUser: AuthUser = {
        id: `user_cust_${Date.now()}`,
        name: emailInput.split('@')[0],
        email: emailInput,
        role: 'CUSTOMER',
        roleLabel: 'Vehicle Owner',
        tenantId: StorageService.getActiveTenantId(),
        customerId: 'cust-fr-01',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      };
      StorageService.setAuthUser(customUser);
      onLoginSuccess(customUser);
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (registerRole === 'GARAGE_ADMIN') {
      if (!regGarageName || !regAdminEmail) {
        setErrorMsg('Please provide Garage Name and Admin Email.');
        return;
      }
      const newTenantId = `tenant_${regGarageCountry.toLowerCase()}_${Date.now()}`;
      const newTenant: Tenant = {
        id: newTenantId,
        name: regGarageName,
        slug: regGarageName.toLowerCase().replace(/\s+/g, '-'),
        tagline: regGarageCountry === 'FR' ? "Atelier Automobile Agréé" : "Präzisions-Garage Schweiz",
        country: regGarageCountry,
        currency: regGarageCountry === 'FR' ? 'EUR' : 'CHF',
        phone: regGarageCountry === 'FR' ? "+33 1 40 00 00 00" : "+41 22 700 00 00",
        email: regAdminEmail,
        address: {
          street: "12 Avenue de l'Industrie",
          city: regGarageCity || (regGarageCountry === 'FR' ? 'Lyon' : 'Lausanne'),
          postalCode: regGarageCountry === 'FR' ? '69002' : '1003',
          countryCode: regGarageCountry
        },
        taxIdentity: {
          siret: regGarageCountry === 'FR' ? '89999999900012' : undefined,
          uid: regGarageCountry === 'CH' ? 'CHE-999.888.777' : undefined,
          vatNumber: regGarageCountry === 'FR' ? 'FR99899999999' : 'CHE-999.888.777 TVA'
        },
        settings: {
          openingTime: "08:00",
          closingTime: "18:00",
          lunchStart: "12:00",
          lunchEnd: "13:30",
          workDays: [1, 2, 3, 4, 5],
          defaultLaborRate: regGarageCountry === 'FR' ? 85 : 145,
          standardVatRate: regGarageCountry === 'FR' ? 20.0 : 8.1,
          slotDurationMin: 30,
          slotHoldTimeoutMin: 10,
          autoConfirmEligible: true
        },
        subscriptionTier: 'pro',
        active: true
      };

      const existingTenants = StorageService.getTenants();
      localStorage.setItem('atelieros_tenants', JSON.stringify([...existingTenants, newTenant]));

      const newAdminUser: AuthUser = {
        id: `user_admin_${Date.now()}`,
        name: regAdminName || 'Workshop Manager',
        email: regAdminEmail,
        role: 'GARAGE_ADMIN',
        roleLabel: `Workshop Manager (${regGarageCountry})`,
        tenantId: newTenantId,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
      };

      StorageService.setAuthUser(newAdminUser);
      onLoginSuccess(newAdminUser);
      onClose();

    } else if (registerRole === 'CUSTOMER') {
      if (!regCustName || !regCustEmail) {
        setErrorMsg('Please provide Name and Email.');
        return;
      }
      const newCustId = `cust_${Date.now()}`;
      const newCust: Customer = {
        id: newCustId,
        tenantId: StorageService.getActiveTenantId(),
        type: 'INDIVIDUAL',
        firstName: regCustName.split(' ')[0] || regCustName,
        lastName: regCustName.split(' ').slice(1).join(' ') || 'Customer',
        email: regCustEmail,
        phone: regCustPhone || "+33 6 12 34 56 78",
        country: 'FR',
        totalSpent: 0,
        workOrdersCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };

      const allCust = StorageService.getAllCustomers();
      StorageService.saveCustomers([...allCust, newCust]);

      if (regPlate) {
        const newVeh: Vehicle = {
          id: `veh_${Date.now()}`,
          tenantId: StorageService.getActiveTenantId(),
          customerId: newCustId,
          licensePlate: regPlate.toUpperCase(),
          make: regMakeModel.split(' ')[0] || 'Vehicle',
          model: regMakeModel.split(' ').slice(1).join(' ') || 'Standard',
          year: 2022,
          fuelType: 'PETROL',
          vin: `VF3${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        };
        const allVeh = StorageService.getAllVehicles();
        StorageService.saveVehicles([...allVeh, newVeh]);
      }

      const newCustUser: AuthUser = {
        id: `user_${newCustId}`,
        name: regCustName,
        email: regCustEmail,
        role: 'CUSTOMER',
        roleLabel: 'Vehicle Owner',
        tenantId: StorageService.getActiveTenantId(),
        customerId: newCustId,
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      };

      StorageService.setAuthUser(newCustUser);
      onLoginSuccess(newCustUser);
      onClose();

    } else {
      // Mechanic direct login
      handleSelectPreset('user_mech_fr');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '28px',
        width: '100%',
        maxWidth: '680px',
        boxShadow: '0 30px 70px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '92vh'
      }}>
        {/* Top Header */}
        <div style={{
          padding: '24px 28px 16px',
          borderBottom: '1px solid #f2f2f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src="/assets/logo.png" 
              alt="AtelierOS Official Logo" 
              style={{ height: '36px', width: 'auto', display: 'block', objectFit: 'contain' }} 
            />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.02em', margin: 0, color: '#1d1d1f' }}>
                Workshop Access Portal
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#86868b' }}>
                Smarter Workshops. Better Cars.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f5f5f7',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#86868b'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div style={{ padding: '16px 28px 0', display: 'flex', gap: '8px', background: '#ffffff' }}>
          <button
            onClick={() => { setAuthMode('SIGN_IN'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '12px',
              border: 'none',
              background: authMode === 'SIGN_IN' ? '#1d1d1f' : '#f5f5f7',
              color: authMode === 'SIGN_IN' ? '#ffffff' : '#515154',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Sign In to Account
          </button>
          <button
            onClick={() => { setAuthMode('REGISTER'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '12px',
              border: 'none',
              background: authMode === 'REGISTER' ? '#1d1d1f' : '#f5f5f7',
              color: authMode === 'REGISTER' ? '#ffffff' : '#515154',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Create New Account
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 28px 28px', overflowY: 'auto', flex: 1 }}>
          {errorMsg && (
            <div style={{
              padding: '10px 14px',
              background: '#ffebeb',
              color: '#d9383a',
              borderRadius: '12px',
              fontSize: '13px',
              marginBottom: '16px',
              fontWeight: '500'
            }}>
              {errorMsg}
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 1: SIGN IN (WITH 1-CLICK DEMO ROLES) */}
          {/* ================================================================ */}
          {authMode === 'SIGN_IN' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#86868b', marginBottom: '10px' }}>
                  1-Click Instant Demo Profiles
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                  {/* Preset 1 */}
                  <div 
                    onClick={() => handleSelectPreset('user_admin_fr')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid #e5e5ea',
                      background: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0071e3', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building2 size={18} color="#fff" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f' }}>Luca Sigon (Manager FR)</div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>Paris Auto Atelier • Full Workshop Access</div>
                    </div>
                    <ArrowRight size={14} color="#86868b" />
                  </div>

                  {/* Preset 2 */}
                  <div 
                    onClick={() => handleSelectPreset('user_admin_ch')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid #e5e5ea',
                      background: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#d9383a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building2 size={18} color="#fff" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f' }}>Henri Meier (Manager CH)</div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>Geneva Precision Motors • CHF QR-Bills</div>
                    </div>
                    <ArrowRight size={14} color="#86868b" />
                  </div>

                  {/* Preset 3 */}
                  <div 
                    onClick={() => handleSelectPreset('user_mech_fr')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid #e5e5ea',
                      background: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#34c759', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Wrench size={18} color="#fff" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f' }}>Marc Dupont (Mechanic)</div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>iPad Bay Station • Assigned Jobs</div>
                    </div>
                    <ArrowRight size={14} color="#86868b" />
                  </div>

                  {/* Preset 4 */}
                  <div 
                    onClick={() => handleSelectPreset('user_cust_fr')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid #e5e5ea',
                      background: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ff9500', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <User size={18} color="#fff" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f' }}>Sophie Laurent (Customer)</div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>Peugeot 3008 • Quotes &amp; Live Tracking</div>
                    </div>
                    <ArrowRight size={14} color="#86868b" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0', color: '#86868b', fontSize: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: '#e5e5ea' }}></div>
                <span>OR SIGN IN WITH EMAIL</span>
                <div style={{ flex: 1, height: '1px', background: '#e5e5ea' }}></div>
              </div>

              <form onSubmit={handleCustomLogin}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#1d1d1f', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="e.g. luca.sigon@parisauto.fr"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '15px',
                      borderRadius: '12px',
                      border: '1px solid #d2d2d7',
                      background: '#fbfbfd',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#1d1d1f', marginBottom: '6px' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '15px',
                      borderRadius: '12px',
                      border: '1px solid #d2d2d7',
                      background: '#fbfbfd',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#0071e3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 113, 227, 0.3)'
                  }}
                >
                  Sign In to Account
                </button>
              </form>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: CREATE NEW ACCOUNT (ROLE-TAILORED ONBOARDING) */}
          {/* ================================================================ */}
          {authMode === 'REGISTER' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#86868b', display: 'block', marginBottom: '8px' }}>
                  Select Account Type
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div
                    onClick={() => setRegisterRole('GARAGE_ADMIN')}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: registerRole === 'GARAGE_ADMIN' ? '2px solid #0071e3' : '1px solid #e5e5ea',
                      background: registerRole === 'GARAGE_ADMIN' ? '#f0f7ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Building2 size={16} color="#0071e3" />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f' }}>Garage Owner</div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>Workshop Workspace</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setRegisterRole('CUSTOMER')}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: registerRole === 'CUSTOMER' ? '2px solid #ff9500' : '1px solid #e5e5ea',
                      background: registerRole === 'CUSTOMER' ? '#fffaf2' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Car size={16} color="#ff9500" />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#1d1d1f' }}>Vehicle Owner</div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>Personal Garage Hub</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form 1: Workshop Onboarding */}
              {registerRole === 'GARAGE_ADMIN' && (
                <form onSubmit={handleRegister}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Garage Business Name</label>
                      <input
                        type="text"
                        required
                        value={regGarageName}
                        onChange={e => setRegGarageName(e.target.value)}
                        placeholder="e.g. Lyon Precision Auto"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Country / Tax Region</label>
                      <select
                        value={regGarageCountry}
                        onChange={e => setRegGarageCountry(e.target.value as 'FR' | 'CH')}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', background: '#fff', boxSizing: 'border-box' }}
                      >
                        <option value="FR">France (20% TVA • EUR • Chorus Pro)</option>
                        <option value="CH">Switzerland (8.1% TVA • CHF • QR-Bill)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>City / Canton</label>
                      <input
                        type="text"
                        value={regGarageCity}
                        onChange={e => setRegGarageCity(e.target.value)}
                        placeholder="e.g. Lyon or Geneva"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Manager Full Name</label>
                      <input
                        type="text"
                        value={regAdminName}
                        onChange={e => setRegAdminName(e.target.value)}
                        placeholder="e.g. Jean Dupont"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Admin Work Email</label>
                    <input
                      type="email"
                      required
                      value={regAdminEmail}
                      onChange={e => setRegAdminEmail(e.target.value)}
                      placeholder="e.g. contact@lyonprecision.fr"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#0071e3',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 113, 227, 0.3)'
                    }}
                  >
                    Create Workshop Account &amp; Launch
                  </button>
                </form>
              )}

              {/* Form 2: Vehicle Owner Registration */}
              {registerRole === 'CUSTOMER' && (
                <form onSubmit={handleRegister}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={regCustName}
                        onChange={e => setRegCustName(e.target.value)}
                        placeholder="e.g. Marie Curie"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Email Address</label>
                      <input
                        type="email"
                        required
                        value={regCustEmail}
                        onChange={e => setRegCustEmail(e.target.value)}
                        placeholder="e.g. marie@email.com"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>License Plate</label>
                      <input
                        type="text"
                        value={regPlate}
                        onChange={e => setRegPlate(e.target.value)}
                        placeholder="e.g. AB-123-CD or GE 452 891"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Make &amp; Model</label>
                      <input
                        type="text"
                        value={regMakeModel}
                        onChange={e => setRegMakeModel(e.target.value)}
                        placeholder="e.g. Peugeot 3008 or Audi A4"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #d2d2d7', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#ff9500',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(255, 149, 0, 0.3)'
                    }}
                  >
                    Register &amp; Unlock Personal Garage Hub
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
