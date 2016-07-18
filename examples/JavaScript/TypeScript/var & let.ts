/**
 * Created by laixiangran on 2016/7/7.
 * homepage：http://www.laixiangran.cn.
 * let 与 var的区别
 */

// var
for (var i = 0; i < 10; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}

// let
for (let i = 0; i < 10; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}