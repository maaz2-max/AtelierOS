// ==========================================================================
// AtelierOS - Omnichannel Communication Service (SMS, Email, WhatsApp)
// ==========================================================================

import { CommunicationLog, CommunicationChannel, Customer, Tenant, Appointment, Quote, Invoice } from '../types';
import { StorageService } from './StorageService';

export class CommunicationService {
  /**
   * Send simulated notification and record immutable communication audit log
   */
  public static sendNotification(params: {
    tenantId: string;
    customerId: string;
    recipient: string;
    channel: CommunicationChannel;
    templateType: CommunicationLog['templateType'];
    subject?: string;
    messageBody: string;
  }): CommunicationLog {
    const log: CommunicationLog = {
      id: `comm-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      tenantId: params.tenantId,
      customerId: params.customerId,
      recipient: params.recipient,
      channel: params.channel,
      templateType: params.templateType,
      subject: params.subject,
      messageBody: params.messageBody,
      status: 'DELIVERED',
      sentAt: new Date().toISOString()
    };

    const logs = StorageService.getCommunications(params.tenantId);
    logs.unshift(log);
    StorageService.saveCommunications(logs);

    return log;
  }

  /**
   * Dispatch Booking Confirmation
   */
  public static notifyBookingConfirmed(app: Appointment, customer: Customer, tenant: Tenant) {
    // 1. SMS
    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.phone,
      channel: 'SMS',
      templateType: 'BOOKING_CONFIRMATION',
      messageBody: `${tenant.name}: Votre RDV du ${app.date} à ${app.startTime} est confirmé (Réf: ${app.confirmationCode}). Adresse: ${tenant.address.street}, ${tenant.address.city}.`
    });

    // 2. Email
    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.email,
      channel: 'EMAIL',
      templateType: 'BOOKING_CONFIRMATION',
      subject: `Confirmation de votre réservation - ${tenant.name}`,
      messageBody: `Bonjour ${customer.firstName} ${customer.lastName},\n\nVotre rendez-vous a bien été confirmé pour le ${app.date} de ${app.startTime} à ${app.endTime}.\nRéférence dossier: ${app.confirmationCode}\n\nÀ très bientôt dans notre atelier,\nL'équipe ${tenant.name}`
    });
  }

  /**
   * Dispatch Quote Approval Magic Link
   */
  public static notifyQuoteReady(quote: Quote, customer: Customer, tenant: Tenant, magicLinkUrl: string) {
    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.phone,
      channel: 'SMS',
      templateType: 'QUOTE_APPROVAL_LINK',
      messageBody: `${tenant.name}: Votre devis ${quote.quoteNumber} de ${quote.totalAmount.toFixed(2)} ${quote.currency} est prêt. Consultez et validez-le ici : ${magicLinkUrl}`
    });

    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.email,
      channel: 'EMAIL',
      templateType: 'QUOTE_APPROVAL_LINK',
      subject: `Devis de réparation ${quote.quoteNumber} - ${tenant.name}`,
      messageBody: `Bonjour ${customer.firstName},\n\nLe diagnostic de votre véhicule est terminé. Votre devis de ${quote.totalAmount.toFixed(2)} ${quote.currency} est consultable en ligne.\nLien direct sécurisé : ${magicLinkUrl}\n\nCordialement,\n${tenant.name}`
    });
  }

  /**
   * Dispatch Vehicle Ready Notice
   */
  public static notifyVehicleReady(customer: Customer, tenant: Tenant, licensePlate: string) {
    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.phone,
      channel: 'SMS',
      templateType: 'VEHICLE_READY',
      messageBody: `${tenant.name}: Votre véhicule (${licensePlate}) est prêt ! Tous les contrôles de sécurité sont validés. Vous pouvez venir le récupérer à l'accueil.`
    });

    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.phone,
      channel: 'WHATSAPP',
      templateType: 'VEHICLE_READY',
      messageBody: `🚗 *${tenant.name}* : Votre véhicule immatriculé *${licensePlate}* est terminé et disponible à notre atelier. Nos équipes se tiennent à votre disposition !`
    });
  }
}
