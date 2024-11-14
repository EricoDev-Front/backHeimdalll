// aluno.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Turma } from 'src/turma/entities/turma.entity';

@Injectable()
export class AlunoRepository {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
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

  findByEmail(email: string) {
    return this.alunoRepository.findOne({ where: { email } });
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    await this.alunoRepository.update(id, updateAlunoDto);
    return this.findOne(id);
  }

  async removeAlunoWithTurmas(alunoId: number) {
    // Busca o aluno com as turmas associadas
    const aluno = await this.alunoRepository.findOne({
      where: { aluno_id: alunoId },
      relations: ['turmas'],
    });

    if (aluno) {
      // Para cada turma associada ao aluno, remova o aluno usando o repositório de Turma
      for (const turma of aluno.turmas) {
        await this.turmaRepository
          .createQueryBuilder()
          .relation(Turma, 'alunos')
          .of(turma) // Define a turma específica
          .remove(aluno); // Remove o aluno da turma
      }

      // Agora exclui o aluno após remover as associações
      await this.alunoRepository.delete(alunoId);
    }
  }
}
