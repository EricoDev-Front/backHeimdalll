import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn() // ID gerado automaticamente como número
  sala_id: number;

  @Column()
  status: boolean;

  @Column()
  ident_sala: string;

  @Column({ nullable: true })
  num_cadeiras: number;

  @Column({ nullable: true })
  num_mesas: number;

  @Column({ nullable: true })
  num_projetores: number;

  @Column({ nullable: true })
  num_computadores: number;

  @Column({ nullable: true })
  num_lousas: number;
}
