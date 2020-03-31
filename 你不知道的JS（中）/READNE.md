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

1. 内部属性[[Class]],凡是使用typeof variable === 'object'，都存在内部属性[[class]],这个属性无法直接访问，通过**Object.prototype.toString.call**间接访问,
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

4. 数组、对象、函数和正则表达式使用常量或者构造函数，都是产生封装对象;Array构造函数只有一个参数时，参数作为数组的预设长度;
new Array 构造函数和 Array 构造函数是等价的,永远不要创建和使用空数组。
```js
   let arr = new Array(1,2,3) //[1,2,3]
   let arr1 = new Array(5) // [ <5 empty items> ]
   let arr2 = Array(1,2,3)  //[1,2,3]
   let arr3 = [1,2,3]     //[1,2,3]
```

```js
let a = new Array(3); // [ <3 empty items> ]
let b = [undefined,undefined,undefined]; //[ undefined, undefined, undefined ]
let c = []; 
c.length = 3; //[ <3 empty items> ]
a.join('-'); //'--'
b.join('-'); //'--'
a.map((v,i)=>{return i});  //[ <3 empty items> ] ,这里的map相等于没有执行
b.map((v,i)=>{return i});  //[0,1,2]
let d = Array.apply(null,{length:3}) //[undefined,undefined,undefined]

```

5. 不要万不得已，千万不要使用Object()、Function()、RegExp()构造函数的形式创建对象，直接使用常量（字面量）创建,构造函数的方式一般用于动态参数。


6. Error()和Date()没有常量形式，只能使用构造函数生成对象。
Error()和Array()一样，new 关键字可以省略；Error错误对象可以获取当前运行栈的上下文，一般和throw一起使用,错误对象中存在message属性，一般抛出异常后续代码将不再执行,Error对象下面也有许多子错误类型ReferenceError、SyntaxError。
```js
let x = '';
new Date().getTime() === Date.now()
try{
   if(!x){
   throw new Error("x wasn't provided");
   }
}catch(err){
   console.log(err)
}

```

7. Symbol(符号)是一个具有唯一性的特殊值，用它命名对象属性避免重复，无法查看和访问它的值；ES6中预定义符号，以Symbol静态属性的形式呈现：Symbol.create、Symbol.iterator等；
构造函数不能使用new关键字，构造函数可以自定义符号对象,主要用于私有或者特殊属性，可使用getOwnPropertySymbols读到。
```js
let s = Symbol("my own symbol");
s.toString()
typeof s; //symbol
let obj = {};
obj[s] = 'welcome to home';
Object.getOwnPropertySymbols(obj); //[ Symbol(my own symbol) ]

```

8. 原生函数的原型，如Array.prototype,String.prototype等，这些对象包含子类型的所有行为特征；Function.prototype是一个空函数，Array.prototype是一个空数组，RegExp.prototype是一个空的正则表达式;
那么就可以把这个当做一种默认值使用,ES6中提供了函数参数的默认值功能，不要再使用||运算符。Array.prototype是一个只读变量，修改它，会产生一系列的问题，应该避免。
```js
typeof Function.prototype; //function
Function.prototype(); //空函数
RegExp.prototype.toString(); // /?:/
Array.isArray(Array.prototype); // true
Array.prototype.push(1,2,3);
Array.prototype  //[1,2,3]
Array.prototype.length = 0; //[]
```

```js
function isThisCool(vals,fn,rx){
   vals =vals || Array.prototype;
   fn = fn || Function.prototype;
   rx = rx || /?:/
   return rx.test(vals.map(fn).join(''))
}
isThisCool(); //true;
isThisCool(["a","b","c"],function(v){
   return v.toUpperCase();
},/\D/); // true;

```



