// professor.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Professor } from './entities/professor.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('professores')
@Controller('professor')
@UseGuards(JwtAuthGuard, RolesGuard) // Use o JwtAuthGuard e o RolesGuard
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}


  @Roles('adm')
  @Post()
  @ApiResponse({ status: 201, description: 'Professor criado com sucesso.', type: Professor })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<Professor> {
    return this.professorService.create(createProfessorDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de professores.', type: [Professor] })
  async findAll(): Promise<Professor[]> {
    return this.professorService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Professor encontrado.', type: Professor })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Professor> {
    return this.professorService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Professor atualizado com sucesso.', type: Professor })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async update(@Param('id') id: number, @Body() updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    return this.professorService.update(id, updateProfessorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Professor deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.professorService.remove(id);
  }
}
