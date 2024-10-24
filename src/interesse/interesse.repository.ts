import { Repository } from 'typeorm';
import { Interesse } from './entities/interesse.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInteresseDto } from './dto/create-interesse.dto';
import { UpdateInteresseDto } from './dto/update-interesse.dto';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Turma } from 'src/turma/entities/turma.entity';

@Injectable()
export class InteresseRepository {
  constructor(
    @InjectRepository(Interesse)
    private interesseRepository: Repository<Interesse>,

    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,

    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>,
  ) {}

  async createInteresse(createInteresseDto: CreateInteresseDto): Promise<Interesse> {
    const aluno = await this.alunoRepository.findOne({
      where: { aluno_id: createInteresseDto.aluno_id },
    });
    const turma = await this.turmaRepository.findOne({
      where: { turma_id: createInteresseDto.turma_id },
    });

    if (!aluno || !turma) {
      throw new Error('Aluno ou Turma não encontrados');
    }

    const interesse = this.interesseRepository.create({
      aluno: aluno,
      turma: turma,
    });

    return this.interesseRepository.save(interesse);
  }


  async findAll(): Promise<Interesse[]> {
    return this.interesseRepository.find();
  }

  async findAlunosPorTurma(turmaId: number): Promise<Aluno[]> {
    // Busca os interesses da turma específica
    const interesses = await this.interesseRepository.find({
      where: { turma: { turma_id: turmaId } },
      relations: ['aluno'], // Certifique-se de incluir a relação com Aluno
    });
  
    // Mapeia para obter apenas os alunos
    return interesses.map(interesse => interesse.aluno);
  }
  

  async findOne(id: number): Promise<Interesse> {
    return this.interesseRepository.findOne({ where: { interesse_id: id } });
  }

  async update(id: number, updateInteresseDto: UpdateInteresseDto): Promise<Interesse> {
    const interesse = await this.interesseRepository.findOne({ where: { interesse_id: id } });

    if (!interesse) {
      throw new Error('Interesse não encontrado');
    }

    // Atualizando os campos aluno e turma se eles estiverem no DTO
    if (updateInteresseDto.aluno_id) {
      const aluno = await this.alunoRepository.findOne({ where: { aluno_id: updateInteresseDto.aluno_id } });
      if (!aluno) {
        throw new Error('Aluno não encontrado');
      }
      interesse.aluno = aluno;
    }

    if (updateInteresseDto.turma_id) {
      const turma = await this.turmaRepository.findOne({ where: { turma_id: updateInteresseDto.turma_id } });
      if (!turma) {
        throw new Error('Turma não encontrada');
      }
      interesse.turma = turma;
    }

    // Atualiza o interesse com os dados do DTO
    await this.interesseRepository.save(interesse);

    return this.findOne(id);
  }


  async remove(id: number): Promise<void> {
    await this.interesseRepository.delete(id);
  }
}
