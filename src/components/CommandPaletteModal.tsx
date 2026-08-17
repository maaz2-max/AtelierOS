// ==========================================================================
// AtelierOS — Global Command Palette (⌘K / Ctrl+K)
// Fast Search over Orders, Vehicles, Customers, Quotes & Navigation
// ==========================================================================

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Car, 
  Users, 
  ClipboardList, 
  FileCheck2, 
  Receipt, 
  Calendar, 
  ArrowRight, 
  X,
  Command
} from 'lucide-react';
import { StorageService } from '../services/StorageService';
import { ViewMode } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const orders = StorageService.getAllWorkOrders();
  const customers = StorageService.getAllCustomers();
  const vehicles = StorageService.getAllVehicles();
  const quotes = StorageService.getAllQuotes();

  const q = query.trim().toLowerCase();

  const filteredOrders = q ? orders.filter(o => o.orderNumber.toLowerCase().includes(q) || o.status.toLowerCase().includes(q)) : orders.slice(0, 3);
  const filteredCustomers = q ? customers.filter(c => `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)) : customers.slice(0, 3);
  const filteredVehicles = q ? vehicles.filter(v => v.licensePlate.toLowerCase().includes(q) || `${v.make} ${v.model}`.toLowerCase().includes(q)) : vehicles.slice(0, 3);
  const filteredQuotes = q ? quotes.filter(qu => qu.quoteNumber.toLowerCase().includes(q)) : quotes.slice(0, 2);

  const handleSelect = (view: ViewMode) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div 
      className="cmd-palette-backdrop"
      onClick={onClose}
    >
      <div 
        className="cmd-palette-modal"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'fadeIn 0.15s ease-out' }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 18px',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search orders, plates, customers..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '15px',
              color: 'var(--color-text-primary)',
              fontFamily: 'inherit'
            }}
          />
          <span style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            background: 'var(--color-surface-secondary)',
            padding: '2px 6px',
            borderRadius: '4px',
            border: '1px solid var(--color-border)',
            fontFamily: 'var(--font-mono)'
          }}>
            ESC
          </span>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px' }}>
          {/* Section: Work Orders */}
          {filteredOrders.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em', color: 'var(--color-text-muted)', padding: '4px 10px' }}>
                WORK ORDERS
              </div>
              {filteredOrders.map(o => (
                <div
                  key={o.id}
                  onClick={() => handleSelect('work-orders')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                  className="saas-card-hover"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ClipboardList size={15} color="var(--brand-blue)" />
                    <span className="font-mono" style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>#{o.orderNumber}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>• {o.status}</span>
                  </div>
                  <ArrowRight size={13} color="var(--color-text-muted)" />
                </div>
              ))}
            </div>
          )}

          {/* Section: Vehicles */}
          {filteredVehicles.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em', color: 'var(--color-text-muted)', padding: '4px 10px' }}>
                VEHICLES
              </div>
              {filteredVehicles.map(v => (
                <div
                  key={v.id}
                  onClick={() => handleSelect('vehicles')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                  className="saas-card-hover"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Car size={15} color="var(--color-warning)" />
                    <span className="font-mono" style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{v.licensePlate}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{v.make} {v.model} ({v.year})</span>
                  </div>
                  <ArrowRight size={13} color="var(--color-text-muted)" />
                </div>
              ))}
            </div>
          )}

          {/* Section: Customers */}
          {filteredCustomers.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em', color: 'var(--color-text-muted)', padding: '4px 10px' }}>
                CUSTOMERS
              </div>
              {filteredCustomers.map(c => (
                <div
                  key={c.id}
                  onClick={() => handleSelect('customers')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                  className="saas-card-hover"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={15} color="var(--color-success)" />
                    <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{c.firstName} {c.lastName}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>{c.email}</span>
                  </div>
                  <ArrowRight size={13} color="var(--color-text-muted)" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div style={{
          padding: '8px 16px',
          background: 'var(--color-surface-secondary)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--color-text-muted)'
        }}>
          <span>Navigation Shortcuts</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
