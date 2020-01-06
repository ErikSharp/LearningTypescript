import { greeter } from "./TS5Minutes/greeter.js";
import { basicTypes } from "./Handbook/basicTypes/basicTypes.js";

function execChapter(chapter: () => void, name: string) {
    console.group(name);
    chapter();
    console.groupEnd();
}

console.group("Getting Started");
execChapter(greeter, Object.keys({ greeter })[0]);
console.groupEnd();

console.group("Handbook");
execChapter(basicTypes, Object.keys({ basicTypes })[0]);
console.groupEnd();

let headerMessage = document.getElementById("message");
headerMessage.innerText = "All of the assertions have run";
