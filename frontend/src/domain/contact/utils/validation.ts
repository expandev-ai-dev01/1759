import { z } from 'zod';

/**
 * @validation Contact form validation schema
 * @domain contact
 * @type validation-schema
 */
export const contactFormSchema = z.object({
  nomeCompleto: z
    .string('Nome completo é obrigatório')
    .min(3, 'O nome deve conter pelo menos 3 caracteres')
    .max(100, 'O nome deve conter no máximo 100 caracteres')
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      'Por favor, informe seu nome completo (nome e sobrenome)'
    ),

  email: z
    .string('E-mail é obrigatório')
    .email('Por favor, informe um endereço de e-mail válido no formato usuario@dominio.com')
    .max(100, 'O e-mail deve conter no máximo 100 caracteres'),

  telefone: z
    .string('Telefone é obrigatório')
    .min(10, 'O telefone deve conter pelo menos 10 dígitos incluindo DDD')
    .refine(
      (val) => /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(val.replace(/\s/g, '')),
      'Por favor, informe um número de telefone válido com DDD'
    ),

  preferenciaContato: z.enum(
    ['Telefone', 'E-mail', 'WhatsApp'],
    'Por favor, selecione sua preferência de contato'
  ),

  melhorHorario: z.enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário']).optional(),

  idVeiculo: z.string('ID do veículo é obrigatório').min(1),

  modeloVeiculo: z.string('Modelo do veículo é obrigatório').min(1),

  assunto: z.enum(
    [
      'Informações gerais',
      'Agendamento de test drive',
      'Negociação de preço',
      'Financiamento',
      'Outro',
    ],
    'Por favor, selecione o assunto da sua consulta'
  ),

  mensagem: z
    .string('Mensagem é obrigatória')
    .min(10, 'Por favor, forneça mais detalhes em sua mensagem (mínimo 10 caracteres)')
    .max(1000, 'Sua mensagem excedeu o limite de 1000 caracteres'),

  financiamento: z.boolean().optional(),

  termosPrivacidade: z
    .boolean('Termos de privacidade são obrigatórios')
    .refine(
      (val) => val === true,
      'É necessário concordar com os termos de privacidade para prosseguir'
    ),

  receberNovidades: z.boolean().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
