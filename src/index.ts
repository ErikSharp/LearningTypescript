import { basicTypes } from "./Handbook/01basicTypes";
import { variableDeclarations } from "./Handbook/02variableDeclarations";
import { interfaces } from "./Handbook/03interfaces";
import { classes } from "./Handbook/04classes";

import { course } from "./YouTubeCourse/course";

import { ackerman } from "./FunStuff/ackerman";

import { kataReturnNegative } from "./Kata/returnNegative";
import { kataCountingDuplicates } from "./Kata/countingDuplicates";
import { kataBouncingBalls } from "./Kata/bouncingBalls";

basicTypes();
variableDeclarations();
interfaces();
classes();

course();

kataReturnNegative();
kataCountingDuplicates();
kataBouncingBalls();

let output = ackerman(3, 5);
console.log(
    `ackerman (3, 5) is : ${output.result} with ${output.callCount} calls`
);
