
import { mongoose } from "@typegoose/typegoose";
import { MaxLength } from "class-validator";
import { ArgsType, Field, ID, InputType, ObjectType, } from "type-graphql";


@ArgsType()
@InputType()
export class SubCategoryInput {

    @Field(() => String)
    @MaxLength(30)

    sub_category_name?: string;

    @Field(() => ID)
    @MaxLength(30)

    category_id?: mongoose.Types.ObjectId;
}

