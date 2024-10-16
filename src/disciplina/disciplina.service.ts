import { Injectable } from '@nestjs/common';
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

  findOne(id: string): Promise<Disciplina> {
    return this.disciplinaRepository.findOne(id);
  }

  update(id: string, updateDisciplinaDto: UpdateDisciplinaDto): Promise<Disciplina> {
    return this.disciplinaRepository.update(id, updateDisciplinaDto);
  }

  remove(id: string): Promise<void> {
    return this.disciplinaRepository.remove(id);
  }
}
