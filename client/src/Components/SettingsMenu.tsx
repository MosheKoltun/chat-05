import * as React from 'react';
import './SettingsMenu.css'
//---------------------------------------------------------------------------
interface ISettingsMenuProps {
    currentElementInTree: string;
    returnTreeJsonToAppCallback: Function;
}
//---------------------------------------------------------------------------
export class SettingsMenu extends React.Component <ISettingsMenuProps, {}> {
//---------------------------------------------------------------------------
    state = {
        newGroupName: "",
        newUserName: "",
    };
//---------------------------------------------------------------------------
    constructor(props:any) {
        super(props);
    }
//---------------------------------------------------------------------------
    handleCreateGroupClick = () => {
        fetch('http://localhost:3001/tree-operations/create-group', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                parentGroupID: this.props.currentElementInTree,
                childGroupName: this.state.newGroupName

            })
        })
        .then((response)=>{
            return response.json()
        })
        .then ((myJson) => {
            this.props.returnTreeJsonToAppCallback(myJson);
        })
        .catch ((err) => {
            console.log("error", err);
        });
    };
//---------------------------------------------------------------------------
    handleRemoveGroupClick = () => {
        fetch('http://localhost:3001/tree-operations/remove-group', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                parentGroupID: this.props.currentElementInTree,
            })
        })
            .then((response)=>{
                return response.json()
            })
            .then ((myJson) => {
                this.props.returnTreeJsonToAppCallback(myJson);
            })
            .catch ((err) => {
                console.log("error", err);
            });
    };
//---------------------------------------------------------------------------
    handleAddUserClick = () => {
        fetch('http://localhost:3001/tree-operations/add-user', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                parentGroupID: this.props.currentElementInTree,
                childUserName: this.state.newUserName
            })
        })
            .then((response)=>{
                return response.json()
            })
            .then ((myJson) => {
                console.log("myJson",myJson);
                this.props.returnTreeJsonToAppCallback(myJson);
            })
            .catch ((err) => {
                console.log("error", err);
            });
    };
//---------------------------------------------------------------------------
    HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [event.target.name]: event.target.value });
    };
//---------------------------------------------------------------------------
    public render() {
        return (
            <div className={"settingsMenu"}>
                <form>
                    <div className={"groupsManagement"}>
                        <button type="button" onClick={this.handleCreateGroupClick}>Add Group</button>
                        <input type="text" placeholder="New Group" name="newGroupName" onChange={this.HandleInputChange} required/>
                        <button type="button" onClick={this.handleRemoveGroupClick}>Remove Group</button>
                    </div>
                    <div className={"usersManagement"}>
                        <button type="button" onClick={this.handleAddUserClick}>Add User</button>
                        <input type="text" placeholder="New User" name="newUserName" onChange={this.HandleInputChange} required/>
                        <button type="button">Remove User</button>
                        <button type="button">Edit User</button>
                        <input type="text" placeholder="New Age" name="age" required/>
                        <input type="text" placeholder="New Password" name="password" required/>
                    </div>
                </form>
            </div>
        );
    }
}