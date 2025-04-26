import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterDto) {
    const { accessToken, refreshToken } =
      await this.generateToken(registerAuthDto);

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    registerAuthDto.password = await bcrypt.hash(
      registerAuthDto.password,
      salt,
    );

    const user = await this.userService.create({
      ...registerAuthDto,
      refreshToken,
    });

    return { accessToken, id: user.id, username: user.username };
  }

  async refreshToken(username: string) {
    return await this.userService.findOneByUserName(username);
  }

  async login(username: string, password: string) {
    const user = await this.userService.findOneByUserName(username);
    if (!user) throw new NotFoundException(' Такого юзера нет ');

    const isMatch = await bcrypt.compare(password, user?.password || '');
    if (!isMatch) throw new UnauthorizedException('Неверный логин или пароль');

    const { accessToken } = await this.generateToken({ username, password });

    return { accessToken, id: user.id, username: user.username };
  }

  async signToken(registerAuthDto: RegisterDto, expiresIn: string) {
    return await this.jwtService.signAsync(
      {
        username: registerAuthDto.username,
        password: registerAuthDto.password,
      },
      {
        secret: 'test',
        expiresIn,
      },
    );
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ id: number; username: string } | null> {
    const user = await this.userService.findOneByUserName(username);
    if (user && user.password === pass) {
      return {
        id: user.id,
        username: user.username,
      };
    }
    return null;
  }

  async generateToken(registerAuthDto: RegisterDto) {
    const accessToken = await this.signToken(registerAuthDto, '30m');
    const refreshToken = await this.signToken(registerAuthDto, '7d');
    return {
      accessToken,
      refreshToken,
    };
  }
}
