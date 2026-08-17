// ==========================================================================
// AtelierOS - Deterministic Cross-Border Tax Engine (France & Switzerland)
// ==========================================================================

import { CountryCode, CustomerType } from '../types';

export interface TaxDeterminationRequest {
  sellerCountry: CountryCode;
  customerCountry: CountryCode;
  customerType: CustomerType;
  customerVatNumber?: string;
  serviceCategory?: string;
}

export interface TaxDeterminationResult {
  vatRate: number;
  taxTreatment: string;
  isReverseCharge: boolean;
  legalNotice: string;
}

export class TaxService {
  /**
   * Determine the exact deterministic VAT rate & tax treatment rationale
   */
  public static determineTaxRule(req: TaxDeterminationRequest): TaxDeterminationResult {
    const { sellerCountry, customerCountry, customerType, customerVatNumber } = req;

    // Case 1: Seller is in France (FR)
    if (sellerCountry === 'FR') {
      // Domestic French Customer
      if (customerCountry === 'FR') {
        return {
          vatRate: 20.0,
          taxTreatment: 'TVA France standard 20.0% (Art. 256 du CGI)',
          isReverseCharge: false,
          legalNotice: 'TVA acquittée selon les débits. Facturation électronique conforme Chorus Pro / PPF.'
        };
      }

      // Customer in Switzerland (CH) or Other Non-EU Country
      if (customerCountry === 'CH') {
        if (customerType === 'BUSINESS' && customerVatNumber) {
          // B2B Cross-Border with verified UID
          return {
            vatRate: 0.0,
            taxTreatment: 'Exonération TVA - Prestation de services B2B internationale / Autoliquidation',
            isReverseCharge: true,
            legalNotice: 'Exonération de TVA selon l\'article 259 B du CGI - Autoliquidation par le preneur suisse.'
          };
        } else {
          // Swiss Individual (B2C) taking physical vehicle repair in French garage
          // Physical automotive repairs carried out in France are subject to French VAT
          return {
            vatRate: 20.0,
            taxTreatment: 'TVA France 20.0% (Prestation matérielle exécutée en France - Art. 259 A 4° du CGI)',
            isReverseCharge: false,
            legalNotice: 'Prestation localisée en France au lieu d\'exécution matérielle des travaux.'
          };
        }
      }
    }

    // Case 2: Seller is in Switzerland (CH)
    if (sellerCountry === 'CH') {
      // Standard Swiss VAT rate (8.1% from Jan 1, 2024)
      return {
        vatRate: 8.1,
        taxTreatment: 'TVA Suisse standard 8.1% (MWSTG Art. 18 / 25)',
        isReverseCharge: false,
        legalNotice: 'TVA suisse 8.1% incluse. Bulletin de versement QR avec référence structurée.'
      };
    }

    // Default Fallback
    return {
      vatRate: 20.0,
      taxTreatment: 'TVA standard 20.0%',
      isReverseCharge: false,
      legalNotice: 'Taux légal en vigueur.'
    };
  }

  /**
   * Compute line items and VAT totals deterministically
   */
  public static calculateTotals(lines: Array<{ quantity: number; unitPrice: number; vatRate: number; discount?: number }>) {
    let subtotalExclVat = 0;
    const rateMap = new Map<number, { taxableBase: number; vatAmount: number }>();

    for (const line of lines) {
      const discountAmount = line.discount || 0;
      const lineTotalExcl = (line.quantity * line.unitPrice) - discountAmount;
      subtotalExclVat += lineTotalExcl;

      const rate = line.vatRate;
      const lineVat = lineTotalExcl * (rate / 100);

      const existing = rateMap.get(rate) || { taxableBase: 0, vatAmount: 0 };
      existing.taxableBase += lineTotalExcl;
      existing.vatAmount += lineVat;
      rateMap.set(rate, existing);
    }

    const vatBreakdown: Array<{ rate: number; vatAmount: number; taxableBase: number }> = [];
    let totalVat = 0;

    rateMap.forEach((val, rate) => {
      const roundedVat = Math.round(val.vatAmount * 100) / 100;
      const roundedBase = Math.round(val.taxableBase * 100) / 100;
      vatBreakdown.push({
        rate,
        taxableBase: roundedBase,
        vatAmount: roundedVat
      });
      totalVat += roundedVat;
    });

    const roundedSubtotal = Math.round(subtotalExclVat * 100) / 100;
    const roundedTotalAmount = Math.round((roundedSubtotal + totalVat) * 100) / 100;

    return {
      subtotalExclVat: roundedSubtotal,
      vatBreakdown,
      totalVat: Math.round(totalVat * 100) / 100,
      totalAmount: roundedTotalAmount
    };
  }
}