## 强制类型转化(值转化)
1. ToString，对于普通对象来说，除非重写toString(),否则toString()(Object.prototype.toString())返回内部属性[[Class]]的值，如果对象有自己的toString()方法，字符串化时则调用该方法并返回其值。
数组的默认toString已经重新定义为：将所有元素使用逗号连接。toString()可以显示调用，也可以在字符串拼接时自动调用。
```js
let a = [1,2,3]
a.toString();
let b = a+'.';
```
2. 安全的JSON值都可以使用JSON.stringify字符串化，不安全的JSON值(：undefined、function、symbol、对象的循环引用)自动忽略，在数组中出现不安全的JSON值时则返回null
```js
let sym = Symbol('y')
JSON.stringify(42);
JSON.stringify("42");
JSON.stringify(null)
JSON.stringify(true)
JSON.stringify(undefined);
JSON.stringify(function(){});
JSON.stringify(sym) 
JSON.stringify([1,undefined,function(){},4]) //不安全的JSON值，返回null
JSON.stringify({a:1,b:function(){}}) //忽略不安全的JSON值
```
3. 包含循环引用的对象，需要在当前对象上定义toJSON方法：返回安全的JSON值，在JSON.stringify时;否则将发生报错！
```js
var o = {};
var a = {
   b:42,
   c:o,
   d:function(){}
}
o.e = a;
JSON.stringify(a) // 报错
a.toJSON = function(){
   return {b:this.b}
}
JSON.stringify(a) //'{"b":"42"}'
```

4. JSON.stringify函数的第二个参数：数组或者函数，如果是数组，则数组中包含允许字符串化的属性，如果是函数，函数参数是对象的key和value，用于在字符串化时筛选对象属性；
第三个参数用于输出指定对象每一层的space。
```js
var a = {
   b:42,
   c:"42",
   d:[1,2,3]
}
JSON.stringify(a,['b','c']);
JSON.stringify(a,function(k,v){
   if(k!=='c') return v;
})
JSON.stringify(a,null,3);
```
5. JSON.stringify()和toString()，在数字，字符串，布尔值上，表现形式一致，都是字符串化；在对象上，JSON.stringify()字符串化，toString()如1所说。
```js
var a = {
   b:42,
   c:"42",
   d:[1,2,3]
}
var b = "12",
    c = 12,
    d = true;
var e = [12,13,14]
var f= null;
var g = undefined;
a.toString()
JSON.stringify(a)
b.toString()
JSON.stringify(b)
c.toString();
JSON.stringify(c)
d.toString();
JSON.stringify(d);
e.toString();
JSON.stringify(e);
// f.toString(); 报错
JSON.stringify(f);
// g.toString() 报错
JSON.stringify(g);

```

6. ToNumber，true转化1，false转化0，undefined转化NaN，null转化0；对象（包含数组）首先按照valueOf或者toString方法向基本数据类型转化，如果能够返回基本数据类型，按照基本数据类型转化规则，否则产生TypeError错误。
```js
var a = {
  valueOf:function(){
    return "42";
  },
  toString:function(){
    return "52"
  }
}
var b = {
  toString : function(){
    return "52"
  }
};
var c =  [6,2];
c.toString = function(){
  return this.join("")
}

Number(a)
Number(b)
Number(c)
Number("")
Number([])
Number(['1234'])
Number(["abc"])
Number('0xab')
Number('0123')
Number('12.3')
Number('12b')
Number(true)
Number(false)
Number(undefined)
Number(null)

```

7. ToBoolean,JavaScript中值可分成两类：可以被强制转换为false的值，另一类是可以被强制转换成true。常见的假值：undefined、null、false、+0，-0，NaN，""。这种假值的基本类型可以封装成对象,这种包装对象返回true。容易混淆的真值："false","0","''",[],{},function(){}。
```js
Boolean(undefined)
Boolean(null)
Boolean(false)
Boolean(+0)
Boolean(-0)
Boolean(NaN)
Boolean("")
let a = new Boolean(false);
let b = new Number(0);
let c = new String(""); 
Boolean(a&&b&&c) //true
Boolean('false')
Boolean('0')
Boolean("''")
Boolean([])
Boolean({})
Boolean(function(){})
```

## 显示强制类型装换
1. JavaScript在构造函数没有参数的时候，可以省略括号,建议使用ES5提供的Date.now()获取当前时间戳；
```js
var a = new Date().getTime()
var b = Date.now();
var d = +new Date(); //将日期转成数字时间戳
var c = +new Date;
d === c; //true
```
2. ~（位操作非），~x = -(x+1), 为了避免抽象渗漏，~和indexOf()实现强制类型转换为Boolean值，也就是用-1作假值的逻辑操作时，可以通过~运算符。
```js
var a = "Hello World";
~a.indexOf('lo');
!~a.indexOf('lo');
```

