import { Test, TestingModule } from '@nestjs/testing';
import { TurmaController } from './turma.controller';
import { TurmaService } from './turma.service';
import { TurmaRepository } from './turma.repository';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Periodo, Turma } from './entities/turma.entity';
import { NotFoundException } from '@nestjs/common';
import { Curso } from 'src/curso/entities/curso.entity';
import { JwtService } from '@nestjs/jwt';

const mockTurmaRepository = {
  createTurma: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  addAlunosToTurma: jest.fn(),
  removeAlunosFromTurma: jest.fn(),
};

const mockTurmaService = {
  create: jest.fn(),
  findAll: jest.fn(),
  getProfessoresByDisciplinaId: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockJwtService = {
  verify: jest.fn().mockReturnValue({ userId: 1, username: 'test' }),
  sign: jest.fn().mockReturnValue('mocked-jwt-token'),
};

describe('TurmaController', () => {
  let controller: TurmaController;
  let service: TurmaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmaController],
      providers: [
        { provide: TurmaRepository, useValue: mockTurmaRepository },
        { provide: TurmaService, useValue: mockTurmaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<TurmaController>(TurmaController);
    service = module.get<TurmaService>(TurmaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new turma', async () => {
      const createTurmaDto: CreateTurmaDto = {
        professor_id: 1,
        disciplina_id: 1,
        periodo: Periodo.MATUTINO,
        aluno_ids: [1, 2],
      };

      const result = {
        turma_id: 1,
        ...createTurmaDto,
      };

      mockTurmaRepository.createTurma.mockResolvedValue(result);

      expect(await controller.create(createTurmaDto)).toEqual(result);
    });

    it('should throw NotFoundException when professor or disciplina is not found', async () => {
      const createTurmaDto: CreateTurmaDto = {
        professor_id: 1,
        disciplina_id: 999,
        periodo: Periodo.MATUTINO,
        aluno_ids: [1, 2],
      };

      mockTurmaRepository.createTurma.mockRejectedValue(new NotFoundException('Disciplina não encontrada'));

      try {
        await controller.create(createTurmaDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Disciplina não encontrada');
      }
    });
  });

  describe('findAll', () => {
    it('should return a list of turmas', async () => {
      const result: Turma[] = [
        { turma_id: 1, professor: {
          professor_id: 0,
          nome: '',
          email: '',
          senha: '',
          registro: '',
          adm: false,
          status: false
        }, disciplina: {
          disciplina_id: 0,
          nome: '',
          descricao: '',
          curso: new Curso
        }, alunos: [], periodo: Periodo.MATUTINO },
      ];

      mockTurmaRepository.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single turma', async () => {
      const result = { turma_id: 1, professor: {}, disciplina: {}, alunos: [], periodo: 'matutino' };

      mockTurmaRepository.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException if turma is not found', async () => {
      mockTurmaRepository.findOne.mockResolvedValue(null);

      try {
        await controller.findOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Turma não encontrada.');
      }
    });
  });

  describe('update', () => {
    it('should update a turma', async () => {
      const updateTurmaDto: UpdateTurmaDto = {
        professor_id: 1,
        disciplina_id: 2,
        periodo: Periodo.MATUTINO,
      };

      const result = { turma_id: 1, ...updateTurmaDto };

      mockTurmaRepository.update.mockResolvedValue(result);

      expect(await controller.update(1, updateTurmaDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a turma', async () => {
      mockTurmaRepository.remove.mockResolvedValue(undefined);

      expect(await controller.remove(1)).toBeUndefined();
    });
  });

  describe('addAlunosToTurma', () => {
    it('should add alunos to a turma', async () => {
      const alunoIds = [1, 2];
      const turmaId = 1;
      const result = { turma_id: turmaId, alunos: alunoIds };

      mockTurmaRepository.addAlunosToTurma.mockResolvedValue(result);

      expect(await controller.addAlunosToTurma(turmaId, alunoIds)).toEqual(result);
    });
  });

  describe('removeAlunosFromTurma', () => {
    it('should remove alunos from a turma', async () => {
      const alunoIds = [1, 2];
      const turmaId = 1;
      const result = { turma_id: turmaId, alunos: [] };

      mockTurmaRepository.removeAlunosFromTurma.mockResolvedValue(result);

      expect(await controller.removeAlunosFromTurma(turmaId, alunoIds)).toEqual(result);
    });
  });
});
