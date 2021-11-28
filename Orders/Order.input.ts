
import { MaxLength } from "class-validator";
import { ArgsType, Field, ID, Int, ObjectType, } from "type-graphql";


@ArgsType()
@ObjectType()
export class OrderInput{

    @Field(() => String)
    @MaxLength(30)

    product_name?: string;

    @Field(() => String)
    @MaxLength(30)
    description?: string;

    @Field(() => String)
    @MaxLength(30)
    details?: string;

    @Field(() => String)
    @MaxLength(30)
    images?: string;

    @Field(() => String)
    @MaxLength(30)
    price?: string;


}
