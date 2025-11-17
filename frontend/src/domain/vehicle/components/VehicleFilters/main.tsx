import { useState, useEffect } from 'react';
import { useModelosByMarcas } from '../../hooks/useModelosByMarcas';
import type { VehicleFiltersProps } from './types';

export const VehicleFilters = ({
  filters,
  filterOptions,
  onFiltersChange,
  onApply,
  onClear,
}: VehicleFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const { data: modelosData } = useModelosByMarcas({
    marcas: localFilters.marcas || [],
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleMarcaChange = (marca: string, checked: boolean) => {
    const newMarcas = checked
      ? [...(localFilters.marcas || []), marca]
      : (localFilters.marcas || []).filter((m) => m !== marca);

    const newModelos = checked
      ? localFilters.modelos
      : (localFilters.modelos || []).filter((modelo) => {
          const modeloMarca = filterOptions.modelos.find((m) => m === modelo);
          return modeloMarca && newMarcas.length > 0;
        });

    const updated = {
      ...localFilters,
      marcas: newMarcas,
      modelos: newModelos,
    };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const handleModeloChange = (modelo: string, checked: boolean) => {
    const newModelos = checked
      ? [...(localFilters.modelos || []), modelo]
      : (localFilters.modelos || []).filter((m) => m !== modelo);

    const updated = { ...localFilters, modelos: newModelos };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const handleCambioChange = (cambio: string, checked: boolean) => {
    const newCambios = checked
      ? [...(localFilters.cambios || []), cambio]
      : (localFilters.cambios || []).filter((c) => c !== cambio);

    const updated = { ...localFilters, cambios: newCambios };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const handleAnoMinChange = (value: string) => {
    const updated = { ...localFilters, anoMin: value ? parseInt(value) : undefined };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const handleAnoMaxChange = (value: string) => {
    const updated = { ...localFilters, anoMax: value ? parseInt(value) : undefined };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const handlePrecoMinChange = (value: string) => {
    const updated = { ...localFilters, precoMin: value ? parseFloat(value) : undefined };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const handlePrecoMaxChange = (value: string) => {
    const updated = { ...localFilters, precoMax: value ? parseFloat(value) : undefined };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const availableModelos = modelosData?.modelos || filterOptions.modelos;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Marca</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filterOptions.marcas.map((marca) => (
              <label key={marca} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(localFilters.marcas || []).includes(marca)}
                  onChange={(e) => handleMarcaChange(marca, e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{marca}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Modelo</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableModelos.map((modelo) => (
              <label key={modelo} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(localFilters.modelos || []).includes(modelo)}
                  onChange={(e) => handleModeloChange(modelo, e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{modelo}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Ano</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-600">Mínimo</label>
              <select
                value={localFilters.anoMin || ''}
                onChange={(e) => handleAnoMinChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Qualquer</option>
                {filterOptions.anos.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600">Máximo</label>
              <select
                value={localFilters.anoMax || ''}
                onChange={(e) => handleAnoMaxChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Qualquer</option>
                {filterOptions.anos.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Preço</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-600">Mínimo</label>
              <input
                type="number"
                value={localFilters.precoMin || ''}
                onChange={(e) => handlePrecoMinChange(e.target.value)}
                placeholder="R$ 0"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Máximo</label>
              <input
                type="number"
                value={localFilters.precoMax || ''}
                onChange={(e) => handlePrecoMaxChange(e.target.value)}
                placeholder="R$ 0"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Câmbio</h3>
          <div className="space-y-2">
            {filterOptions.cambios.map((cambio) => (
              <label key={cambio} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(localFilters.cambios || []).includes(cambio)}
                  onChange={(e) => handleCambioChange(cambio, e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{cambio}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={onApply}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={onClear}
          className="flex-1 bg-gray-200 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
        >
          Limpar
        </button>
      </div>
    </div>
  );
};
