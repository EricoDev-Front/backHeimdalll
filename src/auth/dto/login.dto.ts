// src/auth/dto/login.dto.ts
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email do usuário' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({ description: 'Tipo de usuário', enum: ['professor', 'aluno'] })
  @IsIn(['professor', 'aluno'])
  userType: 'professor' | 'aluno'; // Especifique o tipo de usuário
}
