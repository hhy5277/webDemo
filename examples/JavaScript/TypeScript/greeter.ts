/**
 * Created by laixiangran on 2016/7/7.
 * homepage：http://www.laixiangran.cn.
 */

interface Person {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;
    constructor (public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

function greeter (person: Person): string {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("lai", "xiang", "ran");

document.body.innerHTML = greeter(user);