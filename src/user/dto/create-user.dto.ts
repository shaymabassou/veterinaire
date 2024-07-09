/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  fistname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
