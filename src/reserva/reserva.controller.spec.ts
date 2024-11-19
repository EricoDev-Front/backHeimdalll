import { Test, TestingModule } from '@nestjs/testing';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { ReservaRepository } from './reserva.repository';
import { Reserva } from './entities/reserva.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Periodo, Turma } from 'src/turma/entities/turma.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Curso } from 'src/curso/entities/curso.entity';
import { JwtService } from '@nestjs/jwt';

describe('ReservaController', () => {
  let controller: ReservaController;
  let reservaService: ReservaService;
  let reservaRepository: ReservaRepository;
  let jwtService: JwtService;

  const professorMock: Professor = {
    professor_id: 1,
    nome: 'Professor A',
    email: 'professor.a@dominio.com',
    senha: 'senha123',
    registro: '12345',
    adm: true,
    status: true,
  };

  const salaMock: Sala = {
    sala_id: 2,
    status: true,
    ident_sala: 'Sala 101',
    num_cadeiras: 30,
    num_mesas: 15,
    num_projetores: 2,
    num_computadores: 10,
    num_lousas: 1,
  };

  const alunoMock: Aluno = {
    aluno_id: 1,
    nome: 'Aluno A',
    email: 'aluno.a@dominio.com',
    senha: 'senha123',
    registro: '20231234',
    ano_entrada: 2023,
    turmas: [],
    status: true,
  };

  const turmaMock: Turma = {
    turma_id: 3,
    professor: professorMock,
    alunos: [alunoMock],
    disciplina: {
      disciplina_id: 1, nome: 'Matemática', descricao: 'descricao',
      curso: new Curso,
    },
    periodo: Periodo.MATUTINO,
  };

  const createdReserva: Reserva = {
    reserva_id: 1,
    professor: professorMock,
    sala: salaMock,
    turma: turmaMock,
    status: false,
    hora_inicio: '08:00',
    hora_final: '09:00',
    dias_reservados: ['2024-11-01', '2024-11-02', '2024-11-03'],
  };

  const updatedReserva: Reserva = {
    reserva_id: 1,
    professor: professorMock,
    sala: salaMock,
    turma: turmaMock,
    status: true,
    hora_inicio: '08:00',
    hora_final: '09:00',
    dias_reservados: ['2024-11-01', '2024-11-02', '2024-11-03'],
  };

  const reservas: Reserva[] = [
    {
      reserva_id: 1,
      professor: professorMock,
      sala: salaMock,
      turma: turmaMock,
      status: true,
      hora_inicio: '08:00',
      hora_final: '09:00',
      dias_reservados: ['2024-11-01'],
    },
  ];

  const mockReservaService = {
    createReserva: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockReservaRepository = {
    findReservas: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockedToken'),
    verify: jest.fn().mockReturnValue({ userId: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservaController],
      providers: [
        { provide: ReservaService, useValue: mockReservaService },
        { provide: ReservaRepository, useValue: mockReservaRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<ReservaController>(ReservaController);
    reservaService = module.get<ReservaService>(ReservaService);
    reservaRepository = module.get<ReservaRepository>(ReservaRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('getReservas', () => {
    it('should return an array of reservas', async () => {
      mockReservaRepository.findReservas.mockResolvedValue(reservas);

      const result = await controller.getReservas();
      expect(result).toEqual(reservas);
    });

    it('should return an empty array if no reservas are found', async () => {
      mockReservaRepository.findReservas.mockResolvedValue([]);

      const result = await controller.getReservas();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a reserva by id', async () => {
      mockReservaService.findOne.mockResolvedValue(createdReserva);

      const result = await controller.findOne(1);
      expect(result).toEqual(createdReserva);
    });

    it('should throw an error if reserva not found', async () => {
      mockReservaService.findOne.mockRejectedValue(new Error('Reserva not found'));

      try {
        await controller.findOne(999);
      } catch (e) {
        expect(e.message).toBe('Reserva not found');
      }
    });
  });

  describe('update', () => {
    it('should update a reserva', async () => {
      const updateReservaDto: UpdateReservaDto = {
        reserva_id: 1,
        professor_id: 1,
        sala_id: 2,
        turma_id: 3,
        dataInicio: '2024-11-01',
        dataFim: '2024-11-03',
        horaInicio: '08:00',
        horaFim: '09:00',
      };

      mockReservaService.update.mockResolvedValue(updatedReserva);

      const result = await controller.update(1, updateReservaDto);
      expect(result).toEqual(updatedReserva);
    });

    it('should throw an error if reserva to update does not exist', async () => {
      const updateReservaDto: UpdateReservaDto = {
        reserva_id: 999,
        professor_id: 1,
        sala_id: 2,
        turma_id: 3,
        dataInicio: '2024-11-01',
        dataFim: '2024-11-03',
        horaInicio: '08:00',
        horaFim: '09:00',
      };

      mockReservaService.update.mockRejectedValue(new Error('Reserva not found'));

      try {
        await controller.update(999, updateReservaDto);
      } catch (e) {
        expect(e.message).toBe('Reserva not found');
      }
    });
  });

  describe('createReserva', () => {
    it('should create a new reserva', async () => {
      mockReservaService.createReserva.mockResolvedValue(createdReserva);

      const result = await controller.create({
        professor_id: 1,
        sala_id: 2,
        turma_id: 3,
        horaInicio: '08:00',
        horaFim: '09:00',
        dataInicio: '2024-11-01',
        dataFim: '2024-11-03',
      });
      expect(result).toEqual(createdReserva);
    });
  });

  describe('remove', () => {
    it('should remove a reserva', async () => {
      mockReservaService.remove.mockResolvedValue('Reserva removed successfully');
      const result = await controller.remove(1);
      expect(result).toBe('Reserva removed successfully');
    });

    it('should throw an error if reserva not found', async () => {
      mockReservaService.remove.mockRejectedValue(new Error('Reserva not found'));
      try {
        await controller.remove(999);
      } catch (e) {
        expect(e.message).toBe('Reserva not found');
      }
    });
  });
});
