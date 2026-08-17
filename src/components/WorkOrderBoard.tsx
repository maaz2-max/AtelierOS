// ==========================================================================
// AtelierOS - 10-Stage Work Order Operations Board
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Car, 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Tablet, 
  FileCheck2, 
  Receipt,
  Plus
} from 'lucide-react';
import { WorkOrder, WorkOrderStage, Tenant, Customer, Vehicle, Mechanic, SupportedLanguage } from '../types';
import { StorageService } from '../services/StorageService';
import { translations } from '../i18n/translations';

interface WorkOrderBoardProps {
  activeTenant: Tenant;
  currentLanguage: SupportedLanguage;
  onOpenTabletMode: (workOrderId: string) => void;
  onOpenQuotes: (workOrderId: string) => void;
  onOpenInvoices: (workOrderId: string) => void;
}

const STAGES: WorkOrderStage[] = [
  'REQUEST',
  'APPOINTMENT',
  'DIAGNOSIS',
  'QUOTE',
  'AWAITING_APPROVAL',
  'APPROVED',
  'IN_PROGRESS',
  'QUALITY_CHECK',
  'READY',
  'DELIVERED',
  'INVOICED'
];

export const WorkOrderBoard: React.FC<WorkOrderBoardProps> = ({
  activeTenant,
  currentLanguage,
  onOpenTabletMode,
  onOpenQuotes,
  onOpenInvoices
}) => {
  const t = (translations[currentLanguage] || translations.en) as any;
  const two = t.workOrders;

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);

  const loadData = () => {
    setWorkOrders(StorageService.getWorkOrders(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setMechanics(StorageService.getMechanics(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  const advanceStage = (woId: string, direction: 'NEXT' | 'PREV') => {
    const all = StorageService.getAllWorkOrders();
    const target = all.find(w => w.id === woId);
    if (!target) return;

    const currentIndex = STAGES.indexOf(target.stage);
    if (direction === 'NEXT' && currentIndex < STAGES.length - 1) {
      target.stage = STAGES[currentIndex + 1];
    } else if (direction === 'PREV' && currentIndex > 0) {
      target.stage = STAGES[currentIndex - 1];
    }
    target.updatedAt = new Date().toISOString();

    StorageService.saveWorkOrders(all);
    loadData();
    if (selectedOrder && selectedOrder.id === woId) {
      setSelectedOrder({ ...target });
    }
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{two.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{two.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="apple-badge apple-badge-blue" style={{ fontSize: '13px', padding: '6px 14px' }}>
            {workOrders.length} Active Orders
          </span>
        </div>
      </div>

      {/* Kanban Board Container (Smooth horizontal scroll) */}
      <div 
        className="scrollbar-none"
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '20px'
        }}
      >
        {STAGES.map((stageKey) => {
          const stageOrders = workOrders.filter(w => w.stage === stageKey);
          const stageLabel = two.stages[stageKey] || stageKey;

          return (
            <div 
              key={stageKey} 
              style={{
                minWidth: '290px',
                maxWidth: '290px',
                background: '#f0f0f3',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                border: '1px solid #e5e5ea'
              }}
            >
              {/* Stage Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1d1d1f' }}>
                  {stageLabel}
                </span>
                <span className="apple-badge apple-badge-neutral" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {stageOrders.length}
                </span>
              </div>

              {/* Order Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '120px' }}>
                {stageOrders.map(wo => {
                  const customer = customers.find(c => c.id === wo.customerId);
                  const vehicle = vehicles.find(v => v.id === wo.vehicleId);
                  const mechanic = mechanics.find(m => m.id === wo.mechanicId);

                  return (
                    <div 
                      key={wo.id}
                      className="apple-card"
                      style={{
                        padding: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        borderLeft: `3px solid ${
                          wo.stage === 'INVOICED' ? '#30d158' :
                          wo.stage === 'IN_PROGRESS' ? '#0071e3' :
                          wo.stage === 'AWAITING_APPROVAL' ? '#ff9f0a' : '#86868b'
                        }`
                      }}
                      onClick={() => setSelectedOrder(wo)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: '#0071e3' }}>
                          {wo.orderNumber}
                        </span>
                        <span style={{ fontSize: '11px', color: '#86868b' }}>
                          {new Date(wo.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f' }}>
                        {vehicle?.make} {vehicle?.model}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6e6e73' }}>
                        <User size={13} />
                        <span>{customer?.firstName} {customer?.lastName}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6e6e73' }}>
                        <Car size={13} />
                        <span>{vehicle?.licensePlate}</span>
                      </div>

                      {wo.symptoms.length > 0 && (
                        <div style={{ fontSize: '11px', color: '#86868b', fontStyle: 'italic', background: '#f5f5f7', padding: '4px 8px', borderRadius: '6px' }}>
                          {wo.symptoms[0]}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #f0f0f3' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            advanceStage(wo.id, 'PREV');
                          }}
                          disabled={wo.stage === 'REQUEST'}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: wo.stage === 'REQUEST' ? 'default' : 'pointer',
                            opacity: wo.stage === 'REQUEST' ? 0.3 : 0.8
                          }}
                          title="Previous Stage"
                        >
                          <ArrowLeft size={14} />
                        </button>

                        {/* Quick links depending on stage */}
                        {['DIAGNOSIS', 'IN_PROGRESS', 'QUALITY_CHECK'].includes(wo.stage) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenTabletMode(wo.id);
                            }}
                            className="apple-btn-secondary"
                            style={{ fontSize: '11px', padding: '2px 8px', minHeight: '26px' }}
                          >
                            <Tablet size={12} color="#0071e3" />
                            <span>Bay Mode</span>
                          </button>
                        )}

                        {['QUOTE', 'AWAITING_APPROVAL'].includes(wo.stage) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenQuotes(wo.id);
                            }}
                            className="apple-btn-secondary"
                            style={{ fontSize: '11px', padding: '2px 8px', minHeight: '26px' }}
                          >
                            <FileCheck2 size={12} color="#bf5af2" />
                            <span>Quote</span>
                          </button>
                        )}

                        {['READY', 'DELIVERED', 'INVOICED'].includes(wo.stage) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenInvoices(wo.id);
                            }}
                            className="apple-btn-secondary"
                            style={{ fontSize: '11px', padding: '2px 8px', minHeight: '26px' }}
                          >
                            <Receipt size={12} color="#30d158" />
                            <span>Invoice</span>
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            advanceStage(wo.id, 'NEXT');
                          }}
                          disabled={wo.stage === 'INVOICED'}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: wo.stage === 'INVOICED' ? 'default' : 'pointer',
                            opacity: wo.stage === 'INVOICED' ? 0.3 : 0.8
                          }}
                          title="Advance to Next Stage"
                        >
                          <ArrowRight size={14} color="#0071e3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Work Order Inspector Modal */}
      {selectedOrder && (
        <div className="apple-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div 
            className="apple-modal-content p-6 max-w-2xl" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '640px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span className="apple-badge apple-badge-blue" style={{ marginBottom: '4px' }}>
                  {selectedOrder.stage}
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f' }}>
                  Work Order: {selectedOrder.orderNumber}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="apple-btn-secondary"
              >
                Close
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
              <div style={{ background: '#f5f5f7', padding: '14px', borderRadius: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <strong>Customer:</strong> {customers.find(c => c.id === selectedOrder.customerId)?.firstName} {customers.find(c => c.id === selectedOrder.customerId)?.lastName}
                </div>
                <div>
                  <strong>Vehicle:</strong> {vehicles.find(v => v.id === selectedOrder.vehicleId)?.make} {vehicles.find(v => v.id === selectedOrder.vehicleId)?.model} ({vehicles.find(v => v.id === selectedOrder.vehicleId)?.licensePlate})
                </div>
                <div>
                  <strong>Technician:</strong> {mechanics.find(m => m.id === selectedOrder.mechanicId)?.name || 'Assigned'}
                </div>
                <div>
                  <strong>Labor Recorded:</strong> {selectedOrder.laborTimeRecordedMin} mins
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: 600, marginBottom: '6px' }}>Reported Symptoms:</h4>
                <ul style={{ paddingLeft: '20px', color: '#6e6e73' }}>
                  {selectedOrder.symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {selectedOrder.diagnosisNotes && (
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '6px' }}>Technician Findings:</h4>
                  <p style={{ background: '#ffffff', border: '1px solid #e5e5ea', padding: '10px', borderRadius: '8px', color: '#333336' }}>
                    {selectedOrder.diagnosisNotes}
                  </p>
                </div>
              )}

              {selectedOrder.obdCodes.length > 0 && (
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '6px' }}>Logged OBD-II Codes:</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedOrder.obdCodes.map((c, i) => (
                      <span key={i} className="apple-badge apple-badge-red" style={{ fontSize: '12px' }}>
                        {c.code}: {c.description}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Jump Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid #e5e5ea', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const id = selectedOrder.id;
                    setSelectedOrder(null);
                    onOpenTabletMode(id);
                  }}
                  className="apple-btn-primary"
                >
                  <Tablet size={16} />
                  <span>Open in Mechanic Tablet Mode</span>
                </button>

                <button
                  onClick={() => {
                    const id = selectedOrder.id;
                    setSelectedOrder(null);
                    onOpenQuotes(id);
                  }}
                  className="apple-btn-secondary"
                >
                  <FileCheck2 size={16} />
                  <span>Manage Quote & Approval</span>
                </button>

                <button
                  onClick={() => {
                    const id = selectedOrder.id;
                    setSelectedOrder(null);
                    onOpenInvoices(id);
                  }}
                  className="apple-btn-secondary"
                >
                  <Receipt size={16} />
                  <span>View / Issue Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
