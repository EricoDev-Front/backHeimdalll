// create-validacao.dto.ts
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateValidacaoDto {
  @ApiProperty({ description: 'ID da validação' })
  @IsString()
  @IsNotEmpty()
  valida_id: string;

  @ApiProperty({ description: 'ID do professor associado à validação' })
  @IsString()
  @IsNotEmpty()
  professor_id: string;

  @ApiProperty({ description: 'ID da sala associada à validação' })
  @IsString()
  @IsNotEmpty()
  sala_id: string;

  @ApiProperty({ description: 'ID da reserva associada à validação' })
  @IsString()
  @IsNotEmpty()
  reserva_id: string;

  @ApiProperty({ description: 'Status da validação' })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ description: 'Data e hora de início da validação', type: Date })
  @IsNotEmpty()
  data_hora_inicio: Date;

  @ApiProperty({ description: 'Data e hora de final da validação', type: Date })
  @IsNotEmpty()
  data_hora_final: Date;
}
