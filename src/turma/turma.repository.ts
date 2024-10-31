import { Repository } from 'typeorm';
import { Turma } from './entities/turma.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Professor } from 'src/professor/entities/professor.entity';

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

  async findProfessoresByDisciplinaId(disciplinaId: number): Promise<Professor[]> {
    const turmas = await this.turmaRepository.find({
      where: { disciplina: { disciplina_id: disciplinaId } },
      relations: ['professor'],
    });

    const professores = turmas.map(turma => turma.professor);
    // Remove professores duplicados
    return Array.from(new Set(professores));
  }


  async findOne(id: number): Promise<Turma> {
    return this.turmaRepository.findOne({ where: { turma_id: id } });
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    await this.turmaRepository.update(id, updateTurmaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.turmaRepository.delete(id);
  }
}

