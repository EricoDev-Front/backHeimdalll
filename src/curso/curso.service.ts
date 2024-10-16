import { Injectable } from '@nestjs/common';
import { CursoRepository } from './curso.repository';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(private readonly cursoRepository: CursoRepository) {}

  create(createCursoDto: CreateCursoDto): Promise<Curso> {
    return this.cursoRepository.createCurso(createCursoDto);
  }

  findAll(): Promise<Curso[]> {
    return this.cursoRepository.findAll();
  }

  findOne(id: string): Promise<Curso> {
    return this.cursoRepository.findOne(id);
  }

  update(id: string, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    return this.cursoRepository.update(id, updateCursoDto);
  }

  remove(id: string): Promise<void> {
    return this.cursoRepository.remove(id);
  }
}
