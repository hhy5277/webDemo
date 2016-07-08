/**
 * Created by laixiangran on 2016/7/8.
 * homepage：http://www.laixiangran.cn.
 * 类
 */

// protected成员在派生类中仍然可以访问
class Person {
    constructor (protected name: string) {}
}

class Employee extends Person {

    constructor (name: string, private department: string) {
        super(name);
    }

    public getElevatorPitch () {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());

// 存取器
let passcode = "secret passcode1";

class Employee1 {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.error("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee1();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.error(employee.fullName);
}

// 静态属性 关键字static
class Grid {
    static origin = {x: 0, y: 0};

    calculateDistanceFromOrigin (point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }

    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

// 抽象类 关键字abstract
abstract class Department {

    constructor (public name: string) {
    }

    printName (): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting (): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor () {
        super('Accounting and Auditing'); // constructors in derived classes must call super()
    }

    printMeeting (): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports (): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // ok to create a reference to an abstract type
// department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
// department.generateReports(); // error: method doesn't exist on declared abstract type