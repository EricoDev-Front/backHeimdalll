// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfessorService } from '../professor/professor.service';
import { AlunoService } from '../aluno/aluno.service';
import * as bcrypt from 'bcrypt';

export type User = {
  nome: string;
  email: string;
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
    let user;
    let userType: 'professor' | 'aluno' | 'adm';
    let nome;

    // Primeiro, procura o usuário na tabela de professores
    user = await this.professorService.findByEmail(email);
    if (user) {
      // Verifica se o atributo `adm` é verdadeiro para definir o tipo de usuário
      userType = user.adm ? 'adm' : 'professor';
    } else {
      // Se não for professor, tenta buscar o usuário na tabela de alunos
      user = await this.alunoService.findByEmail(email);
      if (user) {
        userType = 'aluno';
      }
    }

    // Validação da senha
    if (user && (await bcrypt.compare(senha, user.senha))) {
      return {
        nome: user.nome,
        email: user.email,
        userType,
      };
    }

    throw new UnauthorizedException('Email ou senha incorretos');
  }

  async login(user: User) {
    const payload = { 
      nome: user.nome,
      email: user.email, 
      userType: user.userType, 
    };
    
    console.log('Payload decodificado no login:', payload)

    return {
      access_token: this.jwtService.sign(payload),
    };

  }
}
