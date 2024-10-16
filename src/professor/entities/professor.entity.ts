// professor.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Professor {
  @PrimaryColumn()
  professor_id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  registro: string;

  @Column()
  adm: boolean;
}
