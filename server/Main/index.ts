import * as  express from  'express';
import * as cors from 'cors';
import * as treeFuncs from '../Modules/tree';
import * as userFuncs from '../Modules/users';
import * as groupFuncs from '../Modules/groups';
import * as helpers from "./helpers";
import * as fs from "fs";
//---------------------------------------------------------------------------
const server = express();

server.use(express.json());

server.use(cors());
//---------------------------------------------------------------------------
server.use((req, res, next) => {
   console.log("A new user has entered the system");
   next();
});
//---------------------------------------------------------------------------
server.post('/users/sign_in', (req, res) => {
    const result = helpers.verifyUsernameAndPassword(req.body['username'] ,req.body['password']);
    if (result === true) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});
// //---------------------------------------------------------------------------
// server.post('/users/sign_up', (req, res) => {
//     const result = userFuncs.createNewUser(req.body['username'], req.body['password'], req.body['age']);
//     console.log("test")
//     if (result !== null) {
//         try {
//             const fileContent = fs.readFileSync(__dirname + '/../mock-DB/tree-data.json', 'utf8');
//             const myJson = JSON.parse(fileContent);
//             console.log(JSON.stringify(myJson));
//             res.status(200).send(myJson);
//         }
//         catch (err) {
//             console.log(err);
//         }
//     } else {
//         res.sendStatus(500);
//     }
// });
//---------------------------------------------------------------------------
server.post('/tree-operations/show_tree', (req, res) => {
    treeFuncs.init();
    res.status(200).send(treeFuncs.getTreeJSON());
});
//---------------------------------------------------------------------------
server.post('/tree-operations/create-group', (req, res) => {
    //if 'General' group does not exist
    let parentGroupID = req.body.parentGroupID;
    if (req.body.childGroupName === ""){
        res.sendStatus(500).send("error");
        // res.status(200).send([])
        return;
    }
    const newGroup = groupFuncs.createNewGroup(req.body.childGroupName);
    console.log("parentGroupID = " + parentGroupID);
    treeFuncs.addGroupToGroup(parentGroupID, newGroup.getID());
    res.status(200).send(treeFuncs.getTreeJSON());
});
//---------------------------------------------------------------------------
server.post('/tree-operations/remove-group', (req, res) => {
});

server.post('/tree-operations/join-group', (req, res) => {
});

server.post('/tree-operations/exit-group', (req, res) => {
});

server.post('/tree-operations/erase-account', (req, res) => {
});

server.post('/tree-operations/edit-profile', (req, res) => {
});
//---------------------------------------------------------------------------
server.listen(3001);
