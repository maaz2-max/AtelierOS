// ==========================================================================
// AtelierOS - Vehicle Fleet & Registry Directory (Full CRUD + Confirmation)
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  User, 
  Fuel, 
  Gauge, 
  Calendar,
  FileText
} from 'lucide-react';
import { Vehicle, Customer, Tenant, FuelType, TransmissionType, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { ConfirmationModal } from './ConfirmationModal';
import { translations } from '../i18n/translations';

interface VehicleDirectoryProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
}

export const VehicleDirectory: React.FC<VehicleDirectoryProps> = ({
  activeTenant,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [confirmDeleteVehicle, setConfirmDeleteVehicle] = useState<Vehicle | null>(null);

  // Form State
  const [formCustomerId, setFormCustomerId] = useState('');
  const [formPlate, setFormPlate] = useState('');
  const [formVin, setFormVin] = useState('');
  const [formMake, setFormMake] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formYear, setFormYear] = useState(2022);
  const [formFuel, setFormFuel] = useState<FuelType>('PETROL');
  const [formTrans, setFormTrans] = useState<TransmissionType>('AUTOMATIC');
  const [formMileage, setFormMileage] = useState(50000);
  const [formNotes, setFormNotes] = useState('');

  const loadData = () => {
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  const filtered = vehicles.filter(v => {
    const q = searchQuery.toLowerCase();
    const plateMatch = v.licensePlate.toLowerCase().includes(q);
    const makeModelMatch = `${v.make} ${v.model}`.toLowerCase().includes(q);
    const vinMatch = v.vin.toLowerCase().includes(q);
    return plateMatch || makeModelMatch || vinMatch;
  });

  const openNewVehicleModal = () => {
    setEditingVehicle(null);
    setFormCustomerId(customers[0]?.id || '');
    setFormPlate(activeTenant.country === 'FR' ? 'AB-123-CD' : 'GE 123 456');
    setFormVin('VF3' + Math.random().toString(36).substring(2, 16).toUpperCase());
    setFormMake('');
    setFormModel('');
    setFormYear(2023);
    setFormFuel('PETROL');
    setFormTrans('AUTOMATIC');
    setFormMileage(45000);
    setFormNotes('');
    setIsEditModalOpen(true);
  };

  const openEditVehicleModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setFormCustomerId(v.customerId);
    setFormPlate(v.licensePlate);
    setFormVin(v.vin);
    setFormMake(v.make);
    setFormModel(v.model);
    setFormYear(v.year);
    setFormFuel(v.fuelType);
    setFormTrans(v.transmission);
    setFormMileage(v.mileage);
    setFormNotes(v.notes || '');
    setIsEditModalOpen(true);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const all = StorageService.getAllVehicles();

    if (editingVehicle) {
      const idx = all.findIndex(v => v.id === editingVehicle.id);
      if (idx !== -1) {
        all[idx] = {
          ...editingVehicle,
          customerId: formCustomerId,
          licensePlate: formPlate.toUpperCase(),
          vin: formVin.toUpperCase(),
          make: formMake,
          model: formModel,
          year: Number(formYear),
          fuelType: formFuel,
          transmission: formTrans,
          mileage: Number(formMileage),
          notes: formNotes
        };
      }
    } else {
      const newVeh: Vehicle = {
        id: `veh-${Date.now()}`,
        tenantId: activeTenant.id,
        customerId: formCustomerId,
        licensePlate: formPlate.toUpperCase(),
        vin: formVin.toUpperCase(),
        make: formMake,
        model: formModel,
        year: Number(formYear),
        fuelType: formFuel,
        transmission: formTrans,
        mileage: Number(formMileage),
        notes: formNotes
      };
      all.push(newVeh);
    }

    StorageService.saveVehicles(all);
    loadData();
    setIsEditModalOpen(false);
  };

  const handleDeleteVehicle = (id: string) => {
    const all = StorageService.getAllVehicles().filter(v => v.id !== id);
    StorageService.saveVehicles(all);
    loadData();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>Vehicle Registry</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>
            Customer vehicles, technical specifications, VIN lookup, and service mileage history.
          </p>
        </div>

        <button onClick={openNewVehicleModal} className="apple-btn-primary">
          <Plus size={16} />
          <span>+ Register New Vehicle</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="apple-card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={16} color="#86868b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by plate, VIN, make, model..."
            style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
          />
        </div>
      </div>

      {/* Vehicles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filtered.map(veh => {
          const owner = customers.find(c => c.id === veh.customerId);

          return (
            <div key={veh.id} className="apple-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="apple-badge apple-badge-blue" style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.04em' }}>
                    {veh.licensePlate}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', marginTop: '6px' }}>
                    {veh.make} {veh.model}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEditVehicleModal(veh)} className="apple-btn-secondary" style={{ padding: '6px 8px', minHeight: '30px' }}>
                    <Edit3 size={13} />
                  </button>
                  <button onClick={() => setConfirmDeleteVehicle(veh)} className="apple-btn-danger" style={{ padding: '6px 8px', minHeight: '30px' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', background: '#f5f5f7', padding: '12px', borderRadius: '10px' }}>
                <div><strong>Year:</strong> {veh.year}</div>
                <div><strong>Fuel:</strong> {veh.fuelType}</div>
                <div><strong>Trans:</strong> {veh.transmission}</div>
                <div><strong>Mileage:</strong> {veh.mileage?.toLocaleString()} km</div>
                <div style={{ gridColumn: 'span 2', fontSize: '11px', color: '#6e6e73' }}>
                  <strong>VIN:</strong> {veh.vin}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1d1d1f' }}>
                <User size={14} color="#0071e3" />
                <span style={{ fontWeight: 600 }}>Owner: {owner?.firstName} {owner?.lastName}</span>
              </div>

              {veh.notes && (
                <div style={{ fontSize: '12px', color: '#6e6e73', fontStyle: 'italic' }}>
                  "{veh.notes}"
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit/Create Vehicle Modal */}
      {isEditModalOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-lg" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '540px' }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
              {editingVehicle ? 'Edit Vehicle' : 'Register Vehicle'}
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Record technical details, owner link, and license plate.
            </p>

            <form onSubmit={handleSaveVehicle} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Registered Owner
                </label>
                <select 
                  value={formCustomerId} 
                  onChange={e => setFormCustomerId(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.phone})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    License Plate
                  </label>
                  <input 
                    type="text" 
                    value={formPlate} 
                    onChange={e => setFormPlate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea', textTransform: 'uppercase', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    VIN (17 Characters)
                  </label>
                  <input 
                    type="text" 
                    value={formVin} 
                    onChange={e => setFormVin(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea', textTransform: 'uppercase' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Make (Manufacturer)
                  </label>
                  <input 
                    type="text" 
                    value={formMake} 
                    onChange={e => setFormMake(e.target.value)}
                    placeholder="e.g. Peugeot, Tesla, BMW"
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Model
                  </label>
                  <input 
                    type="text" 
                    value={formModel} 
                    onChange={e => setFormModel(e.target.value)}
                    placeholder="e.g. 3008 GT, Model Y"
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Year
                  </label>
                  <input 
                    type="number" 
                    value={formYear} 
                    onChange={e => setFormYear(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Fuel
                  </label>
                  <select 
                    value={formFuel} 
                    onChange={e => setFormFuel(e.target.value as any)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="ELECTRIC">Electric (EV)</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Mileage (km)
                  </label>
                  <input 
                    type="number" 
                    value={formMileage} 
                    onChange={e => setFormMileage(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="apple-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="apple-btn-primary">
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!confirmDeleteVehicle}
        title="Delete Vehicle Record?"
        message={`Are you sure you want to delete vehicle ${confirmDeleteVehicle?.make} ${confirmDeleteVehicle?.model} (${confirmDeleteVehicle?.licensePlate})?`}
        confirmLabel="Delete Vehicle"
        isDestructive={true}
        onConfirm={() => {
          if (confirmDeleteVehicle) {
            handleDeleteVehicle(confirmDeleteVehicle.id);
            setConfirmDeleteVehicle(null);
          }
        }}
        onCancel={() => setConfirmDeleteVehicle(null)}
      />
    </div>
  );
};
