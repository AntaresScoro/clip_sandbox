import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateClipDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  url: string;

  @IsNumber()
  duration: number;

  @IsString()
  streamerName: string;
}