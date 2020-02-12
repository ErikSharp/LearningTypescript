import { basicTypes } from "./Handbook/01basicTypes";
import { variableDeclarations } from "./Handbook/02variableDeclarations";
import { course } from "./YouTubeCourse/course";

function execChapter(chapter: () => void, name: string) {
    console.group(name);
    chapter();
    console.groupEnd();
}

console.group("Handbook");
execChapter(basicTypes, Object.keys({ basicTypes })[0]);
execChapter(variableDeclarations, Object.keys({ variableDeclarations })[0]);
console.groupEnd();

console.group("YouTubeCourse");
execChapter(course, Object.keys({ course })[0]);
console.groupEnd();
