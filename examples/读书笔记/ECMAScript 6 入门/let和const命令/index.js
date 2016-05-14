/**
 * Created by laixiangran on 2016/5/11.
 * 主页: http://www.laixiangran.cn
 */
"use strict";

function f1() {
    var n = 5;
    if (true) {
        var n = 10;
    }
    console.log(n); // 5
}

f1();
