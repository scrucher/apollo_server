import { ArgsType, Field, InputType, ObjectType } from "type-graphql";


@ObjectType()

export class Google {
    @Field(() => String)
    url: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    tokens: string;
}