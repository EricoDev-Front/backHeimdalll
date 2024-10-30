// professor.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Professor } from './entities/professor.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('professores')
@Controller('professor')
@UseGuards(JwtAuthGuard, RolesGuard) // Use o JwtAuthGuard e o RolesGuard
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}


  @Roles('adm')
  @Post()
  @ApiResponse({ status: 201, description: 'Professor criado com sucesso.', type: Professor })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<Professor> {
    try{
      return this.professorService.create(createProfessorDto);
    } catch (error) {
    // Captura a UnauthorizedException e retorna uma resposta com status 401
    if (error instanceof UnauthorizedException) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email ou senha incorretos',
      }, HttpStatus.UNAUTHORIZED);
    }
    // Opcional: caso queira capturar outras exceções
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Erro interno no servidor',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  @Roles('professor', 'adm')
  @Get()
  @ApiResponse({ status: 200, description: 'Lista de professores.', type: [Professor] })
  async findAll(): Promise<Professor[]> {
    try{
    return this.professorService.findAll();
  } catch (error) {
    // Captura a UnauthorizedException e retorna uma resposta com status 401
    if (error instanceof UnauthorizedException) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email ou senha incorretos',
      }, HttpStatus.UNAUTHORIZED);
    }
    // Opcional: caso queira capturar outras exceções
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Erro interno no servidor',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  @Roles('professor', 'adm')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Professor encontrado.', type: Professor })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Professor> {
    try{
    return this.professorService.findOne(id);
  } catch (error) {
    // Captura a UnauthorizedException e retorna uma resposta com status 401
    if (error instanceof UnauthorizedException) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email ou senha incorretos',
      }, HttpStatus.UNAUTHORIZED);
    }
    // Opcional: caso queira capturar outras exceções
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Erro interno no servidor',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Roles('professor', 'adm')
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Professor atualizado com sucesso.', type: Professor })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async update(@Param('id') id: number, @Body() updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    try{
    return this.professorService.update(id, updateProfessorDto);
  } catch (error) {
    // Captura a UnauthorizedException e retorna uma resposta com status 401
    if (error instanceof UnauthorizedException) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email ou senha incorretos',
      }, HttpStatus.UNAUTHORIZED);
    }
    // Opcional: caso queira capturar outras exceções
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Erro interno no servidor',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Roles('professor', 'adm')
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Professor deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Professor não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    try{
    return this.professorService.remove(id);
  } catch (error) {
    // Captura a UnauthorizedException e retorna uma resposta com status 401
    if (error instanceof UnauthorizedException) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email ou senha incorretos',
      }, HttpStatus.UNAUTHORIZED);
    }
    // Opcional: caso queira capturar outras exceções
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Erro interno no servidor',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
}

