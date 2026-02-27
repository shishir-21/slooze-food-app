import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // Yeh dummy query schema generation error ko fix karegi
  @Query(() => String)
  sayHello(): string {
    return 'Hello Slooze!';
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const result = await this.authService.login(email, password);
    return result.access_token;
  }
}