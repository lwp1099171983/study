import { Injectable, HttpException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as crypto from 'crypto';
import { UserDto } from './dto/user.dto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  private logger = new Logger();

  async login(user: UserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (!foundUser) {
      throw new HttpException('用户不存在', 200);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }
    return foundUser;
  }

  async register(user: RegisterDto) {
    const findUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (findUser) {
      throw new HttpException('用户已经存在', 200);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    try {
      this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      this.logger.error(error, UserService);
      return '注册失败';
    }
  }
}
