import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  // Carregar os certificados do Let's Encrypt
  // const httpsOptions = {
  //   key: fs.readFileSync(
  //     '/etc/letsencrypt/live/heimdallback.eastus2.cloudapp.azure.com/privkey.pem',
  //   ),
  //   cert: fs.readFileSync(
  //     '/etc/letsencrypt/live/heimdallback.eastus2.cloudapp.azure.com/fullchain.pem',
  //   ),
  // };

  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });

  app.enableCors(); // Habilita o CORS

  const config = new DocumentBuilder()
    .setTitle('API do Projeto Heimdall')
    .setDescription(
      'Documentação da API para gerenciamento de reservas de salas',
    )
    .setVersion('1.0')
    .addTag('reservas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Acesso à documentação em http://localhost:3000/api

  // Iniciar o servidor HTTPS na porta 443
  await app.listen(443, () => {
    console.log('Servidor HTTPS rodando na porta 443');
  });
}
bootstrap();
