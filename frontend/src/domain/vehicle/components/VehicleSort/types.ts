import type { SortOrder } from '../../types';

export interface VehicleSortProps {
  sortBy: SortOrder;
  onSortChange: (sortBy: SortOrder) => void;
}
