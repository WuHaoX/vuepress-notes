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

## 函数是一级对象

可以将函数作为参数传递给另一个函数。例如：

```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// Pass printElement as a parameter.
list.forEach(printElement);
```

你也可以将函数赋值给一个变量，比如：

```dart
var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```

该示例中使用了匿名函数。

## 匿名函数

大多数方法都是有名字的，比如 main() 或 printElement()。你可以创建一个没有名字的方法，称之为 匿名函数、 Lambda 表达式 或 Closure 闭包。你可以将匿名方法赋值给一个变量然后使用它，比如将该变量添加到集合或从中删除。

匿名方法看起来与命名方法类似，在括号之间可以定义参数，参数之间用逗号分割。

后面大括号中的内容则为函数体：

```dart
([[类型] 参数[, …]]) {
  函数体;
};
```

下面代码定义了只有一个参数 item 且没有参数类型的匿名方法。 List 中的每个元素都会调用这个函数，打印元素位置和值的字符串：

```dart
const list = ['apples', 'bananas', 'oranges'];
list.map((item) {
  return item.toUpperCase();
}).forEach((item) {
  print('$item: ${item.length}');
});
```

如果函数体内只有一行返回语句，你可以使用胖箭头缩写法。

```dart
list
    .map((item) => item.toUpperCase())
    .forEach((item) => print('$item: ${item.length}'));
```

## 词法作用域

Dart 是词法有作用域语言，变量的作用域在写代码的时候就确定了，大括号内定义的变量只能在大括号内访问，与 Java 类似。

下面是一个嵌套函数中变量在多个作用域中的示例：

```dart
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
```

注意 `nestedFunction()` 函数可以访问包括顶层变量在内的所有的变量。

## 词法闭包

闭包 即一个函数对象，即使函数对象的调用在它原始作用域之外，依然能够访问在它词法作用域内的变量。

闭包 即一个函数对象，即使函数对象的调用在它原始作用域之外，依然能够访问在它词法作用域内的变量。

```dart
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```

## 返回值

所有的函数都有返回值。没有显示返回语句的函数最后一行默认为执行 return null。

```dart
foo() {}

assert(foo() == null);
```

### 运算符

Dart 支持下表所示的操作符，它也体现了 Dart 运算符的关联性和 优先级 的从高到低的顺序。这也是 Dart 运算符关系的近似值。你可以将这些运算符实现为 一个类的成员。

|        Description       |                            Operator                            | Associativity |
|:------------------------:|:--------------------------------------------------------------:|:-------------:|
|       unary postfix      |       expr++    expr--    ()    []    ?[]    .    ?.    !      |      None     |
|       unary prefix       | -expr    !expr    ~expr    ++expr    --expr      await expr    |      None     |
|      multiplicative      |                         *    /    %  ~/                        |      Left     |
|         additive         |                             +    -                             |      Left     |
|           shift          |                         <<    >>    >>>                        |      Left     |
|        bitwise AND       |                                &                               |      Left     |
|        bitwise XOR       |                                ^                               |      Left     |
|        bitwise OR        |                               \|                               |      Left     |
| relational and type test |              >=    >    <=    <    as    is    is!             |      None     |
|         equality         |                           ==    !=                             |      None     |
|        logical AND       |                               &&                               |      Left     |
|        logical OR        |                              \|\|                              |      Left     |
|          if null         |                               ??                               |      Left     |
|        conditional       |                      expr1 ? expr2 : expr3                     |     Right     |
|          cascade         |                            ..    ?..                           |      Left     |
|        assignment        |            =    *=    /=   +=   -=   &=   ^=   etc.            |     Right     |

:::tip
上述的表格只是作为一个比较实用的指南，操作符的优先级和关联性概念是从编程语言的语法中整理发现的。
:::

一旦你使用了运算符，就创建了表达式。下面是一些运算符表达式的示例：

```dart
a++
a + b
a = b
a == b
c ? a : b
a is T
```

