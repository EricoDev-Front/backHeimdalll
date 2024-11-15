import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfessorService {
  private readonly saltRounds = 10;

  constructor(private readonly professorRepository: ProfessorRepository) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    const existingProfessor = await this.professorRepository.findByEmail(createProfessorDto.email);
    if (existingProfessor) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await this.hashPassword(createProfessorDto.senha);
    var professor = { ...createProfessorDto, senha: hashedPassword };
    if(!professor.adm){
    return this.professorRepository.createProfessor(professor);
    }else{
    professor = {...professor, status: true };	
    return this.professorRepository.createProfessor(professor);
    }
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async findAll(): Promise<Professor[]> {
    return this.professorRepository.findAll();
  }

  async findOne(id: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne(id);
    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado.`);
    }
    return professor;
  }

  async findByEmail(email: string): Promise<Professor | null> {
    return this.professorRepository.findByEmail(email);
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    const professor = await this.findOne(id); // Validação de existência
    return this.professorRepository.update(id, updateProfessorDto);
  }

  async remove(id: number): Promise<void> {
    const professor = await this.findOne(id); // Validação de existência
    await this.professorRepository.remove(id);
  }
}
