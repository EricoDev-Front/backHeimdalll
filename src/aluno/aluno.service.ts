import { Injectable } from '@nestjs/common';
import { AlunoRepository } from './aluno.repository';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunoService {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    return this.alunoRepository.createAluno(createAlunoDto);
  }

  findAll(): Promise<Aluno[]> {
    return this.alunoRepository.findAll();
  }

  findOne(id: number): Promise<Aluno> {
    return this.alunoRepository.findOne(id);
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    return this.alunoRepository.update(id, updateAlunoDto);
  }

  remove(id: number): Promise<void> {
    return this.alunoRepository.remove(id);
  }
}
