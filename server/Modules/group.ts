import {User} from './user';
export {Group};

// ========================================================
class Group {
    private groupID: number;
    private type: string;
    private name: string;
    private items: any ;
    private users: User[];
    private groups: Group[];


    constructor(groupID:number, name:string, users:User[], groups:Group[]) {
        this.groupID = groupID;
        this.type = "group";
        this.name = name;
        this.items = [];
        this.users = users;
        this.groups = groups;
    }

// Getters and setters
// ========================================================
    public getID():number {
        return this.groupID;
    }
// ========================================================
    public getGroupName():string {
        return this.name;
    }
// ========================================================
    public getUsers():User[] {
        return this.users;
    }
// ========================================================
    public getGroups():Group[] {
        return this.groups;
    }
// ========================================================
    public setGroups(groups:Group[]) {
        this.groups = groups;
        this.items = groups;
    }
// ========================================================
    public setUsers(users:User[]) {
        this.users = users;
        this.items = users;
    }

//  Add/Remove functionality
// ========================================================
    public addUser(userObject:User):boolean {
        //  This ensures all 'Group' instances contain either user or group children
        if (this.groups.length !== 0) {
            return false;
        }
        this.users.push(userObject);
        this.items.push(userObject);
        return true;
    }
// ========================================================
    public removeUser(userObject:User):User {
        for (let i:number=0; i < this.users.length; i++) {
            if (this.users[i] === userObject) {
                this.users.splice(i, 1);
                this.items.splice(i, 1);
                // if was able to remove user
                return null;
            }
        }
        //  if was unable to remove user
        return userObject;
    }
// ========================================================
    public addGroup(groupObject:Group):boolean {
        //  This ensures all 'Group' instances contain either user or group children
        if (this.users.length !== 0) {
            return false;
        }
        this.groups.push(groupObject);
        this.items.push(groupObject);
        return true;
    }
// ========================================================
    public removeGroup(groupObject:Group) {
        for (let i:number=0; i < this.groups.length; i++) {
            if (this.groups[i] === groupObject) {
                this.groups.splice(i, 1);
                this.items.splice(i, 1);
                break;
            }
        }
    }
}
