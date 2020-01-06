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

let student1 = new Student("Jane", "M.", "Doe");

function greeter(person: Person) {
    return "Hello " + person.firstName + " " + person.lastName;
}

document.body.textContent = greeter(user);
document.body.textContent = greeter(student1);
