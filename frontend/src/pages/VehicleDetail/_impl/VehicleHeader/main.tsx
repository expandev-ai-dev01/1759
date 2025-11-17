import { formatPrice } from '@/domain/vehicle/utils/formatters';
import type { VehicleHeaderProps } from './types';

export const VehicleHeader = ({ tituloAnuncio, preco, statusVeiculo }: VehicleHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponível':
        return 'bg-green-100 text-green-800';
      case 'reservado':
        return 'bg-yellow-100 text-yellow-800';
      case 'vendido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tituloAnuncio}</h1>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              statusVeiculo
            )}`}
          >
            {statusVeiculo}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Preço</p>
          <p className="text-3xl font-bold text-blue-600">{formatPrice(preco)}</p>
        </div>
      </div>
    </div>
  );
};
