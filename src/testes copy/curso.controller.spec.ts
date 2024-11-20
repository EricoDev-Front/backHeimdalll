import { Test, TestingModule } from '@nestjs/testing';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { Curso } from '../curso/entities/curso.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'; // Verifique se o caminho está correto
import { JwtService } from '@nestjs/jwt'; // Importando o JwtService para mocká-lo

describe('CursoController', () => {
  let controller: CursoController;
  let service: CursoService;

  // Mock do JwtAuthGuard
  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true), // Sempre permite a requisição
  };

  // Mock do JwtService
  const mockJwtService = {
    verify: jest.fn().mockReturnValue({ userId: 1, username: 'test' }), // Simulando a verificação do token
    sign: jest.fn().mockReturnValue('mocked-jwt-token'), // Simulando a geração do token
  };

  const mockCursoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursoController],
      providers: [
        { provide: CursoService, useValue: mockCursoService },
        { provide: JwtService, useValue: mockJwtService }, // Mock do JwtService
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard }, // Substitui o guarda JWT
      ],
    }).compile();

    controller = module.get<CursoController>(CursoController);
    service = module.get<CursoService>(CursoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const createCursoDto: CreateCursoDto = { nome: 'Curso A', descricao: 'Descrição' };
      const createdCurso: Curso = {
        curso_id: 1, 
        nome: createCursoDto.nome,
        descricao: createCursoDto.descricao,
        disciplinas: []
      };

      mockCursoService.create.mockResolvedValue(createdCurso);

      expect(await controller.create(createCursoDto)).toEqual(createdCurso);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const result: Curso[] = [{
        curso_id: 1, nome: 'Curso A', descricao: 'Descrição',
        disciplinas: []
      }];
      mockCursoService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a course by ID', async () => {
      const result: Curso = {
        curso_id: 1, nome: 'Curso A', descricao: 'Descrição',
        disciplinas: []
      };
      mockCursoService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update and return the updated course', async () => {
      const updateCursoDto = { nome: 'Curso A Atualizado', descricao: 'Descrição Atualizada' };
      const updatedCurso: Curso = {
        curso_id: 1, ...updateCursoDto,
        nome: '',
        descricao: '',
        disciplinas: []
      };

      mockCursoService.update.mockResolvedValue(updatedCurso);

      expect(await controller.update(1, updateCursoDto)).toEqual(updatedCurso);
    });
  });

  describe('remove', () => {
    it('should remove a course', async () => {
      mockCursoService.remove.mockResolvedValue(undefined);

      await controller.remove(1);

      expect(mockCursoService.remove).toHaveBeenCalledWith(1);
    });
  });
});
