import { Request, Response, NextFunction } from 'express';
import { vehicleGetById } from '@/services/vehicle';
import { successResponse, errorResponse } from '@/utils/response';

/**
 * @api {get} /external/vehicle/:id Get Vehicle Details
 * @apiName GetVehicleDetails
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific vehicle
 *
 * @apiParam {String} id Vehicle identifier
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Vehicle details
 * @apiSuccess {String} data.id Vehicle identifier
 * @apiSuccess {String} data.tituloAnuncio Advertisement title
 * @apiSuccess {Number} data.preco Vehicle price
 * @apiSuccess {String} data.statusVeiculo Vehicle status
 * @apiSuccess {Array} data.fotos Photo gallery
 * @apiSuccess {Object} data.especificacoes Technical specifications
 * @apiSuccess {Array} data.itensSerie Standard items
 * @apiSuccess {Array} data.opcionais Optional items
 * @apiSuccess {Object} data.historico Vehicle history
 * @apiSuccess {Object} data.condicoesVenda Sale conditions
 * @apiSuccess {String} data.urlCompartilhamento Sharing URL
 * @apiSuccess {Array} data.veiculosSimilares Similar vehicles
 *
 * @apiError {String} vehicleNotFound Vehicle does not exist
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    /**
     * @validation Validate vehicle ID parameter
     */
    if (!id || id.trim() === '') {
      res.status(400).json(errorResponse('vehicleIdRequired', 'VALIDATION_ERROR'));
      return;
    }

    const vehicle = vehicleGetById(id);

    /**
     * @validation Check if vehicle exists
     */
    if (!vehicle) {
      res.status(404).json(errorResponse('vehicleNotFound', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(vehicle));
  } catch (error: any) {
    next(error);
  }
}
