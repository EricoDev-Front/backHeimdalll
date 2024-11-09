import { Injectable } from '@nestjs/common';
import { ReservaRepository } from './reserva.repository';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';
import { TurmaRepository } from 'src/turma/turma.repository';
import { MailService } from 'src/mail/mail.service';
import { AlunoRepository } from 'src/aluno/aluno.repository';

@Injectable()
export class ReservaService {
  constructor(
    private readonly reservaRepository: ReservaRepository,
    private readonly turmaRepository: TurmaRepository,
    private readonly emailService: MailService,
    private readonly alunoRepository: AlunoRepository, // Repositório para obter alunos
  ) { }

  async createReserva(createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Criação da reserva
    const novaReserva = await this.reservaRepository.createReserva(createReservaDto);

    // Recupera a turma associada à reserva
    const turma = await this.turmaRepository.findOne(novaReserva.turma.turma_id);
    console.log(turma);

    if (!turma) {
      throw new Error('Turma não encontrada');
    }

    if (!turma.disciplina.nome) {
      throw new Error('Nao achou nome da disciplina');
    }
    // Obter a disciplina associada à turma
    const disciplina = turma.disciplina.nome || 'Disciplina não encontrada';

    // Obter todos os alunos da turma
    const alunos = turma.alunos;

    const nomeProfessor = novaReserva.professor?.nome || 'Professor não encontrado';
    const identSala = novaReserva.sala?.ident_sala || 'Identificador de sala não encontrado';
    

    // Montando o texto do e-mail
    const emailText = `
    Uma nova reserva foi feita para a Disciplina: ${disciplina} pelo professor ${nomeProfessor}.
    A reserva é para a sala ${identSala}. Verifique o sistema para mais detalhes.
  `;

    // Enviar o e-mail para todos os alunos da turma
    for (const aluno of alunos) {
      await this.emailService.sendEmail(aluno.email, 'Notificação de Reserva', emailText);
    }

    return novaReserva;
  }

  findAll(): Promise<Reserva[]> {
    return this.reservaRepository.findAll();
  }

  findOne(id: number): Promise<Reserva> {
    return this.reservaRepository.findOne(id);
  }

  update(updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    return this.reservaRepository.updateReserva(updateReservaDto);
  }

  remove(id: number): Promise<void> {
    return this.reservaRepository.remove(id);
  }

  async findReservas(
    professorId?: number,
    salaId?: number,
    turmaId?: number,
  ): Promise<Reserva[]> {
    return this.reservaRepository.findReservas(professorId, salaId, turmaId);
  }
}
