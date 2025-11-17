/**
 * @interface Vehicle
 * @description Represents a vehicle entity in the catalog
 *
 * @property {string} id - Unique vehicle identifier
 * @property {string} modelo - Vehicle model name
 * @property {string} marca - Vehicle brand/manufacturer
 * @property {number} ano - Manufacturing year
 * @property {number} preco - Vehicle price in BRL
 * @property {string} imagemPrincipal - URL of the main vehicle image
 * @property {number | null} quilometragem - Current mileage (optional)
 * @property {string | null} cambio - Transmission type (optional)
 */
export interface Vehicle {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem: number | null;
  cambio: string | null;
}

/**
 * @interface VehicleFilters
 * @description Filter criteria for vehicle listing
 *
 * @property {string[]} [marcas] - Filter by brands
 * @property {string[]} [modelos] - Filter by models
 * @property {number} [anoMin] - Minimum year
 * @property {number} [anoMax] - Maximum year
 * @property {number} [precoMin] - Minimum price
 * @property {number} [precoMax] - Maximum price
 * @property {string[]} [cambios] - Filter by transmission types
 */
export interface VehicleFilters {
  marcas?: string[];
  modelos?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambios?: string[];
}

/**
 * @enum SortOrder
 * @description Available sorting options for vehicle listing
 */
export enum SortOrder {
  Relevancia = 'relevancia',
  PrecoAsc = 'preco_asc',
  PrecoDesc = 'preco_desc',
  AnoDesc = 'ano_desc',
  AnoAsc = 'ano_asc',
  ModeloAsc = 'modelo_asc',
  ModeloDesc = 'modelo_desc',
}

/**
 * @interface VehicleListParams
 * @description Parameters for vehicle listing with pagination, filtering, and sorting
 *
 * @property {number} [page] - Current page number (default: 1)
 * @property {number} [pageSize] - Items per page (default: 12)
 * @property {VehicleFilters} [filters] - Filter criteria
 * @property {SortOrder} [sortBy] - Sorting order
 */
export interface VehicleListParams {
  page?: number;
  pageSize?: number;
  filters?: VehicleFilters;
  sortBy?: SortOrder;
}

/**
 * @interface VehicleListResponse
 * @description Response structure for vehicle listing
 *
 * @property {Vehicle[]} vehicles - Array of vehicles
 * @property {number} total - Total number of vehicles matching filters
 * @property {number} page - Current page number
 * @property {number} pageSize - Items per page
 * @property {number} totalPages - Total number of pages
 */
export interface VehicleListResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * @interface FilterOptions
 * @description Available filter options based on current catalog
 *
 * @property {string[]} marcas - Available brands
 * @property {string[]} modelos - Available models
 * @property {number[]} anos - Available years
 * @property {string[]} cambios - Available transmission types
 */
export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}

/**
 * @interface VehiclePhoto
 * @description Represents a vehicle photo in the gallery
 *
 * @property {string} url - Photo URL
 * @property {string} legenda - Photo caption
 * @property {boolean} principal - Whether this is the main photo
 */
export interface VehiclePhoto {
  url: string;
  legenda: string;
  principal: boolean;
}

/**
 * @interface VehicleSpecifications
 * @description Technical specifications of a vehicle
 *
 * @property {string} marca - Vehicle brand
 * @property {string} modelo - Vehicle model
 * @property {number} anoFabricacao - Manufacturing year
 * @property {number} anoModelo - Model year
 * @property {number} quilometragem - Current mileage
 * @property {string} combustivel - Fuel type
 * @property {string} cambio - Transmission type
 * @property {string} potencia - Engine power
 * @property {string} cor - Vehicle color
 * @property {number} portas - Number of doors
 * @property {string} carroceria - Body type
 * @property {string} motor - Engine displacement
 * @property {number} finalPlaca - License plate final digit
 */
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

/**
 * @interface VehicleItem
 * @description Represents a vehicle item or optional
 *
 * @property {string} nome - Item name
 * @property {string} categoria - Item category
 */
export interface VehicleItem {
  nome: string;
  categoria: string;
}

/**
 * @interface VehicleRevision
 * @description Represents a vehicle revision record
 *
 * @property {string} data - Revision date
 * @property {number} quilometragem - Mileage at revision
 * @property {string} local - Revision location
 */
export interface VehicleRevision {
  data: string;
  quilometragem: number;
  local: string;
}

/**
 * @interface VehicleSinister
 * @description Represents a vehicle sinister record
 *
 * @property {string} data - Sinister date
 * @property {string} tipo - Sinister type
 * @property {string} descricao - Sinister description
 */
export interface VehicleSinister {
  data: string;
  tipo: string;
  descricao: string;
}

/**
 * @interface VehicleTechnicalReport
 * @description Represents a vehicle technical report
 *
 * @property {string} dataInspecao - Inspection date
 * @property {string} resultadoGeral - Overall result
 */
export interface VehicleTechnicalReport {
  dataInspecao: string;
  resultadoGeral: string;
}

