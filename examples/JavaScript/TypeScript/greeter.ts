/**
 * Created by laixiangran on 2016/7/7.
 * homepage：http://www.laixiangran.cn.
 */

class Student {
    fullName:string;

    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName:string;
    lastName:string;
}

function greeter(person:Person):string {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("lai", "xiang", "ran");

document.body.innerHTML = greeter(user);