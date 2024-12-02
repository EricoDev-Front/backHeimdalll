import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProfessorService {
  private readonly saltRounds = 10;

  constructor(
    private readonly professorRepository: ProfessorRepository,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    if (!this.cacheManager) {
      console.error('Cache Manager não inicializado!');
      throw new Error('Erro ao inicializar o Cache Manager');
    }
    console.log('Cache Manager inicializado:', !!this.cacheManager);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  // Criação do professor com verificação por e-mail
  async create(createProfessorDto: CreateProfessorDto): Promise<string> {
    const existingProfessor = await this.professorRepository.findByEmail(createProfessorDto.email);
    if (existingProfessor) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await this.hashPassword(createProfessorDto.senha);
    const professor = { ...createProfessorDto, senha: hashedPassword };

    // Definir status dependendo se o professor é administrador ou não
    if (!professor.adm) {
      professor.status = false;
    } else {
      professor.status = true;
    }

    // Gerar código de verificação e salvar no cache
    const verificationCode = await this.generateVerificationCode();
    await this.setVerificationData(createProfessorDto.email, { ...professor, verificationCode });

    // Enviar e-mail com o código de verificação
    await this.mailService.sendEmail(
      createProfessorDto.email,
      'Código de Verificação',
      `Seu código de verificação é: ${verificationCode}`,
    );

    return 'Código de verificação enviado para o e-mail';
  }

  // Verificar o código de verificação e concluir o cadastro
  async completeRegistration(email: string, code: string): Promise<string> {
    const cachedData = await this.getVerificationData(email);

    if (!cachedData || cachedData.verificationCode !== code) {
      throw new BadRequestException('Código de verificação inválido ou expirado');
    }

    // Criar o professor no banco de dados
    const { senha, ...professorData } = cachedData;
    await this.professorRepository.createProfessor({ ...professorData, senha });

    // Remover dados de verificação do cache
    await this.removeVerificationData(email);

    return 'Registro concluído com sucesso';
  }

  // Gerar código de verificação (6 dígitos)
  private async generateVerificationCode(): Promise<string> {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Salvar dados de verificação no cache
  private async setVerificationData(email: string, data: any): Promise<void> {
    const cacheKey = `verification_${email}`;
    try {
      await this.cacheManager.set(cacheKey, data, 3600000); // Expira em 1 hora
    } catch (error) {
      console.error('Erro ao salvar dados no cache:', error);
      throw new Error('Erro ao salvar dados no cache');
    }
  }

  // Recuperar dados de verificação do cache
  private async getVerificationData(email: string): Promise<any> {
    const cacheKey = `verification_${email}`;
    try {
      return await this.cacheManager.get(cacheKey);
    } catch (error) {
      console.error('Erro ao recuperar dados do cache:', error);
      throw new Error('Erro ao recuperar dados do cache');
    }
  }

  // Remover dados de verificação do cache
  private async removeVerificationData(email: string): Promise<void> {
    const cacheKey = `verification_${email}`;
    await this.cacheManager.del(cacheKey);
  }

  // Validação de senha
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async findAll(): Promise<Professor[]> {
    return this.professorRepository.findAll();
  }

  async findOne(id: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne(id);
    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado.`);
    }
    return professor;
  }

  async findByEmail(email: string): Promise<Professor | null> {
    return this.professorRepository.findByEmail(email);
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    const professor = await this.findOne(id); // Validação de existência
    return this.professorRepository.update(id, updateProfessorDto);
  }

  async remove(id: number): Promise<void> {
    const professor = await this.findOne(id); // Validação de existência
    await this.professorRepository.remove(id);
  }
}
