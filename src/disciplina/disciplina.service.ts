import { Injectable, NotFoundException } from '@nestjs/common';
import { DisciplinaRepository } from './disciplina.repository';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Disciplina } from './entities/disciplina.entity';

@Injectable()
export class DisciplinaService {
  constructor(private readonly disciplinaRepository: DisciplinaRepository) {}

  create(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    return this.disciplinaRepository.createDisciplina(createDisciplinaDto);
  }

  findAll(): Promise<Disciplina[]> {
    return this.disciplinaRepository.findAll();
  }

  findOne(id: number): Promise<Disciplina> {
    return this.disciplinaRepository.findOne(id);
  }

  async findDisciplinasByCursoId(cursoId: number): Promise<Disciplina[]> {
    const disciplinas = await this.disciplinaRepository.findByCursoId(cursoId);
    
    if (disciplinas.length === 0) {
      throw new NotFoundException(`Nenhuma disciplina encontrada para o curso com ID ${cursoId}`);
    }

    return disciplinas;
  }

  update(id: number, updateDisciplinaDto: UpdateDisciplinaDto): Promise<Disciplina> {
    return this.disciplinaRepository.update(id, updateDisciplinaDto);
  }

  remove(id: number): Promise<void> {
    return this.disciplinaRepository.remove(id);
  }
}
