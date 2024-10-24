import { Repository } from 'typeorm';
import { Disciplina } from './entities/disciplina.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinaRepository {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async createDisciplina(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    const newDisciplina = this.disciplinaRepository.create(createDisciplinaDto);
    return this.disciplinaRepository.save(newDisciplina);
  }

  async findAll(): Promise<Disciplina[]> {
    return this.disciplinaRepository.find();
  }

  async findOne(id: number): Promise<Disciplina> {
    return this.disciplinaRepository.findOne({ where: { disciplina_id: id } });
  }

  async update(id: number, updateDisciplinaDto: UpdateDisciplinaDto): Promise<Disciplina> {
    await this.disciplinaRepository.update(id, updateDisciplinaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.disciplinaRepository.delete(id);
  }
}
