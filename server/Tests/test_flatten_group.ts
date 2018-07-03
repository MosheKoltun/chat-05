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
    console.log(cyanColor,"# After creating new groups (group1 till group10):");
    console.log(cyanColor,"#======================================================");

    console.log(JSON.stringify(groupFuncs.createNewGroup("group1")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group2")));
    const group3_Object = groupFuncs.createNewGroup("group3");
    console.log(JSON.stringify(group3_Object));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group4")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group5")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group6")));
    const group7_Object = groupFuncs.createNewGroup("group7");
    console.log(JSON.stringify(group7_Object));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group8")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group9")));
    const group10_Object = groupFuncs.createNewGroup("group10");
    console.log(JSON.stringify(group10_Object));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After building a tree:");
    console.log(greenColor,"#======================================================");

    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 10)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 1)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(1, 2)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(1, 4)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(1, 5)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(4, 6)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(3, 7)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(8, 3)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 8)));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding group1 to group9:");
    console.log(greenColor,"#======================================================");
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(9, 1)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(cyanColor,"\n#======================================================");
    console.log(cyanColor,"# After user objects were created:");
    console.log(cyanColor,"#======================================================");

    console.log(JSON.stringify(userFuncs.createNewUser("user0", "", 34)));
    const user1_Object = userFuncs.createNewUser("user1", "", 34)
    console.log(JSON.stringify(user1_Object));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding users to groups:");
    console.log(greenColor,"# user1 and user0 to group 6");
    console.log(greenColor,"# user1 to second group 6");
    console.log(greenColor,"#======================================================");
    console.log(treeFuncs.addUserToGroup(6, 1));
    console.log(treeFuncs.addUserToGroup(6, 0));
    console.log(treeFuncs.addUserToGroup(7, 1));
    console.log(treeFuncs.addUserToGroup(7, 0));
    console.log(treeFuncs.addUserToGroup(14, 1));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding a group to a group of users ():");
    console.log(greenColor,"#======================================================");
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(6, 10)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# try to flatten group 'other' " +
                         "# (you should expect it will not succeed)");
    console.log(redColor,"#======================================================");

    console.log(JSON.stringify(treeFuncs.flattenGroup(17)));

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# try to flatten group 8:");
    console.log(redColor,"#======================================================");

    console.log(JSON.stringify(treeFuncs.flattenGroup(8)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# try to flatten group 7:");
    console.log(redColor,"#======================================================");

    console.log(JSON.stringify(treeFuncs.flattenGroup(7)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(magentaColor,"\n#======================================================");
    console.log(magentaColor,"# Get list of groups");
    console.log(magentaColor,"#======================================================");
    const listOfGroups = (groupFuncs.getListOfAllGroupObjects());
    for (const group of listOfGroups) {
        console.log(JSON.stringify(group));
    }

    console.log("\n======================================================");
    console.log(greenColor,'PASS!');
}
catch (err) {
    console.log("\n======================================================");
    console.log(redColor,'FAIL!\n');
    console.log(err);
}