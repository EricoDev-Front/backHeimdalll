import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { JwtService } from '@nestjs/jwt';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProfessorController', () => {
  let controller: ProfessorController;
  let service: ProfessorService;
  let jwtService: JwtService;

  const mockProfessorService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const professorMock = {
    professor_id: 1,
    nome: 'João Silva',
    email: 'joaosilva@example.com',
    senha: 'senhaHashada',
    registro: '12345',
    adm: false,
    status: true,
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockedToken'),
    verify: jest.fn().mockReturnValue({ userId: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorController],
      providers: [
        { provide: ProfessorService, useValue: mockProfessorService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<ProfessorController>(ProfessorController);
    service = module.get<ProfessorService>(ProfessorService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new professor', async () => {
      const createProfessorDto: CreateProfessorDto = {
        nome: 'João Silva',
        email: 'joaosilva@example.com',
        senha: 'senha123',
        registro: '12345',
        adm: false,
      };

      mockProfessorService.create.mockResolvedValue(professorMock);

      const result = await controller.create(createProfessorDto);
      expect(result).toEqual(professorMock);
      expect(mockProfessorService.create).toHaveBeenCalledWith(createProfessorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of professors', async () => {
      const result = [professorMock];
      mockProfessorService.findAll.mockResolvedValue(result);

      const response = await controller.findAll();

      expect(response).toEqual(result);
      expect(mockProfessorService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single professor', async () => {
      mockProfessorService.findOne.mockResolvedValue(professorMock);

      const response = await controller.findOne(1);

      expect(response).toEqual(professorMock);
      expect(mockProfessorService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return the updated professor', async () => {
      const updateProfessorDto: UpdateProfessorDto = { nome: 'João Silva Atualizado' };
      mockProfessorService.update.mockResolvedValue({ ...professorMock, ...updateProfessorDto });

      const result = await controller.update(1, updateProfessorDto);

      expect(result).toEqual({ ...professorMock, ...updateProfessorDto });
      expect(mockProfessorService.update).toHaveBeenCalledWith(1, updateProfessorDto);
    });
  });

  describe('remove', () => {
    it('should call remove and delete professor', async () => {
      mockProfessorService.remove.mockResolvedValue(undefined);

      await controller.remove(1);

      expect(mockProfessorService.remove).toHaveBeenCalledWith(1);
    });
  });
});
