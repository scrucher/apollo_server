import { InputType, ArgsType, Field } from "type-graphql";


@ArgsType()
@InputType()
export class LocationInput {

    @Field(() => [Number])
    coordinates: number[];

}