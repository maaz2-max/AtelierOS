// ==========================================================================
// AtelierOS - Confirmation Dialog Modal
// ==========================================================================

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="apple-modal-overlay" onClick={onCancel}>
      <div 
        className="apple-modal-content p-6 max-w-md animate-fade-in" 
        onClick={e => e.stopPropagation()}
        style={{ padding: '24px', borderRadius: '20px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: isDestructive ? 'rgba(255, 69, 58, 0.15)' : 'rgba(0, 113, 227, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDestructive ? '#ff453a' : '#0071e3'
            }}>
              <AlertTriangle size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f' }}>{title}</h3>
          </div>
          <button 
            onClick={onCancel}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.5, marginBottom: '24px' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button 
            className="apple-btn-secondary" 
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button 
            className={isDestructive ? 'apple-btn-danger' : 'apple-btn-primary'}
            onClick={() => {
              onConfirm();
              onCancel();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
