import { IsOptional, MaxLength } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@ArgsType()
@InputType()

export class UserInput{

    @Field(() => String)
    @MaxLength(30)

    username?: string;

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
    country?: string

    @Field(() => String)
    @MaxLength(30)
    region?: string

    @Field(() => String)
    @MaxLength(30)
    city?: string

    @Field(() => String)
    image?: string

    @Field(() => String, { nullable: true })
    type?: string;

    @Field(() => [Number], { nullable: true })
    location?: number[];


    @Field(() => String)
    @MaxLength(30)
    adress?: string
}
