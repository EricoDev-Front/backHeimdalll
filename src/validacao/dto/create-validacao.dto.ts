import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateValidacaoDto {
  @ApiProperty({ description: 'ID do professor associado à validação' })
  @IsNumber()
  @IsNotEmpty()
  professor_id: number;

  @ApiProperty({ description: 'ID da sala associada à validação' })
  @IsNumber()
  @IsNotEmpty()
  sala_id: number;

  @ApiProperty({ description: 'ID da reserva associada à validação' })
  @IsNumber()
  @IsNotEmpty()
  reserva_id: number;

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
