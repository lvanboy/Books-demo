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