3. 字位截除，~~运算符和Math.floor()用来截取数值的小数部分，~~只适用于32位数字，并且在负数的处理与Math.floor不同。在使用~~确保别人看得懂。
```js
Math.floor(49.6)
~~49.6
Math.floor(-49.6);
~~-49.6
1E20
1E20 | 0 / 10;
~~1E20 / 10;
(1E20 | 0) / 10;

```


## 数字字符串解析与转换
1. 解析字符串中的数字和将字符串转化为数字两者还是存在差异的；解析允许字符串中含非数字，解析从左向右，遇到非数字字符停止，parseInt方法就符合这样的描述；而转换是不允许非数字字符，否则返回NaN，Number符合这样的操作。parseInt的参数是字符串类型的，如果不是，则会先隐式转换字符串，再进行解析；为了避免出现问题，不要传入非字符串类型参数；parseInt第二个参数转换基数不传时，parseInt会根据字符串的第一个字符自行决定基数，所以在使用时，应指明第二个参数为10。
```js
var a = "42";
var b = "42px";

Number(a) //42
parseInt(a) //42

Number(b) //NaN
parseInt(b) //42

parseInt("33.2xx");
parseFloat("33.2xx");

parseInt(true)
parseInt([1,2,3])

parseInt('0x9'); //9
parseInt('0o8'); 

parseInt('0x9',10); //0 
parseInt('0o8',10); //0

parseInt(1/0,19); //18

```


## 显式转换为布尔值

强制其他类型转换布尔类型的操作，Boolean(),更常用是运算符!!;如果在if条件中不显示的进行类型转化，if会隐式的进行类型转化，隐式的转换会影响代码的可读性，建议显示转化使用Boolean或者!!。
```js
var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;
!!a
!!b
!!c
!!d
!!e
!!f
!!g
```


## 隐式强制类型转化
隐式强制类型转换作用是减少冗余。
1. 字符串和数字之间的隐式强制类转换：+运算符的重载，用于数字运算，或者字符串拼接；对于加号两边的操作数，如果其中一个操作数可以通过ToPrimitive抽象操作转换成字符串，则进行字符串拼接操作，否则执行数字加法；于是，空字符串用于字符串拼接；空字符串拼接与String()的区别在于，空字符串拼接先调用valueOf,在进行ToString()抽象操作。
```js
var a = 42;
var b = "0";
var s = "";
var c = 42;
var d = 0;

var e = [1,2]
var f = [3,4]
var g = {
   valueOf:function(){return 42;},
   toString:function(){return 4;}
}
a+s //"42"
a+b // "420"
c+d //42
e+f //"1,23,4"
[] + {} //[object Object]
{} + [] //0

g+"";
String(g)

```

2. 字符串隐式强制类型转数字使用-运算符,-运算法的隐式转化同+运算符。
```js
var a = "3.14";
var b = a - 0;
var c = [3];
var d = [4];
var e = [3,4];
var f = [1,2];
b
d-c
e-f
```

3. 布尔值隐式强制类型转数字
```js
function onlyOne(){
   var sum = 0;
   for(var i = 0;i<arguments.length;i++){
      if(arguments[i]){
         sum +=arguments[i]
      }
   }
   return sum == 1;
}
var a = true;
var b = false;
onlyOne(b,a);
onlyOne(b,a,b,b,b);
onlyOne(b,b);
onlyOne(b,a,b,b,b,a);
```

4. 隐式强制类型转布尔值，在if语句，for语句中的判断表达式，while语句中，非布尔值会隐式强制类型转换为布尔值，遵循ToBoolean的抽象操作。

```js
var a = 42;
var b = "abc";
var c;
var d = undefined;
if((a&&d) || c){
   console.log('yep')
}
```

5. ||和&&选择器运算符，他们的返回的结果不一定是布尔值，而是两个操作数中的一个；||运算符判断结果为true就返回第一个操作数的值，否则就返回第二个操作数的值，&&运算符判断结果为true返回第二个操作数的值，如果为false就返回；近似理解：**a||b (roughly equivalent to) a ? a: b,a&&b (roughly equivalent to) a ? b : a**;
```js
var a = 42;
var b = "abc";
var c = null;

a || b;
a && b
c || b;
c && b;
```
||常见用法：
```js
function fn(a,b){
   a = a || 'hello';
   b = b || 'world';
   console.log(`${a} + ${b}`);
}
fn();
fn("yeah","yeah")
//es6写法
function fn1(a='hello',b='world'){
   console.log(`${a} + ${b}`);
}
fn1()
fn1('ga','ga');

```
&&常见用法
```js
function foo(){
   console.log(a)
}
var a = 42;
a&&foo()

```

