import { MaxLength } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";
import { StoreArgs } from "./store.args";

@ArgsType()
@InputType()

export class StoreInput{

    @Field(() => String)
    @MaxLength(30)

    store_name?: string;

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
}