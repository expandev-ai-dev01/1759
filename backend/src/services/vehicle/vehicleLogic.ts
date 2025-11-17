import {
  Vehicle,
  VehicleFilters,
  VehicleListParams,
  VehicleListResponse,
  SortOrder,
  FilterOptions,
  VehicleDetail,
  VehiclePhoto,
  VehicleSpecifications,
  VehicleItem,
  VehicleHistory,
  VehicleSaleConditions,
  VehicleSimilar,
} from './vehicleTypes';

/**
 * @summary
 * In-memory storage for vehicles
 */
const vehicles: Vehicle[] = [
  {
    id: '1',
    modelo: 'Civic',
    marca: 'Honda',
    ano: 2023,
    preco: 145000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Honda+Civic+2023',
    quilometragem: 5000,
    cambio: 'Automático',
  },
  {
    id: '2',
    modelo: 'Corolla',
    marca: 'Toyota',
    ano: 2022,
    preco: 135000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Toyota+Corolla+2022',
    quilometragem: 15000,
    cambio: 'CVT',
  },
  {
    id: '3',
    modelo: 'Onix',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 85000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Chevrolet+Onix+2023',
    quilometragem: 2000,
    cambio: 'Manual',
  },
  {
    id: '4',
    modelo: 'HB20',
    marca: 'Hyundai',
    ano: 2021,
    preco: 75000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Hyundai+HB20+2021',
    quilometragem: 30000,
    cambio: 'Manual',
  },
  {
    id: '5',
    modelo: 'Compass',
    marca: 'Jeep',
    ano: 2023,
    preco: 185000,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Jeep+Compass+2023',
    quilometragem: 8000,
    cambio: 'Automático',
  },
];

/**
 * @summary
 * In-memory storage for detailed vehicle information
 */
