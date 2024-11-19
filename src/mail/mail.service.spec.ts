import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');  // Mocking nodemailer

describe('MailService', () => {
  let service: MailService;
  let sendMailMock: jest.Mock;

  beforeEach(async () => {
    sendMailMock = jest.fn();  // Cria um mock para o método sendMail
    nodemailer.createTransport = jest.fn().mockReturnValue({
      sendMail: sendMailMock,  // Substitui a função sendMail com o mock
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send an email successfully', async () => {
    // Defina os parâmetros de teste
    const to = 'recipient@example.com';
    const subject = 'Test Subject';
    const text = 'Test email content';

    // Chama o método sendEmail
    await service.sendEmail(to, subject, text);

    // Verifique se o sendMail foi chamado corretamente
    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'heimdall.ifsp@gmail.com',
      to,
      subject,
      text,
    });
    expect(sendMailMock).toHaveBeenCalledTimes(1); // Verifica se foi chamado uma vez
  });

  it('should handle errors when sending an email', async () => {
    // Simula um erro durante o envio de e-mail
    sendMailMock.mockRejectedValue(new Error('Error sending email'));

    const to = 'recipient@example.com';
    const subject = 'Test Subject';
    const text = 'Test email content';

    // Tenta enviar o e-mail e verifica se o erro é tratado
    await expect(service.sendEmail(to, subject, text)).resolves.not.toThrow();
    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'heimdall.ifsp@gmail.com',
      to,
      subject,
      text,
    });
  });
});
