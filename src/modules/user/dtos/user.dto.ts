import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  @IsString()
  @Length(7, 20)
  fullName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@yopmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'user@12345',
  })
  @IsString()
  @Length(8, 255)
  password: string;
}
