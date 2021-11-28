import { IsOptional, MaxLength } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@ArgsType()
@InputType()

export class AdminInput{

    @Field(() => String)
    @MaxLength(30)

    user_name?: string;

    @Field(() => String)
    @MaxLength(30)
    email?: string;

    @Field(() => String)
    @MaxLength(30)
    password?: string;

    @Field(() => String)
    @MaxLength(30)
    phone?: string

    @Field(() => String)
    @MaxLength(30)
    role?: string

    // @Field(() => Boolean|| null)
    // @MaxLength(30)
    // @IsOptional()
    // IsActive?: boolean
}
