import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessorService {

  private readonly saltRounds = 10;

  constructor(private readonly professorRepository: ProfessorRepository) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async create(createProfessorDto: CreateProfessorDto) : Promise<Professor> {
    const existingProfessor = await this.professorRepository.findByEmail(createProfessorDto.email);
    if (existingProfessor) {
      throw new HttpException('Email já cadastrado', HttpStatus.BAD_REQUEST);
    }
    
    const hashedPassword = await this.hashPassword(createProfessorDto.senha);
    const professor = { ...createProfessorDto, senha: hashedPassword };
    return this.professorRepository.createProfessor(professor);
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  findAll(): Promise<Professor[]> {
    return this.professorRepository.findAll();
  }

  findOne(id: number): Promise<Professor> {
    return this.professorRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.professorRepository.findByEmail(email);
}

  update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    return this.professorRepository.update(id, updateProfessorDto);
  }

  remove(id: number): Promise<void> {
    return this.professorRepository.remove(id);
  }
}
