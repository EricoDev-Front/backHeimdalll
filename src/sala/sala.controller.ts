import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Sala } from './entities/sala.entity'; // Importar a entidade Sala

@ApiTags('salas')
@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Sala criada com sucesso.', type: Sala })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createSalaDto: CreateSalaDto): Promise<Sala> {
    return await this.salaService.create(createSalaDto); // Retorna a sala criada
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de salas.', type: [Sala] })
  async findAll(): Promise<Sala[]> {
    return await this.salaService.findAll(); // Retorna a lista de salas
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Sala encontrada.', type: Sala })
  @ApiResponse({ status: 404, description: 'Sala não encontrada.' })
  async findOne(@Param('id') id: string): Promise<Sala> {
    return await this.salaService.findOne(id); // Retorna a sala encontrada
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Sala atualizada com sucesso.', type: Sala })
  @ApiResponse({ status: 404, description: 'Sala não encontrada.' })
  async update(@Param('id') id: string, @Body() updateSalaDto: UpdateSalaDto): Promise<Sala> {
    return await this.salaService.update(id, updateSalaDto); // Retorna a sala atualizada
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Sala deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Sala não encontrada.' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.salaService.remove(id); // Remove a sala
  }
}
  