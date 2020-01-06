interface Person {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;
    constructor(
        public firstName: string,
        public middleInitial: string,
        public lastName: string
    ) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

let user = {
    firstName: "Jane",
    lastName: "User"
};

export function greeter() {
    let person = new Student("Jane", "M.", "Doe");
    console.log("Hello " + person.firstName + " " + person.lastName);
}