在 运算符表 中，运算符的优先级按先后排列，即第一行优先级最高，最后一行优先级最低，而同一行中，最左边的优先级最高，最右边的优先级最低。例如：% 运算符优先级高于 == ，而 == 高于 &&。根据优先级规则，那么意味着以下两行代码执行的效果相同：

```dart
括号提高了可读性。
if ((n % i == 0) && (d % i == 0)) ...

更难阅读，但等效。
if (n % i == 0 && d % i == 0) ...
```

## 算术运算符

Dart 支持常用的算术运算符：

|    +    |                     加                     |
|:-------:|:------------------------------------------:|
|    -    |                     减                     |
| -表达式 | 一元负, 也可以作为反转（反转表达式的符号） |
|    *    |                     乘                     |
|    /    |                     除                     |
|    ~/   |                  除并取整                  |
|    %    |                    取模                    |

示例：
```dart
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // Result is a double
assert(5 ~/ 2 == 2); // Result is an int
assert(5 % 2 == 1); // Remainder

assert('5/2 = ${5 ~/ 2} r ${5 % 2}' == '5/2 = 2 r 1');
```

Dart 还支持自增自减操作。

```dart
| Operator++var | var = var + 1 (表达式的值为 var + 1) |
|:-------------:|:------------------------------------:|
|     var++     |   var = var + 1 (表达式的值为 var)   |
|     --var     | var = var - 1 (表达式的值为 var - 1) |
|     var--     |   var = var - 1 (表达式的值为 var)   |
```

示例：

```dart
int a;
int b;

a = 0;
b = ++a; // Increment a before b gets its value.
assert(a == b); // 1 == 1

a = 0;
b = a++; // Increment a AFTER b gets its value.
assert(a != b); // 1 != 0

a = 0;
b = --a; // Decrement a before b gets its value.
assert(a == b); // -1 == -1

a = 0;
b = a--; // Decrement a AFTER b gets its value.
assert(a != b); // -1 != 0
```

## 关系运算符

下表列出了关系运算符及含义：

| Operator== |   相等   |
|:----------:|:--------:|
|     !=     |   不等   |
|      >     |   大于   |
|      <     |   小于   |
|     >=     | 大于等于 |
|     <=     | 小于等于 |

要判断两个对象 x 和 y 是否表示相同的事物使用 == 即可。（在极少数情况下，可能需要使用 `identical()` 函数来确定两个对象是否完全相同）。下面是 == 运算符的一些规则：

1. 当 x 和 y 同时为空时返回 true，而只有一个为空时返回 false。

2. 返回对 x 调用 == 方法的结果，参数为 y。（像 == 这样的操作符是对左侧内容进行调用的。

下面的代码给出了每一种关系运算符的示例：

```dart
assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);
```

## 类型判断运算符

| Operator |             Meaning            |
|:--------:|:------------------------------:|
|    as    | 类型转换（也用作指定 库前缀)） |
|    is    |  如果对象是指定类型则返回 true |
|    is!   | 如果对象是指定类型则返回 false |

当且仅当 obj 实现了 T 的接口，obj is T 才是 true。例如 obj is Object 总为 true，因为所有类都是 Object 的子类。

仅当你确定这个对象是该类型的时候，你才可以使用 as 操作符可以把对象转换为特定的类型。例如：

```dart
(employee as Person).firstName = 'Bob';
```

如果你不确定这个对象类型是不是 T，请在转型前使用 is T 检查类型。

```dart
if (employee is Person) {
  // Type check
  employee.firstName = 'Bob';
}
```

:::tip
上述两种方式是有区别的：如果 employee 为 null 或者不为 Person 类型，则第一种方式将会抛出异常，而第二种不会。
:::

```dart
// Assign value to a
a = value;
// 如果 b 为空，则为 b 赋值;否则，b 保持不变
b ??= value;
```

像 += 这样的赋值运算符将算数运算符和赋值运算符组合在了一起。

|  = |  *= |  %= | >>>= |  ^= |
|:--:|:---:|:---:|:----:|:---:|
| += |  /= | <<= |  &=  | \|= |
| -= | ~/= | >>= |      |     |

