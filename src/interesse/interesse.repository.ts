import { Repository } from 'typeorm';
import { Interesse } from './entities/interesse.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInteresseDto } from './dto/create-interesse.dto';
import { UpdateInteresseDto } from './dto/update-interesse.dto';

@Injectable()
export class InteresseRepository {
  constructor(
    @InjectRepository(Interesse)
    private readonly interesseRepository: Repository<Interesse>,
  ) {}

  async createInteresse(createInteresseDto: CreateInteresseDto): Promise<Interesse> {
    const newInteresse = this.interesseRepository.create(createInteresseDto);
    return this.interesseRepository.save(newInteresse);
  }

  async findAll(): Promise<Interesse[]> {
    return this.interesseRepository.find();
  }

  async findOne(id: string): Promise<Interesse> {
    return this.interesseRepository.findOne({ where: { interesse_id: id } });
  }

  async update(id: string, updateInteresseDto: UpdateInteresseDto): Promise<Interesse> {
    await this.interesseRepository.update(id, updateInteresseDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.interesseRepository.delete(id);
  }
}
