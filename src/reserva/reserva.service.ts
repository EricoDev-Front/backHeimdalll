import { Injectable } from '@nestjs/common';
import { ReservaRepository } from './reserva.repository';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservaService {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaRepository.createReserva(createReservaDto);
  }

  findAll(): Promise<Reserva[]> {
    return this.reservaRepository.findAll();
  }

  findOne(id: string): Promise<Reserva> {
    return this.reservaRepository.findOne(id);
  }

  update(id: string, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    return this.reservaRepository.update(id, updateReservaDto);
  }

  remove(id: string): Promise<void> {
    return this.reservaRepository.remove(id);
  }
}
