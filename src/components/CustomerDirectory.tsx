// ==========================================================================
// AtelierOS - Customer Directory & Registry (Full CRUD + Confirmation Dialogs)
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Customer, Tenant, CustomerType, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { ConfirmationModal } from './ConfirmationModal';
import { translations } from '../i18n/translations';

interface CustomerDirectoryProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
}

export const CustomerDirectory: React.FC<CustomerDirectoryProps> = ({
  activeTenant,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Confirmation Modal State
  const [confirmDeleteCustomer, setConfirmDeleteCustomer] = useState<Customer | null>(null);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  // Form State
  const [formType, setFormType] = useState<CustomerType>('INDIVIDUAL');
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formCompanyName, setFormCompanyName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCountry, setFormCountry] = useState<'FR' | 'CH'>(activeTenant.country);
  const [formSiret, setFormSiret] = useState('');
  const [formUid, setFormUid] = useState('');
  const [formStreet, setFormStreet] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formPostalCode, setFormPostalCode] = useState('');

  const loadCustomers = () => {
    setCustomers(StorageService.getCustomers(activeTenant.id));
  };

  useEffect(() => {
    loadCustomers();
  }, [activeTenant.id]);

  const filtered = customers.filter(c => {
    if (filterType !== 'ALL' && c.type !== filterType) return false;
    const q = searchQuery.toLowerCase();
    const nameMatch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(q);
    const companyMatch = c.companyName?.toLowerCase().includes(q) || false;
    const phoneMatch = c.phone.includes(q);
    const emailMatch = c.email.toLowerCase().includes(q);
    return nameMatch || companyMatch || phoneMatch || emailMatch;
  });

  const openNewCustomerModal = () => {
    setEditingCustomer(null);
    setFormType('INDIVIDUAL');
    setFormFirstName('');
    setFormLastName('');
    setFormCompanyName('');
    setFormEmail('');
    setFormPhone(activeTenant.country === 'FR' ? '+33 ' : '+41 ');
    setFormCountry(activeTenant.country);
    setFormSiret('');
    setFormUid('');
    setFormStreet('');
    setFormCity('');
    setFormPostalCode('');
    setIsEditModalOpen(true);
  };

  const openEditCustomerModal = (c: Customer) => {
    setEditingCustomer(c);
    setFormType(c.type);
    setFormFirstName(c.firstName);
    setFormLastName(c.lastName);
    setFormCompanyName(c.companyName || '');
    setFormEmail(c.email);
    setFormPhone(c.phone);
    setFormCountry(c.country as any);
    setFormSiret(c.taxIdentity?.siret || '');
    setFormUid(c.taxIdentity?.uid || '');
    setFormStreet(c.address.street);
    setFormCity(c.address.city);
    setFormPostalCode(c.address.postalCode);
    setIsEditModalOpen(true);
  };

  const handleSaveCustomer = () => {
    const all = StorageService.getAllCustomers();

    if (editingCustomer) {
      // Edit existing
      const index = all.findIndex(c => c.id === editingCustomer.id);
      if (index !== -1) {
        all[index] = {
          ...editingCustomer,
          type: formType,
          firstName: formFirstName,
          lastName: formLastName,
          companyName: formType === 'BUSINESS' ? formCompanyName : undefined,
          email: formEmail,
          phone: formPhone,
          country: formCountry,
          taxIdentity: {
            siret: formType === 'BUSINESS' && formCountry === 'FR' ? formSiret : undefined,
            uid: formType === 'BUSINESS' && formCountry === 'CH' ? formUid : undefined,
            vatNumber: formType === 'BUSINESS' ? (formCountry === 'FR' ? `FR${formSiret.substring(0, 2)}` : `${formUid} TVA`) : undefined
          },
          address: {
            street: formStreet,
            city: formCity,
            postalCode: formPostalCode,
            country: formCountry === 'FR' ? 'France' : 'Switzerland'
          }
        };
      }
    } else {
      // Create new
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        tenantId: activeTenant.id,
        type: formType,
        firstName: formFirstName,
        lastName: formLastName,
        companyName: formType === 'BUSINESS' ? formCompanyName : undefined,
        email: formEmail,
        phone: formPhone,
        country: formCountry,
        taxIdentity: {
          siret: formType === 'BUSINESS' && formCountry === 'FR' ? formSiret : undefined,
          uid: formType === 'BUSINESS' && formCountry === 'CH' ? formUid : undefined,
          vatNumber: formType === 'BUSINESS' ? (formCountry === 'FR' ? `FR${formSiret.substring(0, 2)}` : `${formUid} TVA`) : undefined
        },
        address: {
          street: formStreet,
          city: formCity,
          postalCode: formPostalCode,
          country: formCountry === 'FR' ? 'France' : 'Switzerland'
        },
        preferredLanguage: activeTenant.country === 'FR' ? 'fr' : 'fr-CH',
        gdprConsent: {
          consentedAt: new Date().toISOString(),
          marketingConsent: true,
          smsConsent: true,
          whatsappConsent: true
        },
        createdAt: new Date().toISOString()
      };
      all.push(newCust);
    }

    StorageService.saveCustomers(all);
    loadCustomers();
    setIsEditModalOpen(false);
  };

  const handleDeleteCustomer = (id: string) => {
    const all = StorageService.getAllCustomers().filter(c => c.id !== id);
    StorageService.saveCustomers(all);
    loadCustomers();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>Customer Directory</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>
            France & Switzerland customer registry with GDPR consent and tax identities.
          </p>
        </div>

        <button onClick={openNewCustomerModal} className="apple-btn-primary">
          <UserPlus size={16} />
          <span>+ Add New Customer</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="apple-card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={16} color="#86868b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, phone, email..."
            style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'INDIVIDUAL', 'BUSINESS'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: 'none',
                background: filterType === type ? '#0071e3' : 'rgba(0,0,0,0.06)',
                color: filterType === type ? '#ffffff' : '#6e6e73',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Table */}
      <div className="apple-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '14px 20px' }}>Customer Name / Company</th>
                <th style={{ padding: '14px 20px' }}>Contact Info</th>
                <th style={{ padding: '14px 20px' }}>Country / Tax ID</th>
                <th style={{ padding: '14px 20px' }}>GDPR Consent</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f3' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: '#1d1d1f', fontSize: '15px' }}>
                      {c.firstName} {c.lastName}
                    </div>
                    {c.companyName && (
                      <div style={{ fontSize: '12px', color: '#0071e3', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Building2 size={12} />
                        <span>{c.companyName}</span>
                      </div>
                    )}
                    <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                      {c.address.street}, {c.address.postalCode} {c.address.city}
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1d1d1f' }}>
                      <Phone size={13} color="#0071e3" />
                      <span>{c.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
                      <Mail size={13} />
                      <span>{c.email}</span>
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span className={`apple-badge ${c.country === 'FR' ? 'apple-badge-blue' : 'apple-badge-amber'}`} style={{ marginBottom: '4px' }}>
                      {c.country === 'FR' ? 'France (FR)' : 'Switzerland (CH)'}
                    </span>
                    {c.taxIdentity?.siret && (
                      <div style={{ fontSize: '11px', color: '#6e6e73' }}>
                        SIRET: {c.taxIdentity.siret}
                      </div>
                    )}
                    {c.taxIdentity?.uid && (
                      <div style={{ fontSize: '11px', color: '#6e6e73' }}>
                        UID: {c.taxIdentity.uid}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#30d158', fontSize: '13px', fontWeight: 500 }}>
                      <ShieldCheck size={16} />
                      <span>Opted-in (SMS/Email)</span>
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => openEditCustomerModal(c)}
                        className="apple-btn-secondary"
                        style={{ padding: '6px 10px', minHeight: '30px' }}
                        title="Edit Customer Details"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteCustomer(c)}
                        className="apple-btn-danger"
                        style={{ padding: '6px 10px', minHeight: '30px' }}
                        title="Delete Customer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Customer Modal */}
      {isEditModalOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-lg" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '580px' }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
              {editingCustomer ? 'Edit Customer Details' : 'Register New Customer'}
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Structure identity, country format, and tax registry.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              setConfirmSaveOpen(true);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Type & Country */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Customer Classification
                  </label>
                  <select 
                    value={formType} 
                    onChange={e => setFormType(e.target.value as any)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="INDIVIDUAL">Individual (B2C)</option>
                    <option value="BUSINESS">Business / Corporate (B2B)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Country
                  </label>
                  <select 
                    value={formCountry} 
                    onChange={e => setFormCountry(e.target.value as any)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="FR">France (FR)</option>
                    <option value="CH">Switzerland (CH)</option>
                  </select>
                </div>
              </div>

              {/* Names */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    First Name
                  </label>
                  <input 
                    type="text" 
                    value={formFirstName} 
                    onChange={e => setFormFirstName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    value={formLastName} 
                    onChange={e => setFormLastName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              {formType === 'BUSINESS' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                      Company Name
                    </label>
                    <input 
                      type="text" 
                      value={formCompanyName} 
                      onChange={e => setFormCompanyName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                    />
                  </div>

                  {formCountry === 'FR' ? (
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                        French SIRET (14 digits)
                      </label>
                      <input 
                        type="text" 
                        value={formSiret} 
                        onChange={e => setFormSiret(e.target.value)}
                        placeholder="e.g. 51289034200028"
                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                      />
                    </div>
                  ) : (
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                        Swiss UID / IDE (CHE-xxx.xxx.xxx)
                      </label>
                      <input 
                        type="text" 
                        value={formUid} 
                        onChange={e => setFormUid(e.target.value)}
                        placeholder="e.g. CHE-203.491.882"
                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Phone & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    value={formPhone} 
                    onChange={e => setFormPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={formEmail} 
                    onChange={e => setFormEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Street Address
                </label>
                <input 
                  type="text" 
                  value={formStreet} 
                  onChange={e => setFormStreet(e.target.value)}
                  placeholder="Street and house number"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Postal Code
                  </label>
                  <input 
                    type="text" 
                    value={formPostalCode} 
                    onChange={e => setFormPostalCode(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    City
                  </label>
                  <input 
                    type="text" 
                    value={formCity} 
                    onChange={e => setFormCity(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="apple-btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="apple-btn-primary"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!confirmDeleteCustomer}
        title="Delete Customer Profile?"
        message={`Are you sure you want to delete ${confirmDeleteCustomer?.firstName} ${confirmDeleteCustomer?.lastName}? This action will permanently remove their records from local storage.`}
        confirmLabel="Delete Customer"
        isDestructive={true}
        onConfirm={() => {
          if (confirmDeleteCustomer) {
            handleDeleteCustomer(confirmDeleteCustomer.id);
            setConfirmDeleteCustomer(null);
          }
        }}
        onCancel={() => setConfirmDeleteCustomer(null)}
      />

      {/* Save Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmSaveOpen}
        title="Confirm Customer Details"
        message={`Do you want to save the customer record for ${formFirstName} ${formLastName} in ${formCountry}?`}
        confirmLabel="Save & Persist"
        onConfirm={() => {
          setConfirmSaveOpen(false);
          handleSaveCustomer();
        }}
        onCancel={() => setConfirmSaveOpen(false)}
      />
    </div>
  );
};
