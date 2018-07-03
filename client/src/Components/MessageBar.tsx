import * as React from 'react';
import {IbubbleTextProps, Bubble} from "./Bubble";
import './MessageBar.css';

export interface IMessageProps {
    messagesDB: any[];
}

export class MessageBar extends React.Component<IMessageProps,{}> {

    generateMessages = () => {
        console.log(this.props.messagesDB);
        if (!this.props.messagesDB) {
            return null;
        }
        let result: any = this.props.messagesDB.map((msg: any, idx: number) => {
            return <Bubble key={idx} bubbleText={msg.message} />;
        });
        console.log(result);
        return result;
    };
    
    public render() {
        return (
            <div className={"messageBar"}>
                {this.generateMessages()}
            </div>
        );
    }
}
