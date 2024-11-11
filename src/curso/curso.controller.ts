import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CursoRepository } from './curso.repository';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('cursos')
@ApiBearerAuth()
@Controller('curso')
@UseGuards(JwtAuthGuard, RolesGuard)

export class CursoController {
  constructor(private readonly cursoRepository: CursoRepository) {}

  @Roles('adm')
  @Post()  
  @ApiResponse({ status: 201, description: 'Curso criado com sucesso.', type: Curso })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createCursoDto: CreateCursoDto): Promise<Curso> {
    return this.cursoRepository.createCurso(createCursoDto);
  }

  //@Roles('adm')
  @Get()
  @ApiResponse({ status: 200, description: 'Lista de cursos.', type: [Curso] })
  async findAll(): Promise<Curso[]> {
    return this.cursoRepository.findAll();
  }

  //@Roles('adm')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Curso encontrado.', type: Curso })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Curso> {
    return this.cursoRepository.findOne(id);
  }

  @Roles('adm')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Curso atualizado com sucesso.', type: Curso })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  async update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto): Promise<Curso> {
    return this.cursoRepository.update(id, updateCursoDto);
  }

  @Roles('adm')
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Curso deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.cursoRepository.remove(id);
  }
}
