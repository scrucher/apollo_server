import { isNumber } from "class-validator";
import { InputType, ArgsType, Field } from "type-graphql";


@ArgsType()
@InputType()
export class LocationInput {

    @Field(() => String)
    type: string;
    
    @Field(() => [Number])
    location: number[];


}