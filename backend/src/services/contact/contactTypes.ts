/**
 * @interface ContactCreateParams
 * @description Parameters for creating a new contact form submission
 *
 * @property {string} nomeCompleto - Full name of the user
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferenciaContato - Contact preference (Telefone, E-mail, WhatsApp)
 * @property {string} melhorHorario - Best time to contact
 * @property {string} idVeiculo - Vehicle identifier
 * @property {string} modeloVeiculo - Vehicle model
 * @property {string} assunto - Subject of inquiry
 * @property {string} mensagem - Detailed message
 * @property {boolean} financiamento - Interest in financing
 * @property {boolean} termosPrivacidade - Privacy terms acceptance
 * @property {boolean} receberNovidades - Opt-in for news
 * @property {string} ipUsuario - User IP address
 */
export interface ContactCreateParams {
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: string;
  melhorHorario: string;
  idVeiculo: string;
  modeloVeiculo: string;
  assunto: string;
  mensagem: string;
  financiamento: boolean;
  termosPrivacidade: boolean;
  receberNovidades: boolean;
  ipUsuario: string;
}

/**
 * @interface ContactCreateResponse
 * @description Response structure for contact creation
 *
 * @property {string} idContato - Contact identifier
 * @property {string} protocolo - Protocol number
 * @property {string} mensagem - Confirmation message
 */
export interface ContactCreateResponse {
  idContato: string;
  protocolo: string;
  mensagem: string;
}

/**
 * @interface Contact
 * @description Represents a contact form submission
 *
 * @property {string} idContato - Contact identifier
 * @property {string} protocolo - Protocol number
 * @property {string} nomeCompleto - Full name
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferenciaContato - Contact preference
 * @property {string} melhorHorario - Best time to contact
 * @property {string} idVeiculo - Vehicle identifier
 * @property {string} modeloVeiculo - Vehicle model
 * @property {string} assunto - Subject
 * @property {string} mensagem - Message
 * @property {boolean} financiamento - Financing interest
 * @property {boolean} termosPrivacidade - Privacy terms acceptance
 * @property {boolean} receberNovidades - News opt-in
 * @property {Date} dataEnvio - Submission date
 * @property {string} ipUsuario - User IP address
 * @property {string} status - Contact status
 * @property {Date} dataUltimaAtualizacao - Last update date
 */
export interface Contact {
  idContato: string;
  protocolo: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: string;
  melhorHorario: string;
  idVeiculo: string;
  modeloVeiculo: string;
  assunto: string;
  mensagem: string;
  financiamento: boolean;
  termosPrivacidade: boolean;
  receberNovidades: boolean;
  dataEnvio: Date;
  ipUsuario: string;
  status: string;
  dataUltimaAtualizacao: Date;
}
