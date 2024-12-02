import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { Professor } from './entities/professor.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@ApiTags('professores')
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Professor criado com sucesso.' })
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<string> {
    try {
      return await this.professorService.create(createProfessorDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('complete-registration')
  @ApiResponse({ status: 200, description: 'Registro concluído com sucesso.' })
  async completeRegistration(@Body('email') email: string, @Body('code') code: string): Promise<string> {
    try {
      return await this.professorService.completeRegistration(email, code);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de professores.' })
  async findAll(): Promise<Professor[]> {
    return this.professorService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Professor encontrado.' })
  async findOne(@Param('id') id: number): Promise<Professor> {
    return this.professorService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Professor atualizado com sucesso.' })
  async update(@Param('id') id: number, @Body() updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    return this.professorService.update(id, updateProfessorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Professor removido com sucesso.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.professorService.remove(id);
  }
}
