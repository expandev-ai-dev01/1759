import { formatKilometers } from '@/domain/vehicle/utils/formatters';
import type { VehicleSpecificationsProps } from './types';

export const VehicleSpecifications = ({ especificacoes }: VehicleSpecificationsProps) => {
  const specs = [
    { label: 'Marca', value: especificacoes.marca },
    { label: 'Modelo', value: especificacoes.modelo },
    { label: 'Ano Fabricação', value: especificacoes.anoFabricacao },
    { label: 'Ano Modelo', value: especificacoes.anoModelo },
    { label: 'Quilometragem', value: formatKilometers(especificacoes.quilometragem) },
    { label: 'Combustível', value: especificacoes.combustivel },
    { label: 'Câmbio', value: especificacoes.cambio },
    { label: 'Potência', value: especificacoes.potencia },
    { label: 'Cor', value: especificacoes.cor },
    { label: 'Portas', value: especificacoes.portas },
    { label: 'Carroceria', value: especificacoes.carroceria },
    { label: 'Motor', value: especificacoes.motor },
    { label: 'Final da Placa', value: especificacoes.finalPlaca },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Especificações Técnicas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="border-b border-gray-200 pb-3">
            <p className="text-sm text-gray-600 mb-1">{spec.label}</p>
            <p className="text-base font-semibold text-gray-900">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
