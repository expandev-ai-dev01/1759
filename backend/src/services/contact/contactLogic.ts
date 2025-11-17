import { ContactCreateParams, ContactCreateResponse } from './contactTypes';

/**
 * @summary
 * In-memory storage for contacts
 */
const contacts: Map<string, any> = new Map();

/**
 * @summary
 * Counter for generating sequential protocol numbers
 */
let protocolCounter = 1;

/**
 * @summary
 * Generates a unique protocol number in format YYYYMMDDNNNNN
 *
 * @function generateProtocol
 * @module contact
 *
 * @returns {string} Generated protocol number
 *
 * @example
 * const protocol = generateProtocol();
 */
function generateProtocol(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const sequence = String(protocolCounter++).padStart(5, '0');
  return `${year}${month}${day}${sequence}`;
}

/**
 * @summary
 * Generates a unique contact identifier
 *
 * @function generateContactId
 * @module contact
 *
 * @returns {string} Generated contact identifier
 *
 * @example
 * const id = generateContactId();
 */
function generateContactId(): string {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * @summary
 * Creates a new contact form submission
 *
 * @function contactCreate
 * @module contact
 *
 * @param {ContactCreateParams} params - Contact creation parameters
 *
 * @returns {Promise<ContactCreateResponse>} Created contact with protocol number
 *
 * @example
 * const contact = await contactCreate({
 *   nomeCompleto: 'João Silva',
 *   email: 'joao@example.com',
 *   telefone: '(11) 98765-4321',
 *   preferenciaContato: 'WhatsApp',
 *   melhorHorario: 'Manhã',
 *   idVeiculo: '1',
 *   modeloVeiculo: 'Honda Civic 2023',
 *   assunto: 'Informações gerais',
 *   mensagem: 'Gostaria de mais informações sobre este veículo',
 *   financiamento: false,
 *   termosPrivacidade: true,
 *   receberNovidades: true,
 *   ipUsuario: '192.168.1.1'
 * });
 */
export async function contactCreate(params: ContactCreateParams): Promise<ContactCreateResponse> {
  const idContato = generateContactId();
  const protocolo = generateProtocol();
  const dataEnvio = new Date();

  /**
   * @rule {be-contact-storage} Store contact data in memory
   */
  const contact = {
    idContato,
    protocolo,
    nomeCompleto: params.nomeCompleto,
    email: params.email,
    telefone: params.telefone,
    preferenciaContato: params.preferenciaContato,
    melhorHorario: params.melhorHorario,
    idVeiculo: params.idVeiculo,
    modeloVeiculo: params.modeloVeiculo,
    assunto: params.assunto,
    mensagem: params.mensagem,
    financiamento: params.financiamento,
    termosPrivacidade: params.termosPrivacidade,
    receberNovidades: params.receberNovidades,
    dataEnvio,
    ipUsuario: params.ipUsuario,
    status: 'Novo',
    dataUltimaAtualizacao: dataEnvio,
  };

  contacts.set(idContato, contact);

  /**
   * @rule {be-contact-confirmation} Return confirmation with protocol
   */
  return {
    idContato,
    protocolo,
    mensagem: `Obrigado pelo seu contato! Seu protocolo é ${protocolo}. Entraremos em contato em até 24 horas úteis.`,
  };
}

/**
 * @summary
 * Gets all contacts (for internal use)
 *
 * @function contactList
 * @module contact
 *
 * @returns {any[]} Array of all contacts
 *
 * @example
 * const allContacts = contactList();
 */
export function contactList(): any[] {
  return Array.from(contacts.values());
}

/**
 * @summary
 * Gets a contact by ID
 *
 * @function contactGetById
 * @module contact
 *
 * @param {string} id - Contact identifier
 *
 * @returns {any | null} Contact data or null if not found
 *
 * @example
 * const contact = contactGetById('contact_123');
 */
export function contactGetById(id: string): any | null {
  return contacts.get(id) || null;
}
