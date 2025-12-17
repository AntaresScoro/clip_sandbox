import { UserDocument } from '../schema/user.schema';
import { UserResponseDto } from '../dto/user-response.dto';

export function toUserResponseDto(user: UserDocument): UserResponseDto {
  return {
    id: user._id.toString(),
    email: user.email,
    displayName: user.displayName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
