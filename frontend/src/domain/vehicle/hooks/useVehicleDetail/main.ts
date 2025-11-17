import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseVehicleDetailOptions, UseVehicleDetailReturn } from './types';

export const useVehicleDetail = (options: UseVehicleDetailOptions): UseVehicleDetailReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vehicle-detail', options.id],
    queryFn: () => vehicleService.getById(options.id),
    enabled: !!options.id,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