const vehicleDetails: Map<string, VehicleDetail> = new Map([
  [
    '1',
    {
      id: '1',
      tituloAnuncio: 'Honda Civic 2023',
      preco: 145000,
      statusVeiculo: 'Disponível',
      fotos: [
        {
          url: 'https://via.placeholder.com/800x600?text=Honda+Civic+2023+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Honda+Civic+2023+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Honda+Civic+2023+Interior',
          legenda: 'Interior',
          principal: false,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Honda+Civic+2023+Dashboard',
          legenda: 'Painel',
          principal: false,
        },
      ],
      modoAmpliacao: 'ambos',
      nivelZoom: 200,
      especificacoes: {
        marca: 'Honda',
        modelo: 'Civic',
        anoFabricacao: 2023,
        anoModelo: 2023,
        quilometragem: 5000,
        combustivel: 'Flex',
        cambio: 'Automático',
        potencia: '155 cv',
        cor: 'Prata',
        portas: 4,
        carroceria: 'Sedan',
        motor: '2.0',
        finalPlaca: 1,
      },
      itensSerie: [
        { nome: 'Ar-condicionado digital', categoria: 'Conforto' },
        { nome: 'Direção elétrica', categoria: 'Conforto' },
        { nome: 'Vidros elétricos', categoria: 'Conforto' },
        { nome: 'Travas elétricas', categoria: 'Conforto' },
        { nome: 'Airbag duplo', categoria: 'Segurança' },
        { nome: 'Freios ABS', categoria: 'Segurança' },
        { nome: 'Controle de estabilidade', categoria: 'Segurança' },
        { nome: 'Sensor de estacionamento', categoria: 'Tecnologia' },
        { nome: 'Câmera de ré', categoria: 'Tecnologia' },
        { nome: 'Central multimídia', categoria: 'Tecnologia' },
      ],
      opcionais: [
        { nome: 'Teto solar', categoria: 'Conforto' },
        { nome: 'Bancos de couro', categoria: 'Conforto' },
        { nome: 'Rodas de liga leve', categoria: 'Estética' },
        { nome: 'Faróis de LED', categoria: 'Tecnologia' },
      ],
      limiteItensVisivel: 10,
      historico: {
        procedencia: 'Concessionária',
        proprietarios: 0,
        garantia: '3 anos ou 100.000 km',
        revisoes: [
          {
            data: '2023-06-15',
            quilometragem: 5000,
            local: 'Concessionária Honda',
          },
        ],
        sinistros: [],
        laudoTecnico: {
          dataInspecao: '2023-12-01',
          resultadoGeral: 'Aprovado',
        },
      },
      condicoesVenda: {
        formasPagamento: ['À vista', 'Financiamento'],
        condicoesFinanciamento: {
          entradaMinima: 29000,
          taxaJuros: 1.99,
          prazoMaximo: 60,
        },
        aceitaTroca: true,
        observacoesVenda: 'Veículo em excelente estado de conservação',
        documentacaoNecessaria: [
          { nome: 'RG e CPF', observacoes: 'Original e cópia' },
          { nome: 'Comprovante de residência', observacoes: 'Atualizado (últimos 3 meses)' },
          { nome: 'Comprovante de renda', observacoes: 'Para financiamento' },
        ],
        situacaoDocumental: {
          status: 'Regular',
          pendencias: [],
          observacoes: 'Documentação completa e regularizada',
        },
      },
      urlCompartilhamento: 'https://catalogo-carros.com/veiculos/honda-civic-2023-1',
      redesSociais: ['Facebook', 'Twitter', 'WhatsApp', 'Telegram', 'Email'],
      textoCompartilhamento: 'Confira este Honda Civic 2023 por R$ 145.000,00',
      veiculosSimilares: [
        {
          id: '2',
          modelo: 'Corolla',
          marca: 'Toyota',
          ano: 2022,
          preco: 135000,
          imagemPrincipal: 'https://via.placeholder.com/300x169?text=Toyota+Corolla+2022',
        },
      ],
      criteriosSimilaridade: ['Marca', 'Preço', 'Categoria'],
      formatoExibicao: 'carrossel',
      informacoesCard: ['foto', 'marca', 'modelo', 'ano', 'preco'],
    },
  ],
  [
    '2',
    {
      id: '2',
      tituloAnuncio: 'Toyota Corolla 2022',
      preco: 135000,
      statusVeiculo: 'Disponível',
      fotos: [
        {
          url: 'https://via.placeholder.com/800x600?text=Toyota+Corolla+2022+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Toyota+Corolla+2022+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
        {
          url: 'https://via.placeholder.com/800x600?text=Toyota+Corolla+2022+Interior',
          legenda: 'Interior',
          principal: false,
        },
      ],
      modoAmpliacao: 'lightbox',
      nivelZoom: 200,
      especificacoes: {
        marca: 'Toyota',
        modelo: 'Corolla',
        anoFabricacao: 2022,
        anoModelo: 2022,
        quilometragem: 15000,
        combustivel: 'Flex',
        cambio: 'CVT',
        potencia: '144 cv',
        cor: 'Branco',
        portas: 4,
        carroceria: 'Sedan',
        motor: '2.0',
        finalPlaca: 2,
      },
      itensSerie: [
        { nome: 'Ar-condicionado automático', categoria: 'Conforto' },
        { nome: 'Direção elétrica', categoria: 'Conforto' },
        { nome: 'Vidros elétricos', categoria: 'Conforto' },
        { nome: 'Airbag múltiplo', categoria: 'Segurança' },
        { nome: 'Freios ABS', categoria: 'Segurança' },
        { nome: 'Central multimídia', categoria: 'Tecnologia' },
      ],
      opcionais: [
        { nome: 'Bancos de couro', categoria: 'Conforto' },
        { nome: 'Sensor de estacionamento', categoria: 'Tecnologia' },
      ],
      limiteItensVisivel: 10,
      historico: {
        procedencia: 'Particular',
        proprietarios: 1,
        garantia: '1 ano restante',
        revisoes: [
          {
            data: '2022-06-15',
            quilometragem: 5000,
            local: 'Concessionária Toyota',
          },
          {
            data: '2023-01-20',
            quilometragem: 15000,
            local: 'Concessionária Toyota',
          },
        ],
        sinistros: [],
        laudoTecnico: {
          dataInspecao: '2023-11-15',
          resultadoGeral: 'Aprovado',
        },
      },
      condicoesVenda: {
        formasPagamento: ['À vista', 'Financiamento', 'Consórcio'],
        condicoesFinanciamento: {
          entradaMinima: 27000,
          taxaJuros: 2.19,
          prazoMaximo: 48,
        },
        aceitaTroca: true,
        observacoesVenda: '',
        documentacaoNecessaria: [
          { nome: 'RG e CPF', observacoes: 'Original e cópia' },
          { nome: 'Comprovante de residência', observacoes: 'Atualizado' },
        ],
        situacaoDocumental: {
          status: 'Regular',
          pendencias: [],
          observacoes: 'Documentação em ordem',
        },
      },
      urlCompartilhamento: 'https://catalogo-carros.com/veiculos/toyota-corolla-2022-2',
      redesSociais: ['Facebook', 'WhatsApp', 'Email'],
      textoCompartilhamento: 'Confira este Toyota Corolla 2022 por R$ 135.000,00',
      veiculosSimilares: [
        {
          id: '1',
          modelo: 'Civic',
          marca: 'Honda',
          ano: 2023,
          preco: 145000,
          imagemPrincipal: 'https://via.placeholder.com/300x169?text=Honda+Civic+2023',
        },
      ],
      criteriosSimilaridade: ['Marca', 'Preço', 'Categoria'],
      formatoExibicao: 'carrossel',
      informacoesCard: ['foto', 'marca', 'modelo', 'ano', 'preco'],
    },
  ],
]);

/**
 * @summary
 * Applies filters to vehicle array
 *
 * @function applyFilters
 * @module vehicle
 *
 * @param {Vehicle[]} vehicleList - Array of vehicles to filter
 * @param {VehicleFilters} filters - Filter criteria
 *
 * @returns {Vehicle[]} Filtered array of vehicles
 */
function applyFilters(vehicleList: Vehicle[], filters: VehicleFilters): Vehicle[] {
  let filtered = [...vehicleList];

  if (filters.marcas && filters.marcas.length > 0) {
    filtered = filtered.filter((v) => filters.marcas!.includes(v.marca));
  }

  if (filters.modelos && filters.modelos.length > 0) {
    filtered = filtered.filter((v) => filters.modelos!.includes(v.modelo));
  }

  if (filters.anoMin !== undefined) {
    filtered = filtered.filter((v) => v.ano >= filters.anoMin!);
  }

  if (filters.anoMax !== undefined) {
    filtered = filtered.filter((v) => v.ano <= filters.anoMax!);
  }

  if (filters.precoMin !== undefined) {
    filtered = filtered.filter((v) => v.preco >= filters.precoMin!);
  }

  if (filters.precoMax !== undefined) {
    filtered = filtered.filter((v) => v.preco <= filters.precoMax!);
  }

  if (filters.cambios && filters.cambios.length > 0) {
    filtered = filtered.filter((v) => v.cambio && filters.cambios!.includes(v.cambio));
  }

  return filtered;
}

/**
 * @summary
 * Applies sorting to vehicle array
 *
 * @function applySorting
 * @module vehicle
 *
 * @param {Vehicle[]} vehicleList - Array of vehicles to sort
 * @param {SortOrder} sortBy - Sorting criteria
 *
 * @returns {Vehicle[]} Sorted array of vehicles
 */
function applySorting(vehicleList: Vehicle[], sortBy: SortOrder): Vehicle[] {
  const sorted = [...vehicleList];

  switch (sortBy) {
    case SortOrder.PrecoAsc:
      return sorted.sort((a, b) => a.preco - b.preco);
    case SortOrder.PrecoDesc:
      return sorted.sort((a, b) => b.preco - a.preco);
    case SortOrder.AnoDesc:
      return sorted.sort((a, b) => b.ano - a.ano);
    case SortOrder.AnoAsc:
      return sorted.sort((a, b) => a.ano - b.ano);
    case SortOrder.ModeloAsc:
      return sorted.sort((a, b) => a.modelo.localeCompare(b.modelo));
    case SortOrder.ModeloDesc:
      return sorted.sort((a, b) => b.modelo.localeCompare(a.modelo));
    case SortOrder.Relevancia:
    default:
      return sorted;
  }
}

/**
 * @summary
 * Lists vehicles with filtering, sorting, and pagination
 *
 * @function vehicleList
 * @module vehicle
 *
 * @param {VehicleListParams} params - Listing parameters
 *
 * @returns {VehicleListResponse} Paginated vehicle list with metadata
 *
 * @example
 * const result = vehicleList({
 *   page: 1,
 *   pageSize: 12,
 *   filters: { marcas: ['Honda', 'Toyota'] },
 *   sortBy: SortOrder.PrecoAsc
 * });
 */
export function vehicleList(params: VehicleListParams): VehicleListResponse {
  const page = params.page || 1;
  const pageSize = params.pageSize || 12;
  const filters = params.filters || {};
  const sortBy = params.sortBy || SortOrder.Relevancia;

  let filtered = applyFilters(vehicles, filters);

  filtered = applySorting(filtered, sortBy);

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedVehicles = filtered.slice(startIndex, endIndex);

  return {
    vehicles: paginatedVehicles,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * @summary
 * Gets available filter options based on current catalog
 *
 * @function getFilterOptions
 * @module vehicle
 *
 * @returns {FilterOptions} Available filter options
 *
 * @example
 * const options = getFilterOptions();
 */
export function getFilterOptions(): FilterOptions {
  const marcas = Array.from(new Set(vehicles.map((v) => v.marca))).sort();
  const modelos = Array.from(new Set(vehicles.map((v) => v.modelo))).sort();
  const anos = Array.from(new Set(vehicles.map((v) => v.ano))).sort((a, b) => b - a);
  const cambios = Array.from(
    new Set(vehicles.map((v) => v.cambio).filter((c): c is string => c !== null))
  ).sort();

  return {
    marcas,
    modelos,
    anos,
    cambios,
  };
}

/**
 * @summary
 * Gets models filtered by selected brands
 *
 * @function getModelosByMarcas
 * @module vehicle
 *
 * @param {string[]} marcas - Array of selected brands
 *
 * @returns {string[]} Array of available models for selected brands
 *
 * @example
 * const modelos = getModelosByMarcas(['Honda', 'Toyota']);
 */
export function getModelosByMarcas(marcas: string[]): string[] {
  if (!marcas || marcas.length === 0) {
    return Array.from(new Set(vehicles.map((v) => v.modelo))).sort();
  }

  const filtered = vehicles.filter((v) => marcas.includes(v.marca));
  return Array.from(new Set(filtered.map((v) => v.modelo))).sort();
}

/**
 * @summary
 * Gets detailed information about a specific vehicle by ID
 *
 * @function vehicleGetById
 * @module vehicle
 *
 * @param {string} id - Vehicle identifier
 *
 * @returns {VehicleDetail | null} Vehicle details or null if not found
 *
 * @example
 * const vehicle = vehicleGetById('1');
 */
export function vehicleGetById(id: string): VehicleDetail | null {
  return vehicleDetails.get(id) || null;
}
