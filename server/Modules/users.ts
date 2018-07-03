import {User} from './user';

// ========================================================
//  Array of 'User' Objects
const userObjectList : User[] = [];
const IDsAndUsersDictionary: {[key: number]: User} = {};
// ========================================================
export {
    doesUserExist,
    getListOfAllUserObjects,
    getUserObjectAccordingToID,
    createNewUser,
    removeUser,
    updateUsername,
    updateUserAge,
};
// =========================================================
function getListOfAllUserObjects() {
    return userObjectList;
}
// =========================================================
function doesUserExist(username : string):User {
    for(let i:number=0; i < userObjectList.length; i++) {
        const userObject:User = userObjectList[i];
        if (userObject.getUserName() === username) {
            return userObject;
        }
    }
    return null;
}
// =========================================================
function generateUserID():number {
    for (let ID:number=0; ID < Number.MAX_VALUE; ID++) {
        if (!IDsAndUsersDictionary[ID]) {
            return ID;
        }
    }
    //  new ID numbers are not available(reached the maximum of the ES5 'Number')
    return -1;
}
// =========================================================
function getUserObjectAccordingToID(userID:number):User {
    if (!IDsAndUsersDictionary[userID]) {
        return null;
    }
    //  if ID exist
    //  return User Object
    return IDsAndUsersDictionary[userID];
}
// ========================================================
function createNewUser(username:string, password:string, age:number):User {
    //  generate new ID
    const userID:number = generateUserID();
    //  if reached maximum of ES5 'Number'
    if (userID === -1) {
        return null;
    }
    //  create new user
    const newUser:User = new User(userID, username, password, age);
    //  update lists
    userObjectList.push(newUser);
    IDsAndUsersDictionary[userID] = newUser;

    return newUser;
}
// =========================================================
function removeUser(username:string):boolean {
    for(let i:number=0; i<userObjectList.length; i++) {
        const userObject:User = userObjectList[i];
        if (userObject.getUserName() === username){
            //  Disconnect userObjectList from all its variables
                //  so that garbage collector could handle it
            //  Delete an array member
            userObjectList.splice(i,1);
            //  remove from ID list
            delete IDsAndUsersDictionary[userObject.getID()];
            return true;
        }
    }
    return false;
}
// =========================================================
function updateUsername(oldUsername:string, newUsername:string):boolean {
    for(let i:number=0; i<userObjectList.length; i++) {
        if (userObjectList[i].getUserName() === oldUsername){
            userObjectList[i].setUsername(newUsername);
            return true;
        }
    }
    return false;
}
// =========================================================
function updateUserAge(username:string, newUserAge:number):boolean {
    for(let i:number=0; i<userObjectList.length; i++) {
        if (userObjectList[i].getUserName() === username){
            userObjectList[i].setAge(newUserAge);
            return true;
        }
    }
    return false;
}


