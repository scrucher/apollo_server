import { Max, Min } from "class-validator";
import { ArgsType, Field} from "type-graphql";


@ArgsType()
export class ProductArgs {
    @Field(type => String)
    _id: string;
}