/**
 * Created by laixiangran on 2016/7/19.
 * homepage：http://www.laixiangran.cn.
 * Promise结合XMLHttpRequest()使用
 */

'use strict';

// A-> $http实现了适配器模式
function $http(url) {

    var core = {

        // 执行ajax请求
        ajax: function (method, url, args) {

            // 创建promise
            var promise = new Promise(function (resolve, reject) {

                // 实例化XMLHttpRequest
                var client = new XMLHttpRequest();
                var uri = url;

                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }

                client.open(method, uri);
                client.send();

                client.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        // 当请求状态为2xx时，执行"resolve"
                        resolve(this.response);
                    } else {
                        // 当请求状态大于2xx时，执行"reject"
                        reject(this.statusText);
                    }
                };
                client.onerror = function () {
                    reject(this.statusText);
                };
            });

            // 返回promise
            return promise;
        }
    };

    // 适配器模式
    return {
        'get': function (args) {
            return core.ajax('GET', url, args);
        },
        'post': function (args) {
            return core.ajax('POST', url, args);
        },
        'put': function (args) {
            return core.ajax('PUT', url, args);
        },
        'delete': function (args) {
            return core.ajax('DELETE', url, args);
        }
    };
};
// End A

// B
var mdnAPI = './search.json';
var payload = {
    'topic': 'js',
    'q': 'Promise'
};

var callback = {
    success: function (data) {
        console.log(1, 'success', JSON.parse(data));
    },
    error: function (data) {
        console.log(2, 'error', JSON.parse(data));
    }
};
// End B

// 三种调用方法
// 1. then执行成功的函数，catch执行失败的函数
$http(mdnAPI)
    .get(payload)
    .then(callback.success)
    .catch(callback.error);

// 2. then第一个参数为执行成功的函数，第二个参数为执行失败的函数
$http(mdnAPI)
    .get(payload)
    .then(callback.success, callback.error);

// 3. 第一个then传递一个参数为执行成功的函数，第二个then第一个参数设置为undefined，第二个参数为执行失败的函数
$http(mdnAPI)
    .get(payload)
    .then(callback.success)
    .then(undefined, callback.error);