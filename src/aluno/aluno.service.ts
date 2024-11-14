import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AlunoRepository } from './aluno.repository';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AlunoService {
  private readonly saltRounds = 10;

  constructor(private readonly alunoRepository: AlunoRepository,
    private readonly mailService: MailService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const existingAluno = await this.alunoRepository.findByEmail(createAlunoDto.email);
    if (existingAluno) {
      throw new BadRequestException('Email já cadastrado');
    }
    
    const hashedPassword = await this.hashPassword(createAlunoDto.senha);
    const alunoData = { ...createAlunoDto, senha: hashedPassword };
    return this.alunoRepository.createAluno(alunoData);
  }

  findAll(): Promise<Aluno[]> {
    return this.alunoRepository.findAll();
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne(id);
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    }
    return aluno;
  }

  async findByEmail(email: string): Promise<Aluno | null> {
    return this.alunoRepository.findByEmail(email);
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.findOne(id);

    // Verificar se a senha foi alterada e fazer o hash
    if (updateAlunoDto.senha) {
      updateAlunoDto.senha = await this.hashPassword(updateAlunoDto.senha);
    }

    // Verificar se o status foi alterado
    const statusMudou = updateAlunoDto.status !== undefined && updateAlunoDto.status !== aluno.status;

    // Atualizar o aluno
    const alunoAtualizado = await this.alunoRepository.update(id, updateAlunoDto);

    // Se o status mudou, enviar e-mail de notificação
    if (statusMudou) {
      const statusTexto = updateAlunoDto.status ? 'validado' : 'invalidado';
      await this.mailService.sendEmail(
        alunoAtualizado.email,
        'Atualização de Status do Perfil',
        `Olá ${alunoAtualizado.nome}, seu perfil foi ${statusTexto}.`
      );
    }

    return alunoAtualizado;
  }

  async remove(id: number): Promise<void> {
    const aluno = await this.findOne(id); // Valida se o aluno existe antes de remover
    await this.alunoRepository.remove(id);
  }
}
