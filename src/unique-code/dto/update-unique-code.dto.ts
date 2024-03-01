import { PartialType } from '@nestjs/swagger';
import { CreateUniqueCodeDto } from './create-unique-code.dto';

export class UpdateUniqueCodeDto extends PartialType(CreateUniqueCodeDto) {}
