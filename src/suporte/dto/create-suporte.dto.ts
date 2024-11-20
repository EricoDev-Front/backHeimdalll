import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuporteDto {
    @ApiProperty({ description: 'Nome do cliente' })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ description: 'Email do cliente' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Descrição do problema' })
    @IsString()
    @IsNotEmpty()
    descricao: string;
}
