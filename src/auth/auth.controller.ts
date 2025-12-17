import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() registerInfos: RegisterDto): Promise<object> {
    // const user = await this.authService.register(registerInfos);
    return await this.authService.register(registerInfos);
    // const { passwordHash, ...userCreated } = user;
    // return userCreated;
  }
}
