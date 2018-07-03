import * as React from 'react';
import './Bubble.css';

export interface IbubbleTextProps {
    bubbleText: string;
    key: number;
}

export class Bubble extends React.Component <IbubbleTextProps,{}>{
    public render() {
        return (
            <span className={"speech-bubble"}>{this.props.bubbleText}</span>
        );
    }
}