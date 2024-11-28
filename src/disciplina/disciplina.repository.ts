// disciplina.repository.ts
import { Repository } from 'typeorm';
import { Disciplina } from './entities/disciplina.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class DisciplinaRepository {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async createDisciplina(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    // Buscando o Curso com o curso_id do DTO
    const curso = await this.cursoRepository.findOne({
      where: { curso_id: createDisciplinaDto.curso_id },
    });

    if (!curso) {
      throw new NotFoundException(`Curso com ID ${createDisciplinaDto.curso_id} não encontrado`);
    }

    // Criando a disciplina e associando o curso
    const newDisciplina = this.disciplinaRepository.create({
      ...createDisciplinaDto,
      curso,
    });

    return this.disciplinaRepository.save(newDisciplina);
  }

    async findAll(): Promise<Disciplina[]> {
      return this.disciplinaRepository.find({
        relations: ['curso'], // Inclui a relação com o curso
      });
    }

    async findOne(id: number): Promise<Disciplina> {
      return this.disciplinaRepository.findOne({
        where: { disciplina_id: id },
        relations: ['curso'], // Inclui a relação com o curso
      });
    }

  async update(id: number, updateDisciplinaDto: UpdateDisciplinaDto): Promise<Disciplina> {
    await this.disciplinaRepository.update(id, updateDisciplinaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.disciplinaRepository.delete(id);
  }

  async findByCursoId(cursoId: number): Promise<Disciplina[]> {
    return this.disciplinaRepository.find({
      where: { curso: { curso_id: cursoId } },
      relations: ['curso'],
    });
  }
}
