import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaRepository } from './reserva.repository';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({ status: 200, description: 'Lista de reservas.', type: [Reserva] })
  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Reserva encontrada.', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Reserva> {
    return this.reservaRepository.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Reserva atualizada com sucesso.', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async update(@Param('id') id: number, @Body() updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    return this.reservaRepository.update(id, updateReservaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Reserva deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.reservaRepository.remove(id);
  }
}
