// curso.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryColumn()
  curso_id: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;
}
