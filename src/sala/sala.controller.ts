import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Sala } from './entities/sala.entity'; // Importar a entidade Sala
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('salas')
@ApiBearerAuth()
@Controller('sala')
@UseGuards(JwtAuthGuard, RolesGuard) // Usa o JwtAuthGuard e RolesGuard para todas as rotas
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Roles('adm')
  @Post()
  @ApiResponse({ status: 201, description: 'Sala criada com sucesso.', type: Sala })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createSalaDto: CreateSalaDto): Promise<Sala> {
    return await this.salaService.create(createSalaDto); // Retorna a sala criada
  }

  @Roles('adm')
  @Get()
  @ApiResponse({ status: 200, description: 'Lista de salas.', type: [Sala] })
  async findAll(): Promise<Sala[]> {
    return await this.salaService.findAll(); // Retorna a lista de salas
  }

  @Roles('adm')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Sala encontrada.', type: Sala })
  @ApiResponse({ status: 404, description: 'Sala não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Sala> {
    return await this.salaService.findOne(id); // Retorna a sala encontrada
  }

  @Roles('adm')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Sala atualizada com sucesso.', type: Sala })
  @ApiResponse({ status: 404, description: 'Sala não encontrada.' })
  async update(@Param('id') id: number, @Body() updateSalaDto: UpdateSalaDto): Promise<Sala> {
    return await this.salaService.update(id, updateSalaDto); // Retorna a sala atualizada
  }

  @Roles('adm')
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Sala deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Sala não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return await this.salaService.remove(id); // Remove a sala
  }
}
  