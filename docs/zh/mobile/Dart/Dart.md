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
name = 'Alice'; // Error: a final variable can only be set once.
```

使用关键字 const 修饰变量表示该变量为 编译时常量。**如果使用 const 修饰类中的变量，则必须加上 static 关键字**，即 static const（译者注：顺序不能颠倒）。在声明 const 变量时可以直接为其赋值，也可以使用其它的 const 变量为其赋值：