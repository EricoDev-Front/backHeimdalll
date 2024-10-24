import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn() // Gera automaticamente um ID numérico
  professor_id: number;

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
