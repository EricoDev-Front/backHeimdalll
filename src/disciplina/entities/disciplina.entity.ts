// disciplina.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Disciplina {
  @PrimaryColumn()
  disciplina_id: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;
}
