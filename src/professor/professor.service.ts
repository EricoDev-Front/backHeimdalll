import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    return this.professorRepository.createProfessor(createProfessorDto);
  }

  findAll(): Promise<Professor[]> {
    return this.professorRepository.findAll();
  }

  findOne(id: string): Promise<Professor> {
    return this.professorRepository.findOne(id);
  }

  update(id: string, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    return this.professorRepository.update(id, updateProfessorDto);
  }

  remove(id: string): Promise<void> {
    return this.professorRepository.remove(id);
  }
}
