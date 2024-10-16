import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlunoRepository } from './aluno.repository';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Aluno } from './entities/aluno.entity';

@ApiTags('alunos')
@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso.', type: Aluno })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    return this.alunoRepository.createAluno(createAlunoDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de alunos.', type: [Aluno] })
  async findAll(): Promise<Aluno[]> {
    return this.alunoRepository.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Aluno encontrado.', type: Aluno })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async findOne(@Param('id') id: string): Promise<Aluno> {
    return this.alunoRepository.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Aluno atualizado com sucesso.', type: Aluno })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    return this.alunoRepository.update(id, updateAlunoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Aluno deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.alunoRepository.remove(id);
  }
}
