import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurmaRepository } from './turma.repository';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Turma } from './entities/turma.entity';

@ApiTags('turmas')
@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaRepository: TurmaRepository) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Turma criada com sucesso.', type: Turma })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createTurmaDto: CreateTurmaDto): Promise<Turma> {
    return this.turmaRepository.createTurma(createTurmaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de turmas.', type: [Turma] })
  async findAll(): Promise<Turma[]> {
    return this.turmaRepository.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Turma encontrada.', type: Turma })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  async findOne(@Param('id') id: string): Promise<Turma> {
    return this.turmaRepository.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Turma atualizada com sucesso.', type: Turma })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  async update(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    return this.turmaRepository.update(id, updateTurmaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Turma deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.turmaRepository.remove(id);
  }
}
