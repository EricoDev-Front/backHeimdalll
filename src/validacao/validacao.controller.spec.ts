import { Test, TestingModule } from '@nestjs/testing';
import { ValidacaoController } from './validacao.controller';
import { ValidacaoService } from './validacao.service';

describe('ValidacaoController', () => {
  let controller: ValidacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidacaoController],
      providers: [ValidacaoService],
    }).compile();

    controller = module.get<ValidacaoController>(ValidacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
