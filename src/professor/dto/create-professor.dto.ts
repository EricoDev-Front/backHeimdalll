// create-professor.dto.ts
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessorDto {
  @ApiProperty({ description: 'ID do professor' })
  @IsString()
  @IsNotEmpty()
  professor_id: string;

  @ApiProperty({ description: 'Nome do professor' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Email do professor' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do professor' })
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({ description: 'Registro do professor' })
  @IsString()
  @IsNotEmpty()
  registro: string;

  @ApiProperty({ description: 'Se o professor é administrador' })
  @IsBoolean()
  adm: boolean;
}
