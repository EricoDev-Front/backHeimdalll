// sala.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Sala {
  @PrimaryColumn()
  sala_id: string;

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
