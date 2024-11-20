import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { SuporteService } from './suporte.service';
import { CreateSuporteDto } from './dto/create-suporte.dto';
import { Suporte } from './entities/suporte.entity';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('suporte')
@Controller('suporte')
export class SuporteController {
  constructor(private readonly suporteService: SuporteService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Solicitação de suporte criada com sucesso.',
    type: Suporte,
  })
  async create(@Body() createSuporteDto: CreateSuporteDto): Promise<Suporte> {
    return this.suporteService.create(createSuporteDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de solicitações de suporte.',
    type: [Suporte],
  })
  async findAll(): Promise<Suporte[]> {
    return this.suporteService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Detalhes da solicitação de suporte.',
    type: Suporte,
  })
  async findOne(@Param('id') id: number): Promise<Suporte> {
    return this.suporteService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Solicitação de suporte deletada com sucesso.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.suporteService.remove(id);
  }
}
