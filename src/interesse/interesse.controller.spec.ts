import { Test, TestingModule } from '@nestjs/testing';
import { InteresseController } from './interesse.controller';
import { InteresseService } from './interesse.service';
import { JwtService } from '@nestjs/jwt';
import { CreateInteresseDto } from './dto/create-interesse.dto';
import { UpdateInteresseDto } from './dto/update-interesse.dto';
import { Interesse } from './entities/interesse.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Turma } from 'src/turma/entities/turma.entity';

describe('InteresseController', () => {
  let controller: InteresseController;
  let service: InteresseService;
  let jwtService: JwtService;

  const mockInteresseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findAlunosPorTurma: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockedToken'),
    verify: jest.fn().mockReturnValue({ userId: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteresseController],
      providers: [
        { provide: InteresseService, useValue: mockInteresseService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<InteresseController>(InteresseController);
    service = module.get<InteresseService>(InteresseService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an interesse', async () => {
      const createInteresseDto: CreateInteresseDto = { aluno_id: 1, turma_id: 1 };
      const createdInteresse: Interesse = {
        interesse_id: 1, ...createInteresseDto,
        aluno: new Aluno(), turma: new Turma(),
      };

      mockInteresseService.create.mockResolvedValue(createdInteresse);

      const result = await controller.create(createInteresseDto);

      expect(result).toEqual(createdInteresse);
      expect(mockInteresseService.create).toHaveBeenCalledWith(createInteresseDto);
    });
  });

  describe('findAll', () => {
    it('should call InteresseService.findAll and return an array of interesses', async () => {
      const result: Interesse[] = [
        { interesse_id: 1, aluno: new Aluno(), turma: new Turma() },
      ];
      mockInteresseService.findAll.mockResolvedValue(result);

      const response = await controller.findAll();

      expect(response).toEqual(result);
      expect(mockInteresseService.findAll).toHaveBeenCalled();
    });
  });

  describe('getAlunosPorTurma', () => {
    it('should return a list of alunos interested in the given turma', async () => {
      const alunos: Aluno[] = [{
        aluno_id: 1, nome: 'João', status: false,
        email: '',
        senha: '',
        registro: '',
        ano_entrada: 0,
        turmas: []
      }];
      mockInteresseService.findAlunosPorTurma.mockResolvedValue(alunos);

      const response = await controller.getAlunosPorTurma(1);

      expect(response).toEqual(alunos);
      expect(mockInteresseService.findAlunosPorTurma).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('should call InteresseService.findOne and return a single interesse', async () => {
      const result: Interesse = { interesse_id: 1, aluno: new Aluno(), turma: new Turma() };
      mockInteresseService.findOne.mockResolvedValue(result);

      const response = await controller.findOne(1);

      expect(response).toEqual(result);
      expect(mockInteresseService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call InteresseService.update and return the updated interesse', async () => {
      const updateInteresseDto: UpdateInteresseDto = { aluno_id: 1, turma_id: 2 };
      const updatedInteresse: Interesse = { interesse_id: 1, ...updateInteresseDto, aluno: new Aluno(), turma: new Turma() };

      mockInteresseService.update.mockResolvedValue(updatedInteresse);

      const response = await controller.update(1, updateInteresseDto);

      expect(response).toEqual(updatedInteresse);
      expect(mockInteresseService.update).toHaveBeenCalledWith(1, updateInteresseDto);
    });
  });

  describe('remove', () => {
    it('should call InteresseService.remove and delete the interesse', async () => {
      mockInteresseService.remove.mockResolvedValue(undefined);

      await controller.remove(1);

      expect(mockInteresseService.remove).toHaveBeenCalledWith(1);
    });
  });
});
