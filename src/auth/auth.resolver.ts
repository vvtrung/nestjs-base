import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';

import { AuthService } from './auth.service';
import { AuthTokenDTO } from './dto/auth-token.dto';
import { RequestLoginDTO } from './dto/request-login.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthTokenDTO)
  async login(@Args() loginParams: RequestLoginDTO): Promise<AuthTokenDTO> {
    const authToken = await this.authService.login(loginParams);

    return plainToClass(AuthTokenDTO, authToken);
  }
}
