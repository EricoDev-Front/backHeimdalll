// interesse.entity.ts
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Turma } from 'src/turma/entities/turma.entity';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Interesse {
  @PrimaryColumn()
  interesse_id: string;

  @ManyToOne(() => Aluno, (aluno) => aluno.aluno_id)
  aluno_id: string;

  @ManyToOne(() => Turma, (turma) => turma.turma_id)
  turma_id: string;
}
