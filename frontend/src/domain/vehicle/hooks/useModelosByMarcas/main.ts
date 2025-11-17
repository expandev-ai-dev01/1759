import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseModelosByMarcasOptions, UseModelosByMarcasReturn } from './types';

export const useModelosByMarcas = (
  options: UseModelosByMarcasOptions
): UseModelosByMarcasReturn => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['modelos-by-marcas', options.marcas],
    queryFn: () => vehicleService.getModelosByMarcas(options.marcas),
    enabled: options.marcas.length > 0,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
  };
};
