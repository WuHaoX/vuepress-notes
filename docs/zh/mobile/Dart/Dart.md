# Dart

Dart 也是 Flutter 的基础。 Dart 作为 Flutter 应用程序的编程语言，为驱动应用运行提供了环境，同时 Dart 还支持许多核心的开发任务，例如格式化，分析和代码测试。

## 一个简单的 Dart 程序

下面的应用代码用到了很多Dart的基本功能：

```dart
// Define a function.
void printInteger(int aNumber) {
  print('The number is $aNumber.'); // Print to console.
}

// This is where the app starts executing.
void main() {
  var number = 42; // Declare and initialize a variable.
  printInteger(number); // Call a function.
}
```

输出结果如下：

```sh
the number is 42.
```

**下面是上述应用程序中使用到的代码片段**，这些代码片段适用于所有（或几乎所有）的 Dart 应用：

1. // 注释。

以双斜杠开头的一行语句称为单行注释。Dart 同样支持多行注释和文档注释

2. void

一种特殊的类型，表示一个值永远不会被使用。类似于 main() 和 printInteger() 的函数，以 void 声明的函数返回类型，并不会返回值。

3. int

另一种数据类型，表示一个整型数字。 Dart 中一些其他的内置类型包括 String、List 和 bool。

4. print()

一种便利的将信息输出显示的方式。

5. '...' (或 "...")

表示字符串字面量。

6. $variableName (或 ${expression})

表示字符串插值：字符串字面量中包含的变量或表达式。

7. main()

一个特殊且 必须的 顶级函数，Dart 应用程序总是会从该函数开始执行。查阅 main() 函数 获取更多相关信息。

8. var

用于定义变量，通过这种方式定义变量不需要指定变量类型。这类变量的类型 (int) 由它的初始值决定 (42)。

## Dart重要概念

* 所有变量引用的都是**对象**,每个对象都是一个**类**的实例。数字、函数以及null都是对象。除去null以外（如果你开启了空安全），所有的类都继承于Object类。

* 尽管Dart是强类型语言，但是再声明变量时指定类型是可选的，因为Dart可以进行强类型推断。在上诉代码中，变量`number`的类型被推断为`int`类型。

* 如果你开启了空安全，变量在未声明为可空类型时不能为`null`。你可以通过在类型后加上问号（ ? ）**将类型声明为可空**。例如，`int?`类型的变量可以是整形数字或null。如果你明确知道一个表达式不会为空，但Dart不这么认为时，**你可以在表达式后添加感叹号（!）来断言表达式不为空（为空时将抛出异常）**。例如：`int x = nullableButNotNullInt!`

* 如果你想要显式地声明允许任意类型，使用Object?（如果你开启了空安全）、Object或者特殊类型dynamic将检查延迟到运行时进行。

* Dart支持泛型，比如`List<int>`（表示一组由int对象组成的列表）或`List<Object>`（表示一组由任何类型对象组成的列表）。

* Dart支持顶级函数（例如`main`方法），同时还支持定义属于类或对象的函数（即静态和实例方法）。你还可以在函数中定义函数（嵌套或局部函数）。

* Dart没有类似Java那样的public、protected和private成员访问限定符。如果一个标识符以下划线（_）开头则表示该标识符在库内是私有的。

* 标识符可以以字母或则下划线(_)开头，其后可跟字符和数字的组合。

* Dart工具可以显示**警告**和**错误**两种类型的问题。警告表明代码可能有问题但不会阻止其运行。错误分为编译时错误和运行时错误；编译时错误代码无法运行；运行时错误会在代码运行时导致异常。

## 关键字