/**
 * @interface VehicleHistory
 * @description Vehicle history information
 *
 * @property {string} procedencia - Vehicle origin
 * @property {number} proprietarios - Number of previous owners
 * @property {string} garantia - Warranty information
 * @property {VehicleRevision[]} revisoes - Revision history
 * @property {VehicleSinister[]} sinistros - Sinister history
 * @property {VehicleTechnicalReport} laudoTecnico - Technical report
 */
export interface VehicleHistory {
  procedencia: string;
  proprietarios: number;
  garantia: string;
  revisoes: VehicleRevision[];
  sinistros: VehicleSinister[];
  laudoTecnico: VehicleTechnicalReport;
}

/**
 * @interface VehicleFinancingConditions
 * @description Financing conditions for a vehicle
 *
 * @property {number} entradaMinima - Minimum down payment
 * @property {number} taxaJuros - Interest rate
 * @property {number} prazoMaximo - Maximum term in months
 */
export interface VehicleFinancingConditions {
  entradaMinima: number;
  taxaJuros: number;
  prazoMaximo: number;
}

/**
 * @interface VehicleDocumentation
 * @description Required documentation for vehicle purchase
 *
 * @property {string} nome - Document name
 * @property {string} observacoes - Document observations
 */
export interface VehicleDocumentation {
  nome: string;
  observacoes: string;
}

/**
 * @interface VehicleDocumentalSituation
 * @description Vehicle documental situation
 *
 * @property {string} status - Document status
 * @property {string[]} pendencias - Pending issues
 * @property {string} observacoes - Additional observations
 */
export interface VehicleDocumentalSituation {
  status: string;
  pendencias: string[];
  observacoes: string;
}

/**
 * @interface VehicleSaleConditions
 * @description Sale conditions for a vehicle
 *
 * @property {string[]} formasPagamento - Available payment methods
 * @property {VehicleFinancingConditions} condicoesFinanciamento - Financing conditions
 * @property {boolean} aceitaTroca - Whether trade-in is accepted
 * @property {string} observacoesVenda - Sale observations
 * @property {VehicleDocumentation[]} documentacaoNecessaria - Required documentation
 * @property {VehicleDocumentalSituation} situacaoDocumental - Documental situation
 */
export interface VehicleSaleConditions {
  formasPagamento: string[];
  condicoesFinanciamento: VehicleFinancingConditions;
  aceitaTroca: boolean;
  observacoesVenda: string;
  documentacaoNecessaria: VehicleDocumentation[];
  situacaoDocumental: VehicleDocumentalSituation;
}

/**
 * @interface VehicleSimilar
 * @description Represents a similar vehicle
 *
 * @property {string} id - Vehicle identifier
 * @property {string} modelo - Vehicle model
 * @property {string} marca - Vehicle brand
 * @property {number} ano - Vehicle year
 * @property {number} preco - Vehicle price
 * @property {string} imagemPrincipal - Main image URL
 */
export interface VehicleSimilar {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
}

/**
 * @interface VehicleDetail
 * @description Complete detailed information about a vehicle
 *
 * @property {string} id - Vehicle identifier
 * @property {string} tituloAnuncio - Advertisement title
 * @property {number} preco - Vehicle price
 * @property {string} statusVeiculo - Vehicle status
 * @property {VehiclePhoto[]} fotos - Photo gallery
 * @property {string} modoAmpliacao - Photo zoom mode
 * @property {number} nivelZoom - Zoom level
 * @property {VehicleSpecifications} especificacoes - Technical specifications
 * @property {VehicleItem[]} itensSerie - Standard items
 * @property {VehicleItem[]} opcionais - Optional items
 * @property {number} limiteItensVisivel - Visible items limit
 * @property {VehicleHistory} historico - Vehicle history
 * @property {VehicleSaleConditions} condicoesVenda - Sale conditions
 * @property {string} urlCompartilhamento - Sharing URL
 * @property {string[]} redesSociais - Available social networks
 * @property {string} textoCompartilhamento - Sharing text
 * @property {VehicleSimilar[]} veiculosSimilares - Similar vehicles
 * @property {string[]} criteriosSimilaridade - Similarity criteria
 * @property {string} formatoExibicao - Display format
 * @property {string[]} informacoesCard - Card information fields
 */
export interface VehicleDetail {
  id: string;
  tituloAnuncio: string;
  preco: number;
  statusVeiculo: string;
  fotos: VehiclePhoto[];
  modoAmpliacao: string;
  nivelZoom: number;
  especificacoes: VehicleSpecifications;
  itensSerie: VehicleItem[];
  opcionais: VehicleItem[];
  limiteItensVisivel: number;
  historico: VehicleHistory;
  condicoesVenda: VehicleSaleConditions;
  urlCompartilhamento: string;
  redesSociais: string[];
  textoCompartilhamento: string;
  veiculosSimilares: VehicleSimilar[];
  criteriosSimilaridade: string[];
  formatoExibicao: string;
  informacoesCard: string[];
}
