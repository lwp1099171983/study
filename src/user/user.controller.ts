import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get('refresh')
  async refresh(@Param('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.foundUserById(data.user.userId);

      // 重新生成token
      const access_token = this.jwtService.sign(
        {
          user: {
            userId: user.id,
            username: user.username,
            roles: user.roles,
          },
        },
        {
          expiresIn: '30m',
        },
      );
      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      );

      return { access_token, refresh_token };
    } catch (error) {
      throw new UnauthorizedException('token已失效，请重新登陆');
    }
  }

  @Post('login')
  async login(@Body() userLogin: UserLoginDto) {
    const user = await this.userService.login(userLogin);
    const access_token = this.jwtService.sign(
      {
        user: {
          userId: user.id,
          username: user.username,
          roles: user.roles,
        },
      },
      {
        expiresIn: '30m',
      },
    );
    const refresh_token = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: '7d',
      },
    );
    return { access_token, refresh_token };
  }

  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
