import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from '../utils';
import { UniqueCode } from './entities/uniqueCode.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {
  @Inject()
  private entityManager: EntityManager;

  async generateCode() {
    const str = generateRandomStr(6);

    const uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      code: str,
    });

    if (!uniqueCode) {
      const newUniqueCode = new UniqueCode();
      newUniqueCode.code = str;
      newUniqueCode.status = 0;
      return await this.entityManager.insert(UniqueCode, newUniqueCode);
    } else {
      this.generateCode();
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async batchGenerateCode() {
    for (let index = 0; index < 100; index++) {
      this.generateCode();
    }
  }
}
