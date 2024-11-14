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
import { ValidacaoRepository } from './validacao.repository';
import { CreateValidacaoDto } from './dto/create-validacao.dto';
import { UpdateValidacaoDto } from './dto/update-validacao.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Validacao } from './entities/validacao.entity';
import { ToggleValidacaoDto } from './dto/toggle-reserva.dto';
import { use } from 'passport';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('validacoes')
@ApiBearerAuth()
@Controller('validacao')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ValidacaoController {
  constructor(private readonly validacaoRepository: ValidacaoRepository) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Validação criada com sucesso.',
    type: Validacao,
  })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  async create(
    @Body() createValidacaoDto: CreateValidacaoDto,
  ): Promise<Validacao> {
    return this.validacaoRepository.createValidacao(createValidacaoDto);
  }

  @Post('toggle')
  @ApiOperation({ summary: 'Alternar a validação de várias reservas' })
  @ApiBody({
    description:
      'Lista de objetos contendo reservaId e status para alternar a validação',
    type: [ToggleValidacaoDto],
  })
  @ApiResponse({
    status: 200,
    description: 'Validações alternadas com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Uma ou mais reservas ou validações não encontradas.',
  })
  async toggleValidacao(
    @Body() toggleValidacaoDtos: ToggleValidacaoDto[],
  ): Promise<string[]> {
    return this.validacaoRepository.toggleValidacaoByReservaIds(
      toggleValidacaoDtos,
    );
  }

  //
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de validações.',
    type: [Validacao],
  })
  async findAll(): Promise<Validacao[]> {
    return this.validacaoRepository.findAll();
  }

  //
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Validação encontrada.',
    type: Validacao,
  })
  @ApiResponse({ status: 404, description: 'Validação não encontrada.' })
  async findOne(@Param('id') id: number): Promise<Validacao> {
    return this.validacaoRepository.findOne(id);
  }

  
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Validação atualizada com sucesso.',
    type: Validacao,
  })
  @ApiResponse({ status: 404, description: 'Validação não encontrada.' })
  async update(
    @Param('id') id: number,
    @Body() updateValidacaoDto: UpdateValidacaoDto,
  ): Promise<Validacao> {
    return this.validacaoRepository.update(id, updateValidacaoDto);
  }

  
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Validação deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Validação não encontrada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.validacaoRepository.remove(id);
  }
}
