import type { ModelosByMarcasResponse } from '../../types';

export interface UseModelosByMarcasOptions {
  marcas: string[];
}

export interface UseModelosByMarcasReturn {
  data: ModelosByMarcasResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}
