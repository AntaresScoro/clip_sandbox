import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { toUserResponseDto } from '../users/mapper/user.mapper';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(userToCreate: RegisterDto): Promise<AuthResponseDto> {
    const email = userToCreate.email.trim().toLowerCase();
    const userExist = await this.userService.findByEmail(email);
    if (userExist) throw new ConflictException('Email already in use !');
    const raw = this.configService.get<string>('BCRYPT_SALT_ROUNDS');
    const rounds = Number(raw);
    const saltRounds = Number.isInteger(rounds) && rounds >= 8 ? rounds : 10;
    const hash = await bcrypt.hash(userToCreate.password, saltRounds);
    const user = {
      passwordHash: hash,
      email: email,
      displayName: userToCreate.displayName,
    };
    const userCreated = await this.userService.create(user);
    const payload = { sub: userCreated._id, email: userCreated.email };
    const token = await this.jwtService.signAsync(payload);
    return { accessToken: token, user: toUserResponseDto(userCreated) };
  }

  async login(loginInfos: LoginDto): Promise<AuthResponseDto> {
    const email = loginInfos.email.trim().toLowerCase();
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Unauthorized access !');
    const isMatch = await bcrypt.compare(
      loginInfos.password,
      user.passwordHash,
    );
    if (!isMatch) throw new UnauthorizedException('Unauthorized access !');
    const payload = { sub: user._id, email: email };
    const token = await this.jwtService.signAsync(payload);
    return { accessToken: token, user: toUserResponseDto(user) };
  }
}
