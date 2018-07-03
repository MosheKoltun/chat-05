import {Group} from './group';
import * as groupFuncs from './groups';
import {User} from './user';
import * as userFuncs from './users';



//  Tree Head
const head:Group = groupFuncs.createNewGroup("General");

//  global variable to temporary hold 'path' of group search result in tree
const arrayOfGroupSearchResults:Group[] = [];

//  global variable to temporary hold 'group parents' of user (search result in tree)
const arrayOfUserGroupParentsSearchResults:Group[] = [];

// =========================================================
export {
    removeGroupHierarchy,
    addUserToGroup,
    removeUserFromGroup,
    addGroupToGroup,
    flattenGroup,
    searchGroupInTreeReturnPath,
    searchUserInTreeReturnParents,
    printTree,
    getTreeJSON,
    init,
};
// =========================================================
//  addUserToGroup
// =========================================================
function init() {
    //does nothing
    //but will invoke :
    //const head:Group = groupFuncs.createNewGroup("General");
}
// =========================================================
//  addUserToGroup
// =========================================================
function addUserToGroup(groupID:number, userID:number):boolean{
    //  check if parent group exists
    const groupObject:Group = groupFuncs.getGroupObjectAccordingToID(groupID);
    if (groupObject === null) {
        return false;
    }
    //  check if user exists
    const userObject:User = userFuncs.getUserObjectAccordingToID(userID);
    if (userObject === null) {
        return false;
    }
    // Don't allow adding users to head (only allow adding groups to head)
    if (groupObject === head) {
        return false;
    }
    //  Check that user is not already a child of that group
    const listOfUsersInGroup:User[] = groupObject.getUsers();
    for (const user of listOfUsersInGroup) {
        if (user === userObject) {
            return false;
        }
    }
    // Add user
    const res:boolean = groupObject.addUser(userObject);
    return res;
}
// =========================================================
//  removeUserFromGroup
// =========================================================
function removeUserFromGroup(groupID:number, userID:number):Group{
    //  check if parent group exists
    const groupObject:Group = groupFuncs.getGroupObjectAccordingToID(groupID);
    if (groupObject === null) {
        return null;
    }
    //  check if user exists
    const userObject:User = userFuncs.getUserObjectAccordingToID(userID);
    if (userObject === null) {
        return null;
    }
    // remove user
    const childrenOfParentGroupObject:User[] = groupObject.getUsers();
    for (const child of childrenOfParentGroupObject) {
        if (child === userObject) {
            //  notice Group.removeUser return null if succeeded
            const res:User = groupObject.removeUser(userObject);
            if (res === null) {
                return groupObject;
            } else {
                return null;
            }
        }
    }
    return null;
}
// =========================================================
//  addGroupToGroup
// =========================================================
function addGroupToGroup(parentGroupID:number, childGroupID:number):Group {
    //  check if parent group exists
    const parentGroupObject:Group = groupFuncs.getGroupObjectAccordingToID(parentGroupID);
    if (parentGroupObject === null) {
        return null;
    }
    //  check if child group exists
    let childGroupObject:Group = groupFuncs.getGroupObjectAccordingToID(childGroupID);
    if (childGroupObject === null) {
        return null;
    }
    //  This line protects from making the tree head a child of another group
    if (childGroupObject === head) {
        return null;
    }
    // Handle cases when group object already exist in tree
    if (searchGroupRecursion(head, childGroupObject) !== null) {
        // clone entire subtree
        // and override object reference with clone reference
        childGroupObject = groupFuncs.cloneSubTreeRecursion(childGroupObject);
    }
    // Enable adding a group inside a group of users
    const usersOfParentGroup:User[] = parentGroupObject.getUsers();
    if (usersOfParentGroup.length !== 0) {
        parentGroupObject.setUsers([]);
        const containerForUsers:Group = groupFuncs.createNewGroup("others");
        containerForUsers.setUsers(usersOfParentGroup);
        parentGroupObject.addGroup(containerForUsers);
    }
    // Add group
    const res:boolean = parentGroupObject.addGroup(childGroupObject);
    if (!res) {
        return null;
    }
    return parentGroupObject;
    // return childGroupObject;
}
// =========================================================
//  removeGroupHierarchy
// =========================================================
// remove all groups in sub tree to avoid memory leakage
function removeGroupHierarchy (groupToRemoveID:number):boolean {
    //  get group Object and check if it exists
    const groupToRemove:Group = groupFuncs.getGroupObjectAccordingToID(groupToRemoveID);
    if (groupToRemove === null) {
        return false;
    }
    //  find group parent
    const groupParent:Group = findGroupParent(groupToRemove);
    if (groupParent === null) {
        return false;
    }
    const res:Group = groupFuncs.removeGroupRecursion(groupToRemoveID);

    //made comment to bypass bug
    // if (res === null) {
    //     return false;
    // }

    //  remove reference of group inside parent
    groupParent.removeGroup(groupToRemove);
    return true;
}
// =========================================================
//  findGroupParent
// =========================================================
function findGroupParent(childGroup:Group):Group {
    //  search for group parent in tree
    const path:Group[] = searchGroupInTreeReturnPath(childGroup.getID());
    if (path.length === 0) {
        return null;
    }
    //  first element of the returned array is the group parent
    const groupParent:Group = path[0];
    return groupParent;
}
// =========================================================
//  flattenGroup
// =========================================================
function flattenGroup(groupIDToFlatten:number):Group {
    //  get group Object and check if it exists
    const groupToFlatten:Group = groupFuncs.getGroupObjectAccordingToID(groupIDToFlatten);
    if (groupToFlatten === null) {
        return null;
    }
    //  get group parent and check if exists
    const groupParent:Group = findGroupParent(groupToFlatten);
    if (groupParent === null) {
        return null;
    }
    //  handle case when groupToFlatten is a users group
    const childrenUsers:User[] = groupToFlatten.getUsers();
    if (childrenUsers.length !== 0) {
        //  don't allow flattening users group if groupToFlatten have siblings
        if (groupParent.getGroups().length !== 1) {
            return null;
        }
        groupParent.removeGroup(groupToFlatten);
        for (const child of childrenUsers) {
            groupParent.addUser(child);
        }
    }
    //  handle case when groupToFlatten is a groups group
    const childrenGroups:Group[] = groupToFlatten.getGroups();
    if (childrenGroups.length !== 0) {
        groupParent.removeGroup(groupToFlatten);
        for (const child of childrenGroups) {
            groupParent.addGroup(child);
        }
    }
    //  remove group to avoid memory leakage
    groupFuncs.removeGroupNotInTree(groupIDToFlatten);
    return groupParent;
}
// =========================================================
//  searchUserInTreeReturnParents
// =========================================================
//  this function unlike searchGroupInTreeReturnPath will return an array
//  of groups parents of the user instead of path
function searchUserInTreeReturnParents(userIDToSearch:number):Group[] {
    //  get user Object and check if it exists
    const userToSearch:User = userFuncs.getUserObjectAccordingToID(userIDToSearch);
    if (userToSearch === null) {
        return [];
    }
    // clearing global variable
    arrayOfUserGroupParentsSearchResults.length = 0;
    // calling the recursive search function
    searchUserRecursion(head, userToSearch);
    //  return path as array with group objects
    return arrayOfUserGroupParentsSearchResults;
}
// ---------------------------------------------------------
function searchUserRecursion(root:Group, userToSearch:User):Group {
    const users:User[] = root.getUsers();
    for (const user of users) {
        if (user === userToSearch) {
            // found
            // push to array new groups parents of the user
            arrayOfUserGroupParentsSearchResults.push(root);
            // do not return after found
            // continue to search for more group parents
        }
    }
    const childrenOfRoot:Group[] = root.getGroups();
    for (const child of childrenOfRoot) {
        const groupObject:Group = child;
        const res:Group = searchUserRecursion(groupObject, userToSearch);
        if (res !== null) {
            return groupObject;
        }
    }
    return null;
}
// =========================================================
//  searchGroupInTreeReturnPath
// =========================================================
function searchGroupInTreeReturnPath(groupIDToSearch:number):Group[] {
    //  get group Object and check if it exists
    const groupToSearch:Group = groupFuncs.getGroupObjectAccordingToID(groupIDToSearch);
    if (groupToSearch === null) {
        return [];
    }
    // clearing global variable
    arrayOfGroupSearchResults.length = 0;
    // calling the recursive search function
    searchGroupRecursion(head, groupToSearch);
    //  return path as array with group objects
    return arrayOfGroupSearchResults;
}
// ---------------------------------------------------------
function searchGroupRecursion(root:Group, groupToSearch:Group):Group {
    if (root === groupToSearch) {
        // console.log("found");
        return root;
    } else {
        const childrenOfRoot:Group[] = root.getGroups();
        for (const child of childrenOfRoot) {
            const groupObject:Group = child;
            const res:Group = searchGroupRecursion(groupObject, groupToSearch);
            if (res !== null) {
                arrayOfGroupSearchResults.push(root);
                return groupObject;
            }
        }
        return null;
    }
}
// =========================================================
//  printTree
// =========================================================
function printTree() {
    const str:string = "";
    let numberOfChildren:number = head.getGroups().length;
    if (numberOfChildren === 0) {
        numberOfChildren = head.getUsers().length;
    }
    console.info("|---->\\ " + head.getGroupName() +
        "(GroupID " + head.getID() + ") " + numberOfChildren);
    printTreeRecursion(head, str);
}
// ---------------------------------------------------------
function printTreeRecursion(root:Group, str:string) {
    str += "      ";
    if (root !== null) {
        const rootGroupsChildren:Group[] = root.getGroups();
        if (rootGroupsChildren.length !== 0) {
            for (const group of  rootGroupsChildren) {
                console.log(str + "|---->\\ " + group.getGroupName() +
                    "(GroupID " + group.getID() + ") " + rootGroupsChildren.length);
                printTreeRecursion(group, str);
            }
        }
        else {
            const rootUsersChildren:User[] = root.getUsers();
            if (rootUsersChildren.length !== 0) {
                for (const user of  rootUsersChildren) {
                    console.log(str + "^----> " + user.getUserName() +
                        "(UserID " + user.getID() + ") " + rootUsersChildren.length);
                }
            }
        }
    }
}
// =========================================================
//  getTreeJSON
// =========================================================
function getTreeJSON() {
    return JSON.stringify(head);
}



