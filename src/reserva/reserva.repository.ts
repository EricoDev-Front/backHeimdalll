import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Turma } from 'src/turma/entities/turma.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Validacao } from 'src/validacao/entities/validacao.entity';
import { CreateValidacaoDto } from 'src/validacao/dto/create-validacao.dto';
import { addDays, format } from 'date-fns';

@Injectable()
export class ReservaRepository {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    
    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,
    
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
    
    @InjectRepository(Validacao)
    private readonly validacaoRepository: Repository<Validacao>,
  ) {}

  async createReserva(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const { professor_id, sala_id, turma_id, dataInicio, dataFim, horaInicio, horaFim } = createReservaDto;

    // Verificar entidades associadas
    const professor = await this.professorRepository.findOne({ where: { professor_id } });
    const sala = await this.salaRepository.findOne({ where: { sala_id } });
    const turma = await this.turmaRepository.findOne({ where: { turma_id } });

    if (!professor || !sala || !turma) {
      throw new Error('Professor, Sala ou Turma não encontrados');
    }

    // Gerar os dias reservados como strings no formato 'YYYY-MM-DD'
    let currentDate = new Date(dataInicio);
    const endDate = new Date(dataFim);
    const diasReservados: string[] = [];

    while (currentDate <= endDate) {
      diasReservados.push(format(currentDate, 'yyyy-MM-dd'));
      currentDate = addDays(currentDate, 1);
    }

    // Verificar conflitos de reservas para qualquer dia do intervalo
    const reservaConflitante = await this.reservaRepository.createQueryBuilder('reserva')
      .where('reserva.sala_id = :salaId', { salaId: sala_id })
      .andWhere('reserva.professor_id = :professorId', { professorId: professor_id })
      .andWhere('reserva.turma_id = :turmaId', { turmaId: turma_id })
      .andWhere('(reserva.hora_inicio < :horaFim AND reserva.hora_final > :horaInicio)', {
        horaInicio,
        horaFim,
      })
      .andWhere('(ARRAY[:diasReservados] && reserva.dias_reservados)', { diasReservados })
      .getOne();

    if (reservaConflitante) {
      throw new Error('Conflito de reserva: já existe uma reserva para esta sala, professor ou turma no mesmo horário e dia.');
    }

    // Criar e salvar a reserva
    const reserva = this.reservaRepository.create({
      professor,
      sala,
      turma,
      status: false, // status inicial da reserva
      hora_inicio: horaInicio,
      hora_final: horaFim,
      dias_reservados: diasReservados,
    });

    return await this.reservaRepository.save(reserva);
  }
  

  async findReservas(
    professorId?: number,
    salaId?: number,
    turmaId?: number,
  ): Promise<Reserva[]> {
    const queryBuilder = this.reservaRepository.createQueryBuilder('reserva');
  
    // Filtra apenas reservas com status true
    queryBuilder.andWhere('reserva.status = :status', { status: true });
  
    if (professorId) {
      queryBuilder.andWhere('reserva.professor = :professorId', { professorId });
    }
  
    if (salaId) {
      queryBuilder.andWhere('reserva.sala = :salaId', { salaId });
    }
  
    if (turmaId) {
      queryBuilder.andWhere('reserva.turma = :turmaId', { turmaId });
    }
  
    // Adiciona as relações necessárias
    queryBuilder.leftJoinAndSelect('reserva.professor', 'professor');
    queryBuilder.leftJoinAndSelect('reserva.sala', 'sala');
    queryBuilder.leftJoinAndSelect('reserva.turma', 'turma');
  
    return await queryBuilder.getMany();
  }
  

  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find();
  }

  async findOne(id: number): Promise<Reserva> {
    return this.reservaRepository.findOne({
      where: { reserva_id: id },
      relations: ['professor', 'sala', 'turma'], // Adiciona as relações para carregar os dados associados
    });
  }

  async updateReserva(updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const { reserva_id, ...updateData } = updateReservaDto;
  
    // Busca a reserva existente pelo ID
    const reserva = await this.reservaRepository.findOne({
      where: { reserva_id }, // Certifique-se de que está utilizando a propriedade correta
      relations: ['professor', 'sala', 'turma'], // Carrega as relações necessárias
    });
  
    if (!reserva) {
      throw new Error('Reserva não encontrada');
    }
  
    // Atualiza as propriedades da reserva com os dados do DTO
    Object.assign(reserva, updateData);
  
    // Verifica conflitos se as datas ou horários foram atualizados
    const newDataInicio = updateData.dataInicio;
    const newDataFinal = updateData.dataFim;
    const newHoraInicio = updateData.horaInicio;
    const newHoraFinal = updateData.horaFim;
  
    const reservaConflitante = await this.reservaRepository.createQueryBuilder('reserva')
      .where('reserva.sala.sala_id = :salaId', { salaId: reserva.sala.sala_id }) // Acessa o ID da sala através do objeto
      .andWhere('reserva.professor.professor_id = :professorId', { professorId: reserva.professor.professor_id }) // Acessa o ID do professor
      .andWhere('reserva.turma.turma_id = :turmaId', { turmaId: reserva.turma.turma_id }) // Acessa o ID da turma
      .andWhere('(' +
        '(:dataInicio < reserva.data_final AND :dataFinal > reserva.data_inicio)' +
        ')', { dataInicio: newDataInicio, dataFinal: newDataFinal })
      .andWhere('(' +
        '(:horaInicio < reserva.hora_final AND :horaFinal > reserva.hora_inicio)' +
        ')', { horaInicio: newHoraInicio, horaFinal: newHoraFinal })
      .getOne();
  
    if (reservaConflitante) {
      throw new Error('Conflito de reserva: já existe uma reserva para esta sala, professor ou turma no mesmo horário.');
    }
  
    // Salva a reserva atualizada
    return await this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<void> {
    await this.reservaRepository.delete(id);
  }
}
