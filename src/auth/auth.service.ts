// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfessorService } from '../professor/professor.service';
import { AlunoService } from '../aluno/aluno.service';
import * as bcrypt from 'bcrypt';
import { Professor } from 'src/professor/entities/professor.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';

export type User = {
  person: Professor | Aluno;
  userType: 'professor' | 'aluno' | 'adm';
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly professorService: ProfessorService,
    private readonly alunoService: AlunoService,
  ) {}

  async validateUser(email: string, senha: string): Promise<User> {
    let person;
    let userType: 'professor' | 'aluno' | 'adm';

    // Verifica na tabela de professores
    person = await this.professorService.findByEmail(email);
    if (person) {
      userType = person.adm ? 'adm' : 'professor'; // Se for admin, define o tipo como 'adm'
    } else {
      // Caso não encontre na tabela de professores, tenta buscar na tabela de alunos
      person = await this.alunoService.findByEmail(email);
      if (person) {
        userType = 'aluno';
      }
    }

    // Se não encontrar o usuário em nenhuma das tabelas
    if (!person) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // Valida a senha
    const passwordMatch = await bcrypt.compare(senha, person.senha);
    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // Retorna o usuário e seu tipo
    return {
      person, // Pode retornar os dados completos do usuário
      userType, // Retorna o tipo de usuário (aluno, professor ou adm)
    };
  }

  async login(user: User) {
    const payload = { 
      email: user.person.email, 
      userType: user.userType, 
    };
    
    console.log('Payload decodificado no login:', payload)

    return {
      access_token: this.jwtService.sign(payload),
      isAdm: user.userType === 'adm',
      user: user.person,
      type: user.person['professor_id'] ? 'professor' : 'aluno'
    };

  }
}
