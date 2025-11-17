import { Request, Response, NextFunction } from 'express';
import { vehicleList, getFilterOptions, getModelosByMarcas, SortOrder } from '@/services/vehicle';
import { successResponse, errorResponse } from '@/utils/response';

/**
 * @api {get} /external/vehicle List Vehicles
 * @apiName ListVehicles
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all vehicles with filtering, sorting, and pagination
 *
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=12] Items per page (12, 24, 36, 48)
 * @apiParam {String} [marcas] Comma-separated brand names
 * @apiParam {String} [modelos] Comma-separated model names
 * @apiParam {Number} [anoMin] Minimum year
 * @apiParam {Number} [anoMax] Maximum year
 * @apiParam {Number} [precoMin] Minimum price
 * @apiParam {Number} [precoMax] Maximum price
 * @apiParam {String} [cambios] Comma-separated transmission types
 * @apiParam {String} [sortBy] Sort order (relevancia, preco_asc, preco_desc, ano_desc, ano_asc, modelo_asc, modelo_desc)
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.vehicles Array of vehicles
 * @apiSuccess {Number} data.total Total number of vehicles
 * @apiSuccess {Number} data.page Current page
 * @apiSuccess {Number} data.pageSize Items per page
 * @apiSuccess {Number} data.totalPages Total pages
 *
 * @apiError {String} ValidationError Invalid parameters provided
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 12;
    const sortBy = (req.query.sortBy as SortOrder) || SortOrder.Relevancia;

    /**
     * @validation Validate page number
     */
    if (page < 1) {
      res.status(400).json(errorResponse('pageNumberMustBeGreaterThanZero', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate page size
     */
    const validPageSizes = [12, 24, 36, 48];
    if (!validPageSizes.includes(pageSize)) {
      res
        .status(400)
        .json(errorResponse('pageSizeMustBeOneOf12_24_36_48', 'VALIDATION_ERROR', validPageSizes));
      return;
    }

    /**
     * @validation Validate sort order
     */
    const validSortOrders = Object.values(SortOrder);
    if (!validSortOrders.includes(sortBy)) {
      res.status(400).json(errorResponse('invalidSortOrder', 'VALIDATION_ERROR', validSortOrders));
      return;
    }

    const filters: any = {};

    if (req.query.marcas) {
      filters.marcas = (req.query.marcas as string).split(',').map((m) => m.trim());
    }

    if (req.query.modelos) {
      filters.modelos = (req.query.modelos as string).split(',').map((m) => m.trim());
    }

    if (req.query.anoMin) {
      filters.anoMin = parseInt(req.query.anoMin as string);
      if (isNaN(filters.anoMin) || filters.anoMin < 1900) {
        res.status(400).json(errorResponse('invalidMinimumYear', 'VALIDATION_ERROR'));
        return;
      }
    }

    if (req.query.anoMax) {
      filters.anoMax = parseInt(req.query.anoMax as string);
      if (isNaN(filters.anoMax) || filters.anoMax < 1900) {
        res.status(400).json(errorResponse('invalidMaximumYear', 'VALIDATION_ERROR'));
        return;
      }
    }

    /**
     * @validation Validate year range consistency
     */
    if (filters.anoMin && filters.anoMax && filters.anoMin > filters.anoMax) {
      res
        .status(400)
        .json(errorResponse('minimumYearCannotBeGreaterThanMaximumYear', 'VALIDATION_ERROR'));
      return;
    }

    if (req.query.precoMin) {
      filters.precoMin = parseFloat(req.query.precoMin as string);
      if (isNaN(filters.precoMin) || filters.precoMin < 0) {
        res.status(400).json(errorResponse('invalidMinimumPrice', 'VALIDATION_ERROR'));
        return;
      }
    }

    if (req.query.precoMax) {
      filters.precoMax = parseFloat(req.query.precoMax as string);
      if (isNaN(filters.precoMax) || filters.precoMax < 0) {
        res.status(400).json(errorResponse('invalidMaximumPrice', 'VALIDATION_ERROR'));
        return;
      }
    }

    /**
     * @validation Validate price range consistency
     */
    if (filters.precoMin && filters.precoMax && filters.precoMin > filters.precoMax) {
      res
        .status(400)
        .json(errorResponse('minimumPriceCannotBeGreaterThanMaximumPrice', 'VALIDATION_ERROR'));
      return;
    }

    if (req.query.cambios) {
      filters.cambios = (req.query.cambios as string).split(',').map((c) => c.trim());
      const validCambios = ['Manual', 'Automático', 'CVT', 'Semi-automático'];
      const invalidCambios = filters.cambios.filter((c: string) => !validCambios.includes(c));
      if (invalidCambios.length > 0) {
        res.status(400).json(
          errorResponse('invalidTransmissionType', 'VALIDATION_ERROR', {
            valid: validCambios,
            invalid: invalidCambios,
          })
        );
        return;
      }
    }

    const result = vehicleList({
      page,
      pageSize,
      filters,
      sortBy,
    });

    /**
     * @rule {be-pagination-adjustment} Adjust page if it exceeds total pages
     */
    if (result.totalPages > 0 && page > result.totalPages) {
      const adjustedResult = vehicleList({
        page: result.totalPages,
        pageSize,
        filters,
        sortBy,
      });
      res.json(successResponse(adjustedResult));
      return;
    }

    res.json(successResponse(result));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /external/vehicle/filter-options Get Filter Options
 * @apiName GetFilterOptions
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets available filter options based on current catalog
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.marcas Available brands
 * @apiSuccess {Array} data.modelos Available models
 * @apiSuccess {Array} data.anos Available years
 * @apiSuccess {Array} data.cambios Available transmission types
 */
export async function filterOptionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const options = getFilterOptions();
    res.json(successResponse(options));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /external/vehicle/modelos-by-marcas Get Models by Brands
 * @apiName GetModelosByMarcas
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets available models filtered by selected brands
 *
 * @apiParam {String} [marcas] Comma-separated brand names
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.modelos Available models for selected brands
 */
export async function modelosByMarcasHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const marcas = req.query.marcas
      ? (req.query.marcas as string).split(',').map((m) => m.trim())
      : [];

    const modelos = getModelosByMarcas(marcas);
    res.json(successResponse({ modelos }));
  } catch (error: any) {
    next(error);
  }
}
