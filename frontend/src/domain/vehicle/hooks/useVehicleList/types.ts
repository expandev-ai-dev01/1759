import type { VehicleListParams, VehicleListResponse } from '../../types';

export interface UseVehicleListOptions extends VehicleListParams {}

export interface UseVehicleListReturn {
  data: VehicleListResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