下表解释了复合运算符的原理：

|        场景       | 复合运算 | 等效表达式 |
|:-----------------:|:--------:|:----------:|
| 假设有运算符 op： |  a op= b | a = a op b |
|       示例：      |  a += b  |  a = a + b |

下面的例子展示了如何使用赋值以及复合赋值运算符：

```dart
var a = 2; // Assign using =
a *= 3; // Assign and multiply: a = a * 3
assert(a == 6);
```

## 逻辑运算符

使用逻辑运算符你可以反转或组合布尔表达式。

|  运算符 |                            描述                           |
|:-------:|:---------------------------------------------------------:|
| !表达式 | 对表达式结果取反（即将 true 变为 false，false 变为 true） |
|   \|\|  |                           逻辑或                          |
|    &&   |                           逻辑与                          |

下面是使用逻辑表达式的示例：

```dart
if (!done && (col == 0 || col == 3)) {
  // ...Do something...
}
```

## 按位和移位运算符

在 Dart 中，二进制位运算符可以操作二进制的某一位，但仅适用于整数。

|  运算符 |                     描述                    |
|:-------:|:-------------------------------------------:|
|    &    |                    按位与                   |
|    \|   |                    按位或                   |
|    ^    |                   按位异或                  |
| ~表达式 | 按位取反（即将 “0” 变为 “1”，“1” 变为 “0”） |
|    <<   |                    位左移                   |
|    >>   |                    位右移                   |
|   >>>   |                  无符号右移                 |

下面是使用按位和移位运算符的示例：

```dart
final value = 0x22;
final bitmask = 0x0f;

assert((value & bitmask) == 0x02); // AND
assert((value & ~bitmask) == 0x20); // AND NOT
assert((value | bitmask) == 0x2f); // OR
assert((value ^ bitmask) == 0x2d); // XOR
assert((value << 4) == 0x220); // Shift left
assert((value >> 4) == 0x02); // Shift right
assert((value >>> 4) == 0x02); // Unsigned shift right
assert((-value >> 4) == -0x03); // Shift right
assert((-value >>> 4) > 0); // Unsigned shift right
```

:::tip
>>> 操作符在 2.14 以上的 Dart 版本 中可用。
:::

## 条件表达式

Dart 有两个特殊的运算符可以用来替代 if-else 语句：

```dart
条件 ? 表达式 1 : 表达式 2
```

如果条件为 true，执行表达式 1并返回执行结果，否则执行表达式 2 并返回执行结果。

```dart
表达式 1 ?? 表达式 2
```

如果表达式 1 为非 null 则返回其值，否则执行表达式 2 并返回其值。

根据布尔表达式确定赋值时，请考虑使用 ? 和 :

```dart
var visibility = isPublic ? 'public' : 'private';
```

如果赋值是根据判定是否为 null 则考虑使用 ??。

```dart
String playerName(String? name) => name ?? 'Guest';
```

上述示例还可以写成至少下面两种不同的形式，只是不够简洁：

```dart
// Slightly longer version uses ?: operator.
String playerName(String? name) => name != null ? name : 'Guest';

// Very long version uses if-else statement.
String playerName(String? name) {
  if (name != null) {
    return name;
  } else {
    return 'Guest';
  }
}
```

## 级联运算符

级联运算符 (.., ?..) 可以让你在同一个对象上连续调用多个对象的变量或方法。

比如下面的代码：

```dart
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;
```

前面的示例等效于以下代码：

```dart
var paint = Paint();
paint.color = Colors.black;
paint.strokeCap = StrokeCap.round;
paint.strokeWidth = 5.0;
```

如果级联操作的对象可能为 null，比如下面的代码：

```dart
querySelector('#confirm') // Get an object.
  ?..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'))
  ..scrollIntoView();
```

:::tip
?.. 运行在 2.12 和以上的 版本 中可用。
:::

上面的代码相当于：

