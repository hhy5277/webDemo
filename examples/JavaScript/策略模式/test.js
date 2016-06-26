/**
 * Created by laixiangran@163.com on 2016/5/23
 * homepage：http://www.laixiangran.cn
 */

// 一般的实现

// performanceLevel：绩效考核等级，salary：员工的工资数额
var calculateBonus1 = function (performanceLevel, salary) {

    if (performanceLevel === 'S') {
        return salary * 4;
    }

    if (performanceLevel === 'A') {
        return salary * 3;
    }

    if (performanceLevel === 'B') {
        return salary * 2;
    }
};

// 测试
calculateBonus1('B', 20000); // 输出：40000
calculateBonus1('S', 6000); // 输出：24000

// 使用组合函数重构代码

var performanceS1 = function (salary) {
    return salary * 4;
};

var performanceA1 = function (salary) {
    return salary * 3;
};

var performanceB1 = function (salary) {
    return salary * 2;
};

var calculateBonus2 = function (performanceLevel, salary) {

    if (performanceLevel === 'S') {
        return performanceS1(salary);
    }

    if (performanceLevel === 'A') {
        return performanceA1(salary);
    }

    if (performanceLevel === 'B') {
        return performanceB1(salary);
    }

};

// 测试
console.log(calculateBonus1('A', 10000));    // 输出：30000

// 使用策略模式重构代码

// 接近传统面向对象语言的实现

// 定义每种计算年终奖的策略类
var performanceS2 = function () {
};
performanceS2.prototype.calculate = function (salary) {
    return salary * 4;
};

var performanceA2 = function () {
};
performanceA2.prototype.calculate = function (salary) {
    return salary * 3;
};

var performanceB2 = function () {
};
performanceB2.prototype.calculate = function (salary) {
    return salary * 2;
};

// 定义奖金类Bonus（环境类Context）
var Bonus = function () {
    this.salary = null; // 原始工资
    this.strategy = null; // 绩效等级对应的策略对象
};

Bonus.prototype.setSalary = function (salary) {
    this.salary = salary; // 设置员工的原始工资
};

Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};

Bonus.prototype.getBonus = function () { // 取得奖金数额
    return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
};

// 测试
var bonus = new Bonus();

bonus.setSalary(10000);

bonus.setStrategy(new performanceS2());  // 设置策略对象
console.log(bonus.getBonus());    // 输出：40000

bonus.setStrategy(new performanceA2());  // 设置策略对象
console.log(bonus.getBonus());    // 输出：30000

// 使用JavaScript特性实现

// 直接定义为各个不同的方法
var strategies = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    }
};

// calculateBonus函数充当环境类Context
var calculateBonus3 = function (level, salary) {
    return strategies[level](salary);
};

// 测试
calculateBonus3('S', 20000); // 输出：80000
calculateBonus3('A', 10000); // 输出：3000