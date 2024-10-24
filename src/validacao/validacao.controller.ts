import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidacaoRepository } from './validacao.repository';
import { CreateValidacaoDto } from './dto/create-validacao.dto';
import { UpdateValidacaoDto } from './dto/update-validacao.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Validacao } from './entities/validacao.entity';

@ApiTags('validacoes')
@Controller('validacao')
export class ValidacaoController {
  constructor(private readonly validacaoRepository: ValidacaoRepository) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Validação criada com sucesso.', type: Validacao })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createValidacaoDto: CreateValidacaoDto): Promise<Validacao> {
    return this.validacaoRepository.createValidacao(createValidacaoDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de validações.', type: [Validacao] })
  async findAll(): Promise<Validacao[]> {
    return this.validacaoRepository.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Validação encontrada.', type: Validacao })
  @ApiResponse({ status: 404, description: 'Validação não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Validacao> {
    return this.validacaoRepository.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Validação atualizada com sucesso.', type: Validacao })
  @ApiResponse({ status: 404, description: 'Validação não encontrada.' })
  async update(@Param('id') id: number, @Body() updateValidacaoDto: UpdateValidacaoDto): Promise<Validacao> {
    return this.validacaoRepository.update(id, updateValidacaoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Validação deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Validação não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.validacaoRepository.remove(id);
  }
}
