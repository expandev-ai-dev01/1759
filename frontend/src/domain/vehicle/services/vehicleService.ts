import { publicClient } from '@/core/lib/api';
import type {
  Vehicle,
  VehicleDetail,
  VehicleListParams,
  VehicleListResponse,
  FilterOptions,
  ModelosByMarcasResponse,
} from '../types';

export const vehicleService = {
  async list(params: VehicleListParams): Promise<VehicleListResponse> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);

    if (params.filters?.marcas?.length) {
      queryParams.append('marcas', params.filters.marcas.join(','));
    }
    if (params.filters?.modelos?.length) {
      queryParams.append('modelos', params.filters.modelos.join(','));
    }
    if (params.filters?.anoMin) {
      queryParams.append('anoMin', params.filters.anoMin.toString());
    }
    if (params.filters?.anoMax) {
      queryParams.append('anoMax', params.filters.anoMax.toString());
    }
    if (params.filters?.precoMin) {
      queryParams.append('precoMin', params.filters.precoMin.toString());
    }
    if (params.filters?.precoMax) {
      queryParams.append('precoMax', params.filters.precoMax.toString());
    }
    if (params.filters?.cambios?.length) {
      queryParams.append('cambios', params.filters.cambios.join(','));
    }

    const response = await publicClient.get(`/vehicle?${queryParams.toString()}`);
    return response.data.data;
  },

  async getById(id: string): Promise<VehicleDetail> {
    const response = await publicClient.get(`/vehicle/${id}`);
    return response.data.data;
  },

  async getFilterOptions(): Promise<FilterOptions> {
    const response = await publicClient.get('/vehicle/filter-options');
    return response.data.data;
  },

  async getModelosByMarcas(marcas: string[]): Promise<ModelosByMarcasResponse> {
    const queryParams = new URLSearchParams();
    if (marcas.length) {
      queryParams.append('marcas', marcas.join(','));
    }
    const response = await publicClient.get(`/vehicle/modelos-by-marcas?${queryParams.toString()}`);
    return response.data.data;
  },
};
