import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TurmaRepository } from './turma.repository';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Turma } from './entities/turma.entity';
import { TurmaService } from './turma.service';
import { Professor } from 'src/professor/entities/professor.entity';
import { ProfessoresByDisciplinaDto } from './dto/professor-by-disciplina.dto';

@ApiTags('turmas')
@Controller('turma')
export class TurmaController {
  constructor(
    private readonly turmaRepository: TurmaRepository,
    private readonly turmaService: TurmaService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Turma criada com sucesso.', type: Turma })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createTurmaDto: CreateTurmaDto): Promise<Turma> {
    return this.turmaRepository.createTurma(createTurmaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de turmas.', type: [Turma] })
  @ApiQuery({ name: 'professor_id', required: false, type: String, description: 'ID do professor para filtrar as turmas' })
  @ApiQuery({ name: 'disciplina_id', required: false, type: String, description: 'ID da disciplina para filtrar as turmas' })
  @ApiQuery({ name: 'periodo', required: false, type: String, description: 'Período para filtrar as turmas no formato YYYY-MM-DD' })
  async findAll(
    @Query('professor_id') professor_id?: string,
    @Query('disciplina_id') disciplina_id?: string,
    @Query('periodo') periodo?: string, // String no formato "YYYY-MM-DD"
  ): Promise<Turma[]> {
    return this.turmaRepository.findAll(professor_id, disciplina_id, periodo);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Turma encontrada.', type: Turma })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Turma> {
    return this.turmaRepository.findOne(id);
  }

  @Get('disciplina/:disciplinaId/professores')
  async getProfessoresByDisciplina(@Param('disciplinaId') disciplinaId: number): Promise<ProfessoresByDisciplinaDto> {
    return this.turmaService.getProfessoresByDisciplinaId(disciplinaId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Turma atualizada com sucesso.', type: Turma })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  async update(@Param('id') id: number, @Body() updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    return this.turmaRepository.update(id, updateTurmaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Turma deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.turmaRepository.remove(id);
  }
}
