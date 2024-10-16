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

  async findAll(): Promise<Turma[]> {
    return this.turmaRepository.find();
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
