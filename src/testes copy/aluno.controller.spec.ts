import { Test, TestingModule } from '@nestjs/testing';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'; // Verifique se o caminho está correto
import { JwtService } from '@nestjs/jwt'; // Importando o JwtService para mocká-lo

describe('AlunoController', () => {
  let controller: AlunoController;
  let service: AlunoService;
  let jwtService: JwtService;

  // Mock do JwtAuthGuard
  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true), // Sempre permite a requisição
  };

  // Mock do JwtService
  const mockJwtService = {
    verify: jest.fn().mockReturnValue({ userId: 1, username: 'test' }), // Simulando a verificação do token
    sign: jest.fn().mockReturnValue('mocked-jwt-token'), // Simulando a geração do token
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [
        {
          provide: AlunoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({
              id: 1,
              nome: 'Aluno Teste',
              email: 'teste@email.com',
              senha: 'senha123',
              registro: '12345',
              ano_entrada: 2024,
            }),
          },
        },
        { provide: JwtService, useValue: mockJwtService }, // Mock do JwtService
        { provide: JwtAuthGuard, useValue: mockJwtAuthGuard }, // Substitui o guarda JWT
      ],
    }).compile();

    controller = module.get<AlunoController>(AlunoController);
    service = module.get<AlunoService>(AlunoService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should create a new aluno', async () => {
    const dto = {
      nome: 'Aluno Teste',
      email: 'teste@email.com',
      senha: 'senha123',
      registro: '12345',
      ano_entrada: 2024,
    };
    const result = await controller.create(dto);
    expect(result).toEqual({
      id: 1,
      nome: 'Aluno Teste',
      email: 'teste@email.com',
      senha: 'senha123',
      registro: '12345',
      ano_entrada: 2024,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
