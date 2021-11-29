import { ArgsType, Field ,ObjectType, } from "type-graphql";


@ArgsType()
@ObjectType()
export class SubCategoryArgs {

    @Field()
    _id: string;
}