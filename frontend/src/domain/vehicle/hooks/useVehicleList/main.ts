import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseVehicleListOptions, UseVehicleListReturn } from './types';

export const useVehicleList = (options: UseVehicleListOptions): UseVehicleListReturn => {
  const queryKey = ['vehicles', options];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => vehicleService.list(options),
    retry: 3,
    retryDelay: 2000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
