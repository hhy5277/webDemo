/**
 *  * Created by laixiangran@163.com on 2016/5/16
 * homepage：http://www.laixiangran.cn
 * 观察者（发布-订阅）模式
 * 实现的功能包括：发布消息，订阅消息，取消订阅的消息，先发布再订阅，支持创建命名空间
 */

(function (window, undefined) {
	var _subscribe = null,
		_publish = null,
		_unsubscribe = null,
		_shift = Array.prototype.shift, // 删除数组的第一个 元素，并返回这个元素
		_unshift = Array.prototype.unshift, // 在数组的开头添加一个或者多个元素，并返回数组新的length值
		namespaceCache = {}, // 命名空间缓存
		_create = null,
		each = function (ary, fn) {
			var ret = null;
			for (var i = 0, len = ary.length; i < len; i++) {
				var n = ary[i];
				ret = fn.call(n, i, n);
			}
			return ret;
		};

	// 订阅消息
	_subscribe = function (key, fn, cache) {
		if (!cache[key]) {
			cache[key] = [];
		}
		cache[key].push(fn);
	};

	// 取消订阅（取消全部或者指定消息）
	_unsubscribe = function (key, cache, fn) {
		if (cache[key]) {
			if (fn) {
				for (var i = cache[key].length; i >= 0; i--) {
					if (cache[key][i] === fn) {
						cache[key].splice(i, 1);
					}
				}
			} else {
				cache[key] = [];
			}
		}
	};

	// 发布消息
	_publish = function () {
		var cache = _shift.call(arguments),
			key = _shift.call(arguments),
			args = arguments,
			_self = this,
			ret = null,
			stack = cache[key];

		if (!stack || !stack.length) {
			return;
		}

		return each(stack, function () {
			return this.apply(_self, args);
		});
	};

	// 创建命名空间
	_create = function (namespace) {
		var namespace = namespace || "default";
		var cache = {},
			offlineStack = {}, // 离线事件，用于先发布后订阅，只执行一次
			ret = {
				subscribe: function (key, fn, last) {
					_subscribe(key, fn, cache);
					if (!offlineStack[key]) {
						offlineStack[key] = null;
						return;
					}
					if (last === "last") { // 指定执行离线队列的最后一个函数，执行完成之后删除
						offlineStack[key].length && offlineStack[key].pop()();  // [].pop => 删除一个数组中的最后的一个元素，并且返回这个元素
					} else {
						each(offlineStack[key], function () {
							this();
						});
					}
					offlineStack[key] = null;
				},
				one: function (key, fn, last) {
					_unsubscribe(key, cache);
					this.subscribe(key, fn, last);
				},
				unsubscribe: function (key, fn) {
					_unsubscribe(key, cache, fn);
				},
				publish: function () {
					var fn = null,
						args = null,
						key = _shift.call(arguments),
						_self = this;

					_unshift.call(arguments, cache, key);
					args = arguments;
					fn = function () {
						return _publish.apply(_self, args);
					};

					if (offlineStack && offlineStack[key] === undefined) {
						offlineStack[key] = [];
						return offlineStack[key].push(fn);
					}
					return fn();
				}
			};

		return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
	};

	var observer = {
		create: _create, // 创建命名空间
		one: function (key, fn, last) { // 订阅消息，只能单一对象订阅。参数：key:消息key，fn:消息对应的执行函数，last:是否只执行函数集的最后一个函数
			var observer = this.create();
			observer.one(key, fn, last);
		},
		subscribe: function (key, fn, last) { // 订阅消息，可多对象同时订阅。参数：key:消息key，fn:消息对应的执行函数，last:是否只执行函数集的最后一个函数
			var observer = this.create();
			observer.subscribe(key, fn, last);
		},
		unsubscribe: function (key, fn) { // 取消订阅，（取消全部或指定消息）。参数：key:消息key，fn:消息对应的执行函数，不传fn就取消key对应的所有订阅
			var observer = this.create();
			observer.unsubscribe(key, fn);
		},
		publish: function () { // 发布消息。参数：第一个为指定的消息key，后面的参数为传递的数据
			var observer = this.create();
			observer.publish.apply(this, arguments);
		}
	};

	/*
	 * 导出模块
	 */

	var exported = false;

	// jQuery
	if (typeof window.jQuery === "function") {
		window.$.fn.observer = observer;
		exported = true;
	}

	// CMD
	if (typeof define === "function" && define.amd) {
		define(function () {
			return observer;
		});
		exported = true;
	}

	// AMD
	if (typeof module !== "undefined" && module.exports) {
		module.exports = observer;
		exported = true;
	}

	// Global
	if (!exported) {
		window.observer = observer;
	}
})(window);