|  abstract[^2] |      else      |   import[^2]  |   show[^1]  |
|:-------------:|:--------------:|:-------------:|:-----------:|
|     as[^2]    |      enum      |       in      |  static[^2] |
|     assert    |   export[^2]   | interface[^2] |    super    |
|   async[^1]   |     extends    |       is      |    switch   |
|   await[^3]   |  extension[^2] |    late[^2]   |   sync[^1]  |
|     break     |  external[^2]  |  library[^2]  |     this    |
|      case     |   factory[^2]  |   mixin[^2]   |    throw    |
|     catch     |      false     |      new      |     true    |
|     class     |      final     |      null     |     try     |
|     const     |     finally    |     on[^1]    | typedef[^2] |
|    continue   |       for      |  operator[^2] |     var     |
| covariant[^2] |  Function[^2]  |    part[^2]   |     void    |
|    default    |     get[^2]    |  required[^2] |    while    |
|  deferred[^2] |    hide[^1]    |    rethrow    |     with    |
|       do      |       if       |     return    |  yield[^3]  |
|  dynamic[^2]  | implements[^2] |    set[^2]    |             |

[^1]:带有上标1的关键字为**上下文关键字**，只有在特定的场景才有意义，它们可以在任何地方作为有效的标识符。

[^2]:带有上标2的关键字为**内置标识符**，这些关键字在大多数时候都可以作为有效的标识符，但是它们不能用作类名或者类型名或则导入前缀使用。

[^3]:带有上标3的关键字为Dart 1.0发布后用于支持异步的相关内容。不能在由关键字`async`、`async*`或`sync`标识的方法体中使用`await`或`yield`作为标识符。

其它没有上标的关键字为**保留字**，均不能用作标识符。

## 变量

下面的示例代码将创建一个变量并将其初始化：

```dart
var name = 'Bob';
```

变量仅存储对象的引用。这里名为 name 的变量存储了一个 String 类型对象的引用，“Bob” 则是该对象的值。

name 变量的类型被推断为 String，但是你可以为其指定类型。如果一个对象的引用不局限于单一的类型，可以将其指定为 Object（或 dynamic）类型。

```dart
Object name = 'Bob';
```

除此之外你也可以指定类型：

```dart
String name = 'Bob';
```

PS:
本文遵循 风格建议指南 中的建议，通过 var 声明局部变量而非使用指定的类型。

## 默认值

在 Dart 中，未初始化以及可空类型的变量拥有一个默认的初始值 null。（如果你未迁移至 空安全，所有变量都为可空类型。）即便数字也是如此，因为在 Dart 中一切皆为对象，数字也不例外。

```dart
int? lineCount;
assert(lineCount == null);
```

Ps:
assert() 的调用将会在生产环境的代码中被忽略掉。在开发过程中，assert(condition) 将会在 条件判断 为 false 时抛出一个异常。

**若你启用了空安全，你必须在使用变量前初始化它的值。**

```dart
int lineCount = 0;
```

你并不需要在声明变量时初始化，只需在第一次用到这个变量前初始化即可。例如，下面的代码是正确的，因为 Dart 可以在 lineCount 被传递到 print() 时检测它是否为空:

```dart
int lineCount;

if (weLikeToCount) {
  lineCount = countLines();
} else {
  lineCount = 0;
}

print(lineCount);
```

PS:
顶级变量以及类变量是延迟初始化的，即检查变量的初始化会在它第一次被使用的时候完成。

## 延迟初始化变量

Dart 2.12 新增了 late 修饰符，这个修饰符可以在以下情况中使用：

* 声明一个非空变量，但不在声明时初始化。
* 延迟初始化一个变量。

通常 Dart 的语义分析会在一个已声明为非空的变量被使用前检查它是否已经被赋值，但有时这个分析会失败。例如：在检查顶级变量和实例变量时，分析通常无法判断它们是否已经被初始化，因此不会进行分析。

如果你确定这个变量在使用前就已经被声明，但 Dart 判断失误的话，你可以在声明变量的时候使用 late 修饰来解决这个问题。

```dart
late String description;

void main() {
  description = 'Feijoada!';
  print(description);
}
```

PS
若 late 标记的变量在使用前没有初始化，在变量被使用时会抛出运行时异常。

