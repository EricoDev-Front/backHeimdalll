import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Suporte } from './entities/suporte.entity';
import { CreateSuporteDto } from './dto/create-suporte.dto';

@Injectable()
export class SuporteRepository {
    constructor(
        @InjectRepository(Suporte)
        private readonly suporteRepository: Repository<Suporte>,
    ) { }

    createSuporte(createSuporteDto: CreateSuporteDto): Promise<Suporte> {
        const suporte = this.suporteRepository.create(createSuporteDto);
        return this.suporteRepository.save(suporte);
    }

    findAll(): Promise<Suporte[]> {
        return this.suporteRepository.find();
    }

    findOne(id: number): Promise<Suporte | null> {
        return this.suporteRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.suporteRepository.delete(id);
    }
}
