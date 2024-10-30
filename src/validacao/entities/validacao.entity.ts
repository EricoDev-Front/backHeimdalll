import { Professor } from 'src/professor/entities/professor.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Validacao {
  @PrimaryGeneratedColumn()
  valida_id: number;

  @ManyToOne(() => Professor, (professor) => professor.professor_id, { onDelete: 'CASCADE' })
  professor_id: number;

  @ManyToOne(() => Sala, (sala) => sala.sala_id, { onDelete: 'CASCADE' })
  sala_id: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.reserva_id, { onDelete: 'CASCADE' })
  reserva_id: number;

  @Column()
  status: boolean;

  @Column()
  data_hora_inicio: Date;

  @Column()
  data_hora_final: Date;
}
