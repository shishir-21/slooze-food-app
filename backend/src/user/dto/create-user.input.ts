import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../user.model';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  @Field()
  country: string;

  @Field({ nullable: true })
  name?: string;
}
