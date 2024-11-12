// src/professor/professor.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //UseGuards,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
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
  //@UseGuards()
  @ApiResponse({
    status: 201,
    description: 'Professor criado com sucesso.',
    type: Professor,
  })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(
    @Body() createProfessorDto: CreateProfessorDto,
  ): Promise<Professor> {
    try {
      return await this.professorService.create(createProfessorDto);
    } catch (error) {
      this.handleException(error);
    }
  }

  @Roles('professor', 'adm')
  @Get()
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'Lista de professores.',
    type: [Professor],
  })
  async findAll(): Promise<Professor[]> {
    try {
      return await this.professorService.findAll();
    } catch (error) {
      this.handleException(error);
    }
  }

  @Roles('professor', 'adm')
  @Get(':id')
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'Professor encontrado.',
    type: Professor,
  })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Professor> {
    try {
      return await this.professorService.findOne(id);
    } catch (error) {
      this.handleException(error);
    }
  }

  @Roles('professor', 'adm')
  @Patch(':id')
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'Professor atualizado com sucesso.',
    type: Professor,
  })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async update(
    @Param('id') id: number,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ): Promise<Professor> {
    try {
      return await this.professorService.update(id, updateProfessorDto);
    } catch (error) {
      this.handleException(error);
    }
  }

  @Roles('professor', 'adm')
  @Delete(':id')
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 204, description: 'Professor deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.professorService.remove(id);
    } catch (error) {
      this.handleException(error);
    }
  }

  // Método auxiliar para tratar exceções
  private handleException(error: any): never {
    if (error instanceof UnauthorizedException) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: error.message || 'Não autorizado',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (error instanceof NotFoundException) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message || 'Recurso não encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (error instanceof ForbiddenException) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message || 'Acesso negado: role insuficiente',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (
      error.status === HttpStatus.BAD_REQUEST &&
      error.message === 'Email já cadastrado'
    ) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Email já cadastrado' },
        HttpStatus.BAD_REQUEST,
      );
    }

    console.error('Erro inesperado:', error); // Log para ajudar na depuração
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message || 'Erro interno no servidor',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