如果一个 late 修饰的变量在声明时就指定了初始化方法，那么它实际的初始化过程会发生在第一次被使用的时候。这样的延迟初始化在以下场景中会带来便利：

* Dart 认为这个变量可能在后文中没被使用，而且初始化时将产生较大的代价。

* 你正在初始化一个实例变量，它的初始化方法需要调用 this。

在下面这个例子中，如果 temperature 变量从未被使用的话，那么 readThermometer() 将永远不会被调用：

```dart
// This is the program's only call to readThermometer().
late String temperature = readThermometer(); // Lazily initialized.
```

## Final 和 Const

如果你不想更改一个变量，可以使用关键字 final 或者 const 修饰变量，这两个关键字可以替代 var 关键字或者加在一个具体的类型前。一个 final 变量只可以被赋值一次；一个 const 变量是一个编译时常量 (const 变量同时也是 final 的)。

::: tip
实例变量 可以是 final 的但不可以是 const，
实例变量：定义在类中但在任何方法之外。
:::

下面的示例中我们创建并设置两个 final 变量：

```dart
final name = 'Bob'; // Without a type annotation
final String nickname = 'Bobby';
```

你不能修改一个 final 变量的值：

```dart
//错误
name = 'Alice'; // Error: a final variable can only be set once.
```

使用关键字 const 修饰变量表示该变量为 编译时常量。**如果使用 const 修饰类中的变量，则必须加上 static 关键字**，即 static const（译者注：顺序不能颠倒）。在声明 const 变量时可以直接为其赋值，也可以使用其它的 const 变量为其赋值：

```dart
const bar = 1000000; // Unit of pressure (dynes/cm2)
const double atm = 1.01325 * bar; // Standard atmosphere
```

const 关键字不仅仅可以用来定义常量，还可以用来创建 常量值，该常量值可以赋予给任何变量。你也可以将构造函数声明为 const 的，这种类型的构造函数创建的对象是不可改变的。

```dart
var foo = const [];
final bar = const [];
const baz = []; // Equivalent to `const []`
```

如果使用初始化表达式为常量赋值可以省略掉关键字 const，比如上面的常量 baz 的赋值就省略掉了 const。

**没有使用 final 或 const 修饰的变量的值是可以被更改的，即使这些变量之前引用过 const 的值。**

```dart
foo = [1, 2, 3]; // Was const []
```

常量的值不可以被修改：

```dart 
//报错
baz = [42]; // Error: Constant variables can't be assigned a value.
```

你可以在常量中使用 [类型检查和强制类型转换]() (is 和 as)、 [集合中的 if]() 以及 [展开操作符]() (... 和 ...?)：

```dart
const Object i = 3; // Where i is a const Object with an int value...
const list = [i as int]; // Use a typecast.
const map = {if (i is int) i: 'int'}; // Use is and collection if.
const set = {if (list is List<int>) ...list}; // ...and a spread.
```

## 内置类型

Dart语言支持下列内容：

* Numbers(int,doublie)
* String(String)
* Booleans(bool)
* Lists(也被称为arrays)
* Sets(Set)
* Maps(Map)
* Runes(常用于在Characters API中进行字符替换) 
* Symbols(Symbol)
* The value null(Null)

使用字面量来创建对象也受到支持。例如 'This is a string' 是一个字符串字面量，true 是一个布尔字面量。

由于 Dart 中每个变量引用都指向一个对象（一个 类 的实例），通常也可以使用 构造器 来初始化变量。一些内置的类型有它们自己的构造器。例如你可以使用 Map() 来创建一个 map 对象。

## Numbers

Dart支持两种Number类型：

* int

整数值；长度不超过 64 位，具体取值范围 依赖于不同的平台。在 DartVM 上其取值位于 -263 至 263 - 1 之间。在 Web 上，整型数值代表着 JavaScript 的数字（64 位无小数浮点型），其允许的取值范围在 -253 至 253 - 1 之间。

