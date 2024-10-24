import { Professor } from 'src/professor/entities/professor.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn() // Gera automaticamente um ID numérico
  reserva_id: number;

  @ManyToOne(() => Professor, (professor) => professor.professor_id)
  professor: Professor;

  @ManyToOne(() => Sala, (sala) => sala.sala_id)
  sala: Sala;

  @Column()
  status: boolean;

  @Column()
  data_hora_inicio: Date;

  @Column()
  data_hora_final: Date;
}
