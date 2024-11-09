import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DisciplinaRepository } from './disciplina.repository';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Disciplina } from './entities/disciplina.entity';
import { DisciplinaService } from './disciplina.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('disciplinas')
@Controller('disciplina')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DisciplinaController {
  constructor(
    private readonly disciplinaRepository: DisciplinaRepository,
    private readonly disciplinaService: DisciplinaService,
  ) {}

  @Roles('adm')
  @Post()
  @ApiResponse({ status: 201, description: 'Disciplina criada com sucesso.', type: Disciplina })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    return this.disciplinaRepository.createDisciplina(createDisciplinaDto);
  }

  //@Roles('adm')
  @Get()
  @ApiResponse({ status: 200, description: 'Lista de disciplinas.', type: [Disciplina] })
  async findAll(): Promise<Disciplina[]> {
    return this.disciplinaRepository.findAll();
  }

  //@Roles('adm')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Disciplina encontrada.', type: Disciplina })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Disciplina> {
    return this.disciplinaRepository.findOne(id);
  }

  @Get('curso/:cursoId')
  async getDisciplinasByCurso(@Param('cursoId') cursoId: number): Promise<Disciplina[]> {
    return this.disciplinaService.findDisciplinasByCursoId(cursoId);
  }

  @Roles('adm')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Disciplina atualizada com sucesso.', type: Disciplina })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async update(@Param('id') id: number, @Body() updateDisciplinaDto: UpdateDisciplinaDto): Promise<Disciplina> {
    return this.disciplinaRepository.update(id, updateDisciplinaDto);
  }

  @Roles('adm')
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Disciplina deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.disciplinaRepository.remove(id);
  }
}
