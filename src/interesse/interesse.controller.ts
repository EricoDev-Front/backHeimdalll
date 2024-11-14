import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  //UseGuards,
} from '@nestjs/common';
import { InteresseRepository } from './interesse.repository';
import { CreateInteresseDto } from './dto/create-interesse.dto';
import { UpdateInteresseDto } from './dto/update-interesse.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Interesse } from './entities/interesse.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@ApiTags('interesses')
@ApiBearerAuth()
@Controller('interesse')
@UseGuards(JwtAuthGuard)
export class InteresseController {
  constructor(private readonly interesseRepository: InteresseRepository) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Interesse criado com sucesso.',
    type: Interesse,
  })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(
    @Body() createInteresseDto: CreateInteresseDto,
  ): Promise<Interesse> {
    return this.interesseRepository.createInteresse(createInteresseDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de interesses.',
    type: [Interesse],
  })
  async findAll(): Promise<Interesse[]> {
    return this.interesseRepository.findAll();
  }

  @Get('turma/:turmaId/alunos')
  @ApiResponse({
    status: 200,
    description: 'Lista de alunos interessados na turma especificada.',
    type: [Aluno], // Indica que o retorno é um array de Aluno
  })
  @ApiResponse({ status: 404, description: 'Turma não encontrada.' })
  async getAlunosPorTurma(@Param('turmaId') turmaId: number): Promise<Aluno[]> {
    return this.interesseRepository.findAlunosPorTurma(turmaId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Interesse encontrado.',
    type: Interesse,
  })
  @ApiResponse({ status: 404, description: 'Interesse não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Interesse> {
    return this.interesseRepository.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Interesse atualizado com sucesso.',
    type: Interesse,
  })
  @ApiResponse({ status: 404, description: 'Interesse não encontrado.' })
  async update(
    @Param('id') id: number,
    @Body() updateInteresseDto: UpdateInteresseDto,
  ): Promise<Interesse> {
    return this.interesseRepository.update(id, updateInteresseDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Interesse deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Interesse não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.interesseRepository.remove(id);
  }
}
