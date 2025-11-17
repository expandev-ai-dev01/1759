import type { SaleConditions as SaleConditionsType } from '@/domain/vehicle/types';

export interface SaleConditionsProps {
  condicoesVenda: SaleConditionsType;
  preco: number;
}
