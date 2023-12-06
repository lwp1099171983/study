import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async get(key: string): Promise<any> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: Record<string, any>, ttl?: number) {
    await this.redisClient.set(key, JSON.stringify(value));
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async listGet(key: string): Promise<any> {
    return await this.redisClient.lRange(key, 0, -1);
  }

  async listSet(key: string, list: Array<any>, ttl?: number) {
    for (let i = 0; i < list.length; i++) {
      await this.redisClient.lPush(key, list[i]);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
