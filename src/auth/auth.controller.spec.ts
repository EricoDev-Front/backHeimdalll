import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    const mockAuthService = {
        validateUser: jest.fn(),
        login: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should return a token and user data on successful login', async () => {
            const loginDto: LoginDto = { email: 'teste@example.com', senha: 'senha123' };

            const user = {
                person: { email: 'teste@example.com', nome: 'Test User', senha: 'senha123' },
                userType: 'professor',
            };

            mockAuthService.validateUser.mockResolvedValue(user);
            mockAuthService.login.mockResolvedValue({
                access_token: 'mocked-jwt-token',
                isAdm: false,
                user: user.person,
                type: 'professor',
            });

            const result = await controller.login(loginDto);

            expect(result).toEqual({
                access_token: 'mocked-jwt-token',
                isAdm: false,
                user: user.person,
                type: 'professor',
            });
            expect(authService.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.senha);
            expect(authService.login).toHaveBeenCalledWith(user);
        });

        it('should throw UnauthorizedException if credentials are invalid', async () => {
            const loginDto: LoginDto = { email: 'invalid@example.com', senha: 'invalidpassword' };

            mockAuthService.validateUser.mockRejectedValue(new UnauthorizedException('Email ou senha incorretos'));

            try {
                await controller.login(loginDto);
            } catch (error) {
                expect(error.response.status).toBe(401);
                expect(error.response.error).toBe('Email ou senha incorretos');
            }
        });

        it('should throw InternalServerErrorException on unexpected errors', async () => {
            const loginDto: LoginDto = { email: 'teste@example.com', senha: 'senha123' };

            mockAuthService.validateUser.mockRejectedValue(new Error('Unexpected error'));

            try {
                await controller.login(loginDto);
            } catch (error) {
                expect(error.response.status).toBe(500);
                expect(error.response.error).toBe('Erro interno no servidor');
            }
        });
    });
});
