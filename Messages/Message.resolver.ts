import { Context } from "apollo-server-core";
import { Ctx } from "routing-controllers";
import { Args, Mutation, Query, Resolver} from "type-graphql";
import { ContextParamMetadata } from "type-graphql/dist/metadata/definitions";
import { Inject, Service } from "typedi";
import { MessageArgs } from "./Message.args";
import { MessageInput } from "./Message.input";
import { Message } from "./Message.model";
import { MessageService } from "./Message.service";



@Service()
@Resolver(of => Message)

export class MessageResolver {

    constructor(
        @Inject('Message_Service') private messageService: MessageService,
    ) { }

    @Query(returns => [Message])
    async getMessages(): Promise<Message[]> {
        const data = await this.messageService.GetAllMessages()
        return data;
    }
    @Query(returns => Message)
    async getMessageById(id : string):Promise<Message>{
      return await this.messageService.GetMessageById(id);
    }



    @Mutation(returns => Message)
    //@ts-ignore
    async CreateMessage(@Args("storeInput") storeInput: MessageInput, context: Context) {
        return await this.messageService.CreateMessage(storeInput, context)
    }

    @Mutation(returns => Message, { nullable: true })
    async UpdateMessage(@Args({ validate: false }) orderInput: MessageInput,
        @Args() orderArgs: MessageArgs) {
        return await this.messageService.UpdateMessage(orderInput, orderArgs);
    }

    @Mutation(returns => Message, { nullable: true })
    async DeleteMessage(@Args({ validate: false }) orderArgs: MessageArgs,
        @Ctx() context: Context) {
        console.log(context)
        return await this.messageService.DeleteMessage(orderArgs, context);
    }


}
