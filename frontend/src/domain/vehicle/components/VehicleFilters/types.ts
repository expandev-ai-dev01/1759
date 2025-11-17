import type { VehicleFilters, FilterOptions } from '../../types';

export interface VehicleFiltersProps {
  filters: VehicleFilters;
  filterOptions: FilterOptions;
  onFiltersChange: (filters: VehicleFilters) => void;
  onApply: () => void;
  onClear: () => void;
}
