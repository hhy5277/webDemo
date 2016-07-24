/**
 * Created by laixiangran on 2016/7/7.
 * homepage：http://www.laixiangran.cn.
 */
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("lai", "xiang", "ran");
document.body.innerHTML = greeter(user);
//# sourceMappingURL=greeter.js.map