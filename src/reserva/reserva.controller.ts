import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ReservaRepository } from './reserva.repository';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Reserva } from './entities/reserva.entity';

@ApiTags('reservas')
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Reserva criada com sucesso.', type: Reserva })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaRepository.createReserva(createReservaDto);
  }

  @Get()
  @ApiQuery({ name: 'professorId', required: false, type: Number, description: 'ID do professor para filtrar as reservas' })
  @ApiQuery({ name: 'turmaId', required: false, type: Number, description: 'ID da turma para filtrar as reservas' })
  @ApiResponse({ status: 200, description: 'Reservas encontradas', type: [Reserva] })
  @ApiResponse({ status: 404, description: 'Nenhuma reserva encontrada' })
  async getReservas(
    @Query('professorId') professorId?: number,
    @Query('turmaId') turmaId?: number,
  ): Promise<Reserva[]> {
    return this.reservaRepository.findReservas(professorId, turmaId);
  }


  @Get(':id')
  @ApiResponse({ status: 200, description: 'Reserva encontrada.', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Reserva> {
    return this.reservaRepository.findOne(id);
  }

  @Put()
  @ApiResponse({ status: 200, description: 'Reserva atualizada com sucesso.', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async update(@Body() updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    return this.reservaRepository.updateReserva(updateReservaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Reserva deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.reservaRepository.remove(id);
  }
}
