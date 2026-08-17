// ==========================================================================
// AtelierOS - SaaS Super Admin Platform (Multi-Tenant Management)
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Activity, 
  Plus, 
  Globe2, 
  CheckCircle2, 
  Zap,
  Server
} from 'lucide-react';
import { Tenant, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { translations } from '../i18n/translations';

interface SuperAdminDashboardProps {
  currentLanguage: SupportedLanguage;
  onSwitchTenant: (tenant: Tenant) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  currentLanguage,
  onSwitchTenant
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const tsa = t.superAdmin;

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);

  // New Tenant Form
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [country, setCountry] = useState<'FR' | 'CH'>('FR');
  const [currency, setCurrency] = useState<'EUR' | 'CHF'>('EUR');
  const [phone, setPhone] = useState('+33 1 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lyon');
  const [street, setStreet] = useState('10 Place Bellecour');
  const [postalCode, setPostalCode] = useState('69002');
  const [siret, setSiret] = useState('91234567800019');
  const [tier, setTier] = useState<Tenant['subscriptionTier']>('pro');

  const loadData = () => {
    setTenants(StorageService.getTenants());
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalMRR = tenants.reduce((acc, tenant) => {
    if (tenant.subscriptionTier === 'starter') return acc + 89;
    if (tenant.subscriptionTier === 'pro') return acc + 189;
    if (tenant.subscriptionTier === 'ai') return acc + 299;
    return acc;
  }, 0);

  const handleCountryChange = (c: 'FR' | 'CH') => {
    setCountry(c);
    setCurrency(c === 'FR' ? 'EUR' : 'CHF');
    setPhone(c === 'FR' ? '+33 1 ' : '+41 22 ');
  };

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTenant: Tenant = {
      id: `tenant-${country.toLowerCase()}-${Date.now()}`,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      tagline: 'Modern Multimarque Workshop Facility',
      country,
      currency,
      phone,
      email,
      address: {
        street,
        city,
        postalCode,
        countryCode: country
      },
      taxIdentity: {
        siret: country === 'FR' ? siret : undefined,
        uid: country === 'CH' ? siret : undefined,
        vatNumber: country === 'FR' ? `FR88${siret.substring(0, 9)}` : `${siret} TVA`
      },
      settings: {
        openingTime: '08:00',
        closingTime: '18:30',
        lunchStart: '12:00',
        lunchEnd: '13:30',
        workDays: [1, 2, 3, 4, 5, 6],
        defaultLaborRate: country === 'FR' ? 88.0 : 145.0,
        standardVatRate: country === 'FR' ? 20.0 : 8.1,
        slotDurationMin: 30,
        slotHoldTimeoutMin: 10,
        autoConfirmEligible: true
      },
      subscriptionTier: tier,
      active: true
    };

    const all = StorageService.getTenants();
    all.push(newTenant);
    localStorage.setItem('atelieros_tenants', JSON.stringify(all));
    loadData();
    setIsOnboardModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{tsa.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{tsa.subtitle}</p>
        </div>

        <button onClick={() => setIsOnboardModalOpen(true)} className="apple-btn-primary">
          <Plus size={16} />
          <span>{tsa.onboardGarage}</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="apple-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86868b', fontSize: '13px', fontWeight: 600 }}>
            <span>{tsa.totalGarages}</span>
            <Building2 size={18} color="#0071e3" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#1d1d1f', marginTop: '8px' }}>
            {tenants.length}
          </div>
          <span style={{ fontSize: '12px', color: '#30d158', fontWeight: 600 }}>France & Switzerland Active</span>
        </div>

        <div className="apple-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86868b', fontSize: '13px', fontWeight: 600 }}>
            <span>{tsa.totalRevenue}</span>
            <DollarSign size={18} color="#30d158" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#1d1d1f', marginTop: '8px' }}>
            €{totalMRR.toLocaleString()}/mo
          </div>
          <span style={{ fontSize: '12px', color: '#6e6e73' }}>Recurring SaaS Subscription Volume</span>
        </div>

        <div className="apple-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86868b', fontSize: '13px', fontWeight: 600 }}>
            <span>System Infrastructure</span>
            <Server size={18} color="#bf5af2" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#30d158', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={20} />
            <span>100% Operational</span>
          </div>
          <span style={{ fontSize: '12px', color: '#6e6e73' }}>EU Datacenter • LocalStorage Engine</span>
        </div>
      </div>

      {/* Subscribed Tenants Table */}
      <div className="apple-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e5ea', fontWeight: 700, fontSize: '16px' }}>
          {tsa.garagesList}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 20px' }}>Garage / Facility</th>
                <th style={{ padding: '14px 20px' }}>Country / Currency</th>
                <th style={{ padding: '14px 20px' }}>Subscription Plan</th>
                <th style={{ padding: '14px 20px' }}>Tax Identifier</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(tenant => (
                <tr key={tenant.id} style={{ borderBottom: '1px solid #f0f0f3' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '15px' }}>
                      {tenant.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '2px' }}>
                      {tenant.address.city}, {tenant.address.countryCode} • {tenant.email}
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span className={`apple-badge ${tenant.country === 'FR' ? 'apple-badge-blue' : 'apple-badge-amber'}`}>
                      {tenant.country} ({tenant.currency})
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span className={`apple-badge ${
                      tenant.subscriptionTier === 'ai' ? 'apple-badge-blue' : 'apple-badge-neutral'
                    }`} style={{ textTransform: 'uppercase', fontWeight: 700 }}>
                      {tenant.subscriptionTier}
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: '12px', color: '#1d1d1f' }}>
                      {tenant.taxIdentity.siret || tenant.taxIdentity.uid}
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => onSwitchTenant(tenant)}
                      className="apple-btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                    >
                      <span>Switch to Garage</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard New Garage Modal */}
      {isOnboardModalOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsOnboardModalOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-lg" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '580px' }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
              {tsa.onboardGarage}
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Provision an isolated tenant environment for a new workshop.
            </p>

            <form onSubmit={handleOnboardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Garage / Workshop Name
                </label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Garage Central de Lyon"
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Country & Jurisdictional Tax
                  </label>
                  <select 
                    value={country} 
                    onChange={e => handleCountryChange(e.target.value as any)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="FR">France (EUR / 20% TVA)</option>
                    <option value="CH">Switzerland (CHF / 8.1% TVA)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Subscription Plan
                  </label>
                  <select 
                    value={tier} 
                    onChange={e => setTier(e.target.value as any)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="starter">Starter (€89 / CHF 99)</option>
                    <option value="pro">Pro Workshop (€189 / CHF 199)</option>
                    <option value="ai">AI Enterprise (€299 / CHF 329)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Phone
                  </label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Email
                  </label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contact@garage.fr"
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    City
                  </label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={e => setCity(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    {country === 'FR' ? 'SIRET (14 digits)' : 'Swiss UID (CHE-xxx)'}
                  </label>
                  <input 
                    type="text" 
                    value={siret} 
                    onChange={e => setSiret(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsOnboardModalOpen(false)} className="apple-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="apple-btn-primary">
                  Provision Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
