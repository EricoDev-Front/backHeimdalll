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
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Professor } from './entities/professor.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('professores')
@ApiBearerAuth()
@Controller('professor')
 // Usa o JwtAuthGuard e RolesGuard para todas as rotas
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  @UseGuards()
  @ApiResponse({ status: 201, description: 'Professor criado com sucesso.', type: Professor })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<Professor> {
    return this.professorService.create(createProfessorDto);
  }

  //@Roles('professor', 'adm')
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Lista de professores.', type: [Professor] })
  async findAll(): Promise<Professor[]> {
    return this.professorService.findAll();
  }

  //@Roles('professor', 'adm')
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Professor encontrado.', type: Professor })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Professor> {
    return this.professorService.findOne(id);
  }

  @Roles('professor', 'adm')
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Professor atualizado com sucesso.', type: Professor })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async update(@Param('id') id: number, @Body() updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    return this.professorService.update(id, updateProfessorDto);
  }

  @Roles('professor', 'adm')
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 204, description: 'Professor deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.professorService.remove(id);
  }
}
