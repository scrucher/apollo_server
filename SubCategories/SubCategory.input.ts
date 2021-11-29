
import { MaxLength } from "class-validator";
import { ArgsType, Field, ID, ObjectType, } from "type-graphql";


@ArgsType()
@ObjectType()
export class SubCategoryInput{

    @Field(() => String)
    @MaxLength(30)

    sub_category_name?: string;

    @Field(() => ID)
    @MaxLength(30)

    category_id?: string;
}
