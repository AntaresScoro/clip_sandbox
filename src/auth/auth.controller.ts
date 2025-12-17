import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerInfos: RegisterDto): Promise<AuthResponseDto> {
    return await this.authService.register(registerInfos);
  }

  @Post('login')
  async login(@Body() loginInfos: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.login(loginInfos);
  }
}
