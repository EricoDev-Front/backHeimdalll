import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Disciplina } from './entities/disciplina.entity';
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('disciplinas')
@ApiBearerAuth()
@Controller('disciplina')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {} // Usando o service

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Disciplina criada com sucesso.',
    type: Disciplina,
  })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(
    @Body() createDisciplinaDto: CreateDisciplinaDto,
  ): Promise<Disciplina> {
    return this.disciplinaService.create(createDisciplinaDto); // Chama o service
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de disciplinas.',
    type: [Disciplina],
  })
  async findAll(): Promise<Disciplina[]> {
    return this.disciplinaService.findAll(); // Chama o service
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Disciplina encontrada.',
    type: Disciplina,
  })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Disciplina> {
    return this.disciplinaService.findOne(id); // Chama o service
  }

  @Get('curso/:cursoId')
  async getDisciplinasByCurso(
    @Param('cursoId') cursoId: number,
  ): Promise<Disciplina[]> {
    return this.disciplinaService.findDisciplinasByCursoId(cursoId); // Chama o service
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Disciplina atualizada com sucesso.',
    type: Disciplina,
  })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async update(
    @Param('id') id: number,
    @Body() updateDisciplinaDto: UpdateDisciplinaDto,
  ): Promise<Disciplina> {
    return this.disciplinaService.update(id, updateDisciplinaDto); // Chama o service
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Disciplina deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Disciplina não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.disciplinaService.remove(id); // Chama o service
  }
}
