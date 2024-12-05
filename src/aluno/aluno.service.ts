import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AlunoRepository } from './aluno.repository';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { MailService } from 'src/mail/mail.service';
import * as crypto from 'crypto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { waitForDebugger } from 'inspector';

@Injectable()
export class AlunoService {
  private readonly saltRounds = 10;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly alunoRepository: AlunoRepository,
    private readonly mailService: MailService,
  ) {  if (!this.cacheManager) {
    console.error('Cache Manager não inicializado!');
    throw new Error('Erro ao inicializar o Cache Manager');
  }
  console.log('Cache Manager inicializado:', !!this.cacheManager);
}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  // Inicia o processo de registro
  async initiateRegistration(createAlunoDto: CreateAlunoDto): Promise<{message: string}> {
    console.log('Iniciando registro para:', createAlunoDto.email);
    const existingAluno = await this.alunoRepository.findByEmail(createAlunoDto.email);
    console.log('Aluno encontrado no banco:', existingAluno);
    if (existingAluno) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await this.hashPassword(createAlunoDto.senha);
    console.log('Senha criptografada:', hashedPassword);
    const verificationCode = await this.generateVerificationCode();
    console.log('Código de verificação gerado:', verificationCode);

    // Salva os dados no cache
    await this.setVerificationData(createAlunoDto.email, {
      ...createAlunoDto,
      senha: hashedPassword,
      verificationCode,
    });

    console.log('Dados salvos no cache');

    // Envia o e-mail com o código de verificação
    await this.mailService.sendEmail(
      createAlunoDto.email,
      'Código de Verificação',
      `Seu código de verificação é: ${verificationCode}`, // O código agora é resolvido corretamente
    );

    console.log(`Código de verificação gerado: ${verificationCode}`);

    return {message: 'Código de verificação enviado para o e-mail'};
  }

  // Verifica o código e cria o aluno
  async completeRegistration(email: string, code: string): Promise<{message: string}> {
    const cachedData = await this.getVerificationData(email);

    console.log(`Dados do cache para ${email}:`, cachedData);
    console.log(`Código recebido: ${code}`);

    if (!cachedData || cachedData.verificationCode !== code.toString()) {
      throw new BadRequestException('Código de verificação inválido ou expirado');
    }

    // Cria o aluno e remove os dados do cache
    const { senha, ...alunoData } = cachedData;
    await this.alunoRepository.createAluno({ ...alunoData, senha });
    await this.removeVerificationData(email);

    return {message: 'Registro concluído com sucesso'};
  }

  // Salva dados de verificação no cache
  private async setVerificationData(email: string, data: any): Promise<void> {
    console.log('Dados antes de salvar no cache:', data);
    const cacheKey = `verification_${email}`;
    try {
      await this.cacheManager.set(`verification_${email}`, data, 3600000); // Expira em 1 hora
    } catch (error) {
      console.error(`Erro ao salvar dados no cache para ${email}:`, error);
      throw new Error('Erro ao salvar dados no cache');
    }
  }

  // Recupera dados de verificação do cache
  private async getVerificationData(email: string): Promise<any> {
    try{
      const cacheKey = `verification_${email}`;
      const data = await this.cacheManager.get(`verification_${email}`);
      console.log(`Dados recuperados do cache para ${email}:`, data);
      return data;
    } catch (error) {
      console.error(`Erro ao recuperar dados do cache para ${email}:`, error);
      throw new Error('Erro ao recuperar dados do cache');
  }
}

  // Remove dados de verificação do cache
  private async removeVerificationData(email: string): Promise<void> {
    await this.cacheManager.del(`verification_${email}`);
  }

  findAll(): Promise<Aluno[]> {
    return this.alunoRepository.findAll();
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne(id);
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    }
    return aluno;
  }

  async findByEmail(email: string): Promise<Aluno | null> {
    return this.alunoRepository.findByEmail(email);
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.findOne(id);

    const isNewPassword = await bcrypt.compare(updateAlunoDto.senha, aluno.senha);
    // Verificar se a senha foi alterada e fazer o hash
    if (isNewPassword) {
      updateAlunoDto.senha = await this.hashPassword(updateAlunoDto.senha);
    }

    // Verificar se o status foi alterado
    const statusMudou = updateAlunoDto.status !== undefined && updateAlunoDto.status !== aluno.status;

    // Atualizar o aluno
    const alunoAtualizado = await this.alunoRepository.update(id, updateAlunoDto);

    // Se o status mudou, enviar e-mail de notificação
    if (statusMudou) {
      const statusTexto = updateAlunoDto.status ? 'validado' : 'invalidado';
      await this.mailService.sendEmail(
        alunoAtualizado.email,
        'Atualização de Status do Perfil',
        `Olá ${alunoAtualizado.nome}, seu perfil foi ${statusTexto}.`
      );
    }

    return alunoAtualizado;
  }

  async remove(id: number): Promise<void> {
    await this.alunoRepository.removeAlunoWithTurmas(id);
  }

  async generateVerificationCode(): Promise<string> {
    return crypto.randomInt(100000, 999999).toString(); // Gera um código de 6 dígitos
  }
}
