import { basicTypes } from "./Handbook/01basicTypes";
import { variableDeclarations } from "./Handbook/02variableDeclarations";
import { interfaces } from "./Handbook/03interfaces";
import { classes } from "./Handbook/04classes";
import { functions } from "./Handbook/05functions";
import { generics } from "./Handbook/06generics";
import { enums } from "./Handbook/07enums";

import { course } from "./YouTubeCourse/course";

import { ackerman } from "./FunStuff/ackerman";

import { kataReturnNegative } from "./Kata/returnNegative";
import { kataCountingDuplicates } from "./Kata/countingDuplicates";
import { kataBouncingBalls } from "./Kata/bouncingBalls";
import { kataIntroToArt } from "./Kata/introToArt";
import { kataMoleculeToAtoms } from "./Kata/moleculeToAtoms";

basicTypes();
variableDeclarations();
interfaces();
classes();
functions();
generics();
enums();

course();

kataReturnNegative();
kataCountingDuplicates();
kataBouncingBalls();
kataIntroToArt();
//kataMoleculeToAtoms();

let output = ackerman(3, 5);
console.log(
    `ackerman (3, 5) is : ${output.result} with ${output.callCount} calls`
);
