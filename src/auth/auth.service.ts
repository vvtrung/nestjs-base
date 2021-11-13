import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { RequestLoginDTO } from './dto/request-login.dto';
import { UserService } from 'users/user.service';
import { AuthTokenDTO } from './dto/auth-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(requestLoginDTO: RequestLoginDTO): Promise<AuthTokenDTO> {
    const { email, password } = requestLoginDTO;
    const user = await this.userService.findByEmail(email);

    if (!(await user?.validatePassword(password))) {
      throw new BadRequestException('Wrong email or password');
    }

    const payload = {
      userId: user.id,
    };

    return plainToClass(AuthTokenDTO, {
      accessToken: this.jwtService.sign(payload),
    });
  }
}
