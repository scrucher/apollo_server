import { ArgsType, Field ,ObjectType, } from "type-graphql";


@ArgsType()
@ObjectType()
export class CategoryArgs {

    @Field()
    _id: string;
}