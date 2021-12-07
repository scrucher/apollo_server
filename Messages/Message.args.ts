import { ArgsType, Field} from "type-graphql";


@ArgsType()
export class MessageArgs {
    @Field(type => String)
    _id: string;
}