```dart
var button = querySelector('#confirm');
button?.text = 'Confirm';
button?.classes.add('important');
button?.onClick.listen((e) => window.alert('Confirmed!'));
button?.scrollIntoView();
```

级联运算符可以嵌套，例如：

```dart
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
```

在返回对象的函数中谨慎使用级联操作符。例如，下面的代码是错误的：

```dart
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: method 'write' isn't defined for 'void'.
```

:::tip
上述代码中的 sb.write() 方法返回的是 void，返回值为 void 的方法则不能使用级联运算符。

严格来说 .. 级联操作并非一个运算符而是 Dart 的特殊语法。
:::

## 其他运算符

大多数其它的运算符，已经在其它的示例中使用过：

| 运算符 |      名字     |                                                       描述                                                      |
|:------:|:-------------:|:---------------------------------------------------------------------------------------------------------------:|
|   ()   |    使用方法   |                                                 代表调用一个方法                                                |
|   []   |   访问 List   |                                            访问 List 中特定位置的元素                                           |
|   ?[]  | 判空访问 List |                                  左侧调用者不为空时，访问 List 中特定位置的元素                                 |
|    .   |    访问成员   |                                                    成员访问符                                                   |
|   ?.   |  条件访问成员 | 与上述成员访问符类似，但是左边的操作对象不能为 null，例如 foo?.bar，如果 foo 为 null 则返回 null ，否则返回 bar |
|    !   |  空断言操作符 | 将表达式的类型转换为其基础类型，如果转换失败会抛出运行时异常。例如 foo!.bar，如果 foo 为 null，则抛出运行时异常 |

## 流程控制语句

你可以使用下面的语句来控制 Dart 代码的执行流程：

* if 和 else

* for 循环

* while 和 do-while 循环

* break 和 continue

* switch 和 case

* assert

使用 try-catch 和 throw 也能影响控制流，

## If 和 Else

Dart 支持 if - else 语句，其中 else 是可选的，比如下面的例子。

```dart
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
```
:::warning
Dart 的 if 语句中的条件必须是布尔值而不能为其它类型。
:::

## For 循环

你可以使用标准的 for 循环进行迭代。例如：

```dart
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
```

在 Dart 语言中，for 循环中的闭包会自动捕获循环的 索引值 以避免 JavaScript 中一些常见的陷阱。假设有如下代码：

```dart
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(i);
}

for (final c in callbacks) {
  print(c);
}
```

可迭代对象同时可以使用 forEach() 方法作为另一种选择：

```dart
var collection = [1, 2, 3];
collection.forEach(print); // 1 2 3
```

## While 和 Do-While

while 循环会在执行循环体前先判断条件：

```dart
while (!isDone()) {
  doSomething();
}
```

do-while 循环则会 先执行一遍循环体 再判断条件：

```dart
do {
  printLine();
} while (!atEndOfPage());
```

## Break 和 Continue

使用 break 可以中断循环：

```dart
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
```

使用 continue 可以跳过本次循环直接进入下一次循环：

```dart
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```

如果你正在使用诸如 List 或 Set 之类的 Iterable 对象，你可以用以下方式重写上述例子:

```dart
candidates
    .where((c) => c.yearsExperience >= 5)
    .forEach((c) => c.interview());
```

## Switch 和 Case

Switch 语句在 Dart 中使用 == 来比较整数、字符串或编译时常量，比较的两个对象必须是同一个类型且不能是子类并且没有重写 == 操作符。 枚举类型非常适合在 Switch 语句中使用。

:::tip
Dart 中的 Switch 语句仅适用于有限的情况，比如使用解释器和扫描器的场景。
:::

每一个非空的 case 子句都必须有一个 break 语句，也可以通过 continue、throw 或者 return 来结束非空 case 语句。

不匹配任何 case 语句的情况下，会执行 default 子句中的代码：

```dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}
```

下面的例子忽略了 case 子句的 break 语句，因此会产生错误：

```dart
var command = 'OPEN';
switch (command) {
  case 'OPEN':
    executeOpen();
    // ERROR: Missing break

  case 'CLOSED':
    executeClosed();
    break;
}
```

