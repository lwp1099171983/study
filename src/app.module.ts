import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { JwtModule } from '@nestjs/jwt';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { LoginGuard } from './login.guard';
import { APP_GUARD } from '@nestjs/core/constants';
import { PermissionGuard } from './permission.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
// import * as path from 'path';
import config from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: [
      //   path.join(process.cwd(), 'test.env'),
      //   path.join(process.cwd(), '.env'),
      // ],
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('application.db.host');
        const port = configService.get('application.db.port');
        const type = configService.get('application.db.type');
        const username = configService.get('application.db.username');
        const password = configService.get('application.db.password');
        const database = configService.get('application.db.database');
        const dbConfig = {
          host,
          port,
          type,
          username,
          password,
          database,
          entities: [User, Role, Permission],
          synchronize: true,
          logging: true,
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: { authPlugin: 'lin_password' },
        } as TypeOrmModuleOptions;
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => {
        const secret = await configService.get('application.jwt.secret');
        const expiresIn = await configService.get('application.jwt.expiresIn');
        return {
          secret,
          global: true,
          signOptions: {
            expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AaaModule,
    BbbModule,
    RedisModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
