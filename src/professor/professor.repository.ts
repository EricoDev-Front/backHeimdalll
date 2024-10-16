import { Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorRepository {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async createProfessor(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    const newProfessor = this.professorRepository.create(createProfessorDto);
    return this.professorRepository.save(newProfessor);
  }

  async findAll(): Promise<Professor[]> {
    return this.professorRepository.find();
  }

  async findOne(id: string): Promise<Professor> {
    return this.professorRepository.findOne({ where: { professor_id: id } });
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    await this.professorRepository.update(id, updateProfessorDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.professorRepository.delete(id);
  }
}
