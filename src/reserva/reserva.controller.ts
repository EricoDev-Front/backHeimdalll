import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ReservaService } from './reserva.service';  // Atualizado para importar o service
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Reserva } from './entities/reserva.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('reservas')
@ApiBearerAuth()
@Controller('reserva')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}  // Atualizado para usar o service

  @Roles('adm', 'professor')
  @Post()
  @ApiResponse({ status: 201, description: 'Reserva criada com sucesso.', type: Reserva })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaService.createReserva(createReservaDto);  // Usando o service
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
    return this.reservaService.findReservas(professorId, salaId, turmaId);  // Usando o service
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Reserva encontrada.', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Reserva> {
    return this.reservaService.findOne(id);  // Usando o service
  }

  @Roles('adm', 'professor')
  @Put()
  @ApiResponse({ status: 200, description: 'Reserva atualizada com sucesso.', type: Reserva })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async update(@Body() updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    return this.reservaService.update(updateReservaDto);  // Usando o service
  }

  @Roles('adm', 'professor')
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Reserva deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.reservaService.remove(id);  // Usando o service
  }
}
