import { IsNotEmpty, IsString, Length } from '@nestjs/class-validator';

export class LoginUsuarioDto {
  @IsString()
  @IsNotEmpty()
  login!: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  password!: string;
}

export class Token {
  access_token: string;
}

export class ResAccesToken {
  agr: string;
  access_token: string;
}
