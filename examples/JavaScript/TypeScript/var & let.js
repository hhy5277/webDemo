/**
 * Created by laixiangran on 2016/7/7.
 * homepage：http://www.laixiangran.cn.
 * let 与 var的区别
 */
// var
for (var i = 0; i < 10; i++) {
    setTimeout(function () { console.log(i); }, 100 * i);
}
var _loop_1 = function (i_1) {
    setTimeout(function () { console.log(i_1); }, 100 * i_1);
};
// let
for (var i_1 = 0; i_1 < 10; i_1++) {
    _loop_1(i_1);
}
//# sourceMappingURL=var & let.js.map