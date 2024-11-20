import { Test, TestingModule } from '@nestjs/testing';
import { SalaController } from './sala.controller';
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('SalaController', () => {
  let controller: SalaController;
  let service: SalaService;
  let jwtService: JwtService;

  const salaMock: Sala = {
    sala_id: 1,
    status: true,
    ident_sala: 'Sala A',
    num_cadeiras: 30,
    num_mesas: 15,
    num_projetores: 2,
    num_computadores: 10,
    num_lousas: 1,
  };

  const createdSala: Sala = {
    ...salaMock,
    sala_id: 2,
  };

  const updatedSala: Sala = {
    ...salaMock,
    status: false,
  };

  const mockSalaService = {
    create: jest.fn().mockResolvedValue(createdSala),
    findAll: jest.fn().mockResolvedValue([salaMock]),
    findOne: jest.fn().mockResolvedValue(salaMock),
    update: jest.fn().mockResolvedValue(updatedSala),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  const mockJwtService = {
    verify: jest.fn().mockReturnValue({ userId: 1, username: 'test' }),
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaController],
      providers: [
        { provide: SalaService, useValue: mockSalaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<SalaController>(SalaController);
    service = module.get<SalaService>(SalaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new sala', async () => {
      const createSalaDto: CreateSalaDto = {
        status: true,
        ident_sala: 'Sala Nova',
        num_cadeiras: 40,
        num_mesas: 20,
        num_projetores: 3,
        num_computadores: 15,
        num_lousas: 2,
      };

      const result = await controller.create(createSalaDto);
      expect(result).toEqual(createdSala);
      expect(service.create).toHaveBeenCalledWith(createSalaDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of salas', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([salaMock]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single sala by id', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(salaMock);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if sala not found', async () => {
      service.findOne = jest.fn().mockResolvedValue(null); // Simula sala não encontrada

      try {
        await controller.findOne(999); // Tentando buscar sala que não existe
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe('Sala não encontrada');
      }
    });
  });

  describe('update', () => {
    it('should update a sala', async () => {
      const updateSalaDto: UpdateSalaDto = { status: false };

      const result = await controller.update(1, updateSalaDto);
      expect(result).toEqual(updatedSala);
      expect(service.update).toHaveBeenCalledWith(1, updateSalaDto);
    });

    it('should throw an error if sala not found for update', async () => {
      service.update = jest.fn().mockResolvedValue(null);

      try {
        await controller.update(999, { status: false });
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe('Sala não encontrada');
      }
    });
  });

  describe('remove', () => {
    it('should remove a sala', async () => {
      const result = await controller.remove(1);
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw an error if sala not found for removal', async () => {
      service.remove = jest.fn().mockRejectedValue(new Error('Sala não encontrada'));

      try {
        await controller.remove(999);
      } catch (error) {
        expect(error.message).toBe('Sala não encontrada');
      }
    });
  });
});