但是，Dart 支持空的 case 语句，允许其以 fall-through 的形式执行。

```dart
var command = 'CLOSED';
switch (command) {
  case 'CLOSED': // Empty case falls through.
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```

在非空 case 语句中想要实现 fall-through 的形式，可以使用 continue 语句配合 label 的方式实现:

```dart
var command = 'CLOSED';
switch (command) {
  case 'CLOSED':
    executeClosed();
    continue nowClosed;
  // Continues executing at the nowClosed label.

  nowClosed:
  case 'NOW_CLOSED':
    // Runs for both CLOSED and NOW_CLOSED.
    executeNowClosed();
    break;
}
```

每个 case 子句都可以有局部变量且仅在该 case 语句内可见。

## 断言

在开发过程中，可以在条件表达式为 false 时使用 — assert(条件, 可选信息); — 语句来打断代码的执行。你可以在本文中找到大量使用 assert 的例子。

```dart
// Make sure the variable has a non-null value.
assert(text != null);

// Make sure the value is less than 100.
assert(number < 100);

// Make sure this is an https URL.
assert(urlString.startsWith('https'));
```

assert 的第二个参数可以为其添加一个字符串消息。

```dart
assert(urlString.startsWith('https'),
    'URL ($urlString) should start with "https".');
```

assert 的第一个参数可以是值为布尔值的任何表达式。如果表达式的值为 true，则断言成功，继续执行。如果表达式的值为 false，则断言失败，抛出一个 AssertionError 异常。

如何判断断言是否生效？断言是否生效依赖开发工具和使用的框架：

* Flutter 在 调试模式 时生效。

* 一些开发工具比如 [webdev serve][] 通常情况下是默认生效的。

* 其他一些工具，比如 dart run 以及 [dart compile js][] 通过在运行 Dart 程序时添加命令行参数 --enable-asserts 使 assert 生效。

在生产环境代码中，断言会被忽略，与此同时传入 assert 的参数不被判断。

## 异常

Dart 代码可以抛出和捕获异常。异常表示一些未知的错误情况，如果异常没有捕获则会被抛出从而导致抛出异常的代码终止执行。

与 Java 不同的是，Dart 的所有异常都是非必检异常，方法不必声明会抛出哪些异常，并且你也不必捕获任何异常。

Dart 提供了 Exception 和 Error 两种类型的异常以及它们一系列的子类，你也可以定义自己的异常类型。但是在 Dart 中可以将任何非 null 对象作为异常抛出而不局限于 Exception 或 Error 类型。

## 抛出异常

下面是关于抛出或者 引发 异常的示例：

```dart
throw FormatException('Expected at least 1 section');
```

你也可以抛出任意的对象：

```dart
throw 'Out of llamas!';
```

因为抛出异常是一个表达式，所以可以在 => 语句中使用，也可以在其他使用表达式的地方抛出异常：

```dart
void distanceTo(Point other) => throw UnimplementedError();
```

## 捕获异常

捕获异常可以避免异常继续传递（重新抛出异常除外）。捕获一个异常可以给你处理它的机会：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

对于可以抛出多种异常类型的代码，也可以指定多个 catch 语句，每个语句分别对应一个异常类型，如果 catch 语句没有指定异常类型则表示可以捕获任意异常类型：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```

如上述代码所示可以使用 `on` 或 `catch` 来捕获异常，使用 `on` 来指定异常类型，使用 `catch` 来捕获异常对象，两者可同时使用。

你可以为 catch 方法指定两个参数，第一个参数为抛出的异常对象，第二个参数为栈信息 StackTrace 对象：

```dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

关键字 rethrow 可以将捕获的异常再次抛出：

```dart
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // Runtime error
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // Allow callers to see the exception.
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
```

## Finally

无论是否抛出异常，finally 语句始终执行，如果没有指定 catch 语句来捕获异常，则异常会在执行完 finally 语句后抛出：

```dart
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```

finally 语句会在任何匹配的 catch 语句后执行：

```dart
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```

## 类