import type { VehicleSortProps } from './types';
import type { SortOrder } from '../../types';

export const VehicleSort = ({ sortBy, onSortChange }: VehicleSortProps) => {
  const sortOptions: { value: SortOrder; label: string }[] = [
    { value: 'relevancia', label: 'Relevância' },
    { value: 'preco_asc', label: 'Preço (menor para maior)' },
    { value: 'preco_desc', label: 'Preço (maior para menor)' },
    { value: 'ano_desc', label: 'Ano (mais recente)' },
    { value: 'ano_asc', label: 'Ano (mais antigo)' },
    { value: 'modelo_asc', label: 'Modelo (A-Z)' },
    { value: 'modelo_desc', label: 'Modelo (Z-A)' },
  ];

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOrder)}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
