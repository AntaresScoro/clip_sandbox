export class UserResponseDto {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
