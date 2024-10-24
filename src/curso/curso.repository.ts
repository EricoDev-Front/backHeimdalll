import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoRepository {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async createCurso(createCursoDto: CreateCursoDto): Promise<Curso> {
    const newCurso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(newCurso);
  }

  async findAll(): Promise<Curso[]> {
    return this.cursoRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    return this.cursoRepository.findOne({ where: { curso_id: id } });
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    await this.cursoRepository.update(id, updateCursoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cursoRepository.delete(id);
  }
}
