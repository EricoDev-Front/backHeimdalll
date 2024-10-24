import { ApiProperty } from '@nestjs/swagger';

export class ReservaResponseDto {
  @ApiProperty({ description: 'ID da reserva' })
  reserva_id: number;

  @ApiProperty({ description: 'ID do professor associado à reserva' })
  professor_id: number;

  @ApiProperty({ description: 'ID da sala associada à reserva' })
  sala_id: number;

  @ApiProperty({ description: 'ID da turma associada à reserva' })
  turma_id: number;

  @ApiProperty({ description: 'Status da reserva' })
  status: boolean;

  @ApiProperty({ description: 'Data e hora de início da reserva', type: Date })
  data_hora_inicio: Date;

  @ApiProperty({ description: 'Data e hora de final da reserva', type: Date })
  data_hora_final: Date;
}
