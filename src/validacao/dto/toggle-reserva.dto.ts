import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusValidacao {
  APROVADO = 'APROVADO',
  REJEITADO = 'REJEITADO',
}

export class ToggleValidacaoDto {
  @ApiProperty({ description: 'ID da reserva' })
  @IsNumber()
  @IsNotEmpty()
  reservaId: number;

  @ApiProperty({ enum: StatusValidacao, description: 'Status da validação' })
  @IsEnum(StatusValidacao)
  @IsNotEmpty()
  status: StatusValidacao;
}
