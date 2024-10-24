import { Repository } from 'typeorm';
import { Validacao } from './entities/validacao.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateValidacaoDto } from './dto/create-validacao.dto';
import { UpdateValidacaoDto } from './dto/update-validacao.dto';

@Injectable()
export class ValidacaoRepository {
  constructor(
    @InjectRepository(Validacao)
    private readonly validacaoRepository: Repository<Validacao>,
  ) {}

  async createValidacao(createValidacaoDto: CreateValidacaoDto): Promise<Validacao> {
    const newValidacao = this.validacaoRepository.create(createValidacaoDto);
    return this.validacaoRepository.save(newValidacao);
  }

  async findAll(): Promise<Validacao[]> {
    return this.validacaoRepository.find();
  }

  async findOne(id: number): Promise<Validacao> {
    return this.validacaoRepository.findOne({ where: { valida_id: id } });
  }

  async update(id: number, updateValidacaoDto: UpdateValidacaoDto): Promise<Validacao> {
    await this.validacaoRepository.update(id, updateValidacaoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.validacaoRepository.delete(id);
  }
}
