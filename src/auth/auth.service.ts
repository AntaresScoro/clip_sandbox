import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { toUserResponseDto } from '../users/mapper/user.mapper';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(userToCreate: RegisterDto): Promise<UserResponseDto> {
    const user = { passwordHash: userToCreate.password, ...userToCreate };
    const userExist = await this.userService.findByEmail(user.email);
    if (userExist) throw new ConflictException('Email already in use !');
    return toUserResponseDto(await this.userService.create(user));
  }
}
