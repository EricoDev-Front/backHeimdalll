import { Repository } from 'typeorm';
import { Turma } from './entities/turma.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Injectable()
export class TurmaRepository {
  constructor(
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
  ) {}

  async createTurma(createTurmaDto: CreateTurmaDto): Promise<Turma> {
    const newTurma = this.turmaRepository.create(createTurmaDto);
    return this.turmaRepository.save(newTurma);
  }

  async findAll(professor_id?: string, disciplina_id?: string, periodo?: string): Promise<Turma[]> {
    const query = this.turmaRepository.createQueryBuilder('turma');

    if (professor_id) {
      query.andWhere('turma.professor_id = :professor_id', { professor_id });
    }

    if (disciplina_id) {
      query.andWhere('turma.disciplina_id = :disciplina_id', { disciplina_id });
    }

    if (periodo) {
      query.andWhere('DATE(turma.periodo) = :periodo', { periodo });
    }

    return query.getMany();
  }


  async findOne(id: string): Promise<Turma> {
    return this.turmaRepository.findOne({ where: { turma_id: id } });
  }

  async update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    await this.turmaRepository.update(id, updateTurmaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.turmaRepository.delete(id);
  }
}

