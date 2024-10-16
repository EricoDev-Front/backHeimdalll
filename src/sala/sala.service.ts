import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { SalaRepository } from './sala.repository'; // Importe o repositório

@Injectable()
export class SalaService {
  constructor(private readonly salaRepository: SalaRepository) {}

  create(createSalaDto: CreateSalaDto): Promise<Sala> {
    return this.salaRepository.createSala(createSalaDto);
  }

  findAll(): Promise<Sala[]> {
    return this.salaRepository.findAll();
  }

  findOne(id: string): Promise<Sala> {
    return this.salaRepository.findOne(id);
  }

  update(id: string, updateSalaDto: UpdateSalaDto): Promise<Sala> {
    return this.salaRepository.update(id, updateSalaDto);
  }

  remove(id: string): Promise<void> {
    return this.salaRepository.remove(id);
  }
}
