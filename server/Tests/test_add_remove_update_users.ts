import * as  groupFuncs from '../Modules/groups';
import * as  treeFuncs from '../Modules/tree';
import * as  userFuncs from '../Modules/users';


const redColor = "\x1b[31m%s\x1b[0m";
const greenColor = "\x1b[32m%s\x1b[0m";
const blueColor = "\x1b[34m%s\x1b[0m";
const magentaColor = "\x1b[35m%s\x1b[0m";
const cyanColor= "\x1b[36m%s\x1b[0m";

try {
    console.log(cyanColor,"\n#======================================================");
    console.log(cyanColor,"# After user objects were created:");
    console.log(cyanColor,"#======================================================");

    console.log(JSON.stringify(userFuncs.createNewUser("user0", "", 34)));
    console.log(JSON.stringify(userFuncs.createNewUser("user1", "", 34)));
    const user2Object = userFuncs.createNewUser("user2", "", 34)
    console.log(JSON.stringify(user2Object));
    console.log(JSON.stringify(userFuncs.createNewUser("user3", "", 34)));
    console.log(JSON.stringify(userFuncs.createNewUser("user4", "", 34)));
    console.log(JSON.stringify(userFuncs.createNewUser("user5", "", 34)));

    console.log("\n#======================================================");
    console.log("# After username updates:");
    console.log("# user5 changed to user6");
    console.log("#======================================================");
    console.log(userFuncs.updateUsername("user5", "user6"));
    console.log(userFuncs.updateUserAge("user6", 26));

    console.log("\n#======================================================");
    console.log("> Have user6 changed?")
    console.log("#======================================================");
    console.log(userFuncs.doesUserExist("user6"));

    console.log("\n#======================================================");
    console.log("> Does user1 exist?")
    console.log("#======================================================");
    console.log(JSON.stringify(userFuncs.doesUserExist("user1")));

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# After deleting user1:");
    console.log(redColor,"#======================================================");
    console.log(userFuncs.removeUser("user1"));

    console.log("\n#======================================================");
    console.log("> Does user1 exist?")
    console.log("#======================================================");
    console.log(userFuncs.doesUserExist("user1"));

    console.log("\n#======================================================");
    console.log("# List of usernames =");
    console.log("#======================================================");
    console.log(userFuncs.getListOfAllUserObjects());

    console.log(cyanColor,"\n#======================================================");
    console.log(cyanColor,"# After creating new groups (group1 till group10):");
    console.log(cyanColor,"#======================================================");
    console.log(JSON.stringify(groupFuncs.createNewGroup("group1")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group2")));
    const group3Object = groupFuncs.createNewGroup("group3");
    console.log(JSON.stringify(group3Object));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group4")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group5")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group6")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group7")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group8")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group9")));
    const group10Object = groupFuncs.createNewGroup("group10");
    console.log(JSON.stringify(group10Object));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After Adding group1 and group2 to General:");
    console.log(greenColor,"#======================================================");

    const group1Object = treeFuncs.addGroupToGroup(0, 1);
    console.log(JSON.stringify(group1Object));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 2)));


    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding users to groups:");
    console.log(greenColor,"# user2 and user3 to group 1");
    console.log(greenColor,"# user4 and user2 to group 2");
    console.log(greenColor,"#======================================================");
    console.log(treeFuncs.addUserToGroup(1, 2));
    console.log(treeFuncs.addUserToGroup(1, 3));
    console.log(treeFuncs.addUserToGroup(2, 4));
    console.log(treeFuncs.addUserToGroup(2, 2));

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# After trying to remove user that does not exist from group:");
    console.log(redColor,"# user4 to group2:");
    console.log(redColor,"#======================================================");
    console.log(JSON.stringify(treeFuncs.removeUserFromGroup(2, 4)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();


    console.log("\n======================================================");
    console.log(greenColor,'PASS!');
}
catch (err) {
    console.log("\n======================================================");
    console.log(redColor,'FAIL!\n');
    console.log(err);
}







