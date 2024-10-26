import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'MeusProfessoresSaoOsMelhores', // Chave secreta
      signOptions: { expiresIn: '1h' }, // Expiração de 1 hora
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

