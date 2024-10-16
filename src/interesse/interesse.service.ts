import { Injectable } from '@nestjs/common';
import { InteresseRepository } from './interesse.repository';
import { CreateInteresseDto } from './dto/create-interesse.dto';
import { UpdateInteresseDto } from './dto/update-interesse.dto';
import { Interesse } from './entities/interesse.entity';

@Injectable()
export class InteresseService {
  constructor(private readonly interesseRepository: InteresseRepository) {}

  create(createInteresseDto: CreateInteresseDto): Promise<Interesse> {
    return this.interesseRepository.createInteresse(createInteresseDto);
  }

  findAll(): Promise<Interesse[]> {
    return this.interesseRepository.findAll();
  }

  findOne(id: string): Promise<Interesse> {
    return this.interesseRepository.findOne(id);
  }

  update(id: string, updateInteresseDto: UpdateInteresseDto): Promise<Interesse> {
    return this.interesseRepository.update(id, updateInteresseDto);
  }

  remove(id: string): Promise<void> {
    return this.interesseRepository.remove(id);
  }
}
