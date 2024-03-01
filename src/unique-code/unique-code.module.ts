import { Module } from '@nestjs/common';
import { UniqueCodeService } from './unique-code.service';
import { UniqueCodeController } from './unique-code.controller';

@Module({
  controllers: [UniqueCodeController],
  providers: [UniqueCodeService],
})
export class UniqueCodeModule {}
