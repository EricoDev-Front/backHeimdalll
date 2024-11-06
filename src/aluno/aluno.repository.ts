import { Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoRepository {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  createAluno(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    createAlunoDto.status = false;
    const newAluno = this.alunoRepository.create(createAlunoDto);
    return this.alunoRepository.save(newAluno);
  }

  findAll(): Promise<Aluno[]> {
    return this.alunoRepository.find();
  }

  findOne(id: number): Promise<Aluno> {
    return this.alunoRepository.findOne({ where: { aluno_id: id } });
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    await this.alunoRepository.update(id, updateAlunoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.alunoRepository.delete(id);
  }
}
    