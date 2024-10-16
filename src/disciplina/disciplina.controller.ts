import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisciplinaRepository } from './disciplina.repository';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Disciplina } from './entities/disciplina.entity';

@ApiTags('disciplinas')
@Controller('disciplina')
export class DisciplinaController {
  constructor(private readonly disciplinaRepository: DisciplinaRepository) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Disciplina criada com sucesso.', type: Disciplina })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    return this.disciplinaRepository.createDisciplina(createDisciplinaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de disciplinas.', type: [Disciplina] })
  async findAll(): Promise<Disciplina[]> {
    return this.disciplinaRepository.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Disciplina encontrada.', type: Disciplina })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async findOne(@Param('id') id: string): Promise<Disciplina> {
    return this.disciplinaRepository.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Disciplina atualizada com sucesso.', type: Disciplina })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async update(@Param('id') id: string, @Body() updateDisciplinaDto: UpdateDisciplinaDto): Promise<Disciplina> {
    return this.disciplinaRepository.update(id, updateDisciplinaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Disciplina deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.disciplinaRepository.remove(id);
  }
}