6. 符号Symbol类型，在显示转化为字符串时正常，但在隐式转换时，会报错；不能强制转换成数字，但是可以强制转换成Boolean；
```js
var s1 = Symbol('cool');
String(s1);

var s2 = Symbol('not cool');
s2 + "";

Number(s2)
Boolean(s2)
!!s2
```


## ==和===
1. ==判断值是否相等，===判断值和类型是否相等；更准确说==允许在比较中进行强制类型转换，而===不允许

2. 字符串和数字的比较,如果Type(x)是数字，Type(y)是字符串，则返回x == ToNumber(y)的结果；如果Type(x)是字符串，Type(y)是数字，则返回toNumber(x) == y；

```js
var x = 42;
var y = "42";

x === y;
x == y;

```
3. 其他类型和布尔值的相等比较，如果Type(x)是布尔类型，则返回ToNumber(x) == y,如果Type(y)是布尔类型，则返回x == ToNumber(y)；
```js
var a = "42";
var b = true;

a == b //false

var x = "42";
var y = false;
x == y; //false
```

4. 对于这种类型组合的规则，建议不要使用 == true 或者 ==false的条件

5. null和undefined的比较，如果x为null，y为undefined，则结果为true；如果x为undefined，y为null，则结果为true，==情况下，这两者是相等的，否则都是不相等的。判断函数没有返回值，而非假值，可以使用null和undefined作为判断条件。
```js
var a = null;
var b;

a == b; // true;
a == null;// true;
b == null;// true;
a == false;// false  
b == false;// false 
a == ""; //false
b == ""; //false
a == 0; // false
b == 0; //false
```
```js
var a = doSomething();
if(a === null || a === undefined ){
   //
}
if(a == null){
   //等价上面的写法
}
```

6. 对象和非对象之间的相等比较，如果Type(x)是字符串或者数字，Type(y)是对象，则返回x == ToPrimitive(y)的结果；如果Type(x)是对象，Type(y)是字符串或者数字，则返回ToPromitive(x) == y的结果。undefined，null通过Object显式的进行包装，返回一个空对象，NaN包装对象均返回一个[Number: NaN]常规对象。
```js
var a = 32;
var b = [32];

a == b; //true

var c = "abc";
var d = Object(c);
c == d; //true
c === d; //false

var e = null;
var f= Object(e);
e == f; //false;

var g = undefined;
var h = Object(g);
g == h; //false;

var x = NaN;
var y = Object(x);
x == y; //false


```

7. 其他一些应该避免的问题，valueOf()被重写,并且使用==进行逻辑判断，这样会发生隐式转换；
```js
Number.prototype.valueOf = function(){
   return 3;
}
var a = new Number(2)
a == 3 //true;

```

x&&x，先执行x再执行x，存在以下情况，使得即满足x也满足x；
```js
var i = 2;
Number.prototype.valueOf = function(){
   return i++;
}
var a = new Number(42);
if(a == 2 && a == 3){
   console.log("Yep,this happened!")
}

```

安全的使用==，如果两边的值中有true或者false，千万不要使用==，或者如果两边的值中有[]、""、0，尽量不要使用等号，应该使用===来避免类型转换。

在关系比较中的值应该显式的进行强制类型转换后再比较。
```js
var a = [42];
var b = "043";
a < b //false;
Number(a) < Number(b); //true;

```


## 标签语句
```js
{
   a:foo()
}

```

continue和break语句可以带一个标签，实现标签跳转的功能
```js
foo:for(let i = 0;i< 4;i++){
   for(let j = 0;j< 4;j++){
      if(j == i){
         continue foo;
      }
      if(j*i % 2 == 1){
         continue;
      }
      console.log(i,j)
   }
}

foo:for(let i = 0;i<4;i++){
   for(let j = 0;j<4;j++){
      if(i*j>=3){
         break foo;
      }
      console.log(i,j)
   }
}


```

标签代码块
```js
function foo(){
   bar:{
      console.log('hello');
      break bar;
      console.log('never foo');
   }
   console.log('world')
}

```

标签是不能用引号包裹的























