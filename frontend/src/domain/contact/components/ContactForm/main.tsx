import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContactSubmit } from '../../hooks/useContactSubmit';
import { contactFormSchema } from '../../utils/validation';
import { formatPhoneNumber } from '../../utils/formatters';
import type { ContactFormProps } from './types';
import type { ContactFormData } from '../../types';

/**
 * @component ContactForm
 * @summary Contact form for vehicle inquiries with validation and submission
 * @domain contact
 * @type domain-component
 * @category form
 */
export const ContactForm = ({ vehicleId, vehicleModel, onSuccess, onError }: ContactFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [protocol, setProtocol] = useState('');
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      idVeiculo: vehicleId,
      modeloVeiculo: vehicleModel,
      melhorHorario: 'Qualquer horário',
      financiamento: false,
      termosPrivacidade: false,
      receberNovidades: false,
    },
  });

  const {
    submit,
    isSubmitting,
    error: submitError,
  } = useContactSubmit({
    onSuccess: (response) => {
      setProtocol(response.protocolo);
      setShowSuccess(true);
      reset();
      onSuccess?.(response);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  const watchAssunto = watch('assunto');
  const watchMensagem = watch('mensagem');
  const watchTelefone = watch('telefone');

  useEffect(() => {
    if (watchAssunto === 'Financiamento') {
      setValue('financiamento', true);
    }
  }, [watchAssunto, setValue]);

  useEffect(() => {
    setCharCount(watchMensagem?.length || 0);
  }, [watchMensagem]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('telefone', formatted);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submit(data);
    } catch (error: unknown) {
      console.error('Form submission error:', error);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center">
          <div className="mb-4 text-green-600">
            <svg
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada com Sucesso!</h3>
          <p className="text-gray-600 mb-4">
            Obrigado pelo seu interesse! Recebemos sua mensagem e entraremos em contato em breve.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Número de Protocolo</p>
            <p className="text-2xl font-bold text-blue-600">{protocol}</p>
            <p className="text-xs text-gray-500 mt-2">Prazo de resposta: 24h úteis</p>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Enviar Nova Mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Entre em Contato</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            {...register('nomeCompleto')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="João da Silva"
          />
          {errors.nomeCompleto && (
            <p className="mt-1 text-sm text-red-600">{errors.nomeCompleto.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="joao@exemplo.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            {...register('telefone')}
            onChange={handlePhoneChange}
            value={watchTelefone || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="(11) 98765-4321"
          />
          {errors.telefone && (
            <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferência de Contato <span className="text-red-600">*</span>
          </label>
          <select
            {...register('preferenciaContato')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="Telefone">Telefone</option>
            <option value="E-mail">E-mail</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
          {errors.preferenciaContato && (
            <p className="mt-1 text-sm text-red-600">{errors.preferenciaContato.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Melhor Horário para Contato
          </label>
          <select
            {...register('melhorHorario')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Qualquer horário">Qualquer horário</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </select>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre o Veículo</h3>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">Veículo de Interesse</p>
            <p className="text-base font-semibold text-gray-900">{vehicleModel}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assunto <span className="text-red-600">*</span>
            </label>
            <select
              {...register('assunto')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="Informações gerais">Informações gerais</option>
              <option value="Agendamento de test drive">Agendamento de test drive</option>
              <option value="Negociação de preço">Negociação de preço</option>
              <option value="Financiamento">Financiamento</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.assunto && (
              <p className="mt-1 text-sm text-red-600">{errors.assunto.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem <span className="text-red-600">*</span>
            </label>
            <textarea
              {...register('mensagem')}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descreva sua dúvida ou interesse sobre o veículo..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.mensagem ? (
                <p className="text-sm text-red-600">{errors.mensagem.message}</p>
              ) : (
                <span></span>
              )}
              <p className="text-xs text-gray-500">{charCount}/1000 caracteres</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('financiamento')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Tenho interesse em opções de financiamento
              </span>
            </label>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register('termosPrivacidade')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
              />
              <span className="ml-2 text-sm text-gray-700">
                Li e concordo com os{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  termos de privacidade
                </a>{' '}
                <span className="text-red-600">*</span>
              </span>
            </label>
            {errors.termosPrivacidade && (
              <p className="mt-1 ml-6 text-sm text-red-600">{errors.termosPrivacidade.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register('receberNovidades')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
              />
              <span className="ml-2 text-sm text-gray-700">
                Desejo receber novidades e promoções por e-mail
              </span>
            </label>
          </div>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
    </div>
  );
};
