/**
 * Created by laixiangran on 2016/7/7.
 * homepage：http://www.laixiangran.cn.
 * 解构
 */

// 数组解构

let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

// 变量交换
[first, second] = [second, first];
console.log(first); // outputs 1
console.log(second); // outputs 2

// 作用与函数参数
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f(input);

// ...name语法
let [first1, ...rest] = [1, 2, 3, 4];
console.log(first1); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]

// 忽略元素
let [first2] = [1, 2, 3, 4];
console.log(first2); // outputs 1
let [, second2, , fourth] = [1, 2, 3, 4];
console.log(second2); // outputs 2
console.log(fourth); // outputs 4

// 对象解构

let o = {
    a: "foo",
    b: 12,
    c: "bar"
}
let {a, b} = o;
console.log(a); // outputs "foo"
console.log(b); // outputs 12

({a, b} = {a: "baz", b: 101});
console.log(a); // outputs "baz"
console.log(b); // outputs 101

// 属性重命名
let {a: newName1, b: newName2}:{a:string, b:number} = o;
console.log(newName1); // outputs "foo"
console.log(newName2); // outputs 12

// 默认值
function keepWholeObject(wholeObject:{a:string, b?:number}) {
    let {a, b = 1001} = wholeObject;
    console.log(a, b);
}
keepWholeObject({a: "dd", b: 2});

// 函数声明
type C = {a:string, b?:number}
function fn({a, b}: C):void {
    console.log(a, b);
}
fn({a: "dd1", b: 21});