import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { VehicleHistoryProps } from './types';

export const VehicleHistory = ({ historico }: VehicleHistoryProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (error: unknown) {
      return dateString;
    }
  };

  const hasSinistros = historico.sinistros && historico.sinistros.length > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Histórico do Veículo</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Procedência</p>
            <p className="text-base font-semibold text-gray-900">{historico.procedencia}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Proprietários</p>
            <p className="text-base font-semibold text-gray-900">{historico.proprietarios}</p>
          </div>
          {historico.garantia && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Garantia</p>
              <p className="text-base font-semibold text-gray-900">{historico.garantia}</p>
            </div>
          )}
        </div>

        {!hasSinistros && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-green-800 font-medium">Sem registro de sinistros</p>
            </div>
          </div>
        )}

        {historico.revisoes && historico.revisoes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Revisões</h3>
            <div className="space-y-3">
              {historico.revisoes.map((revisao, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(revisao.data)} - {revisao.quilometragem.toLocaleString('pt-BR')} km
                  </p>
                  <p className="text-sm text-gray-600">{revisao.local}</p>
                </div>
              ))}
            </div>
            {historico.revisoes.length > 0 && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-blue-800 font-medium">Revisões em dia</p>
                </div>
              </div>
            )}
          </div>
        )}

        {hasSinistros && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sinistros</h3>
            <div className="space-y-3">
              {historico.sinistros!.map((sinistro, index) => (
                <div key={index} className="border-l-4 border-red-600 pl-4 py-2">
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(sinistro.data)} - {sinistro.tipo}
                  </p>
                  <p className="text-sm text-gray-600">{sinistro.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {historico.laudoTecnico && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Laudo Técnico</h3>
            <p className="text-sm text-gray-600 mb-1">
              Data da inspeção: {formatDate(historico.laudoTecnico.dataInspecao)}
            </p>
            <p className="text-sm font-medium text-gray-900">
              Resultado: {historico.laudoTecnico.resultadoGeral}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