* double

64 位的双精度浮点数字，且符合 IEEE 754 标准。

int 和 double 都是 num 的子类。 [num](https://api.dart.cn/stable/2.19.1/dart-core/num-class.html) 中定义了一些基本的运算符比如 +、-、*、/ 等，还定义了 abs()、ceil() 和 floor() 等方法（位运算符，比如 >> 定义在 int 中）。如果 num 及其子类不满足你的要求，可以查看 [dart:math](https://api.dart.cn/stable/2.19.1/dart-math/dart-math-library.html) 库中的 API。

整数是不带小数点的数字，下面是一些定义整数字面量的例子：

```dart
var x = 1;
var hex = 0xDEADBEEF;
```

如果一个数字包含了小数点，那么它就是浮点型的。下面是一些定义浮点数字面量的例子：

```dart
var y = 1.1;
var exponents = 1.42e5;
```

您还可以将变量声明为 num。如果这样做，变量 可以同时具有整数值和双精度值。

```dart
num x = 1; // x can have both int and double values
x += 2.5;
```

整型字面量将会在必要的时候自动转换成浮点数字面量：

```dart
double z = 1; // Equivalent to double z = 1.0.
```

下面是字符串和数字之间转换的方式：

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

整型支持传统的位移操作，比如移位（<<、>> 和 >>>）、补码 (~)、按位与 (&)、按位或 (|) 以及按位异或 (^)，例如：

```dart
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 | 4) == 7); // 0011 | 0100 == 0111
assert((3 & 4) == 0); // 0011 & 0100 == 0000
```

## String

Dart 字符串（String 对象）包含了 UTF-16 编码的字符序列。可以使用单引号或者双引号来创建字符串：

```dart
var s1 = '使用单引号创建字符串字面量。';
var s2 = "双引号也可以用于创建字符串字面量。";
var s3 = '使用单引号创建字符串时可以使用斜杠来转义那些与单引号冲突的字符串：\'。';
var s4 = "而在双引号中则不需要使用转义与单引号冲突的字符串：'";
```

在字符串中，请以 ${表达式} 的形式使用表达式，如果表达式是一个标识符，可以省略掉 {}。如果表达式的结果为一个对象，则 Dart 会调用该对象的 toString 方法来获取一个字符串。

```dart
var s = '字符串插值';

assert('Dart 有$s，使用起来非常方便。' == 'Dart 有字符串插值，使用起来非常方便。');
assert('使用${s.substring(3,5)}表达式也非常方便' == '使用插值表达式也非常方便。');
```

你可以使用 + 运算符或并列放置多个字符串来连接字符串：

```dart
var s1 = '可以拼接'
    '字符串'
    "即便它们不在同一行。";
assert(s1 == '可以拼接字符串即便它们不在同一行。');

var s2 = '使用加号 + 运算符' + '也可以达到相同的效果。';
assert(s2 == '使用加号 + 运算符也可以达到相同的效果。');
```

使用三个单引号或者三个双引号也能创建多行字符串：

```dart
var s1 = '''
你可以像这样创建多行字符串。
''';

var s2 = """这也是一个多行字符串。""";
```

在字符串前加上 r 作为前缀创建 “raw” 字符串（即不会被做任何处理（比如转义）的字符串）：

```dart
var s = r'在 raw 字符串中，转义字符串 \n 会直接输出 “\n” 而不是转义为换行。';
```

# 布尔类型

Dart 使用 bool 关键字表示布尔类型，布尔类型只有两个对象 true 和 false，两者都是编译时常量。

Dart 的类型安全不允许你使用类似 if (nonbooleanValue) 或者 assert (nonbooleanValue) 这样的代码检查布尔值。相反，你应该总是显示地检查布尔值，比如像下面的代码这样：

```dart
// Check for an empty string.
var fullName = '';
assert(fullName.isEmpty);

// Check for zero.
var hitPoints = 0;
assert(hitPoints <= 0);

// Check for null.
var unicorn;
assert(unicorn == null);

// Check for NaN.
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```

## Lists

数组 (Array) 是几乎所有编程语言中最常见的集合类型，在 Dart 中数组由 List 对象表示。通常称之为 List。

Dart 中的列表字面量是由逗号分隔的一串表达式或值并以方括号 ([]) 包裹而组成的。下面是一个 Dart List 的示例：

```dart
var list = [1, 2, 3];
```

:::tip
这里 Dart 推断出 list 的类型为 `List<int>`，如果往该数组中添加一个非 int 类型的对象则会报错
:::

List 的下标索引从 0 开始，第一个元素的下标为 0，最后一个元素的下标为 list.length - 1。你可以像 JavaScript 中的用法那样获取 Dart 中 List 的长度以及元素：

```dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```

在 List 字面量前添加 const 关键字会创建一个编译时常量：

```dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // This line will cause an error.
```

Dart 在 2.3 引入了 **扩展操作符（...）**和 **空感知扩展操作符（...?）**，它们提供了一种将多个元素插入集合的简洁方法。

例如，你可以使用扩展操作符（...）将一个 List 中的所有元素插入到另一个 List 中：

```dart 
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```

如果扩展操作符右边可能为 null ，你可以使用 null-aware 扩展操作符（...?）来避免产生异常：

```dart
var list2 = [0, ...?list];
assert(list2.length == 1);
```

Dart 还同时引入了 集合中的 if 和 集合中的 for 操作，在构建集合时，可以使用条件判断 (if) 和循环 (for)。

下面示例是使用 集合中的 if 来创建一个 List 的示例，它可能包含 3 个或 4 个元素：

```dart
var nav = ['Home', 'Furniture', 'Plants', if (promoActive) 'Outlet'];
```

下面是使用 集合中的 for 将列表中的元素修改后添加到另一个列表中的示例：

```dart
var listOfInts = [1, 2, 3];
var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];
assert(listOfStrings[1] == '#1');
```

## Sets

在 Dart 中，set 是一组特定元素的无序集合。 Dart 支持的集合由集合的字面量和 Set 类提供。

下面是使用 Set 字面量来创建一个 Set 集合的方法：

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

:::tip
Dart 推断 halogens 变量是一个 `Set<String>` 类型的集合，如果往该 Set 中添加类型不正确的对象则会报错。
:::

可以使用在 {} 前加上类型参数的方式创建一个空的 Set，或者将 {} 赋值给一个 Set 类型的变量：

```dart
var names = <String>{};
// Set<String> names = {}; // This works, too.
// var names = {}; // Creates a map, not a set.
```

:::tip
Set 还是 map? Map 字面量语法相似于 Set 字面量语法。因为先有的 Map 字面量语法，所以 {} 默认是 Map 类型。如果忘记在 {} 上注释类型或赋值到一个未声明类型的变量上，那么 Dart 会创建一个类型为 Map<dynamic, dynamic> 的对象。
:::

使用 add() 方法或 addAll() 方法向已存在的 Set 中添加项目：

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
```

使用 .length 可以获取 Set 中元素的数量：

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
```

可以在 Set 变量前添加 const 关键字创建一个 Set 编译时常量：

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
// constantSet.add('helium'); // This line will cause an error.
```

:::tip
从 Dart 2.3 开始，Set 可以像 List 一样支持使用扩展操作符（... 和 ...?）以及 Collection if 和 for 操作。
:::

## Maps

通常来说，Map 是用来关联 keys 和 values 的对象。其中键和值都可以是任何类型的对象。每个 键 只能出现一次但是 值 可以重复出现多次。 Dart 中 Map 提供了 Map 字面量以及 Map 类型两种形式的 Map。

下面是一对使用 Map 字面量创建 Map 的例子：

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

:::tip
Dart 将 gifts 变量的类型推断为 Map<String, String>，而将 nobleGases 的类型推断为 Map<int, String>。如果你向这两个 Map 对象中添加不正确的类型值，将导致运行时异常。
:::

你也可以使用 Map 的构造器创建 Map：

```dart
var gifts = Map<String, String>();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map<int, String>();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

:::tip
如果你之前是使用的 C# 或 Java 这样的语言，也许你想使用 `new Map()` 构造 Map 对象。但是在 Dart 中，`new` 关键词是可选的。(译者注：且不被建议使用)。
:::

向现有的 Map 中添加键值对与 JavaScript 的操作类似：

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds'; // Add a key-value pair
```

从一个 Map 中获取一个值的操作也与 JavaScript 类似：

```dart
var gifts = {'first': 'partridge'};
assert(gifts['first'] == 'partridge');
```

如果检索的 Key 不存在于 Map 中则会返回一个 null：

```dart
var gifts = {'first': 'partridge'};
assert(gifts['fifth'] == null);
```

使用 .length 可以获取 Map 中键值对的数量：

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```

在一个 Map 字面量前添加 const 关键字可以创建一个 Map 编译时常量：

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // This line will cause an error.
```

:::tip
Map 可以像 List 一样支持使用扩展操作符（... 和 ...?）以及集合的 if 和 for 操作。
:::

## Runes 与 grapheme clusters

在 Dart 中，[runes](https://api.dart.cn/stable/2.19.2/dart-core/Runes-class.html) 公开了字符串的 Unicode 码位。使用 [characters 包](https://pub.flutter-io.cn/packages/characters) 来访问或者操作用户感知的字符，也被称为 [Unicode (扩展) grapheme clusters](https://unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries)。

Unicode 编码为每一个字母、数字和符号都定义了一个唯一的数值。因为 Dart 中的**字符串是一个 UTF-16 的字符序列**，所以如果想要表示 32 位的 Unicode 数值则需要一种**特殊的语法**。

表示 Unicode 字符的常见方式是使用 \uXXXX，其中 XXXX 是一个四位数的 16 进制数字。例如心形字符（♥）的 Unicode 为 \u2665。对于不是四位数的 16 进制数字，需要使用大括号将其括起来。例如大笑的 emoji 表情（😆）的 Unicode 为 \u{1f600}。

如果你需要读写单个 Unicode 字符，可以使用 characters 包中定义的 characters getter。它将返回 Characters 对象作为一系列 grapheme clusters 的字符串。下面是使用 characters API 的样例：

```dart
import 'package:characters/characters.dart';

void main() {
  var hi = 'Hi 🇩🇰';
  print(hi);
  print(hi.runes);
  print('The end of the string: ${hi.substring(hi.length - 1)}');
  print('The last character: ${hi.characters.last}');
  
  
  // Surrogate pairs:
  for (final item in hi.runes) {
    print(item.toRadixString(16));
  }
}
```

输出取决于你的环境，大致类似于：

```sh
dart run bin/main.dart

Hi 🇩🇰
(72, 105, 32, 127465, 127472)
The end of the string: �
The last character: 🇩🇰
48
69
20
1f1e9
1f1f0
```

## Symbols

Symbol 表示 Dart 中声明的操作符或者标识符。你几乎不会需要 Symbol，但是它们对于那些通过名称引用标识符的 API 很有用，因为代码压缩后，尽管标识符的名称会改变，但是它们的 Symbol 会保持不变。

可以使用在标识符前加 # 前缀来获取 Symbol：

```dart
#radix
#bar
```

Symbol 字面量是编译时常量。

## 函数

Dart 是一种真正面向对象的语言，所以即便函数也是对象并且类型为 Function，**这意味着函数可以被赋值给变量或者作为其它函数的参数。**你也可以像调用函数一样调用 Dart 类的实例。

下面是定义一个函数的例子：

```dart
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

虽然高效 Dart 指南建议在 公开的 API 上定义返回类型，不过即便不定义，该函数也依然有效：

```dart
bool isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

如果函数体内只包含一个表达式，你可以使用简写语法：

```
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

**语法 => ***表达式*** 是 ***{ return 表达式;}***的简写，=>有时也称为箭头函数**

:::tip
在=>与;之间只能是表达式而非语句。比如你不能将一个if语句放在其中，但是可以放置条件表达式。
:::

## 参数

函数可以有两种形式的参数：**必要参数** 和 **可选参数**。必要参数定义在参数列表前面，可选参数则定义在必要参数后面。可选参数可以是 **命名的** 或 **位置的**。

:::tip
某些 API（特别是 Flutter 控件的构造器）只使用命名参数，即便参数是强制性的。
:::

向函数传入参数或者定义函数参数时，可以使用 尾逗号。

* 命名参数

命名参数默认为可选参数，除非他们被特别标记为 required。

定义函数时，使用 {参数1, 参数2, …} 来指定命名参数：如果你没有提供一个默认值，也没有使用 required 标记的话，那么它一定可空的类型，因为他们的默认值会是 null：

```dart
// Sets the [bold] and [hidden] flags ...
void enableFlags({bool? bold, bool? hidden}) {...}
```

当调用函数时，你可以使用 参数名: 参数值 指定一个命名参数的值。例如：

```dart
enableFlags(bold: true, hidden: false);
```

你可以使用 = 来为一个命名参数指定除了 null 以外的默认值。指定的默认值必须要为编译时的常量，例如：

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold = false, bool hidden = false}) {...}

