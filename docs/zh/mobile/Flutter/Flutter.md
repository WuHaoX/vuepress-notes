# **Flutter笔记**

## 说明

这是一篇关于Flutter的笔记，出自《Flutter实战*第二版》作者杜文（网名wendux）创作的一本系统介绍Flutter技术的中文书籍。如果有条件可以去作者的[电子版](https://book.flutterchina.club/#%E5%85%B3%E4%BA%8E%E9%9A%8F%E4%B9%A6%E6%BA%90%E7%A0%81)支持一波作者。

笔者只是为了加强知识记忆写下了这篇笔记，笔者本身还是非常的菜。如果你想更好的学习还是建议去读[《Flutter实战*第二版》](https://book.flutterchina.club/#%E5%85%B3%E4%BA%8E%E9%9A%8F%E4%B9%A6%E6%BA%90%E7%A0%81)，毕竟一千个人中就有一千个哈姆雷特。

# **第一章：起步**

## **1.1 移动端开发技术简介**

了解以下之前的技术

### **1.1.1 原生开发与跨平台技术**

1. **原生开发**

使用相应移动平台支持的开发工具和语言，直接调用系统提供的SDK API。比如Android使用Java或Kotlin语言直接调用Android SDK开发的应用程序；iOS使用Objective-c或Swift语言直接调用iOS SDK开发应用程序。原生开发主要优势：

* 可访问平台的全部功能（GPS等等）；
* 速度块、性能高、可以实现复杂动画及绘制

缺点：

* 平台固定，开发成本高；不同平台必须维护不同代码；
* 内容固定，动态化弱，多数情况下有新功能更新时只能发版；

2. **跨平台技术简介**

跨平台框架，根据原理，主要分为三类：

* H5 + 原生 (Cordova、Ionic、微信小程序)
* Javascript开发 + 原生渲染 (React Native、Weex)
* 自绘UI + 原生 (Qt for mobile、Flutter)

### **1.1.2 跨端技术简介**

1. **H5 + 原生**

这类框架主要原理就是将 App 中需要动态变动的内容通过HTML5（简称 H5）来实现，通过原生的网页加载控件WebView （Android）或 WKWebView（iOS）来加载（以后若无特殊说明，我们用WebView来统一指代 Android 和 iOS 中的网页加载控件）。这种方案中，H5 部分是可以随时改变而不用发版，动态化需求能满足；同时，由于 H5 代码只需要一次开发，就能同时在 Android 和 iOS 两个平台运行，这也可以减小开发成本，也就是说，H5 部分功能越多，开发成本就越小。我们称这种 H5 + 原生 的开发模式为混合开发 ，采用混合模式开发的App我们称之为混合应用或 HTMLybrid App ，如果一个应用的大多数功能都是 H5 实现的话，我们称其为 Web App 。

目前国内各家公司小程序应用层的开发技术栈是 Web 技术栈，而底层渲染方式基本都是 WebView 和原生相结合的方式。

2. **混合开发技术点**

原生开发可以访问平台所有功能，而混合开发中，H5代码是运行在 WebView 中，而 WebView 实质上就是一个浏览器内核，其 JavaScript 依然运行在一个权限受限的沙箱中，所以对于大多数系统能力都没有访问权限，如无法访问文件系统、不能使用蓝牙等。所以，对于 H5 不能实现的功能，就需要原生去做了。

混合框架一般都会在原生代码中预先实现一些访问系统能力的 API ， 然后暴露给 WebView 以供 JavaScript 调用。这样一来，WebView 中 JavaScript 与原生 API 之间就需要一个通信的桥梁，主要负责 JavaScript 与原生之间传递调用消息，而消息的传递必须遵守一个标准的协议，它规定了消息的格式与含义，我们把依赖于 WebView 的用于在 JavaScript 与原生之间通信并实现了某种消息传输协议的工具称之为 **WebView JavaScript Bridge** , 简称 **JsBridge**，它也是混合开发框架的核心。

混合应用无非就是在第一步中预先实现一系列 API 供 JavaScript 调用，让 JavaScript 有访问系统功能的能力。

3. **小结**

混合应用的优点是：动态内容可以用 H5开发，而H5是Web 技术栈，Web技术栈生态开放且社区资源丰富，整体开发效率高。缺点是性能体验不佳，对于复杂用户界面或动画，WebView 有时会不堪重任。

### **1.1.3 React Native、Weex**

React Native （简称 RN ）是 Facebook 于 2015 年 4 月开源的跨平台移动应用开发框架，RN 使用JSX 语言（扩展后的 JavaScript，主要是可以在 JavaScript 中写 HTML标签）和 CSS 来开发移动应用。

React 是一个响应式的 Web 框架，我们先了解一下两个重要的概念：DOM 树与响应式编程。

1. **DOM树与控件树**

文档对象模型（Document Object Model，简称DOM），是 W3C 组织推荐的处理可扩展标志语言的标准编程接口，一种独立于平台和语言的方式访问和修改一个文档的内容和结构。换句话说，这是表示和处理一个 HTML 或XML 文档的标准接口。简单来说，DOM 就是文档树，与用户界面控件树对应，在前端开发中通常指 HTML 对应的渲染树，但广义的 DOM 也可以指 Android 中的 XML 布局文件对应的控件树，而术语DOM操作就是指直接来操作渲染树（或控件树）， 因此，可以看到其实 DOM 树和控件树是等价的概念，只不过前者常用于 Web 开发中，而后者常用于原生开发中。

2. **响应式编程**

React 中提出一个重要思想：状态改变则UI随之自动改变。而 React 框架本身就是响应用户状态改变的事件而执行重新构建用户界面的工作，这就是典型的 响应式 编程范式，下面我们总结一下 React 中响应式原理：

* 开发者只需关注状态转移（数据），当状态发生变化，React 框架会自动根据新的状态重新构建UI。

* React 框架在接收到用户状态改变通知后，会根据当前渲染树，结合最新的状态改变，通过 Diff 算法，计算出树中变化的部分，然后只更新变化的部分（DOM操作），从而避免整棵树重构，提高性能。

值得注意的是，在第二步中，状态变化后 React 框架并不会立即去计算并渲染 DOM 树的变化部分，相反，React会在 DOM 树的基础上建立一个抽象层，即虚拟DOM树，对数据和状态所做的任何改动，都会被自动且高效的同步到虚拟 DOM ，最后再批量同步到真实 DOM 中，而不是每次改变都去操作一下DOM。

为什么不能每次改变都直接去操作 DOM 树？这是因为在浏览器中每一次 DOM 操作都有可能引起浏览器的重绘或回流（重新排版布局，确定 DOM 节点的大小和位置）：

1. 如果 DOM 只是外观风格发生变化，如颜色变化，会导致浏览器重绘界面。
2. 如果 DOM 树的结构发生变化，如尺寸、布局、节点隐藏等导致，浏览器就需要回流。

而浏览器的重绘和回流都是比较昂贵的操作，如果每一次改变都直接对 DOM 进行操作，这会带来性能问题，而批量操作只会触发一次 DOM 更新，会有更高的性能。

:::tip
思考题：Diff操作和DOM批量更新难道不应该是浏览器的职责吗？第三方框架中去做合不合适？

笔者认为浏览器如果Diff操作和DOM批量更新交给浏览器去做反而限制了开发者，react和vue都是先用虚拟DOM再去操作真实DOM，但细节却不一样。在react中，当状态发生改变时，组件树就会自顶向下的全diff, 重新render页面， 重新生成新的虚拟dom tree， 新旧dom tree进行比较， 进行patch打补丁方式，局部更新dom。vue会跟踪每一个组件的依赖关系，局部渲染组件树而不需要重新渲染整个组件树。
:::

3. **React Native**

上文已经提到 React Native 是 React 在原生移动应用平台的衍生产物，那两者主要的区别是什么呢？其实，主要的区别在于虚拟 DOM 映射的对象是什么。React中虚拟 DOM 最终会映射为**浏览器 DOM 树**，而 RN 中虚拟 DOM会通过 JavaScriptCore 映射为**原生控件**。

JavaScriptCore 是一个JavaScript解释器，它在React Native中主要有两个作用：

1. 为 JavaScript 提供运行环境。
2. 是 JavaScript 与原生应用之间通信的桥梁，作用和 JsBridge 一样，事实上，在 iOS 中，很多 JsBridge 的实现都是基于 JavaScriptCore 。

而 RN 中将虚拟 DOM 映射为原生控件的过程主要分两步：

1. 布局消息传递； 将虚拟 DOM 布局信息传递给原生；
2. 原生根据布局信息通过对应的原生控件渲染；

至此，React Native 便实现了跨平台。 相对于混合应用，由于React Native是 原生控件渲染，所以性能会比混合应用中 H5 好一些，同时 React Native 提供了很多原生组件对应的 Web 组件，大多数情况下开发者只需要使用 Web 技术栈 就能开发出 App

4. **Weex**

Weex 是阿里巴巴于 2016 年发布的跨平台移动端开发框架，思想及原理和 React Native 类似，底层都是通过原生渲染的，不同是应用层开发语法 （即 DSL，Domain Specific Language）：Weex 支持 Vue 语法和 Rax 语法，Rax 的 DSL(Domain Specific Language) 语法是基于 React JSX 语法而创造，而 RN 的 DSL 是基于 React 的，不支持 Vue。


:::tip
扩展：有消息称Weex 2.0版本可能像Flutter一样，改为自绘引擎+原生模式，但笔者写下这篇笔记时还暂时没有消息，主要还是因为Weex的生态问题。
:::

5. **小结**

JavaScript 开发 + 原生渲染 的方式主要优点如下：

1. 采用 Web 开发技术栈，社区庞大、上手快、开发成本相对较低。
2. 原生渲染，性能相比 H5 提高很多。
3. 动态化较好，支持热更新。

不足：

1. 渲染时需要 JavaScript 和原生之间通信，在有些场景如拖动可能会因为通信频繁导致卡顿。
2. JavaScript 为脚本语言，执行时需要解释执行 （这种执行方式通常称为 JIT，即 Just In Time，指在执行时实时生成机器码），执行效率和编译类语言（编译类语言的执行方式为 AOT ，即 Ahead Of Time，指在代码执行前已经将源码进行了预处理，这种预处理通常情况下是将源码编译为机器码或某种中间码）仍有差距。
3. 由于渲染依赖原生控件，不同平台的控件需要单独维护，并且当系统更新时，社区控件可能会滞后；除此之外，其控件系统也会受到原生UI系统限制，例如，在 Android 中，手势冲突消歧规则是固定的，这在使用不同人写的控件嵌套时，手势冲突问题将会变得非常棘手。这就会导致，如果需要自定义原生渲染组件时，开发和维护成本过高。

### **1.1.4 Qt Mobile**

1. **自绘UI + 原生**

自绘UI + 原生。这种技术的思路是：通过在不同平台实现一个统一接口的渲染引擎来绘制UI，而不依赖系统原生控件，所以可以做到不同平台UI的一致性。

注意，**自绘引擎解决的是 UI 的跨平台问题，如果涉及其他系统能力调用，依然要涉及原生开发。**这种平台技术的优点如下：

1. 性能高；由于自绘引擎是直接调用系统API来绘制UI，所以性能和原生控件接近。

2. 灵活、组件库易维护、UI外观保真度和一致性高；由于UI渲染不依赖原生控件，也就不需要根据不同平台的控件单独维护一套组件库，所以代码容易维护。由于组件库是同一套代码、同一个渲染引擎，所以在不同平台，组件显示外观可以做到高保真和高一致性；另外，由于不依赖原生控件，也就不会受原生布局系统的限制，这样布局系统会非常灵活。

不足：

1. 动态性不足；为了保证UI绘制性能，自绘UI系统一般都会采用 AOT 模式编译其发布包，所以应用发布后，不能像 Hybrid 和 RN 那些使用 JavaScript（JIT）作为开发语言的框架那样动态下发代码。

2. 应用开发效率低：Qt 使用 C++ 作为其开发语言，而编程效率是直接会影响 App 开发效率的，C++ 作为一门静态语言，在 UI 开发方面灵活性不及 JavaScript 这样的动态语言，另外，C++需要开发者手动去管理内存分配，没有 JavaScript 及Java中垃圾回收（GC）的机制。

2. **Qt 简介**

Qt 是一个1991年由 Qt Company 开发的跨平台 C++ 图形用户界面应用程序开发框架。

Qt 虽然在 PC 端获得了巨大成功，备受社区追捧，然而其在移动端却表现不佳，在近几年，虽然偶尔能听到 Qt 的声音，但一直很弱，无论 Qt 本身技术如何、设计思想如何，但事实上终究是败了，究其原因，笔者认为主要有四：

第一：Qt 移动开发社区太小，学习资料不足，生态不好。

第二：官方推广不利，支持不够。

第三：移动端发力较晚，市场已被其他动态化框架占领（ Hybrid 和 RN )。

第四：在移动开发中，C++ 开发和Web开发栈相比有着先天的劣势，直接结果就是 Qt 开发效率太低。

基于此四点，尽管 Qt 是移动端开发跨平台自绘引擎的先驱，但却成为了烈士。

### **1.1.5 Flutter** 

Flutter 是 Google 发布的一个用于创建跨平台、高性能移动应用的框架。Flutter 和 Qt mobile 一样，都没有使用原生控件，相反都实现了一个自绘引擎，使用自身的布局、绘制系统。

优点：

1. 生态：Flutter 生态系统发展迅速，社区非常活跃，无论是开发者数量还是第三方组件都已经非常可观。

2. 技术支持：现在 Google 正在大力推广Flutter，Flutter 的作者中很多人都是来自Chromium团队，并且 Github上活跃度很高。另一个角度，从 Flutter 诞生到现在，频繁的版本发布也可以看出 Google 对 Flutter的投入的资源不小，所以在官方技术支持这方面，大可不必担心。

3. 开发效率：一套代码，多端运行；并且在开发过程中 Flutter 的热重载可帮助开发者快速地进行测试、构建UI、添加功能并更快地修复错误。在 iOS 和 Android 模拟器或真机上可以实现毫秒级热重载，并且不会丢失状态。这真的很棒，相信我，如果你是一名原生开发者，体验了Flutter开发流后，很可能就不想重新回去做原生了，毕竟很少有人不吐槽原生开发的编译速度。

## **1.2 初识 Flutter**

### **1.2.1 Flutter 简介**

Flutter 是 Google 推出并开源的移动应用开发框架，主打跨平台、高保真、高性能。开发者可以通过 Dart 语言开发 App，一套代码同时运行在 iOS 和 Android平台。 Flutter 提供了丰富的组件、接口，开发者可以很快地为 Flutter 添加 Native（即原生开发，指基于平台原生语言来开发应用，flutter可以和平台原生语言混合开发） 扩展。下面我们整体介绍一下 Flutter 技术的主要特点。

1. **跨平台自绘引擎**

Flutter 使用自己的高性能渲染引擎来绘制 Widget（组件）。这样不仅可以保证在 Android 和iOS 上 UI 的一致性，也可以避免对原生控件依赖而带来的限制及高昂的维护成本。

Flutter 底层使用 Skia 作为其 2D 渲染引擎，Skia 是 Google的一个 2D 图形处理函数库，包含字型、坐标转换，以及点阵图，它们都有高效能且简洁的表现。Skia 是跨平台的，并提供了非常友好的 API，目前 Google Chrome浏览器和 Android 均采用 Skia 作为其 2D 绘图引擎。

:::tip
Flutter 3.7发布会，有介绍后续版本会更换一个渲染引擎，新的渲染引擎效果将远远超过 Skia。
:::

2. **高性能**

1. Flutter App 采用 Dart 语言开发。Dart 在 JIT（即时编译）模式下，执行速度与 JavaScript 基本持平。但是 Dart 支持 AOT，当以 AOT模式运行时，JavaScript 便远远追不上了。执行速度的提升对高帧率下的视图数据计算很有帮助。

2. 使用自己的渲染引擎来绘制 UI ，布局数据等由 Dart 语言直接控制，所以在布局过程中不需要像 RN 那样要在 JavaScript 和 Native 之间通信，这在一些滑动和拖动的场景下具有明显优势，因为在滑动和拖动过程往往都会引起布局发生变化，所以 JavaScript 需要和 Native 之间不停地同步布局信息，这和在浏览器中JavaScript 频繁操作 DOM 所带来的问题是类似的，都会导致比较可观的性能开销。

3. **Dart语言开发**

JIT 和 AOT的概念

程序主要有两种运行方式：静态编译与动态解释。静态编译的程序在执行前程序会被提前编译为机器码（或中间字节码），通常将这种类型称为AOT （Ahead of time）即 “提前编译”。而解释执行则是在运行时将源码实时翻译为机器码来执行，通常将这种类型称为JIT（Just-in-time）即“即时编译”。

* 开发效率高

    Dart 运行时和编译器支持 Flutter 的两个关键特性的组合：

  * 基于 JIT 的快速开发周期：Flutter 在开发阶段采用，采用 JIT 模式，这样就避免了每次改动都要进行编译，极大地节省了开发时间；

  * 基于 AOT 的发布包: Flutter 在发布时可以通过 AOT 生成高效的机器码以保证应用性能。而 JavaScript 则不具有这个能力。

* 高性能

    Flutter 旨在提供流畅、高保真的 UI 体验。为了实现这一点，Flutter 中需要能够在每个动画帧中运行大量的代码。这意味着需要一种既能保证高性能，也不会出现丢帧的编程语言，而 Dart 支持 AOT，在这一点上可以做得比 JavaScript 更好。

* 快速内存分配

    Flutter 框架使用函数式流，这使得它在很大程度上依赖于底层的内存分配器。因此，拥有一个能够有效地处理琐碎任务的内存分配器将显得十分重要，在缺乏此功能的语言中，Flutter 将无法有效地工作。

* 类型安全和空安全

    由于 Dart 是类型安全的语言，且 2.12 版本后也支持了空安全特性，所以 Dart 支持静态类型检测，可以在编译前发现一些类型的错误，并排除潜在问题，这一点对于前端开发者来说可能会更具有吸引力。与之不同的，JavaScript 是一个弱类型语言，也因此前端社区出现了很多给 JavaScript 代码添加静态类型检测的扩展语言和工具，如：微软的 TypeScript 以及Facebook 的 Flow。相比之下，Dart 本身就支持静态类型，这是它的一个重要优势。

:::tip
Dart 最开始也不支持空安全特性，也是后续版本更新的，可能使用者在使用时感受不出来，但在背后的汇编语言中却是得到了巨大提升。
:::

### **1.2.2 Flutter框架结构**

官方提供的Flutter 框架图：

![图片加载中](../../../.vuepress/public/images/content/Flutter/1.2.2.png)

Flutter 从上到下可以分为三层：框架层、引擎层和嵌入层，下面我们分别介绍：

1. **框架层**

Flutter Framework，即框架层。这是一个纯 Dart实现的 SDK，它实现了一套基础库，自底向上，我们来简单介绍一下：

 * 底下两层（Foundation 和 Animation、Painting、Gestures）在 Google 的一些视频中被合并为一个dart UI层，对应的是Flutter中的dart:ui包，它是 Flutter Engine 暴露的底层UI库，提供动画、手势及绘制能力。

 * Rendering 层，即渲染层，这一层是一个抽象的布局层，它依赖于 Dart UI 层，渲染层会构建一棵由可渲染对象的组成的渲染树，当动态更新这些对象时，渲染树会找出变化的部分，然后更新渲染。渲染层可以说是Flutter 框架层中最核心的部分，它除了确定每个渲染对象的位置、大小之外还要进行坐标变换、绘制（调用底层 dart:ui ）。

 * Widgets 层是 Flutter 提供的的一套基础组件库，在基础组件库之上，Flutter 还提供了 Material 和 Cupertino 两种视觉风格的组件库，它们分别实现了 Material 和 iOS 设计规范。

Flutter 框架相对较小，因为一些开发者可能会使用到的更高层级的功能已经被拆分到不同的软件包中，使用 Dart 和 Flutter 的核心库实现，其中包括平台插件，例如 camera (opens new window)和 webview (opens new window)，以及和平台无关的功能，例如 animations (opens new window)。

我们进行Flutter 开发时，大多数时候都是和 Flutter Framework 打交道。

2. **引擎层**

Engine，即引擎层。毫无疑问是 Flutter 的核心， 该层主要是 C++ 实现，其中包括了 Skia 引擎、Dart 运行时（Dart runtime）、文字排版引擎等。在代码调用 dart:ui库时，调用最终会走到引擎层，然后实现真正的绘制和显示。

3. **嵌入层**

Embedder，即嵌入层。Flutter 最终渲染、交互是要依赖其所在平台的操作系统 API，嵌入层主要是将 Flutter 引擎 ”安装“ 到特定平台上。嵌入层采用了当前平台的语言编写，例如 Android 使用的是 Java 和 C++， iOS 和 macOS 使用的是 Objective-C 和 Objective-C++，Windows 和 Linux 使用的是 C++。 Flutter 代码可以通过嵌入层，以模块方式集成到现有的应用中，也可以作为应用的主体。Flutter 本身包含了各个常见平台的嵌入层，假如以后 Flutter 要支持新的平台，则需要针对该新的平台编写一个嵌入层。

## **1.3 Widget简介**
### **1.3.1 Flutter中的四棵树**

Widget、Element、Render、Layer树
1. 根据Widget树生成一个Element树，Element树中的节点都继承自Element类。
2. 根据Element树生成Render树（渲染树），渲染树中的节点都继承自RenderObject类。
3. 根据Render树生成Layer树，然后上屏显示，Layer树中的节点都继承自Layer类。

样例：

```dart
Container( // 一个容器 widget
  color: Colors.blue, // 设置容器背景色
  child: Row( // 可以将子widget沿水平方向排列
    children: [
      Image.network('https://www.example.com/1.png'), // 显示图片的 widget
      const Text('A'),
    ],
  ),
);
```

![图片加载中](../../../.vuepress/public/images/content/Flutter/1.3.1.png)

### **1.3.2 StatelessWidget**

`StatelessElement`间接继承自`Element`类，与`StatelessWidget`相对应。`StatelessWidget`用于不需要维护状态的场景。

**Context**

`Context`是当前widget在widget树中执行相关操作的一个句柄（例如查找父级widget）。每一个widget都有一个对应的context对象。

### **1.3.3 StatefulWidget**

* `StatefulElement` 间接继承自`Element`类，与`StatefulWidget`相对应（作为其配置数据）。`StatefulElement`中可能会多次调用`createState()`来创建状态（State）对象。

* `createState()` 用于创建和 `StatefulWidget` 相关的状态，它在`StatefulWidget` 的生命周期中可能会被多次调用。例如，当一个 `StatefulWidget` 同时插入到 `widget` 树的多个位置时，Flutter 框架就会调用该方法为每一个位置生成一个独立的State实例，其实，本质上就是一个`StatefulElement`对应一个`State`实例。

### **1.3.4 State**

**State生命周期**

* `initState`: 当 widget 第一次插入到 widget 树时会被调用，对于每一个State对象，Flutter 框架只会调用一次该回调。

* `didChangeDependencies()`: 当State对象的依赖发生变化时会被调用。

* `build()`: 用于构建 widget 子树

* `reassemble()`：此回调是专门为了开发调试而提供的，在热重载(hot reload)时会被调用，此回调在Release模式下永远不会被调用。

* `didUpdateWidget()`: reassemble()：此回调是专门为了开发调试而提供的，在热重载(hot reload)时会被调用，此回调在Release模式下永远不会被调用。

* `deactivate()`：当 State 对象从树中被移除时，会调用此回调。在一些场景下，Flutter 框架会将 State 对象重新插到树中，如包含此 State 对象的子树在树的一个位置移动到另一个位置时（可以通过GlobalKey 来实现）。如果移除后没有重新插入到树中则紧接着会调用dispose()方法。

* `dispose()`：当 State 对象从树中被永久移除时调用。

![图片加载中](../../../.vuepress/public/images/content/Flutter/1.3.4.jpg)

:::tip
包含@mustCallSuper标注的父类方法，都要在子类方法中调用父类方法。
:::