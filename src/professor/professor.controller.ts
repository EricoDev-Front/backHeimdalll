import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Professor } from './entities/professor.entity';

@ApiTags('professores')
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Professor criado com sucesso.', type: Professor })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<Professor> {
    return this.professorRepository.createProfessor(createProfessorDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de professores.', type: [Professor] })
  async findAll(): Promise<Professor[]> {
    return this.professorRepository.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Professor encontrado.', type: Professor })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Professor> {
    return this.professorRepository.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Professor atualizado com sucesso.', type: Professor })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async update(@Param('id') id: number, @Body() updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    return this.professorRepository.update(id, updateProfessorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Professor deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.professorRepository.remove(id);
  }
}
