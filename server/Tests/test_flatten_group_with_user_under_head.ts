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

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After building a tree:");
    console.log(greenColor,"#======================================================");

    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 1)));

    console.log(cyanColor,"\n#======================================================");
    console.log(cyanColor,"# After user objects were created:");
    console.log(cyanColor,"#======================================================");

    console.log(JSON.stringify(userFuncs.createNewUser("user0", "", 34)));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding users to groups:");
    console.log(greenColor,"#======================================================");
    console.log(treeFuncs.addUserToGroup(1, 0));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# try to flatten group 1:");
    console.log(redColor,"#======================================================");

    console.log(JSON.stringify(treeFuncs.flattenGroup(1)));

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