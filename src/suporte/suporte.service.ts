import { Injectable, NotFoundException } from '@nestjs/common';
import { SuporteRepository } from './suporte.repository';
import { CreateSuporteDto } from './dto/create-suporte.dto';
import { Suporte } from './entities/suporte.entity';

@Injectable()
export class SuporteService {
  constructor(private readonly suporteRepository: SuporteRepository) { }

  create(createSuporteDto: CreateSuporteDto): Promise<Suporte> {
    return this.suporteRepository.createSuporte(createSuporteDto);
  }

  findAll(): Promise<Suporte[]> {
    return this.suporteRepository.findAll();
  }

  async findOne(id: number): Promise<Suporte> {
    const suporte = await this.suporteRepository.findOne(id);
    if (!suporte) {
      throw new NotFoundException(`Solicitação de suporte com ID ${id} não encontrada.`);
    }
    return suporte;
  }

  async remove(id: number): Promise<void> {
    const suporte = await this.findOne(id); // Certifica-se que o suporte existe
    await this.suporteRepository.delete(suporte.id);
  }
}
