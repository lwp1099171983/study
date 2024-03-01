import { Controller } from '@nestjs/common';
import { UniqueCodeService } from './unique-code.service';

@Controller('unique-code')
export class UniqueCodeController {
  constructor(private readonly uniqueCodeService: UniqueCodeService) {}
}
