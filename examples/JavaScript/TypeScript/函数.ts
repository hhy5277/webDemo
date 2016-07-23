/**
 * Created by laixiangran on 2016/7/8.
 * homepage：http://www.laixiangran.cn.
 * 函数
 */

// 一般函数类型
function add (x: number, y: number): number {
    return x + y;
}

let myAdd = function (x: number, y: number): number { return x + y; };

// 完整函数类型
// 函数类型包含两部分：参数类型和返回值类型，两部分之间用 => 分开
let myAdd1: (x: number, y: number) => number = function (x: number, y: number): number { return x + y; };

// 推断类型
// 赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型

// 左边没有指定类型
let myAdd2 = function (x: number, y: number): number { return x + y; };

// 右边没有指定类型
let myAdd3: (x: number, y: number) => number = function (x, y) { return x + y; };

// 可选参数（?）和默认参数(=)
// lastName为可选参数
function buildName (firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + " " + lastName;
    }
    else {
        return firstName;
    }
}
// lastName具有默认值，带有默认值的参数与带有?的参数一样都是可选参数
function buildName2(firstName: string, lastName: string = "Smith") {
    return firstName + " " + lastName;
}