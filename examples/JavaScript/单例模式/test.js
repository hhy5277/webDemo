/**
 * Created by laixiangran@163.com on 2016/5/23
 * homepage：http://www.laixiangran.cn
 */

// 创建div类：CreateDiv
var CreateDiv = function(html) {
    this.html = html;
    this.init();
};

CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
};

// 代理类：proxySingletonCreateDiv，这里引进代理类，是为了将创建div与单例的实现分离开来，方便扩展
var ProxySingletonCreateDiv = (function() {
    var instance;
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');

console.log(a === b); // ture