// validacao.entity.ts
import { Professor } from 'src/professor/entities/professor.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Validacao {
  @PrimaryColumn()
  valida_id: string;

  @ManyToOne(() => Professor, (professor) => professor.professor_id)
  professor_id: string;

  @ManyToOne(() => Sala, (sala) => sala.sala_id)
  sala_id: string;

  @ManyToOne(() => Reserva, (reserva) => reserva.reserva_id)
  reserva_id: string;

  @Column()
  status: boolean;

  @Column()
  data_hora_inicio: Date;

  @Column()
  data_hora_final: Date;
}
