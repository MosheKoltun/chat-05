import {Group} from './group';
// ========================================================
//  Array of 'Group' Objects
const listOfAllGroupObjects : Group[] = [];
//  this list is used by 'generateGroupID' function to check for available IDs
const IDsAndGroupObjectsDictionary : {[key: number]: Group} = {};
// ========================================================
export {
    getListOfAllGroupObjects,
    getGroupObjectAccordingToID,
    createNewGroup,
    cloneSubTreeRecursion,
    removeGroupRecursion,
    removeGroupNotInTree,
};
// =========================================================
function getListOfAllGroupObjects():Group[] {
    return listOfAllGroupObjects;
}
// =========================================================
function generateGroupID():number {
    for (let ID:number=0; ID < Number.MAX_VALUE; ID++) {
        if (!IDsAndGroupObjectsDictionary[ID]) {
            return ID;
        }
    }
    //  new ID numbers are not available(reached the maximum of the ES5 'Number')
    return -1;
}
// =========================================================
function getGroupObjectAccordingToID(GroupID:number):Group {
    const groupObject:Group = IDsAndGroupObjectsDictionary[GroupID];
    if (!groupObject) {
        return null;
    }
    //  if ID exist
    return groupObject;
}
// ========================================================
function createNewGroup(groupName:string):Group {
    // don't allow to create groups without a group name
    if (groupName==="") {
        return null;
    }
    //  generate group ID
    const groupID:number = generateGroupID();
    if (groupID === -1) {
        return null;
    }
    //  create new group
    const newGroup:Group = new Group(groupID, groupName, [], []);
    //  push new group object to list
    listOfAllGroupObjects.push(newGroup);
    //  add new group object ID to dictionary
    IDsAndGroupObjectsDictionary[groupID] = newGroup;

    return newGroup;
}
// =========================================================
//  removeGroupNotInTree
// =========================================================
function removeGroupNotInTree(groupIDToRemove:number):boolean {
    // get group reference according to group ID
    const groupObjectToRemove:Group = IDsAndGroupObjectsDictionary[groupIDToRemove];
    // check if group exist
    if (groupObjectToRemove === null){
        return false;
    }
    for(let i:number=0; i<listOfAllGroupObjects.length; i++) {
        //  verify 'groupObjectToRemove' is in list
        if (listOfAllGroupObjects[i] === groupObjectToRemove){
            //  Disconnect groupObject from all its variables
            //  so garbage collector could handle it
            groupObjectToRemove.setGroups([]);
            groupObjectToRemove.setUsers([]);
            //  Delete an array member from list
            listOfAllGroupObjects.splice(i,1);
            //  remove group Object from ID list used by generate ID function
            delete IDsAndGroupObjectsDictionary[groupObjectToRemove.getID()];
            return true;
        }
    }
    return false;
}
// =========================================================
//  cloneSubTreeRecursion
// =========================================================
function cloneSubTreeRecursion(root:Group):Group {
    let copyNode:Group = null;
    if (root !== null) {
        copyNode = createNewGroup(root.getGroupName());

        const rootChildren:Group[] = root.getGroups();
        for (const child of rootChildren) {
            copyNode.addGroup(cloneSubTreeRecursion(child));
            // copyNode.addUser(rootChildren[i].getUsers());

            // ????
            // need to check if it works
            copyNode.setUsers(child.getUsers());
        }
    }
    return copyNode;
}
// =========================================================
//  removeGroupRecursion
// =========================================================
// this function should only be called from 'removeGroupHierarchy' in 'tree.ts'
function removeGroupRecursion(groupToRemoveID:number):Group {
    //  get reference of group to remove from 'listOfAllGroupObjects' according to ID
    let groupToRemove:Group = null;
    for(let i:number=0; i<listOfAllGroupObjects.length; i++) {
        if (listOfAllGroupObjects[i].getID() === groupToRemoveID) {
            //  override null reference
            groupToRemove = listOfAllGroupObjects[i];
            //  Delete an array member from list
            listOfAllGroupObjects.splice(i,1);
            //  remove group Object from ID list used by generate ID function
            delete IDsAndGroupObjectsDictionary[groupToRemove.getID()];
            break;
        }
    }
    // check if group exists
    if (groupToRemove === null) {
        return null;
    }
    const children:Group[] = groupToRemove.getGroups();
    for(const child of children) {
        removeGroupRecursion(child.getID());
        //  Disconnect groupObject from all its variables
        //  so garbage collector could handle it
        child.setGroups([]);
        child.setUsers([]);
    }
    groupToRemove.setGroups([]);
    groupToRemove.setUsers([]);
    return groupToRemove;
}