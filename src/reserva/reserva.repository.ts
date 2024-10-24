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
    const professor = await this.professorRepository.findOne({
      where: { professor_id: createReservaDto.professor_id },
    });
    
    const sala = await this.salaRepository.findOne({
      where: { sala_id: createReservaDto.sala_id },
    });
  
    const turma = await this.turmaRepository.findOne({
      where: { turma_id: createReservaDto.turma_id },
    });
  
    if (!professor || !sala || !turma) {
      throw new Error('Professor, Sala ou Turma não encontrados');
    }
  
    const reserva = this.reservaRepository.create({
      professor: professor,
      sala: sala,
      turma: turma,
      status: false, // status da reserva
      data_hora_inicio: createReservaDto.data_hora_inicio,
      data_hora_final: createReservaDto.data_hora_final,
    });
  
    // Salvar a reserva
    const savedReserva = await this.reservaRepository.save(reserva);
  
    // Criar a validação usando os dados da reserva
    const validacaoDto = new CreateValidacaoDto();
    validacaoDto.professor_id = professor.professor_id; // ou a forma correta de acessar o ID do professor
    validacaoDto.sala_id = sala.sala_id; // ou a forma correta de acessar o ID da sala
    validacaoDto.reserva_id = savedReserva.reserva_id; // ID da reserva recém-criada
    validacaoDto.status = false; // ou outro valor que você queira definir
    validacaoDto.data_hora_inicio = createReservaDto.data_hora_inicio; // pode ser ajustado conforme necessário
    validacaoDto.data_hora_final = createReservaDto.data_hora_final; // pode ser ajustado conforme necessário
  
    // Salvar a validação
    await this.validacaoRepository.save(validacaoDto);
  
    return savedReserva;
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

  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    await this.reservaRepository.update(id, updateReservaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reservaRepository.delete(id);
  }
}
