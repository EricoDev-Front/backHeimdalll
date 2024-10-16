import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservaRepository {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async createReserva(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const newReserva = this.reservaRepository.create(createReservaDto);
    return this.reservaRepository.save(newReserva);
  }

  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find();
  }

  async findOne(id: string): Promise<Reserva> {
    return this.reservaRepository.findOne({ where: { reserva_id: id } });
  }

  async update(id: string, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    await this.reservaRepository.update(id, updateReservaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.reservaRepository.delete(id);
  }
}
