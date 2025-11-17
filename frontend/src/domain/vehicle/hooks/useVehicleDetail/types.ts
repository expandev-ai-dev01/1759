import type { VehicleDetail } from '../../types';

export interface UseVehicleDetailOptions {
  id: string;
}

export interface UseVehicleDetailReturn {
  data: VehicleDetail | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
