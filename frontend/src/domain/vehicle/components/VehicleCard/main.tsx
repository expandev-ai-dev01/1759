import { formatPrice, formatKilometers, formatYear } from '../../utils/formatters';
import type { VehicleCardProps } from './types';

export const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  const handleClick = () => {
    onClick?.(vehicle.id);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={vehicle.imagem_principal || '/placeholder-car.jpg'}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {vehicle.marca} {vehicle.modelo}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{formatYear(vehicle.ano)}</p>
        <p className="text-xl font-bold text-blue-600 mb-3">{formatPrice(vehicle.preco)}</p>
        {(vehicle.quilometragem || vehicle.cambio) && (
          <div className="flex gap-3 text-sm text-gray-600">
            {vehicle.quilometragem && <span>{formatKilometers(vehicle.quilometragem)}</span>}
            {vehicle.cambio && <span>{vehicle.cambio}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
