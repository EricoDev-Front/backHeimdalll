// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfessorService } from '../professor/professor.service';
import { AlunoService } from '../aluno/aluno.service';
import * as bcrypt from 'bcrypt';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Professor } from 'src/professor/entities/professor.entity';

export type User = Omit<Professor, 'senha'> | Omit<Aluno, 'senha'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly professorService: ProfessorService,
    private readonly alunoService: AlunoService,
  ) {}

  async validateUser(email: string, senha: string, userType: 'professor' | 'aluno'): Promise<User> {
    const user = userType === 'professor'
      ? await this.professorService.findByEmail(email)
      : await this.alunoService.findByEmail(email);

    if (user && (await bcrypt.compare(senha, user.senha))) {
      const { senha, ...result } = user; // Exclui a senha do retorno
      return result; // Retorna o usuário sem a senha
    }
    throw new UnauthorizedException('Email ou senha incorretos');
  }

  async login(user: any, userType: 'professor' | 'aluno') {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      adm: user.adm, // Inclua o atributo "adm"
      userType,
    };
    return {
      access_token: this.jwtService.sign(payload),
      isAdm: user.adm || false, // Retorne o status "adm" diretamente
    };
  }
}
