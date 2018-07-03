import * as React from 'react';
import './InputBar.css';

interface IInputProps {
    addNewMessageInputCallBack: Function;
}

class InputBar extends React.Component <IInputProps,{}>{

    private inputRef : React.RefObject<any>;

    constructor(props:any) {
        super(props);
        this.inputRef = React.createRef();
    }

    handleAddMsg = () => {
        const message = this.inputRef.current.value;
        const currentTimeAndDate = this.getTimeAndDate();
        this.props.addNewMessageInputCallBack(message, currentTimeAndDate);
    };

    getTimeAndDate = () => {
        const today = new Date();
        const formattedTime = today.toLocaleTimeString();
        return (formattedTime + " " + today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
    }

    public render() {
        return (
            <div className={"inputBar"}>
                <input ref={this.inputRef} className="input" type="text" name="input" autoComplete="off"/>
                <button onClick={this.handleAddMsg}>Send</button>
            </div>
        );
    }
}

export default InputBar;
