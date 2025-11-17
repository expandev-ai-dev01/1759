import { Request, Response, NextFunction } from 'express';
import { contactCreate } from '@/services/contact';
import { successResponse, errorResponse } from '@/utils/response';

/**
 * @api {post} /external/contact Create Contact
 * @apiName CreateContact
 * @apiGroup Contact
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new contact form submission for a vehicle
 *
 * @apiParam {String} nomeCompleto Full name of the user
 * @apiParam {String} email Email address
 * @apiParam {String} telefone Phone number
 * @apiParam {String} preferenciaContato Contact preference (Telefone, E-mail, WhatsApp)
 * @apiParam {String} [melhorHorario] Best time to contact (Manhã, Tarde, Noite, Qualquer horário)
 * @apiParam {String} idVeiculo Vehicle identifier
 * @apiParam {String} modeloVeiculo Vehicle model
 * @apiParam {String} assunto Subject of inquiry
 * @apiParam {String} mensagem Detailed message
 * @apiParam {Boolean} [financiamento] Interest in financing
 * @apiParam {Boolean} termosPrivacidade Privacy terms acceptance
 * @apiParam {Boolean} [receberNovidades] Opt-in for news
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {String} data.idContato Contact identifier
 * @apiSuccess {String} data.protocolo Protocol number
 * @apiSuccess {String} data.mensagem Confirmation message
 *
 * @apiError {String} ValidationError Invalid parameters provided
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const {
      nomeCompleto,
      email,
      telefone,
      preferenciaContato,
      melhorHorario,
      idVeiculo,
      modeloVeiculo,
      assunto,
      mensagem,
      financiamento,
      termosPrivacidade,
      receberNovidades,
    } = req.body;

    /**
     * @validation Validate required fields
     */
    if (!nomeCompleto || nomeCompleto.trim() === '') {
      res.status(400).json(errorResponse('nomeCompletoRequired', 'VALIDATION_ERROR'));
      return;
    }

    if (!email || email.trim() === '') {
      res.status(400).json(errorResponse('emailRequired', 'VALIDATION_ERROR'));
      return;
    }

    if (!telefone || telefone.trim() === '') {
      res.status(400).json(errorResponse('telefoneRequired', 'VALIDATION_ERROR'));
      return;
    }

    if (!preferenciaContato || preferenciaContato.trim() === '') {
      res.status(400).json(errorResponse('preferenciaContatoRequired', 'VALIDATION_ERROR'));
      return;
    }

    if (!idVeiculo || idVeiculo.trim() === '') {
      res.status(400).json(errorResponse('idVeiculoRequired', 'VALIDATION_ERROR'));
      return;
    }

    if (!modeloVeiculo || modeloVeiculo.trim() === '') {
      res.status(400).json(errorResponse('modeloVeiculoRequired', 'VALIDATION_ERROR'));
      return;
    }

    if (!assunto || assunto.trim() === '') {
      res.status(400).json(errorResponse('assuntoRequired', 'VALIDATION_ERROR'));
      return;
    }

    if (!mensagem || mensagem.trim() === '') {
      res.status(400).json(errorResponse('mensagemRequired', 'VALIDATION_ERROR'));
      return;
    }

    if (termosPrivacidade !== true) {
      res.status(400).json(errorResponse('termosPrivacidadeRequired', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate name format
     */
    if (nomeCompleto.length < 3) {
      res.status(400).json(errorResponse('nomeDeveConterPeloMenos3Caracteres', 'VALIDATION_ERROR'));
      return;
    }

    if (nomeCompleto.length > 100) {
      res
        .status(400)
        .json(errorResponse('nomeDeveConterNoMaximo100Caracteres', 'VALIDATION_ERROR'));
      return;
    }

    const nameParts = nomeCompleto.trim().split(/\s+/);
    if (nameParts.length < 2) {
      res.status(400).json(errorResponse('nomeDeveConterNomeESobrenome', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate email format
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json(errorResponse('emailInvalido', 'VALIDATION_ERROR'));
      return;
    }

    if (email.length > 100) {
      res
        .status(400)
        .json(errorResponse('emailDeveConterNoMaximo100Caracteres', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate phone format
     */
    const phoneDigits = telefone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      res
        .status(400)
        .json(errorResponse('telefoneDeveConterPeloMenos10Digitos', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate contact preference
     */
    const validPreferences = ['Telefone', 'E-mail', 'WhatsApp'];
    if (!validPreferences.includes(preferenciaContato)) {
      res
        .status(400)
        .json(errorResponse('preferenciaContatoInvalida', 'VALIDATION_ERROR', validPreferences));
      return;
    }

    /**
     * @validation Validate best time if provided
     */
    if (melhorHorario) {
      const validTimes = ['Manhã', 'Tarde', 'Noite', 'Qualquer horário'];
      if (!validTimes.includes(melhorHorario)) {
        res
          .status(400)
          .json(errorResponse('melhorHorarioInvalido', 'VALIDATION_ERROR', validTimes));
        return;
      }
    }

    /**
     * @validation Validate subject
     */
    const validSubjects = [
      'Informações gerais',
      'Agendamento de test drive',
      'Negociação de preço',
      'Financiamento',
      'Outro',
    ];
    if (!validSubjects.includes(assunto)) {
      res.status(400).json(errorResponse('assuntoInvalido', 'VALIDATION_ERROR', validSubjects));
      return;
    }

    /**
     * @validation Validate message length
     */
    if (mensagem.length < 10) {
      res
        .status(400)
        .json(errorResponse('mensagemDeveConterPeloMenos10Caracteres', 'VALIDATION_ERROR'));
      return;
    }

    if (mensagem.length > 1000) {
      res
        .status(400)
        .json(errorResponse('mensagemDeveConterNoMaximo1000Caracteres', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @rule {be-contact-creation} Create contact with all validated data
     */
    const result = await contactCreate({
      nomeCompleto,
      email,
      telefone,
      preferenciaContato,
      melhorHorario: melhorHorario || 'Qualquer horário',
      idVeiculo,
      modeloVeiculo,
      assunto,
      mensagem,
      financiamento: financiamento || false,
      termosPrivacidade,
      receberNovidades: receberNovidades || false,
      ipUsuario: req.ip || req.socket.remoteAddress || 'unknown',
    });

    res.status(201).json(successResponse(result));
  } catch (error: any) {
    next(error);
  }
}
