/**
 * Created by laixiangran on 2016/7/7.
 * homepage：http://www.laixiangran.cn.
 * 解构
 */
// 数组解构
var input = [1, 2];
var first = input[0], second = input[1];
console.log(first); // outputs 1
console.log(second); // outputs 2
// 变量交换
_a = [second, first], first = _a[0], second = _a[1];
console.log(first); // outputs 1
console.log(second); // outputs 2
// 作用与函数参数
function f(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
f(input);
// ...name语法
var _b = [1, 2, 3, 4], first1 = _b[0], rest = _b.slice(1);
console.log(first1); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
// 忽略元素
var first2 = [1, 2, 3, 4][0];
console.log(first2); // outputs 1
var _c = [1, 2, 3, 4], second2 = _c[1], fourth = _c[3];
console.log(second2); // outputs 2
console.log(fourth); // outputs 4
// 对象解构
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var a = o.a, b = o.b;
console.log(a); // outputs "foo"
console.log(b); // outputs 12
(_d = { a: "baz", b: 101 }, a = _d.a, b = _d.b);
console.log(a); // outputs "baz"
console.log(b); // outputs 101
// 属性重命名
var newName1 = o.a, newName2 = o.b;
console.log(newName1); // outputs "foo"
console.log(newName2); // outputs 12
// 默认值
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
    console.log(a, b);
}
keepWholeObject({ a: "dd", b: 2 });
function fn(_a) {
    var a = _a.a, b = _a.b;
    console.log(a, b);
}
fn({ a: "dd1", b: 21 });
var _a, _d;
//# sourceMappingURL=解构.js.map