// const myTree:any[] = [];
// const myTemporaryGroupObject = {};
// const myTemporaryUserObject = {};
//
//
// function getTreeJSON() {
//
//
//     //const str:string = "";
//     // let numberOfChildren: number = head.getGroups().length;
//     // if (numberOfChildren === 0) {
//     //     numberOfChildren = head.getUsers().length;
//     // }
//     //     "type": "group",
//     //     "name": "General",
//     //     "id": "0",
//     //     "items": []
//
//     myTemporaryGroupObject["type"] = "group";
//     myTemporaryGroupObject["name"] = head.getGroupName();
//     myTemporaryGroupObject["id"] = head.getID();
//     myTemporaryGroupObject["items"] = [];
//     myTree.push(myTemporaryGroupObject);
//     // console.info("|---->\\ " + head.getGroupName() +
//     //     "(GroupID " + head.getID() + ") " + numberOfChildren);
//     getTreeJSONRecursion(head);
//
// }
// // ---------------------------------------------------------
// function getTreeJSONRecursion(root:Group) {
//     //str += "      ";
//     if (root !== null) {
//         const rootGroupsChildren:Group[] = root.getGroups();
//         if (rootGroupsChildren.length !== 0) {
//             for (let i=0; i<rootGroupsChildren.length; i++) {
//                 // console.log(str + "|---->\\ " + group.getGroupName() +
//                 //     "(GroupID " + group.getID() + ") " + rootGroupsChildren.length);
//                 myTemporaryGroupObject["type"] = "group";
//                 myTemporaryGroupObject["name"] = rootGroupsChildren[i].getGroupName();
//                 myTemporaryGroupObject["id"] = rootGroupsChildren[i].getID();
//                 myTemporaryGroupObject["items"] =  [];
//                 rootGroupsChildren[i]["items"].push(myTemporaryGroupObject);
//
//                 getTreeJSONRecursion(rootGroupsChildren[i]);
//             }
//         }
//         else {
//             const rootUsersChildren:User[] = root.getUsers();
//             if (rootUsersChildren.length !== 0) {
//                 for (let j=0; j<rootUsersChildren.length; j++) {
//                     // console.log(str + "^----> " + user.getUserName() +
//                     //     "(UserID " + user.getID() + ") " + rootUsersChildren.length);
//                     myTemporaryUserObject["type"] = "user";
//                     myTemporaryUserObject["name"] = rootUsersChildren[j].getUserName();
//                     myTemporaryUserObject["id"] = rootUsersChildren[j].getID();
//                     rootUsersChildren[j]["items"].push(myTemporaryUserObject)
//
//                 }
//             }
//         }
//     }
// }