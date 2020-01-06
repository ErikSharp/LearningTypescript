import { greeter } from "./TS5Minutes/greeter.js";

function execChapter(chapter: () => void, name: string) {
    console.group(name);
    chapter();
    console.groupEnd();
}

console.group("Getting Started");
execChapter(greeter, Object.keys({ greeter })[0]);
console.groupEnd();

let headerMessage = document.getElementById("message");
headerMessage.innerText = "All of the assertions have run";
