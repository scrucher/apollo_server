import { MaxLength } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@ArgsType()
@InputType()

export class DriverLoginInput {
    @Field(() => String)
    @MaxLength(30)
    email?: string;

    @Field(() => String)
    @MaxLength(30)
    password?: string;
}