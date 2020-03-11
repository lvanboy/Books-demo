## JS中的类型

1. null 
2. undefined
3. number
4. string
5. boolean
6. object
7. symbol
8. bigint

![图1](C:\Users\v_ajpjiang\Desktop\你不知道的JS（中）\pic\01.png)



其中**null**类型是JS多年以来的bug，为了不影响大量项目，一直没有修正；判断null的方法

```js
(!a && typeof a === "object") 
```

另外还有一个子类型**function**，它属于**object**

```js
typeof function a(){} === function //true
```

既然**function**属于对象，存在**length**属性，对应其函数的参数的个数

```js
function compare(a,b){}
compare.length === 2 //true
```

还有一个特殊数据结构数组，它属于对象，但不存在array类型

```js
typeof [1,2,3] === 'array' //false
typeof [1,2,3] === 'object' //true
```

所以类型与值相关，变量是一个语义化的标签，并且保存任意值（即任意类型）

声明却没有赋值的变量是undefined，没有声明的变量使用会报错；但在使用**typeof**时，声明却没有赋值的变量类型是“undefined”,而没有声明的变量类型也是"undefined"。

为了避免使用变量时，出现ReferenceError，即没有声明变量，不管是没有声明的变量还是声明没有赋值的变量，再参与逻辑运算时，都是没有意义的。这里可以使用`typeof Variables !== 'undefined'`，保证这个变量声明且赋值。同样的道理，内建API时，为了避免其与内置API冲突，也可以使用这样的判断。

或者呢，检测全局对象属性，判断一个变量在全局是否已声明并赋值。在window或者对象上访问没有声明的对象不会报错，只会产生undefined。



## 数组

1. 数组的下标不一定是数字,也可以是字符串或者其他`a2['style'] = {color:'red'}`,此时的数组就是一个对象，表示为`a2.style`

2. 如果数组的下标是字符串且能强制转化为十进制数字，则当做下标处理；

   ```js
   var a = [];
   a['13'] = 42;
   a.length  // 14
   ```

3. 建议使用数组存放索引，对象存放键值对。除非对象中存在特殊字符。

 

## 类数组

DOM查询操作返回DOM元素列表，这就是类数组。

1. 类数组A转化为数组，`Array.prototype.slice.call(A)`
2. 类数组B转化为数组，`Array.from(B)`



##  字符串

1. 字符串和字符数组不是一回事，即使他们都具有length，indexOf，concat方法等等。

2. 字符串不可以通过下标单独修改某个字符，称为字符串的不可变性，字符串的 成员函数不会改变其原始值。

```js
let a = ['your'];
a[0] = 'Y';  // 'your'
```

3. 字符串借用数组非变更方法（不会修改自身值，而是产生新的返回值），实现一些自身不具备方法

```js
let b = 'ours'
b.join //undefined
b.map  //undefined
let c = Array.prototype.join.call(b,'-')
let d = Array.prototype.map.call(b,function(v){
	return v.toUpperCase() + '.'
}).join("")
c  // "o-u-r-s"
d  // "O.U.R.S"
```

4. 数组的可变更方法（修改自身值，且返回新的值）reverse，字符串不可以借用

```js
let a = 'im'
let b = 'tm'
a.reverse //undefined
b.reverse() // 'mt'
b  // 'mt'
Array.prototype.reverse.call(a) //报错
```

5. 翻转字符串

```js
 let str = "hello!"
 let strfilp = str.split('').reverse().join('')
```



## 数字

1. 没有真正意义上的整数，20.0 和 20 都是整数，`let d = 40.0; // 40`。

2. Number.prototype中常见方法：tofixed()（返回字符串），toPrecision()（返回字符串）;点运算符优先于数值结合进行数值运算，然后才算对象属性访问运算符；

   ```js
   42.toFixed(3)  //SyntaxError
   (42).toFixed(3) // "42.000"
   0.42.toFixed(3) // "0.420"
   42..toFixed(3)  //"42.000"
   42 .toFixed(3) // "42.000" 存在空格，一般在压缩时容易出问题
   ```

3. 使用指数形式来表达较大的数字，`var onethousand = 1E3;`

4. 以不同前缀开头，代表不同进制，如：0xf1十六进制，0o243八进制，0b1101，0B1101二进制。

