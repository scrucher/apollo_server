import { Service } from "typedi";
import * as crypto from "crypto";
import { v4 } from "uuid";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { MessageModel, Message } from "./Message.model";
import { MessageInput } from "./Message.input";
import { MessageArgs } from "./Message.args";
import { Context } from "apollo-server-core";

@Service('Message_Service')
export class MessageService {

    async CreateMessage(messageInput: MessageInput, context: Context): Promise<Message> {
        console.log(context)
        //@ts-ignore
        const user = context.user._id;
        const Message = new MessageModel();
        //@ts-ignore
        Message.message_body = messageInput.message_body;
        Message.receiver = messageInput.receiver;
        Message.sender = user

        let saved;
        try {
            saved = await MessageModel.create(Message)
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Cannot Save Message");
        }
        console.log(saved);
        return saved;
    }


    async GetAllMessages():Promise <Message[]> {
        let found;
        try {
            found = await MessageModel.find()
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }

        return found;
    }

    async GetMessageById(_id: string): Promise<Message> {
        const found = await MessageModel.findById(_id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return found;

    }

    async DeleteMessage(MessageArgs: MessageArgs, context : Context): Promise<void | any> {
        const _id = MessageArgs;
        let deleted;
        try {
            deleted = await MessageModel.deleteOne(_id)
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        }
        if (deleted.deletedCount === 0) {
            return ("Product Deleted Successfully")
        }
    }

    async UpdateMessage(messageInput: MessageInput, MessageArgs: MessageArgs): Promise<void> {
        const { _id } = MessageArgs
        const update = messageInput;
        let updated: any;
        try {
            //@ts-ignore
            updated = await MessageModel.update({_id: _id}, update, {
                upsert: true,
            });
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        }

        return updated;

    }

}
