export interface Vehicle {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagem_principal: string;
  quilometragem?: number;
  cambio?: string;
}

export interface VehicleDetail {
  id: string;
  tituloAnuncio: string;
  preco: number;
  statusVeiculo: string;
  fotos: VehiclePhoto[];
  fotoPrincipal: string;
  especificacoes: VehicleSpecifications;
  itensSerie: VehicleItem[];
  opcionais: VehicleItem[];
  historico: VehicleHistory;
  condicoesVenda: SaleConditions;
  urlCompartilhamento: string;
  veiculosSimilares: Vehicle[];
}

export interface VehiclePhoto {
  url: string;
  legenda?: string;
}

export interface VehicleSpecifications {
  marca: string;
  modelo: string;
  anoFabricacao: number;
  anoModelo: number;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  potencia: string;
  cor: string;
  portas: number;
  carroceria: string;
  motor: string;
  finalPlaca: number;
}

export interface VehicleItem {
  nome: string;
  categoria: string;
}

export interface VehicleHistory {
  procedencia: string;
  proprietarios: number;
  garantia?: string;
  revisoes?: VehicleRevision[];
  sinistros?: VehicleAccident[];
  laudoTecnico?: TechnicalReport;
}

export interface VehicleRevision {
  data: string;
  quilometragem: number;
  local: string;
}

export interface VehicleAccident {
  data: string;
  tipo: string;
  descricao: string;
}

export interface TechnicalReport {
  dataInspecao: string;
  resultadoGeral: string;
}

export interface SaleConditions {
  formasPagamento: string[];
  condicoesFinanciamento?: FinancingConditions;
  aceitaTroca: boolean;
  observacoesVenda?: string;
  documentacaoNecessaria: DocumentItem[];
  situacaoDocumental: DocumentalStatus;
}

export interface FinancingConditions {
  entradaMinima: number;
  taxaJuros: number;
  prazoMaximo: number;
}

export interface DocumentItem {
  nome: string;
  observacoes?: string;
}

export interface DocumentalStatus {
  status: string;
  pendencias?: string[];
  observacoes?: string;
}

export interface VehicleFilters {
  marcas?: string[];
  modelos?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambios?: string[];
}

export type SortOrder =
  | 'relevancia'
  | 'preco_asc'
  | 'preco_desc'
  | 'ano_desc'
  | 'ano_asc'
  | 'modelo_asc'
  | 'modelo_desc';

export interface VehicleListParams {
  page?: number;
  pageSize?: number;
  filters?: VehicleFilters;
  sortBy?: SortOrder;
}

export interface VehicleListResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}

export interface ModelosByMarcasResponse {
  modelos: string[];
}
