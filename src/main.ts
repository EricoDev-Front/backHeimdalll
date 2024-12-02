import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Habilita o CORS

  const config = new DocumentBuilder()
    .setTitle('API do Projeto Heimdall')
    .setDescription(
      'Documentação da API para gerenciamento de reservas de salas',
    )
    .setVersion('1.0')
    .addTag('reservas')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Acesso à documentação em http://localhost:3000/api

  // Iniciar o servidor HTTP na porta 3000
  await app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}
bootstrap();
