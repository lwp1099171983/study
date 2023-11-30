import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
// import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [ConfigModule],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
