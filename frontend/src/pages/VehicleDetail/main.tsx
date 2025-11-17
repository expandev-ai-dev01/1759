import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleDetail } from '@/domain/vehicle/hooks/useVehicleDetail';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { ContactForm } from '@/domain/contact/components/ContactForm';
import { VehicleGallery } from './_impl/VehicleGallery';
import { VehicleHeader } from './_impl/VehicleHeader';
import { VehicleSpecifications } from './_impl/VehicleSpecifications';
import { VehicleItems } from './_impl/VehicleItems';
import { VehicleHistory } from './_impl/VehicleHistory';
import { SaleConditions } from './_impl/SaleConditions';
import { ShareButtons } from './_impl/ShareButtons';
import { SimilarVehicles } from './_impl/SimilarVehicles';

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: vehicle, isLoading, error, refetch } = useVehicleDetail({ id: id! });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          title="Erro ao carregar veículo"
          message="Não foi possível carregar as informações do veículo. Por favor, tente novamente."
          onRetry={() => refetch()}
          onBack={() => navigate('/')}
        />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          title="Veículo não encontrado"
          message="O veículo solicitado não foi encontrado em nosso catálogo."
          onBack={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para listagem
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <VehicleGallery fotos={vehicle.fotos} fotoPrincipal={vehicle.fotoPrincipal} />

          <VehicleHeader
            tituloAnuncio={vehicle.tituloAnuncio}
            preco={vehicle.preco}
            statusVeiculo={vehicle.statusVeiculo}
          />

          <VehicleSpecifications especificacoes={vehicle.especificacoes} />

          <VehicleItems itensSerie={vehicle.itensSerie} opcionais={vehicle.opcionais} />

          <VehicleHistory historico={vehicle.historico} />

          <ContactForm
            vehicleId={vehicle.id}
            vehicleModel={vehicle.tituloAnuncio}
            onSuccess={(response) => {
              console.log('Contact submitted successfully:', response);
            }}
            onError={(error) => {
              console.error('Contact submission error:', error);
            }}
          />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <SaleConditions condicoesVenda={vehicle.condicoesVenda} preco={vehicle.preco} />

          <ShareButtons
            url={vehicle.urlCompartilhamento}
            titulo={vehicle.tituloAnuncio}
            preco={vehicle.preco}
          />
        </div>
      </div>

      {vehicle.veiculosSimilares && vehicle.veiculosSimilares.length > 0 && (
        <div className="mt-12">
          <SimilarVehicles vehicles={vehicle.veiculosSimilares} />
        </div>
      )}
    </div>
  );
};

export default VehicleDetailPage;
