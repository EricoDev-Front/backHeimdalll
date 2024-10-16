import { Injectable } from '@nestjs/common';
import { TurmaRepository } from './turma.repository';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Turma } from './entities/turma.entity';

@Injectable()
export class TurmaService {
  constructor(private readonly turmaRepository: TurmaRepository) {}

  create(createTurmaDto: CreateTurmaDto): Promise<Turma> {
    return this.turmaRepository.createTurma(createTurmaDto);
  }

  findAll(): Promise<Turma[]> {
    return this.turmaRepository.findAll();
  }

  findOne(id: string): Promise<Turma> {
    return this.turmaRepository.findOne(id);
  }

  update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    return this.turmaRepository.update(id, updateTurmaDto);
  }

  remove(id: string): Promise<void> {
    return this.turmaRepository.remove(id);
  }
}
