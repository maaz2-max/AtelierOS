// ==========================================================================
// AtelierOS - LocalStorage Repository Service (Supabase-Ready)
// ==========================================================================

import { Tenant, Customer, Vehicle, Mechanic, WorkshopBay, ServiceItem, Appointment, WorkOrder, Quote, Invoice, CommunicationLog, SlotHold, AuthUser, UserRole } from '../types';
import { SEED_TENANTS, SEED_CUSTOMERS, SEED_VEHICLES, SEED_MECHANICS, SEED_BAYS, SEED_SERVICES, SEED_APPOINTMENTS, SEED_WORK_ORDERS, SEED_QUOTES, SEED_INVOICES, SEED_COMMUNICATIONS } from '../data/seedData';

export const DEMO_USERS: AuthUser[] = [
  {
    id: 'user_admin_fr',
    name: 'Luca Sigon',
    email: 'luca.sigon@parisauto.fr',
    role: 'GARAGE_ADMIN',
    roleLabel: 'Workshop Manager (FR)',
    tenantId: 'tenant-fr-paris',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  },
  {
    id: 'user_admin_ch',
    name: 'Henri Meier',
    email: 'henri.meier@genevamotors.ch',
    role: 'GARAGE_ADMIN',
    roleLabel: 'Workshop Manager (CH)',
    tenantId: 'tenant-ch-geneva',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 'user_mech_fr',
    name: 'Marc Dupont',
    email: 'marc.dupont@parisauto.fr',
    role: 'MECHANIC',
    roleLabel: 'Senior Diagnostic Mechanic',
    tenantId: 'tenant-fr-paris',
    mechanicId: 'mech-fr-01',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    id: 'user_cust_fr',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@email.fr',
    role: 'CUSTOMER',
    roleLabel: 'Vehicle Owner (Peugeot 3008)',
    tenantId: 'tenant-fr-paris',
    customerId: 'cust-fr-01',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 'user_super_admin',
    name: 'Alexandre Mars',
    email: 'alexandre@mars-association.org',
    role: 'SUPER_ADMIN',
    roleLabel: 'SaaS Super Administrator',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

const STORAGE_KEYS = {
  TENANTS: 'atelieros_tenants',
  ACTIVE_TENANT_ID: 'atelieros_active_tenant_id',
  AUTH_USER: 'atelieros_auth_user',
  CUSTOMERS: 'atelieros_customers',
  VEHICLES: 'atelieros_vehicles',
  MECHANICS: 'atelieros_mechanics',
  BAYS: 'atelieros_bays',
  SERVICES: 'atelieros_services',
  APPOINTMENTS: 'atelieros_appointments',
  WORK_ORDERS: 'atelieros_work_orders',
  QUOTES: 'atelieros_quotes',
  INVOICES: 'atelieros_invoices',
  COMMUNICATIONS: 'atelieros_communications',
  SLOT_HOLDS: 'atelieros_slot_holds',
  LANGUAGE: 'atelieros_language'
};

export class StorageService {
  public static init() {
    if (!localStorage.getItem(STORAGE_KEYS.TENANTS)) {
      this.resetDemoData();
    }
  }

  public static resetDemoData() {
    localStorage.setItem(STORAGE_KEYS.TENANTS, JSON.stringify(SEED_TENANTS));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TENANT_ID, SEED_TENANTS[0].id);
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(SEED_CUSTOMERS));
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(SEED_VEHICLES));
    localStorage.setItem(STORAGE_KEYS.MECHANICS, JSON.stringify(SEED_MECHANICS));
    localStorage.setItem(STORAGE_KEYS.BAYS, JSON.stringify(SEED_BAYS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(SEED_SERVICES));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.WORK_ORDERS, JSON.stringify(SEED_WORK_ORDERS));
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(SEED_QUOTES));
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(SEED_INVOICES));
    localStorage.setItem(STORAGE_KEYS.COMMUNICATIONS, JSON.stringify(SEED_COMMUNICATIONS));
    localStorage.setItem(STORAGE_KEYS.SLOT_HOLDS, JSON.stringify([]));
  }

  // Active Tenant
  public static getActiveTenantId(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_TENANT_ID) || 'tenant-fr-paris';
  }

  public static setActiveTenantId(id: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TENANT_ID, id);
    window.dispatchEvent(new Event('tenantChanged'));
  }

  public static getActiveTenant(): Tenant {
    const tenants = this.getTenants();
    const activeId = this.getActiveTenantId();
    return tenants.find(t => t.id === activeId) || tenants[0];
  }

  // Language
  public static getLanguage(): string {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';
  }

  public static setLanguage(lang: string) {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    window.dispatchEvent(new Event('languageChanged'));
  }

  // Generic Getters
  public static getTenants(): Tenant[] {
    const data = localStorage.getItem(STORAGE_KEYS.TENANTS);
    return data ? JSON.parse(data) : SEED_TENANTS;
  }

  public static getCustomers(tenantId?: string): Customer[] {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    const list: Customer[] = data ? JSON.parse(data) : SEED_CUSTOMERS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(c => c.tenantId === tid);
  }

  public static getAllCustomers(): Customer[] {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : SEED_CUSTOMERS;
  }

  public static saveCustomers(customers: Customer[]) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }

  public static getVehicles(tenantId?: string): Vehicle[] {
    const data = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    const list: Vehicle[] = data ? JSON.parse(data) : SEED_VEHICLES;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(v => v.tenantId === tid);
  }

  public static getAllVehicles(): Vehicle[] {
    const data = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    return data ? JSON.parse(data) : SEED_VEHICLES;
  }

  public static saveVehicles(vehicles: Vehicle[]) {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  }

  public static getMechanics(tenantId?: string): Mechanic[] {
    const data = localStorage.getItem(STORAGE_KEYS.MECHANICS);
    const list: Mechanic[] = data ? JSON.parse(data) : SEED_MECHANICS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(m => m.tenantId === tid);
  }

  public static saveMechanics(mechanics: Mechanic[]) {
    localStorage.setItem(STORAGE_KEYS.MECHANICS, JSON.stringify(mechanics));
  }

  public static getBays(tenantId?: string): WorkshopBay[] {
    const data = localStorage.getItem(STORAGE_KEYS.BAYS);
    const list: WorkshopBay[] = data ? JSON.parse(data) : SEED_BAYS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(b => b.tenantId === tid);
  }

  public static saveBays(bays: WorkshopBay[]) {
    localStorage.setItem(STORAGE_KEYS.BAYS, JSON.stringify(bays));
  }

  public static getServices(tenantId?: string): ServiceItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const list: ServiceItem[] = data ? JSON.parse(data) : SEED_SERVICES;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(s => s.tenantId === tid);
  }

  public static saveServices(services: ServiceItem[]) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }

  public static getAppointments(tenantId?: string): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    const list: Appointment[] = data ? JSON.parse(data) : SEED_APPOINTMENTS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(a => a.tenantId === tid);
  }

  public static getAllAppointments(): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : SEED_APPOINTMENTS;
  }

  public static saveAppointments(appointments: Appointment[]) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }

  public static getWorkOrders(tenantId?: string): WorkOrder[] {
    const data = localStorage.getItem(STORAGE_KEYS.WORK_ORDERS);
    const list: WorkOrder[] = data ? JSON.parse(data) : SEED_WORK_ORDERS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(w => w.tenantId === tid);
  }

  public static getAllWorkOrders(): WorkOrder[] {
    const data = localStorage.getItem(STORAGE_KEYS.WORK_ORDERS);
    return data ? JSON.parse(data) : SEED_WORK_ORDERS;
  }

  public static saveWorkOrders(orders: WorkOrder[]) {
    localStorage.setItem(STORAGE_KEYS.WORK_ORDERS, JSON.stringify(orders));
  }

  public static getQuotes(tenantId?: string): Quote[] {
    const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
    const list: Quote[] = data ? JSON.parse(data) : SEED_QUOTES;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(q => q.tenantId === tid);
  }

  public static getAllQuotes(): Quote[] {
    const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
    return data ? JSON.parse(data) : SEED_QUOTES;
  }

  public static saveQuotes(quotes: Quote[]) {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }

  public static getInvoices(tenantId?: string): Invoice[] {
    const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
    const list: Invoice[] = data ? JSON.parse(data) : SEED_INVOICES;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(i => i.tenantId === tid);
  }

  public static getAllInvoices(): Invoice[] {
    const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return data ? JSON.parse(data) : SEED_INVOICES;
  }

  public static saveInvoices(invoices: Invoice[]) {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }

  public static getCommunications(tenantId?: string): CommunicationLog[] {
    const data = localStorage.getItem(STORAGE_KEYS.COMMUNICATIONS);
    const list: CommunicationLog[] = data ? JSON.parse(data) : SEED_COMMUNICATIONS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(c => c.tenantId === tid);
  }

  public static saveCommunications(logs: CommunicationLog[]) {
    localStorage.setItem(STORAGE_KEYS.COMMUNICATIONS, JSON.stringify(logs));
  }

  // Slot Holds
  public static getSlotHolds(): SlotHold[] {
    const data = localStorage.getItem(STORAGE_KEYS.SLOT_HOLDS);
    const list: SlotHold[] = data ? JSON.parse(data) : [];
    const now = Date.now();
    return list.filter(h => h.expiresAt > now);
  }

  public static saveSlotHolds(holds: SlotHold[]) {
    localStorage.setItem(STORAGE_KEYS.SLOT_HOLDS, JSON.stringify(holds));
  }

  // ========================================================================
  // Authentication & Session Management
  // ========================================================================
  public static getAuthUser(): AuthUser | null {
    const data = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  public static setAuthUser(user: AuthUser | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      if (user.tenantId) {
        this.setActiveTenantId(user.tenantId);
      }
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
    window.dispatchEvent(new Event('authChanged'));
  }

  public static loginWithDemo(userId: string): AuthUser {
    const user = DEMO_USERS.find(u => u.id === userId) || DEMO_USERS[0];
    this.setAuthUser(user);
    return user;
  }

  public static logout() {
    this.setAuthUser(null);
  }

  public static getDemoUsers(): AuthUser[] {
    return DEMO_USERS;
  }

  // ========================================================================
  // Role-Isolated Scoped Data Access (Zero Overlap)
  // ========================================================================
  
  // Customer Scoped Access
  public static getCustomerVehicles(customerId: string): Vehicle[] {
    const all = this.getAllVehicles();
    return all.filter(v => v.customerId === customerId);
  }

  public static getCustomerWorkOrders(customerId: string): WorkOrder[] {
    const all = this.getAllWorkOrders();
    return all.filter(wo => wo.customerId === customerId);
  }

  public static getCustomerQuotes(customerId: string): Quote[] {
    const all = this.getAllQuotes();
    return all.filter(q => q.customerId === customerId);
  }

  public static getCustomerInvoices(customerId: string): Invoice[] {
    const all = this.getAllInvoices();
    return all.filter(i => i.customerId === customerId);
  }

  // Mechanic Scoped Access
  public static getMechanicWorkOrders(mechanicId: string): WorkOrder[] {
    const all = this.getWorkOrders(); // filtered by current tenant
    return all.filter(wo => wo.assignedMechanicId === mechanicId);
  }
}

