import { Injectable } from '@nestjs/common';
import { ValidacaoRepository } from './validacao.repository';
import { CreateValidacaoDto } from './dto/create-validacao.dto';
import { UpdateValidacaoDto } from './dto/update-validacao.dto';
import { Validacao } from './entities/validacao.entity';

@Injectable()
export class ValidacaoService {
  constructor(private readonly validacaoRepository: ValidacaoRepository) {}

  create(createValidacaoDto: CreateValidacaoDto): Promise<Validacao> {
    return this.validacaoRepository.createValidacao(createValidacaoDto);
  }

  findAll(): Promise<Validacao[]> {
    return this.validacaoRepository.findAll();
  }

  findOne(id: string): Promise<Validacao> {
    return this.validacaoRepository.findOne(id);
  }

  update(id: string, updateValidacaoDto: UpdateValidacaoDto): Promise<Validacao> {
    return this.validacaoRepository.update(id, updateValidacaoDto);
  }

  remove(id: string): Promise<void> {
    return this.validacaoRepository.remove(id);
  }
}
  