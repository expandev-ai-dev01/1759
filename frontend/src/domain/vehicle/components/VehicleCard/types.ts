import type { Vehicle } from '../../types';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: (id: string) => void;
}
