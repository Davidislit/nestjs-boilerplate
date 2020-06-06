import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ItemInput {
    @Field()
    readonly name: string;
    @Field()
    readonly amount: number;
    @Field()
    readonly category: string;
}