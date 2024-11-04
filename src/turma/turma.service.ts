import { Injectable, NotFoundException } from '@nestjs/common';
import { TurmaRepository } from './turma.repository';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Turma } from './entities/turma.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { ProfessoresByDisciplinaDto } from './dto/professor-by-disciplina.dto';

@Injectable()
export class TurmaService {
  constructor(private readonly turmaRepository: TurmaRepository) {}

  create(createTurmaDto: CreateTurmaDto): Promise<Turma> {
    return this.turmaRepository.createTurma(createTurmaDto);
  }

  findAll(professor_id?: string, disciplina_id?: string, periodo?: string): Promise<Turma[]> {
    return this.turmaRepository.findAll(professor_id, disciplina_id, periodo);
  }

  async getProfessoresByDisciplinaId(disciplinaId: number): Promise<ProfessoresByDisciplinaDto> {
    const professoresByDisciplinaDto = await this.turmaRepository.findProfessoresByDisciplinaId(disciplinaId);
    
    if (professoresByDisciplinaDto.professores.length === 0) {
      throw new NotFoundException(`Nenhum professor encontrado para a disciplina com ID ${disciplinaId}`);
    }

    return professoresByDisciplinaDto;
  }

  findOne(id: number): Promise<Turma> {
    return this.turmaRepository.findOne(id);
  }

  update(id: number, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    return this.turmaRepository.update(id, updateTurmaDto);
  }

  remove(id: number): Promise<void> {
    return this.turmaRepository.remove(id);
  }
}

