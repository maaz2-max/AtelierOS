// ==========================================================================
// AtelierOS - Central Scheduling Engine (Single Source of Truth)
// Unified engine shared by Staff Calendar, Customer Web Booking & AI Assistant
// ==========================================================================

import { Appointment, SlotHold, ServiceItem, Mechanic, WorkshopBay, Tenant } from '../types';
import { StorageService } from './StorageService';

export interface AvailableSlot {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  mechanicId: string;
  mechanicName: string;
  bayId: string;
  bayName: string;
  isHoldLocked?: boolean;
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  reason?: string;
  conflictingMechanic?: string;
  conflictingBay?: string;
}

export class SchedulingService {
  /**
   * Helper: Parse "HH:mm" into minutes from start of day
   */
  public static timeToMinutes(timeStr: string): number {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  }

  /**
   * Helper: Convert minutes from start of day to "HH:mm"
   */
  public static minutesToTime(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  /**
   * Central Availability Calculator
   * Returns all available slots for a given service & date range
   */
  public static getAvailableSlots(
    tenantId: string,
    serviceId: string,
    date: string // YYYY-MM-DD
  ): AvailableSlot[] {
    const tenant = StorageService.getTenants().find(t => t.id === tenantId) || StorageService.getActiveTenant();
    const service = StorageService.getServices(tenantId).find(s => s.id === serviceId);
    if (!service) return [];

    const mechanics = StorageService.getMechanics(tenantId).filter(m => m.active);
    const bays = StorageService.getBays(tenantId).filter(b => b.active);
    const existingAppointments = StorageService.getAppointments(tenantId).filter(
      a => a.date === date && a.status !== 'CANCELLED'
    );
    const activeHolds = StorageService.getSlotHolds().filter(h => h.tenantId === tenantId && h.date === date);

    // Eligible mechanics matching required skills
    const qualifiedMechanics = mechanics.filter(mech => {
      // Check leave
      const onLeave = mech.leaves.some(l => date >= l.startDate && date <= l.endDate);
      if (onLeave) return false;
      // Check skill
      if (service.requiredSkills.length === 0) return true;
      return service.requiredSkills.some(skill => mech.skills.includes(skill));
    });

    // Eligible bays matching required type
    const qualifiedBays = bays.filter(bay => bay.type === service.requiredBayType || bays.length === 1);

    if (qualifiedMechanics.length === 0 || qualifiedBays.length === 0) {
      return [];
    }

    const totalDuration = service.bufferBeforeMin + service.estimatedDurationMin + service.bufferAfterMin;
    const openMins = this.timeToMinutes(tenant.settings.openingTime);
    const closeMins = this.timeToMinutes(tenant.settings.closingTime);
    const lunchStartMins = this.timeToMinutes(tenant.settings.lunchStart);
    const lunchEndMins = this.timeToMinutes(tenant.settings.lunchEnd);
    const slotStep = tenant.settings.slotDurationMin || 30;

    const availableSlots: AvailableSlot[] = [];

    // Iterate across workday slots
    for (let current = openMins; current + totalDuration <= closeMins; current += slotStep) {
      const slotStart = current;
      const slotEnd = current + totalDuration;

      // Skip if overlapping lunch break
      const overlapsLunch = !(slotEnd <= lunchStartMins || slotStart >= lunchEndMins);
      if (overlapsLunch) continue;

      const slotStartTimeStr = this.minutesToTime(slotStart);
      const slotEndTimeStr = this.minutesToTime(slotEnd);

      // Find an available qualified mechanic and bay combo
      for (const mech of qualifiedMechanics) {
        // Check mechanic working hours
        const mechStart = this.timeToMinutes(mech.workingHours.start);
        const mechEnd = this.timeToMinutes(mech.workingHours.end);
        if (slotStart < mechStart || slotEnd > mechEnd) continue;

        // Check if mechanic is busy in existing appointments
        const mechBusyInApp = existingAppointments.some(app => {
          if (app.mechanicId !== mech.id) return false;
          const appStart = this.timeToMinutes(app.startTime);
          const appEnd = this.timeToMinutes(app.endTime);
          return !(slotEnd <= appStart || slotStart >= appEnd);
        });

        // Check if mechanic is held
        const mechBusyInHold = activeHolds.some(h => {
          if (h.mechanicId !== mech.id) return false;
          const hStart = this.timeToMinutes(h.startTime);
          const hEnd = this.timeToMinutes(h.endTime);
          return !(slotEnd <= hStart || slotStart >= hEnd);
        });

        if (mechBusyInApp || mechBusyInHold) continue;

        // Now find an available qualified bay
        for (const bay of qualifiedBays) {
          const bayBusyInApp = existingAppointments.some(app => {
            if (app.bayId !== bay.id) return false;
            const appStart = this.timeToMinutes(app.startTime);
            const appEnd = this.timeToMinutes(app.endTime);
            return !(slotEnd <= appStart || slotStart >= appEnd);
          });

          const bayBusyInHold = activeHolds.some(h => {
            if (h.bayId !== bay.id) return false;
            const hStart = this.timeToMinutes(h.startTime);
            const hEnd = this.timeToMinutes(h.endTime);
            return !(slotEnd <= hStart || slotStart >= hEnd);
          });

          if (!bayBusyInApp && !bayBusyInHold) {
            availableSlots.push({
              date,
              startTime: slotStartTimeStr,
              endTime: slotEndTimeStr,
              mechanicId: mech.id,
              mechanicName: mech.name,
              bayId: bay.id,
              bayName: bay.name
            });
            break; // Found valid pair for this time slot
          }
        }
      }
    }

    return availableSlots;
  }

  /**
   * Conflict Detection Engine
   */
  public static checkConflict(params: {
    tenantId: string;
    date: string;
    startTime: string;
    endTime: string;
    mechanicId: string;
    bayId: string;
    excludeAppointmentId?: string;
  }): ConflictCheckResult {
    const { tenantId, date, startTime, endTime, mechanicId, bayId, excludeAppointmentId } = params;
    const startMins = this.timeToMinutes(startTime);
    const endMins = this.timeToMinutes(endTime);

    const appointments = StorageService.getAppointments(tenantId).filter(
      a => a.date === date && a.status !== 'CANCELLED' && a.id !== excludeAppointmentId
    );

    const mechanics = StorageService.getMechanics(tenantId);
    const bays = StorageService.getBays(tenantId);

    for (const app of appointments) {
      const appStart = this.timeToMinutes(app.startTime);
      const appEnd = this.timeToMinutes(app.endTime);
      const isOverlap = !(endMins <= appStart || startMins >= appEnd);

      if (isOverlap) {
        if (app.mechanicId === mechanicId) {
          const m = mechanics.find(mech => mech.id === mechanicId);
          return {
            hasConflict: true,
            reason: `Mechanic ${m?.name || mechanicId} is already booked from ${app.startTime} to ${app.endTime}`,
            conflictingMechanic: m?.name
          };
        }
        if (app.bayId === bayId) {
          const b = bays.find(bay => bay.id === bayId);
          return {
            hasConflict: true,
            reason: `Bay ${b?.name || bayId} is already occupied from ${app.startTime} to ${app.endTime}`,
            conflictingBay: b?.name
          };
        }
      }
    }

    return { hasConflict: false };
  }

  /**
   * Create a 10-minute temporary slot hold during customer web checkout
   */
  public static createSlotHold(params: {
    tenantId: string;
    serviceId: string;
    mechanicId: string;
    bayId: string;
    date: string;
    startTime: string;
    endTime: string;
  }): SlotHold | null {
    // Re-verify availability
    const conflict = this.checkConflict(params);
    if (conflict.hasConflict) return null;

    const timeoutMinutes = 10;
    const hold: SlotHold = {
      id: `hold-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      tenantId: params.tenantId,
      serviceId: params.serviceId,
      mechanicId: params.mechanicId,
      bayId: params.bayId,
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      expiresAt: Date.now() + timeoutMinutes * 60 * 1000,
      token: `tok_hold_${Date.now()}`
    };

    const holds = StorageService.getSlotHolds();
    holds.push(hold);
    StorageService.saveSlotHolds(holds);
    return hold;
  }

  /**
   * Release a temporary slot hold
   */
  public static releaseSlotHold(holdId: string) {
    const holds = StorageService.getSlotHolds().filter(h => h.id !== holdId);
    StorageService.saveSlotHolds(holds);
  }

  /**
   * Confirm an appointment and release hold
   */
  public static confirmAppointment(params: {
    tenantId: string;
    customerId: string;
    vehicleId: string;
    serviceId: string;
    mechanicId: string;
    bayId: string;
    date: string;
    startTime: string;
    endTime: string;
    source: 'STAFF' | 'ONLINE_WEB' | 'AI_ASSISTANT';
    intakeNotes?: string;
    customerAnswers?: Record<string, any>;
    holdId?: string;
  }): Appointment {
    if (params.holdId) {
      this.releaseSlotHold(params.holdId);
    }

    const refNumber = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const appointment: Appointment = {
      id: `app-${Date.now()}`,
      tenantId: params.tenantId,
      customerId: params.customerId,
      vehicleId: params.vehicleId,
      serviceId: params.serviceId,
      mechanicId: params.mechanicId,
      bayId: params.bayId,
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      status: 'CONFIRMED',
      source: params.source,
      intakeNotes: params.intakeNotes,
      customerAnswers: params.customerAnswers,
      confirmationCode: refNumber,
      createdAt: new Date().toISOString()
    };

    const allApps = StorageService.getAllAppointments();
    allApps.push(appointment);
    StorageService.saveAppointments(allApps);

    // Automatically create a linked Work Order in 'APPOINTMENT' stage
    const workOrderNumber = `OR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const workOrder = {
      id: `wo-${Date.now()}`,
      tenantId: params.tenantId,
      orderNumber: workOrderNumber,
      appointmentId: appointment.id,
      customerId: params.customerId,
      vehicleId: params.vehicleId,
      mechanicId: params.mechanicId,
      bayId: params.bayId,
      stage: 'APPOINTMENT' as const,
      symptoms: [params.intakeNotes || 'Online booking service requested'],
      diagnosisNotes: '',
      obdCodes: [],
      photos: [],
      checklist: [
        { id: 'chk-1', title: 'Vehicle exterior walkaround & fluid check', status: 'PASS' as const },
        { id: 'chk-2', title: 'Brake, tire & suspension visual check', status: 'PASS' as const },
        { id: 'chk-3', title: 'OBD-II diagnostic health scan', status: 'PASS' as const }
      ],
      partsUsed: [],
      laborTimeRecordedMin: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const allWorkOrders = StorageService.getAllWorkOrders();
    allWorkOrders.push(workOrder);
    StorageService.saveWorkOrders(allWorkOrders);

    return appointment;
  }
}
