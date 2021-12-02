import { ArgsType, Field} from "type-graphql";


@ArgsType()
export class OrderArgs {
    @Field(type => String)
    _id: string;
}