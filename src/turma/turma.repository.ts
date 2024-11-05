import { Repository } from 'typeorm';
import { Turma } from './entities/turma.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Professor } from 'src/professor/entities/professor.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { ProfessoresByDisciplinaDto } from './dto/professor-by-disciplina.dto';

@Injectable()
export class TurmaRepository {
  constructor(
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async createTurma(createTurmaDto: CreateTurmaDto): Promise<Turma> {
    // Busca as entidades associadas pelo ID diretamente
    const professor = await this.professorRepository.findOne({ where: { professor_id: createTurmaDto.professor_id } });
    const disciplina = await this.disciplinaRepository.findOne({ where: { disciplina_id: createTurmaDto.disciplina_id } });
    const alunos = await this.alunoRepository.findByIds(createTurmaDto.aluno_ids); // Ajuste a propriedade para uma lista
    // Verifica se todas as entidades foram encontradas
    if (!professor) {
        throw new NotFoundException(`Professor com ID ${createTurmaDto.professor_id} não encontrado`);
    }
    if (alunos.length === 0) {
      throw new NotFoundException(`Nenhum aluno encontrado para os IDs fornecidos`);
  }
    if (!disciplina) {
        throw new NotFoundException(`Disciplina com ID ${createTurmaDto.disciplina_id} não encontrada`);
    }

    // Cria a nova turma com as entidades associadas
    const turma = this.turmaRepository.create({
      professor,
      alunos, // Agora você atribui a lista de alunos
      disciplina,
      periodo: createTurmaDto.periodo,
  });

    return this.turmaRepository.save(turma);
}


async findAll(professor_id?: string, disciplina_id?: string, periodo?: string): Promise<Turma[]> {
  const query = this.turmaRepository.createQueryBuilder('turma')
      .leftJoinAndSelect('turma.professor', 'professor')
      .leftJoinAndSelect('turma.alunos', 'aluno') // Carrega a lista de alunos
      .leftJoinAndSelect('turma.disciplina', 'disciplina');

  if (professor_id) {
      query.andWhere('professor.professor_id = :professor_id', { professor_id });
  }

  if (disciplina_id) {
      query.andWhere('disciplina.disciplina_id = :disciplina_id', { disciplina_id });
  }

  if (periodo) {
      query.andWhere('turma.periodo = :periodo', { periodo });
  }

  return query.getMany();
}



async findProfessoresByDisciplinaId(disciplinaId: number): Promise<ProfessoresByDisciplinaDto> {
  const turmas = await this.turmaRepository.find({
    where: { disciplina: { disciplina_id: disciplinaId } },
    relations: ['professor'],
  });

  if (turmas.length === 0) {
      throw new Error(`Nenhuma turma encontrada para a disciplina com ID ${disciplinaId}`);
  }

  const turmaDto = new ProfessoresByDisciplinaDto();
  turmaDto.professores = turmas.map(turma => turma.professor);
  turmaDto.turma_id = turmas[0].turma_id;
  
  return turmaDto;
}

  async findOne(id: number): Promise<Turma> {
    return this.turmaRepository.findOne({ where: { turma_id: id } });
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    await this.turmaRepository.update(id, updateTurmaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.turmaRepository.delete(id);
  }
}

