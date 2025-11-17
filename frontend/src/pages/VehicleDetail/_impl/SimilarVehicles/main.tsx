import { useNavigate } from 'react-router-dom';
import { VehicleCard } from '@/domain/vehicle/components/VehicleCard';
import type { SimilarVehiclesProps } from './types';

export const SimilarVehicles = ({ vehicles }: SimilarVehiclesProps) => {
  const navigate = useNavigate();

  const handleVehicleClick = (id: string) => {
    navigate(`/vehicles/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (vehicles.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Veículos Similares</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.slice(0, 6).map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={handleVehicleClick} />
        ))}
      </div>
    </div>
  );
};
