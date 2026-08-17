// ==========================================================================
// AtelierOS - AI Receptionist & Diagnostic Orchestrator (Function-Calling Architecture)
// AI never writes directly to DB or invents prices - it calls application APIs
// ==========================================================================

import { ServiceItem } from '../types';
import { StorageService } from './StorageService';
import { SchedulingService, AvailableSlot } from './SchedulingService';

export interface FunctionCallLog {
  functionName: string;
  arguments: Record<string, any>;
  result: any;
  timestamp: string;
}

export interface AIResponse {
  message: string;
  classifiedService?: ServiceItem;
  suggestedSlots: AvailableSlot[];
  functionCalls: FunctionCallLog[];
  suggestedOBDChecks?: string[];
}

export class AIService {
  /**
   * Safe Function Calling Orchestration for Intake & Diagnosis
   */
  public static async processCustomerIntake(
    tenantId: string,
    userInput: string,
    targetDate?: string
  ): Promise<AIResponse> {
    const functionCalls: FunctionCallLog[] = [];
    const dateToQuery = targetDate || new Date().toISOString().split('T')[0];
    const lower = userInput.toLowerCase();

    const services = StorageService.getServices(tenantId);
    let matchedService: ServiceItem | undefined = undefined;
    let suggestedOBDChecks: string[] = [];

    // Step 1: Simulated Tool Call: classifySymptoms(input)
    if (lower.includes('brake') || lower.includes('frein') || lower.includes('squeak') || lower.includes('grincement') || lower.includes('vibrat')) {
      matchedService = services.find(s => s.category === 'BRAKES') || services[0];
      suggestedOBDChecks = [
        'Inspect brake pad thickness (front & rear)',
        'Check rotor runout with dial gauge',
        'Verify ABS wheel speed sensors and wiring harnesses'
      ];
    } else if (lower.includes('oil') || lower.includes('vidange') || lower.includes('service') || lower.includes('revision') || lower.includes('filter')) {
      matchedService = services.find(s => s.category === 'MAINTENANCE') || services[0];
      suggestedOBDChecks = [
        'Perform 35-point multipoint vehicle inspection',
        'Check engine oil condition and oil filter seal',
        'Inspect auxiliary drive belt and coolant freeze point'
      ];
    } else if (lower.includes('battery') || lower.includes('tesla') || lower.includes('electric') || lower.includes('charge') || lower.includes('batterie') || lower.includes('hybride')) {
      matchedService = services.find(s => s.category === 'EV') || services[0];
      suggestedOBDChecks = [
        'High-Voltage isolation resistance diagnostic test',
        'BMS State of Health (SOH) cell balance measurement',
        'Thermal cooling pump flow rate check'
      ];
    } else {
      matchedService = services.find(s => s.category === 'DIAGNOSTIC') || services[0];
      suggestedOBDChecks = [
        'Full ECU OBD-II Diagnostic Scan (powertrain & CAN bus)',
        'Live sensor telemetry data recording',
        'Fuel trim (STFT/LTFT) and oxygen sensor verification'
      ];
    }

    functionCalls.push({
      functionName: 'ServiceCatalog.matchSymptoms',
      arguments: {
        rawInput: userInput,
        detectedCategory: matchedService?.category,
        serviceId: matchedService?.id
      },
      result: {
        serviceId: matchedService?.id,
        serviceName: matchedService?.name,
        estimatedDurationMin: matchedService?.estimatedDurationMin,
        basePrice: matchedService?.baseLaborPrice
      },
      timestamp: new Date().toISOString()
    });

    // Step 2: Tool Call: SchedulingService.getAvailableSlots(tenantId, serviceId, date)
    let availableSlots: AvailableSlot[] = [];
    if (matchedService) {
      availableSlots = SchedulingService.getAvailableSlots(tenantId, matchedService.id, dateToQuery);

      functionCalls.push({
        functionName: 'SchedulingService.getAvailableSlots',
        arguments: {
          tenantId,
          serviceId: matchedService.id,
          date: dateToQuery,
          durationMin: matchedService.estimatedDurationMin,
          requiredBay: matchedService.requiredBayType
        },
        result: {
          slotsFoundCount: availableSlots.length,
          slots: availableSlots.slice(0, 4)
        },
        timestamp: new Date().toISOString()
      });
    }

    // Step 3: Natural Language Response
    let responseText = '';
    if (matchedService) {
      responseText = `Based on your description, I recommend our **${matchedService.name}** (estimated duration: ${matchedService.estimatedDurationMin} min). I queried our central workshop agenda and found ${availableSlots.length} available slots for ${dateToQuery}.`;
    } else {
      responseText = `I have received your request. I recommend scheduling an **Electronic Diagnostic Inspection** to scan for error codes and isolate the issue.`;
    }

    return {
      message: responseText,
      classifiedService: matchedService,
      suggestedSlots: availableSlots.slice(0, 4),
      functionCalls,
      suggestedOBDChecks
    };
  }
}
