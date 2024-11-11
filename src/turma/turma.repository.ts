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
  
    if (!professor) {
      throw new NotFoundException(`Professor com ID ${createTurmaDto.professor_id} não encontrado`);
    }
  
    if (!disciplina) {
      throw new NotFoundException(`Disciplina com ID ${createTurmaDto.disciplina_id} não encontrada`);
    }
  
    // Verifica se `aluno_ids` foi fornecido e busca os alunos
    const alunos = createTurmaDto.aluno_ids && createTurmaDto.aluno_ids.length > 0
      ? await this.alunoRepository.findByIds(createTurmaDto.aluno_ids)
      : [];
  
    if (createTurmaDto.aluno_ids && alunos.length !== createTurmaDto.aluno_ids.length) {
      throw new NotFoundException(`Alguns alunos não foram encontrados para os IDs fornecidos`);
    }
  
    // Cria a nova turma com as entidades associadas
    const turma = this.turmaRepository.create({
      professor,
      alunos, // Associa a lista de alunos ou deixa vazia
      disciplina,
      periodo: createTurmaDto.periodo,
    });
  
    return await this.turmaRepository.save(turma);
  }

  // Método para adicionar vários alunos a uma turma
async addAlunosToTurma(turmaId: number, alunoIds: number[]): Promise<Turma> {
  const turma = await this.turmaRepository.findOne({
    where: { turma_id: turmaId },
    relations: ['alunos'],
  });

  if (!turma) {
    throw new NotFoundException(`Turma com ID ${turmaId} não encontrada.`);
  }

  // Busca os alunos pelos IDs fornecidos
  const alunosToAdd = await this.alunoRepository.findByIds(alunoIds);

  // Verifica se algum dos IDs fornecidos não foi encontrado
  if (alunosToAdd.length !== alunoIds.length) {
    throw new NotFoundException(`Alguns alunos não foram encontrados para os IDs fornecidos`);
  }

  // Adiciona os alunos que ainda não estão na turma
  const alunosNaoDuplicados = alunosToAdd.filter(
    aluno => !turma.alunos.some(existingAluno => existingAluno.aluno_id === aluno.aluno_id)
  );

  turma.alunos.push(...alunosNaoDuplicados);
  await this.turmaRepository.save(turma);

  return turma;
}


// Método para remover vários alunos de uma turma
async removeAlunosFromTurma(turmaId: number, alunoIds: number[]): Promise<Turma> {
  const turma = await this.turmaRepository.findOne({
    where: { turma_id: turmaId },
    relations: ['alunos'],
  });

  if (!turma) {
    throw new NotFoundException(`Turma com ID ${turmaId} não encontrada.`);
  }

  // Remove apenas os alunos que estão na lista de alunoIds
  turma.alunos = turma.alunos.filter(aluno => !alunoIds.includes(aluno.aluno_id));
  
  await this.turmaRepository.save(turma);

  return turma;
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
  return this.turmaRepository.findOne({
    where: { turma_id: id },
    relations: ['professor', 'alunos', 'disciplina'], // Aqui você inclui as relações necessárias
  });
}

  async update(id: number, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    await this.turmaRepository.update(id, updateTurmaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.turmaRepository.delete(id);
  }

  async getTurmaWithAlunos(turmaId: number): Promise<Turma> {
    const turma = await this.turmaRepository.findOne({
      where: { turma_id: turmaId },
      relations: ['alunos', 'professor', 'disciplina', 'sala'], // Carrega as relações necessárias
    });
  
    if (!turma) {
      throw new NotFoundException(`Turma com ID ${turmaId} não encontrada`);
    }
  
    return turma;
  }
}



