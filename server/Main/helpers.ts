import * as fs from "fs";

export {
    verifyUsernameAndPassword,
}
//-------------------------------------------------------
function verifyUsernameAndPassword (username, password){
    const fileContent = fs.readFileSync(__dirname +'/../mock-DB/username-and-password-data.json', 'utf8');
    const myJson = JSON.parse(fileContent);
    if (myJson[0][username] === password) {
        return true;
    } else {
        return false;
    }
}