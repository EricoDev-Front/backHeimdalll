import { Brackets, Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Turma } from 'src/turma/entities/turma.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Validacao } from 'src/validacao/entities/validacao.entity';
import { CreateValidacaoDto } from 'src/validacao/dto/create-validacao.dto';
import { addDays, format, isValid } from 'date-fns';
import { parse } from 'date-fns';

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
    const {
      professor_id,
      sala_id,
      turma_id,
      dataInicio,
      dataFim,
      horaInicio,
      horaFim,
    } = createReservaDto;

    // Verificar entidades associadas
    const professor = await this.professorRepository.findOne({
      where: { professor_id },
    });
    const sala = await this.salaRepository.findOne({ where: { sala_id } });
    const turma = await this.turmaRepository.findOne({ where: { turma_id } });

    if (!professor || !sala || !turma) {
      throw new Error('Professor, Sala ou Turma não encontrados');
    }

    // Gerar os dias reservados como strings no formato 'YYYY-MM-DD'
    const startDate = new Date(`${dataInicio}T00:00:00`);
    const endDate = new Date(`${dataFim}T00:00:00`);
    const diasReservados: string[] = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
      diasReservados.push(format(currentDate, 'yyyy-MM-dd'));
      currentDate = addDays(currentDate, 1);
    }

    // Variáveis para armazenar o tipo de conflito
    let conflitoSala = false;
    let conflitoProfessor = false;
    let conflitoTurma = false;

    // Verifica conflito para a sala
    const conflitoSalaReserva = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.sala_id = :salaId', { salaId: sala_id })
      .andWhere(
        '(reserva.hora_inicio < :horaFim AND reserva.hora_final > :horaInicio)',
        {
          horaInicio,
          horaFim,
        },
      )
      .andWhere(
        new Brackets((qb) => {
          diasReservados.forEach((dia, index) => {
            qb.orWhere(`reserva.dias_reservados LIKE :dia${index}`, {
              [`dia${index}`]: `%${dia}%`,
            });
          });
        }),
      )
      .getOne();

    if (conflitoSalaReserva) conflitoSala = true;

    // Verifica conflito para o professor
    const conflitoProfessorReserva = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.professor_id = :professorId', {
        professorId: professor_id,
      })
      .andWhere(
        '(reserva.hora_inicio < :horaFim AND reserva.hora_final > :horaInicio)',
        {
          horaInicio,
          horaFim,
        },
      )
      .andWhere(
        new Brackets((qb) => {
          diasReservados.forEach((dia, index) => {
            qb.orWhere(`reserva.dias_reservados LIKE :dia${index}`, {
              [`dia${index}`]: `%${dia}%`,
            });
          });
        }),
      )
      .getOne();

    if (conflitoProfessorReserva) conflitoProfessor = true;

    // Verifica conflito para a turma
    const conflitoTurmaReserva = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.turma_id = :turmaId', { turmaId: turma_id })
      .andWhere(
        '(reserva.hora_inicio < :horaFim AND reserva.hora_final > :horaInicio)',
        {
          horaInicio,
          horaFim,
        },
      )
      .andWhere(
        new Brackets((qb) => {
          diasReservados.forEach((dia, index) => {
            qb.orWhere(`reserva.dias_reservados LIKE :dia${index}`, {
              [`dia${index}`]: `%${dia}%`,
            });
          });
        }),
      )
      .getOne();

    if (conflitoTurmaReserva) conflitoTurma = true;

    // Retorna uma mensagem personalizada de acordo com o tipo de conflito
    if (conflitoSala || conflitoProfessor || conflitoTurma) {
      let mensagemErro = 'Conflito de reserva: já existe uma reserva para ';
      if (conflitoSala) mensagemErro += 'esta sala';
      if (conflitoProfessor)
        mensagemErro += conflitoSala ? ', professor' : 'este professor';
      if (conflitoTurma)
        mensagemErro +=
          conflitoSala || conflitoProfessor ? ', e turma' : 'esta turma';

      throw new HttpException(
        mensagemErro + ' no mesmo horário e dia.',
        HttpStatus.CONFLICT,
      );
    }

    // Criar e salvar a reserva
    const reserva = this.reservaRepository.create({
      professor,
      sala,
      turma,
      status: false,
      hora_inicio: horaInicio,
      hora_final: horaFim,
      dias_reservados: diasReservados,
    });

    const novaReserva = await this.reservaRepository.save(reserva);

    // Criar e salvar a entidade de validação
    const validacao = new Validacao();
    validacao.professor = professor; // Atribua o objeto Professor
    validacao.sala = sala; // Atribua o objeto Sala
    validacao.reserva = novaReserva; // Atribua o objeto Reserva
    validacao.status = false; // Define o status inicial da validação
    validacao.hora_inicio = horaInicio;
    validacao.hora_final = horaFim;
    validacao.dias_reservados = diasReservados;

    await this.validacaoRepository.save(validacao);

    return novaReserva;
  }

  async findReservas(
    professorId?: number,
    turmaId?: number,
    salaId?: number,
  ): Promise<Reserva[]> {
    const queryBuilder = this.reservaRepository.createQueryBuilder('reserva');

    // Filtra apenas reservas com status true (comentar esta linha temporariamente)
    // queryBuilder.andWhere('reserva.status = :status', { status: true });

    if (professorId) {
      queryBuilder.andWhere('reserva.professor = :professorId', {
        professorId,
      });
    }

    if (salaId) {
      queryBuilder.andWhere('reserva.sala = :salaId', {
        salaId,
      });
    }

    if (turmaId) {
      queryBuilder.andWhere('reserva.turma = :turmaId', { turmaId });
    }

    queryBuilder.leftJoinAndSelect('reserva.sala', 'sala');
    queryBuilder.leftJoinAndSelect('reserva.professor', 'professor');
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


  async updateReserva(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const { reserva_id, dataInicio, dataFim, horaInicio, horaFim, ...updateData } = updateReservaDto;
  
    // Gerar os dias reservados a partir de dataInicio e dataFim
    let diasReservados: string[] = [];
    if (dataInicio && dataFim) {
      diasReservados = this.gerarDiasReservados(dataInicio, dataFim);
    }
  
    // Adiciona dias_reservados à atualização
    const updateDataComDias: any = { ...updateData, dias_reservados: diasReservados };
  
    // Busca a reserva existente pelo ID
    const reserva = await this.reservaRepository.findOne({
      where: { reserva_id },
      relations: ['professor', 'sala', 'turma'], // Carrega as relações necessárias
    });
  
    if (!reserva) {
      throw new Error('Reserva não encontrada');
    }
  
    // Atualiza as propriedades da reserva com os dados do DTO, agora com dias_reservados
    Object.assign(reserva, updateDataComDias);
  
    // Verifica conflitos se as datas ou horários foram atualizados
    const reservaConflitante = await this.reservaRepository.createQueryBuilder('reserva')
      .where('reserva.sala.sala_id = :salaId', { salaId: reserva.sala.sala_id })
      .andWhere('reserva.professor.professor_id = :professorId', { professorId: reserva.professor.professor_id })
      .andWhere('reserva.turma.turma_id = :turmaId', { turmaId: reserva.turma.turma_id })
      .andWhere('(' +
        '(:dataInicio < reserva.dias_reservados AND :dataFinal > reserva.dias_reservados)' +
        ')', { dataInicio, dataFinal: dataFim })
      .andWhere('(' +
        '(:horaInicio < reserva.hora_final AND :horaFim > reserva.hora_inicio)' +
        ')', { horaInicio, horaFim })
      .getOne();
  
    if (reservaConflitante) {
      throw new Error('Conflito de reserva: já existe uma reserva para esta sala, professor ou turma no mesmo horário.');
    }
    
    await this.reservaRepository.update(reserva.reserva_id, reserva);

    // Salva a reserva atualizada
    return await this.reservaRepository.save(reserva);
  }
  
  
  
  // Função para gerar os dias reservados entre `dataInicio` e `dataFim`
  private gerarDiasReservados(dataInicio: string, dataFim: string): string[] {
    const dataInicioObj = new Date(dataInicio);
    const dataFimObj = new Date(dataFim);
    
    const diasReservados: string[] = [];
    let currentDate = dataInicioObj;
  
    while (currentDate <= dataFimObj) {
      diasReservados.push(currentDate.toISOString().split('T')[0]); // Adiciona a data no formato 'YYYY-MM-DD'
      currentDate.setDate(currentDate.getDate() + 1); // Avança para o próximo dia
    }
  
    return diasReservados;
  }
  
  

  async remove(id: number): Promise<void> {
    await this.reservaRepository.delete(id);
  }
  async getReservaDetalhada(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.professor', 'professor')
      .leftJoinAndSelect('reserva.sala', 'sala')
      .leftJoinAndSelect('reserva.turma', 'turma')
      .leftJoinAndSelect('reserva.validacao', 'validacao') // Caso você queira incluir a validação associada
      .where('reserva.reserva_id = :id', { id })
      .getOne();

    if (!reserva) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada.`);
    }

    return reserva;
  }

  async findReservasPorAluno(
    alunoId: number,
    inicioDaSemana: Date,
    fimDaSemana: Date,
  ): Promise<Reserva[]> {
    // Gera o array de dias no formato 'YYYY-MM-DD'
    const diasDaSemana = this.gerarArrayDias(inicioDaSemana, fimDaSemana);
  
    const reservas = await this.reservaRepository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.turma', 'turma')
      .leftJoinAndSelect('turma.alunos', 'aluno') // Junta a tabela de alunos
      .leftJoinAndSelect('reserva.sala', 'sala') // Junta a tabela de salas
      .where('aluno.aluno_id = :alunoId', { alunoId }) // Filtra pelo ID do aluno
      .andWhere(
        diasDaSemana.map((dia, index) => `reserva.dias_reservados LIKE :dia${index}`).join(' OR '),
        diasDaSemana.reduce((params, dia, index) => {
          params[`dia${index}`] = `%${dia}%`;
          return params;
        }, {}),
      )
      .orderBy('reserva.dias_reservados') // Ordena por dia
      .addOrderBy('reserva.hora_inicio') // Ordena por horário de início
      .getMany();
  
    return reservas;
  }
  
  
  // Função auxiliar para gerar array de dias no formato 'YYYY-MM-DD'
  private gerarArrayDias(inicio: Date, fim: Date): string[] {
    const dias: string[] = [];
    let atual = new Date(inicio); // Cria um novo objeto para evitar mutações
  
    while (atual <= fim) {
      dias.push(atual.toISOString().split('T')[0]); // Adiciona a data formatada
      atual.setDate(atual.getDate() + 1); // Incrementa o dia
    }
  
    return dias;
  }
  
  
}
