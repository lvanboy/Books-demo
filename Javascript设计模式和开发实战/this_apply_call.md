## this 指向

1. 作为对象的方法调用
2. 作为普通函数调用
3. 构造器调用
4. Function.prototype.call 和Function.prototype.apply 的调用

``` js
window.name = "globalName";
var obj = {
    name: "lvanboy",
    getName: function() {
        return this.name;
    }
}
var getName = obj.getName;
console.log(obj.getName()) //作为对象的方法调用
console.log(getName()) //作为普通函数调用
```

``` js
(function es5() {
    console.log(this);
}())
console.log(this) //undefined ,在es5的严格模式中
```

## 只要构造函数中，不主动返回一个对象，默认返回this

``` js
var myClass = function() {
    this.name = 'lvanboy';
}

var obj = new myClass();
console.log(obj.name)
```

``` js
var myClass = function() {
    this.name = "lvanboy";
    return {
        name: "monika"
    }
}
var obj = new myClass();
obj.name //monika
```

``` js
var myClass = function() {
    this.name = "lvanboy";
    return "monika";
}
var obj = new myClass();
console.log(obj.name) //lvanboy
```

## call、apply

``` js
var obj1 = {
    name: "lvanboy",
    getName: function() {
        return this.name;
    }
}
var obj2 = {
    name: "monika";
}

obj1.getName();
obj1.getName.call(obj2)
```

## 丢失的this

使用普通变量引用对象的方法，此时，普通函数的调用，this指向全局。对象内部的this丢失。