5. 遵循IEEE754规范的语言，在浮点数运算时，会产生精度丢失的问题；那么如何判断浮点运算? **通过设置误差值判定**。
   ```js
      if(!Number.EPSILON){
         Number.EPSILON = Math.pow(2,-52);
      }
      function floatNumberEqual(a,b){
         return Math.abs(n1n2) < Number.EPSILON;
      }

   ```
   最大的浮点数存放在Number.MAX_VALUE,最大的整数存放在Number.MIN_VALUE.
   最大的整数存放在Number.MAX_SAFE_INTEGER,最小的整数存放在Number.MIN_SAFE_INTEGER.


6. 整数检测
   - Number.isInteger
   - 
   ```js
      if(Number.isInteger){
         Number.isInteger = function(num){
            typeof num === 'number' && num % 1 == 0;
         }
      }
   ```

7. 检测一个整数的安全性
```JS
function safe(num){
   if(!Number.isSafeInteger){
         return Number.isInteger() && Math.abs(num) <= Number.MAX_SAFE_INTEGER  
   }else{
      return Number.isSafeInteger(num);
   }
}
safe(Math.pow(2,53))
safe(Math.pow(2,53)-1)

```


## 特殊的值
1. undefined的类型只有undefined一个值，null类型只有null一个值，不要把这两个类型的值当做变量声明。

2. **void** 运算符 没有返回值，因为返回结果为**undefined**,`void a === undefined // true`

3. 如果数学运算的操作数不是数字，这种情况返回 **NaN**，这仍然是一个数字类型,且不与自身相等,如
   ```js
   let f = 2 / '1s';    //NaN
   typeof f === "number"; //true
   f !== NaN  // true
   ```
   存在这样的一个方法，它可以判断NaN或者不是数字,如：
   ```js
   let f = 2 / 'my';
   window.isNaN(f)  //true;
   window.isNaN('your') //true
   window.isNaN(12) //false
   ```
   为了能够更准确的判断数字，存在这样的polyfill的方法：
   ```js
      if(!Number.prototype.isNaN){
         Number.prototype.isNaN = function(){
            return window.isNaN(this) 
         }
      }
      let a = 2 / 'ours',a1 = 1;
      let str = 'this';
      a.isNaN() //true;
      a1.isNaN() //false;
      str.isNaN()  //报错
   ```
   使用参数传递的方法，避免意外的错误
   ```js
      if(!Number.isNaN){
         Number.isNaN = n =>  typeof(n) === 'number' && window.isNaN(n) 
      }
      let a = 2 / 'ours',a1 = 1;
      let str = 'this';
      Number.isNaN(a) //true;
      Number.isNaN(a1) //false;
      Number.isNaN(str)  //false;

   ```
   或者呢，如果自身不等于自身，判定为NaN
   ```js
      if(!Number.isNaN){
         Number.isNaN = n => n !== n;
      }
      Number.isNaN(NaN); //true
      Number.isNaN('this'); //false
      Number.isNaN(12); //false
   ```

4. 无穷数，JavaScript允许被除数为0，这样就会出现无穷数
```js
let a = 1 / 0 ; //Infinity
let b = -1 / 0; //-Infinity

```
   另外如果运算结果超过JavaScript有限数字的最值范围，也会出现无穷数; **无穷/无穷 = NaN，有穷/无穷 = 0**

```js
let a = Number.MAX_VALUE;  //1.78e+308
let b = a + Math.pow(2,970); //Infinity
let c = a + Math.pow(2,969); 
let d = a+a  // Infinity
let res1 = b / d; //NaN
let res2 = a / b; // 0
```

5. 零值,0 / 正负数 = 正负0,-0转字符串=字符串0，字符串-0转数字=0，0和-0作比较是相等的
```js
   let a = 0 / -1;  //-0
   let b = 0 / 1;   // 0
   //数字-0转字符串
   let str1 = a.toString(); // 0
   let str2 = JSON.stringify(a)//0
   let str3 = String(a); //0
   let str4 = a + '';
   //字符串-0转数字
   let n1 = parseInt('-0'); // -0
   let n2 = JSON.parse('-0'); // -0
   let n3 = Number('-0'); // -0
   //0和-0比较
   let com1 = a == b; //true
   let com2 = a === b //true
   let com3 = 0 == -0; //true
   let com4 = 0 === -0; //true
   let com5 = 0 > -0; //false
   let com6 = a > b; //false
```
   那么如何区分零和负零？
