import * as React from 'react';
import ChatTree from '../chat-tree'
import './TreeBar.css';
//---------------------------------------------------------------------------
interface ITreeProps {
    updateCurrentTreeElementCallBack : Function;
    returnTreeJsonToAppCallback: Function;
    updatedJSON : any
}
//---------------------------------------------------------------------------
class TreeBar extends React.Component <ITreeProps, {}>{
//---------------------------------------------------------------------------
    //variables
    private ulRef : React.RefObject<any>;
    private chatTree: any
//---------------------------------------------------------------------------
    //constructor
    constructor(props:any) {
        super(props);
        this.ulRef = React.createRef();
    }
//---------------------------------------------------------------------------
    //life cycle hooks
    componentDidMount() {
        this.chatTree = ChatTree(this.ulRef['current']);
        this.createTree();
    }
//---------------------------------------------------------------------------
    //life cycle hooks
    shouldComponentUpdate(nextProps: ITreeProps) {
        return this.props.updatedJSON !== nextProps.updatedJSON
    }
//---------------------------------------------------------------------------
    //life cycle hooks
    componentDidUpdate() {
        console.log("updatedJSON", this.props.updatedJSON)
        this.loadTree(this.props.updatedJSON)
    }
//---------------------------------------------------------------------------
    public createTree = () => {
        fetch('http://localhost:3001/tree-operations/show_tree', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            }
        })
        .then((response)=>{
                return response.json()
            })
        .then ((myJson) => {
            console.log("myJson = " + myJson)
            this.loadTree(myJson);
            this.chatTree.on('currentChanged', this.onCurrentChanged);
            this.props.returnTreeJsonToAppCallback(myJson);
        });
    };
//---------------------------------------------------------------------------
    public loadTree = (myJson:any) => {

        this.chatTree.clear();
                //read json
        this.chatTree.load([myJson]);
    }
//---------------------------------------------------------------------------
    public onCurrentChanged = (currentElement: any)=> {
        //this.loadTree(this.props.updatedJSON);
        this.props.updateCurrentTreeElementCallBack(currentElement.getAttribute('id'))
    };
//---------------------------------------------------------------------------
    public render() {
        return (
            <div className={"treeBar"}>
                <ul ref={this.ulRef} tabIndex={0}/>
            </div>
        );
    }
}
//---------------------------------------------------------------------------
export default TreeBar;