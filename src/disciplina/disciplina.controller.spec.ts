import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinaController } from './disciplina.controller';
import { DisciplinaService } from './disciplina.service';
import { JwtService } from '@nestjs/jwt';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { Disciplina } from './entities/disciplina.entity';
import { Curso } from 'src/curso/entities/curso.entity';

describe('DisciplinaController', () => {
  let controller: DisciplinaController;
  let service: DisciplinaService;
  let jwtService: JwtService;

  const mockDisciplinaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findDisciplinasByCursoId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockedToken'),
    verify: jest.fn().mockReturnValue({ userId: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisciplinaController],
      providers: [
        { provide: DisciplinaService, useValue: mockDisciplinaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<DisciplinaController>(DisciplinaController);
    service = module.get<DisciplinaService>(DisciplinaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call DisciplinaService.create and return a disciplina', async () => {
      const createDisciplinaDto: CreateDisciplinaDto = { nome: 'Matemática', curso_id: 1 };
      const createdDisciplina: Disciplina = {
        disciplina_id: 1, ...createDisciplinaDto,
        descricao: 'Descrição',
        curso: new Curso(),
      };

      mockDisciplinaService.create.mockResolvedValue(createdDisciplina);

      const result = await controller.create(createDisciplinaDto);

      expect(result).toEqual(createdDisciplina);
      expect(mockDisciplinaService.create).toHaveBeenCalledWith(createDisciplinaDto);
    });
  });

  describe('findAll', () => {
    it('should call DisciplinaService.findAll and return an array of disciplinas', async () => {
      const result: Disciplina[] = [
        { disciplina_id: 1, nome: 'Matemática', curso: new Curso(), descricao: 'Descrição' },
      ];
      mockDisciplinaService.findAll.mockResolvedValue(result);

      const response = await controller.findAll();

      expect(response).toEqual(result);
      expect(mockDisciplinaService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call DisciplinaService.findOne and return a disciplina', async () => {
      const result: Disciplina = { disciplina_id: 1, nome: 'Matemática', curso: new Curso(), descricao: 'Descrição' };
      mockDisciplinaService.findOne.mockResolvedValue(result);

      const response = await controller.findOne(1);

      expect(response).toEqual(result);
      expect(mockDisciplinaService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('getDisciplinasByCurso', () => {
    it('should call DisciplinaService.findDisciplinasByCursoId and return disciplinas', async () => {
      const result: Disciplina[] = [{ disciplina_id: 1, nome: 'Matemática', curso: new Curso(), descricao: 'Descrição' }];
      mockDisciplinaService.findDisciplinasByCursoId.mockResolvedValue(result);

      const response = await controller.getDisciplinasByCurso(1);

      expect(response).toEqual(result);
      expect(mockDisciplinaService.findDisciplinasByCursoId).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call DisciplinaService.update and return an updated disciplina', async () => {
      const updateDisciplinaDto = { nome: 'Matemática Avançada' };
      const updatedDisciplina: Disciplina = {
        disciplina_id: 1, ...updateDisciplinaDto,
        descricao: '',
        curso: new Curso(),
      };

      mockDisciplinaService.update.mockResolvedValue(updatedDisciplina);

      const response = await controller.update(1, updateDisciplinaDto);

      expect(response).toEqual(updatedDisciplina);
      expect(mockDisciplinaService.update).toHaveBeenCalledWith(1, updateDisciplinaDto);
    });
  });

  describe('remove', () => {
    it('should call DisciplinaService.remove', async () => {
      mockDisciplinaService.remove.mockResolvedValue(undefined);

      await controller.remove(1);

      expect(mockDisciplinaService.remove).toHaveBeenCalledWith(1);
    });
  });
});
