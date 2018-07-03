export {User};

// ========================================================
class User {
    private userID: number;
    private type: string;
    private name: string;
    private username: string;
    private password: string;
    private age: number;

    constructor(userID:number, username:string, password:string, age:number) {
        this.userID = userID;
        this.type = "user"
        this.name = this.username;
        this.username = username;
        this.password = password;
        this.age = age;
    }
// ========================================================
    public getID():number {
        return this.userID;
    }
// ========================================================
    public getUserName():string {
        return this.username;
    }
// ========================================================
    public setUsername(username:string) {
        this.username = username;
        this.name = username;
    }
// ========================================================
    public setAge(age:number) {
        this.age = age;
    }
// ========================================================
}