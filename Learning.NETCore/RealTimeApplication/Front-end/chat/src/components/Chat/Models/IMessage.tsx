import MessageDestination from "./MessageDestination";

export interface IMessage {
    username: string,
    message: string,
    destination : MessageDestination
}