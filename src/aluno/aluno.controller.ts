// aluno.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Aluno } from './entities/aluno.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';


@ApiTags('alunos')
@Controller('aluno')
@UseGuards(JwtAuthGuard, RolesGuard) // Use o JwtAuthGuard e o RolesGuard
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso.', type: Aluno })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de alunos.', type: [Aluno] })
  async findAll(): Promise<Aluno[]> {
    return this.alunoService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Aluno encontrado.', type: Aluno })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Aluno> {
    return this.alunoService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Aluno atualizado com sucesso.', type: Aluno })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async update(@Param('id') id: number, @Body() updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    return this.alunoService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Aluno deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.alunoService.remove(id);
  }
}
