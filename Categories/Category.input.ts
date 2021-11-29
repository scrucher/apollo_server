
import { MaxLength } from "class-validator";
import { ArgsType, Field, ID, Int, ObjectType, } from "type-graphql";


@ArgsType()
@ObjectType()
export class CategoryInput{

    @Field(() => String)
    @MaxLength(30)

    category_name?: string;
}
