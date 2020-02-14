import { basicTypes } from "./Handbook/01basicTypes";
import { variableDeclarations } from "./Handbook/02variableDeclarations";
import { interfaces } from "./Handbook/03interfaces";
import { classes } from "./Handbook/04classes";

import { course } from "./YouTubeCourse/course";

import { ackerman } from "./FunStuff/ackerman";

basicTypes();
variableDeclarations();
interfaces();
classes();

course();

let output = ackerman(3, 5);
console.log(
    `ackerman (3, 5) is : ${output.result} with ${output.callCount} calls`
);