// bold will be true; hidden will be false.
enableFlags(bold: true);
```

如果你希望一个命名参数是强制需要使用的，调用者需要提供它的值，则你可以使用 required 进行声明：

```dart
const Scrollbar({super.key, required Widget child});
```

当你创建一个不带 child 参数的 Scrollbar 时，分析器就会报告这里出了问题。

```dart{3}
//一个标记了 required 的参数仍然是可空的类型:(可以为空或其它值不能没有值)

const Scrollbar({super.key, required Widget? child});
```

尽管将位置参数放在最前面通常比较合理，但你也可以将命名参数放在参数列表的任意位置，让整个调用的方式看起来更适合你的 API：

```dart
repeat(times: 2, () {
  ...
});
```

* 可选的位置参数

使用 [] 将一系列参数包裹起来，即可将其标记为位置参数，因为它们的默认值是 null，所以如果你没有提供默认值的话，它们的类型必须得是允许为空 (nullable) 的类型。

```dart
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

下面是不使用可选参数调用上述函数的示例

```dart
assert(say('Bob', 'Howdy') == 'Bob says Howdy');
```

下面是使用可选参数调用上述函数的示例：

```dart
assert(say('Bob', 'Howdy', 'smoke signal') ==
    'Bob says Howdy with a smoke signal');
```

你可以使用 = 来为一个位置可选参数指定除了 null 以外的默认值。指定的默认值必须要为编译时的常量，例如：

```dart
String say(String from, String msg, [String device = 'carrier pigeon']) {
  var result = '$from says $msg with a $device';
  return result;
}

assert(say('Bob', 'Howdy') == 'Bob says Howdy with a carrier pigeon');
```

## main()函数

每个 Dart 程序都必须有一个 `main()` 顶级函数作为程序的入口， `main()` 函数返回值为 `void` 并且有一个 `List<String>` 类型的可选参数。

下面是一个简单 main() 函数：

```dart
void main() {
  print('Hello, World!');
}
```

下面是使用命令行访问带参数的 main() 函数示例：

```dart
// Run the app like this: dart args.dart 1 test
void main(List<String> arguments) {
  print(arguments);

  assert(arguments.length == 2);
  assert(int.parse(arguments[0]) == 1);
  assert(arguments[1] == 'test');
}
```