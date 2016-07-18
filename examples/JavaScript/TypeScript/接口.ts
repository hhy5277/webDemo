/**
 * Created by laixiangran on 2016/7/7.
 * homepage：http://www.laixiangran.cn.
 * 接口
 */

// 对象类型
interface LabelledValue {
    label: string;
}

function printLabel (labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

// “option bags”模式
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare (config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let mySquare = createSquare({color: "black"});
console.log(mySquare); // output { color: 'black', area: 100 }

// 函数类型
// 函数类型需要定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (src: string, sub: string): boolean {
    let result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}

// 数组类型
// 数组类型具有一个 index类型表示索引的类型，还有一个相应的返回值类型表示通过索引得到的元素的类型。
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];

// 类类型
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}

function createClock (ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor (h: number, m: number) { }

    tick () {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor (h: number, m: number) { }

    tick () {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 扩展接口
// 一个接口可以继承一个或多个接口，创建出多个接口的合成接口。
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// 混合类型
// 一个对象可以同时做为函数和对象使用，并带有额外的属性
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter (): Counter {
    let counter = <Counter>function (start: number) {};
    counter.interval = 123;
    counter.reset = function () {};
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承类
// SelectableControl包含了Control的所有成员，包括私有成员state。 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control implements SelectableControl {
    select () {}
}
// 报错
// class TextBox implements SelectableControl {
//     select () {}
// }