```js
function isNegZero(n){
   return (+n === 0)&&(1 / +n === -Infinity )
}
isNegZero(0)
isNegZero(-0)
```
6. 特殊等式，ES6中的Object.is用来判断两个值是否绝对相等，包括NaN和正负0
```js
let a = 1 / '1s'; // NaN
let b = 0 / -1 ; // -0
let bol1 = Object.is(a,NaN); // true
let bol2 = Object.is(0,b); // false
let bol3 = Object.is(-0,b); // true
```

## 值和引用
1.JavaScript对值和引用的赋值/传递在语法上没有区别，完全根据值的类型来确定
简单值（基本类型）：null、undefined、布尔、数字、字符串
引用（复杂类型）：object(数组、封装对象)和函数
```js
let a = 1;
let b = a;
b++;
a //1
b //2
let arr1 = [1,2,3]
let arr2 = arr1;
arr2.push(4);
arr1 //[1,2,3,4]
arr2 //[1,2,3,4] 
arr2 = ['a','b']
arr1 // [1,2,3,4]
arr2 // ['a','b']
```

其中，arr2指向值本身而不是变量时，相当于断开了与arr1的连接；在函数参数上建立连接，外层值应等于连接参数的值，当断开连接，函数参数无论怎么修改，也不会影响外层值
```js
function foo(x){
   x.push(4);
   x //[1,2,3,4]
   x = ['a','b']
   x.push('c');
   x //['a','b','c']
}
let a = [1,2,3]
foo(a)
a // [1,2,3,4]

```

那么，如何清空引用值，同时保持连接，通过将数组的length属性置为0；保持引用，且重新初始化。
```js
function foo(x){
   x.push(4)
   x //[1,2,3,4]
   x.length = 0;
   x.push('a','b','c');
}
let a = [1,2,3]
foo(a)
a // ['a','b','c'];
```
如果使用一个数组的浅拷贝,这个值的变化与a无关
```js
function foo(x){
   x.push(4)
   x //[1,2,3,4]
   x.length = 0;
   x.push('a','b','c');
}
let a = [1,2,3]
let b = a.slice()
foo(b)
a  //[1,2,3]
b // ['a','b','c'];
```
使用包装对象，也无法使基本值变成引用对象
```js
function foo(x){
   x = x + 1;
   x = x + '1';
   x // 31
}
let a = 2;
let b = new Number(a);
typeof b 
let c = new Object(a);
typeof c
foo(b) //2
foo(c) //2
```

## 原生函数（内建函数）
常见内置函数包括：
- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp
- Date()
- Error()
- Symbol()

1.内部属性[[Class]],凡是使用typeof variable === 'object'，都存在内部属性[[class]],这个属性无法直接访问，通过**Object.prototype.toString.call**间接访问,
在使用这个方法时，基本类型也会自动使用封装对象进行包装。
```js
let a = new String('hello');
typeof a 
a instanceof String
Object.prototype.toString.call(a) === '[object String]' //true
Object.prototype.toString.call([1,2,3]) === '[object Array]' //true
Object.prototype.toString.call(/[0-9]/ig) === '[object RegExp]' //true
Object.prototype.toString.call(null) === '[object Null]' // true
Object.prototype.toString.call(undefined) === '[object Undefined]' //true
```

2. 基本数据类型没有封装对象的属性和方法，但在基本类型用到封装对象的属性和方法时，则进行自动包装，JavaScript引擎对此进行了优化；所以尽可能使用字面量的形式，这样性能更好。
其中直接使用布尔类型的封装对象，返回的一定是真值；基本数据类型在不使用**new**构造函数生成的对象，typeof这个对象的类型是基本数据类型，但同样拥有封装对象的属性和方法。
```js
let str = 'your name';
let bol = new Boolean(false);
let str1 = String(str);
let str2 = new String(str);
let str3 = Object(str);
typeof str1
typeof str2
typeof str3
if(!bol){
   bol = true;
}
str.length //包装成对象，使用封装对象的属性
str.toUpperCase() //包装成对象，使用封装对象属性
```

3. 使用valueOf获取基本封装对象中的值
```js
let a = new Number(10);
let b = new String('color');
let c = new Boolean(true);
let a1 = a.valueOf();
let b1 = b.valueOf();
let c1 = c.valueOf();
```

4. 数组、对象、函数和正则表达式使用常量或者构造函数，产生都是封装对象。
```js
   
```

