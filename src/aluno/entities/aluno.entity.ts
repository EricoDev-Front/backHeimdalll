// aluno.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Aluno {
  @PrimaryColumn()
  aluno_id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  registro: string;

  @Column()
  ano_entrada: number;
}
