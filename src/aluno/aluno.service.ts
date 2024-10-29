// aluno.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AlunoRepository } from './aluno.repository';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunoService {

  private readonly saltRounds = 10;

  constructor(private readonly alunoRepository: AlunoRepository) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const hashedPassword = await this.hashPassword(createAlunoDto.senha);
    const alunoData = { ...createAlunoDto, senha: hashedPassword };
    return this.alunoRepository.createAluno(alunoData);
  }

  findAll(): Promise<Aluno[]> {
    return this.alunoRepository.findAll();
  }

  findOne(id: number): Promise<Aluno> {
    return this.alunoRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.alunoRepository.findByEmail(email);
}

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    if (updateAlunoDto.senha) {
      updateAlunoDto.senha = await this.hashPassword(updateAlunoDto.senha);
    }
    return this.alunoRepository.update(id, updateAlunoDto);
  }

  remove(id: number): Promise<void> {
    return this.alunoRepository.remove(id);
  }
}
