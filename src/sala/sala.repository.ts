import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalaRepository {
  constructor(
    @InjectRepository(Sala)
    private salaRepository: Repository<Sala>,
  ) {}

  createSala(createSalaDto: CreateSalaDto): Promise<Sala> {
    const newSala = this.salaRepository.create(createSalaDto);
    return this.salaRepository.save(newSala);
  }

  findAll(): Promise<Sala[]> {
    return this.salaRepository.find();
  }

  findOne(id: string): Promise<Sala> {
    return this.salaRepository.findOne({ where: { sala_id: id } });
  }

  async update(id: string, updateSalaDto: UpdateSalaDto): Promise<Sala> {
    await this.salaRepository.update(id, updateSalaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.salaRepository.delete(id);
  }
}
