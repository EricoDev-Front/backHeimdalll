import { Repository } from 'typeorm';
import { Validacao } from './entities/validacao.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateValidacaoDto } from './dto/create-validacao.dto';
import { UpdateValidacaoDto } from './dto/update-validacao.dto';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { StatusValidacao, ToggleValidacaoDto } from './dto/toggle-reserva.dto';

@Injectable()
export class ValidacaoRepository {
  constructor(
    @InjectRepository(Validacao)
    private readonly validacaoRepository: Repository<Validacao>,
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async createValidacao(createValidacaoDto: CreateValidacaoDto): Promise<Validacao> {
    const newValidacao = this.validacaoRepository.create(createValidacaoDto);
    return this.validacaoRepository.save(newValidacao);
  }

  async toggleValidacaoByReservaIds(toggleValidacaoDtos: ToggleValidacaoDto[]): Promise<string[]> {
    const resultados = [];
  
    for (const { reservaId, status } of toggleValidacaoDtos) {
      const validacao = await this.validacaoRepository.findOne({
        where: { reserva_id: reservaId },
      });
  
      const reserva = await this.reservaRepository.findOne({
        where: { reserva_id: reservaId },
      });
  
      if (!reserva) {
        resultados.push(`Reserva ${reservaId} não encontrada.`);
        continue; // Pula para o próximo ID
      }
  
      if (validacao) {
        if (status === StatusValidacao.REJEITADO) {
          // Deletar a validação se o status for REJEITADO
          await this.validacaoRepository.delete(validacao.valida_id);
          await this.reservaRepository.delete(reservaId)
          resultados.push(`Validação da reserva ${reservaId} deletada.`);
        } else if (status === StatusValidacao.APROVADO) {
          // Atualizar o status da reserva para true
          reserva.status = true;
          await this.reservaRepository.save(reserva);
          // Deletar a validação
          await this.validacaoRepository.delete(validacao.valida_id);
          resultados.push(`Validação da reserva ${reservaId} removida e reserva atualizada para true.`);
        }
      } else {
        resultados.push(`Validação da reserva ${reservaId} não encontrada.`);
      }
    }
  
    return resultados;
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
