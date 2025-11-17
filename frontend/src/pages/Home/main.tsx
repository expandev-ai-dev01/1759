import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVehicleList } from '@/domain/vehicle/hooks/useVehicleList';
import { useFilterOptions } from '@/domain/vehicle/hooks/useFilterOptions';
import { VehicleCard } from '@/domain/vehicle/components/VehicleCard';
import { VehicleFilters } from '@/domain/vehicle/components/VehicleFilters';
import { VehicleSort } from '@/domain/vehicle/components/VehicleSort';
import { VehiclePagination } from '@/domain/vehicle/components/VehiclePagination';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { VehicleFilters as VehicleFiltersType, SortOrder } from '@/domain/vehicle/types';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<VehicleFiltersType>({
    marcas: searchParams.get('marcas')?.split(',').filter(Boolean) || [],
    modelos: searchParams.get('modelos')?.split(',').filter(Boolean) || [],
    anoMin: searchParams.get('anoMin') ? parseInt(searchParams.get('anoMin')!) : undefined,
    anoMax: searchParams.get('anoMax') ? parseInt(searchParams.get('anoMax')!) : undefined,
    precoMin: searchParams.get('precoMin') ? parseFloat(searchParams.get('precoMin')!) : undefined,
    precoMax: searchParams.get('precoMax') ? parseFloat(searchParams.get('precoMax')!) : undefined,
    cambios: searchParams.get('cambios')?.split(',').filter(Boolean) || [],
  });

  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '12'));
  const [sortBy, setSortBy] = useState<SortOrder>(
    (searchParams.get('sortBy') as SortOrder) || 'relevancia'
  );

  const { data: filterOptionsData, isLoading: isLoadingOptions } = useFilterOptions();
  const {
    data: vehicleData,
    isLoading: isLoadingVehicles,
    error,
    refetch,
  } = useVehicleList({
    page,
    pageSize,
    filters,
    sortBy,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    if (vehicleData && vehicleData.totalPages > 0 && page > vehicleData.totalPages) {
      setPage(vehicleData.totalPages);
    }
  }, [vehicleData, page]);

  const updateSearchParams = () => {
    const params = new URLSearchParams();

    if (filters.marcas?.length) params.set('marcas', filters.marcas.join(','));
    if (filters.modelos?.length) params.set('modelos', filters.modelos.join(','));
    if (filters.anoMin) params.set('anoMin', filters.anoMin.toString());
    if (filters.anoMax) params.set('anoMax', filters.anoMax.toString());
    if (filters.precoMin) params.set('precoMin', filters.precoMin.toString());
    if (filters.precoMax) params.set('precoMax', filters.precoMax.toString());
    if (filters.cambios?.length) params.set('cambios', filters.cambios.join(','));
    if (page > 1) params.set('page', page.toString());
    if (pageSize !== 12) params.set('pageSize', pageSize.toString());
    if (sortBy !== 'relevancia') params.set('sortBy', sortBy);

    setSearchParams(params);
  };

  const handleApplyFilters = () => {
    setPage(1);
    updateSearchParams();
  };

  const handleClearFilters = () => {
    setFilters({
      marcas: [],
      modelos: [],
      anoMin: undefined,
      anoMax: undefined,
      precoMin: undefined,
      precoMax: undefined,
      cambios: [],
    });
    setPage(1);
    setSearchParams({});
  };

  const handleSortChange = (newSortBy: SortOrder) => {
    setSortBy(newSortBy);
    updateSearchParams();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateSearchParams();
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    updateSearchParams();
  };

  const handleVehicleClick = (id: string) => {
    navigate(`/vehicles/${id}`);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          title="Erro ao carregar veículos"
          message="Não foi possível carregar a lista de veículos. Por favor, tente novamente."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (isLoadingOptions) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const hasNoVehicles =
    !isLoadingVehicles &&
    vehicleData?.total === 0 &&
    !filters.marcas?.length &&
    !filters.modelos?.length &&
    !filters.anoMin &&
    !filters.anoMax &&
    !filters.precoMin &&
    !filters.precoMax &&
    !filters.cambios?.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Catálogo de Veículos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          {filterOptionsData && (
            <VehicleFilters
              filters={filters}
              filterOptions={filterOptionsData}
              onFiltersChange={setFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          )}
        </aside>

        <main className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            {vehicleData && (
              <div className="text-sm text-gray-700">
                {vehicleData.total} veículo{vehicleData.total !== 1 ? 's' : ''} encontrado
                {vehicleData.total !== 1 ? 's' : ''}
              </div>
            )}
            <VehicleSort sortBy={sortBy} onSortChange={handleSortChange} />
          </div>

          {isLoadingVehicles ? (
            <LoadingSpinner size="large" />
          ) : hasNoVehicles ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Não há veículos disponíveis no catálogo no momento. Por favor, volte mais tarde ou
                entre em contato conosco para mais informações.
              </p>
            </div>
          ) : vehicleData?.vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Não encontramos veículos com os filtros selecionados. Tente remover alguns filtros
                ou alterar os critérios de busca para ampliar os resultados.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicleData?.vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={handleVehicleClick} />
                ))}
              </div>

              {vehicleData && vehicleData.totalPages > 1 && (
                <VehiclePagination
                  currentPage={page}
                  totalPages={vehicleData.totalPages}
                  pageSize={pageSize}
                  total={vehicleData.total}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
