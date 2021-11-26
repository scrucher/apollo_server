import { ArgsType, Field, InputType, ObjectType } from "type-graphql";


@InputType()
@ArgsType()

export class GoogleInput {
    @Field(() => String)
    code: string;
}