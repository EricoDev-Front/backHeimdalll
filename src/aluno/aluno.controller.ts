// aluno.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Aluno } from './entities/aluno.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('alunos')
@ApiBearerAuth()
@Controller('aluno')
@UseGuards(JwtAuthGuard, RolesGuard) // Usa o JwtAuthGuard e o RolesGuard para todas as rotas
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso.', type: Aluno })
  @ApiResponse({ status: 400, description: 'Erro de validação. Email já cadastrado.' }) // Mensagem clara para erro de email duplicado
  async create(@Body() createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    try {
      // Chama o serviço para criar o aluno e verifica email duplicado internamente
      return await this.alunoService.create(createAlunoDto);
    } catch (error) {
      this.handleException(error); // Lida com a exceção
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Lista de alunos.', type: [Aluno] })
  async findAll(): Promise<Aluno[]> {
    return this.alunoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Aluno encontrado.', type: Aluno })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Aluno> {
    return this.alunoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Aluno atualizado com sucesso.', type: Aluno })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async update(@Param('id') id: number, @Body() updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    return this.alunoService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 204, description: 'Aluno deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.alunoService.remove(id);
  }

  // Método auxiliar para tratar exceções
  private handleException(error: any): never {
    if (error.status === HttpStatus.BAD_REQUEST && error.message === 'Email já cadastrado') {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Email já cadastrado' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Outros erros
    console.error('Erro inesperado:', error);
    throw new HttpException(
      { status: HttpStatus.INTERNAL_SERVER_ERROR, error: error.message || 'Erro interno no servidor' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
