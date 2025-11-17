import { useState } from 'react';
import { formatPrice } from '@/domain/vehicle/utils/formatters';
import type { SaleConditionsProps } from './types';

export const SaleConditions = ({ condicoesVenda, preco }: SaleConditionsProps) => {
  const [entrada, setEntrada] = useState(condicoesVenda.condicoesFinanciamento?.entradaMinima || 0);
  const [prazo, setPrazo] = useState(48);

  const calcularParcela = () => {
    if (!condicoesVenda.condicoesFinanciamento) return 0;
    const valorFinanciado = preco - entrada;
    const taxaMensal = condicoesVenda.condicoesFinanciamento.taxaJuros / 100;
    const parcela =
      (valorFinanciado * taxaMensal * Math.pow(1 + taxaMensal, prazo)) /
      (Math.pow(1 + taxaMensal, prazo) - 1);
    return parcela;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'regular':
        return 'text-green-600';
      case 'pendente':
        return 'text-yellow-600';
      case 'em andamento':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Condições de Venda</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Formas de Pagamento</h3>
          <ul className="space-y-2">
            {condicoesVenda.formasPagamento.map((forma, index) => (
              <li key={index} className="flex items-center text-sm text-gray-700">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {forma}
              </li>
            ))}
          </ul>
        </div>

        {condicoesVenda.condicoesFinanciamento && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulador de Financiamento</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entrada: {formatPrice(entrada)}
                </label>
                <input
                  type="range"
                  min={condicoesVenda.condicoesFinanciamento.entradaMinima}
                  max={preco * 0.5}
                  step={1000}
                  value={entrada}
                  onChange={(e) => setEntrada(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo: {prazo} meses
                </label>
                <input
                  type="range"
                  min={12}
                  max={condicoesVenda.condicoesFinanciamento.prazoMaximo}
                  step={12}
                  value={prazo}
                  onChange={(e) => setPrazo(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Parcela estimada</p>
                <p className="text-2xl font-bold text-blue-600">{formatPrice(calcularParcela())}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Taxa de juros: {condicoesVenda.condicoesFinanciamento.taxaJuros}% a.m.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Aceita troca</span>
            <span
              className={`text-sm font-semibold ${
                condicoesVenda.aceitaTroca ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {condicoesVenda.aceitaTroca ? 'Sim' : 'Não'}
            </span>
          </div>
        </div>

        {condicoesVenda.observacoesVenda && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Observações</h3>
            <p className="text-sm text-gray-600">{condicoesVenda.observacoesVenda}</p>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Documentação</h3>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Situação Documental</p>
            <p
              className={`text-sm font-semibold ${getStatusColor(
                condicoesVenda.situacaoDocumental.status
              )}`}
            >
              {condicoesVenda.situacaoDocumental.status}
            </p>
            {condicoesVenda.situacaoDocumental.pendencias &&
              condicoesVenda.situacaoDocumental.pendencias.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {condicoesVenda.situacaoDocumental.pendencias.map((pendencia, index) => (
                    <li key={index} className="text-xs text-gray-600">
                      • {pendencia}
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Documentos Necessários</p>
            <ul className="space-y-1">
              {condicoesVenda.documentacaoNecessaria.map((doc, index) => (
                <li key={index} className="text-xs text-gray-600">
                  • {doc.nome}
                  {doc.observacoes && <span className="text-gray-500"> ({doc.observacoes})</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium">
          Entrar em Contato
        </button>
      </div>
    </div>
  );
};
