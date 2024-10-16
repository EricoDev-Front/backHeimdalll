import { PartialType } from '@nestjs/mapped-types';
import { CreateInteresseDto } from './create-interesse.dto';

export class UpdateInteresseDto extends PartialType(CreateInteresseDto) {}
