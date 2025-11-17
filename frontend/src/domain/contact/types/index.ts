export interface ContactFormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: 'Telefone' | 'E-mail' | 'WhatsApp';
  melhorHorario?: 'Manhã' | 'Tarde' | 'Noite' | 'Qualquer horário';
  idVeiculo: string;
  modeloVeiculo: string;
  assunto:
    | 'Informações gerais'
    | 'Agendamento de test drive'
    | 'Negociação de preço'
    | 'Financiamento'
    | 'Outro';
  mensagem: string;
  financiamento?: boolean;
  termosPrivacidade: boolean;
  receberNovidades?: boolean;
}

export interface ContactResponse {
  idContato: string;
  protocolo: string;
  mensagem: string;
}

export interface ContactFormProps {
  vehicleId: string;
  vehicleModel: string;
  onSuccess?: (response: ContactResponse) => void;
  onError?: (error: Error) => void;
}
