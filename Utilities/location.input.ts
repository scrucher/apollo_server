import { InputType, ArgsType, Field } from "type-graphql";


@ArgsType()
@InputType()
export class LocationInput {

    @Field(() => String)
    type: string;
    
    @Field(() => [Number])
    coordinates: number[];


}