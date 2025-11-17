import { useParams } from 'react-router-dom';

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Detalhes do Veículo #{id}</h1>
      <p className="text-gray-600">Informações detalhadas do veículo serão exibidas aqui.</p>
    </div>
  );
};

export default VehicleDetailPage;
