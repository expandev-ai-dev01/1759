import type { VehiclePhoto } from '@/domain/vehicle/types';

export interface VehicleGalleryProps {
  fotos: VehiclePhoto[];
  fotoPrincipal: string;
}
