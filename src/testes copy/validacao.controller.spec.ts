import { Test, TestingModule } from '@nestjs/testing';
import { ValidacaoController } from './validacao.controller';
import { ValidacaoService } from './validacao.service';
import { Validacao } from './entities/validacao.entity';
import { CreateValidacaoDto } from './dto/create-validacao.dto';
import { StatusValidacao, ToggleValidacaoDto } from './dto/toggle-reserva.dto';
import { JwtService } from '@nestjs/jwt';

describe('ValidacaoController', () => {
  let controller: ValidacaoController;
  let service: ValidacaoService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidacaoController],
      providers: [
        {
          provide: ValidacaoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            toggleValidacao: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn().mockReturnValue({ userId: 1, username: 'test' }),
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile();

    controller = module.get<ValidacaoController>(ValidacaoController);
    service = module.get<ValidacaoService>(ValidacaoService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new validation', async () => {
      const createValidacaoDto: CreateValidacaoDto = {
        professor_id: 1,
        sala_id: 1,
        reserva_id: 1,
        status: true,
        data_hora_inicio: new Date(),
        data_hora_final: new Date(),
      };

      const result: Validacao = {
        valida_id: 1,
        professor: null,
        sala: null,
        reserva: null,
        status: true,
        hora_inicio: '10:00',
        hora_final: '12:00',
        dias_reservados: ['Monday'],
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createValidacaoDto)).toEqual(result);
    });
  });

  describe('toggleValidacao', () => {
    it('should toggle validations', async () => {
      const toggleValidacaoDtos: ToggleValidacaoDto[] = [
        { validacaoId: 1, status: StatusValidacao.APROVADO },
        { validacaoId: 2, status: StatusValidacao.REJEITADO },
      ];

      const result: string[] = [
        'Validação 1 removida e reserva atualizada para true.',
        'Validação 2 deletada.',
      ];

      jest.spyOn(service, 'toggleValidacao').mockResolvedValue(result);

      expect(await controller.toggleValidacao(toggleValidacaoDtos)).toEqual(result);
    });
  });
});
