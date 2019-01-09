# Vue

## 前端模块化

- [模块化资料](https://segmentfault.com/a/1190000000733959)

### 为什么需要模块化

- 1 最开始的js就是为了实现客户端验证以及一些简单的效果
- 2 后来，js得到重视，应用越来越广泛，前端开发的复杂度越来越高
- 3 旧版本的js中没有提供与模块（module）相关的内容

### 模块的概念

- 在js中，一个模块就是实现特定功能的文件（js文件）
- 遵循模块的机制，想要什么功能就加载什么模块
- 模块化开发需要遵循规范

### 模块化解决的问题

- 1 命名冲突
- 2 文件依赖（加载文件）
- 3 模块的复用
- 4 统一规范和开发方式

### JS实现模块化的规范

- AMD 浏览器端
  - requirejs
- CommonJS nodejs
  - 加载模块：require()
  - 导出模块：module.exports = {} / exports = {}
- ES6 中的 import / export

- CMD 浏览器端
  - 玉伯（阿里前端大神） -> seajs
- UMD 通用模块化规范，可以兼容 AMD、CMD、CommonJS 等这些语法

### AMD

- Asynchronous Module Definition：异步模块定义，浏览器端模块化开发的规范
- 代表：require.js
- [requirejs 文档](http://requirejs.org/)
- 特点：模块被异步加载，模块加载不影响后面语句的运行

### 定义模块

```js
// 定义模块
// id表示：当前模块的名称，是一个字符串
// dependencies表示：当前模块的依赖项，是一个数组
// factory表示：当前模块要完成的一些功能，是一个函数
// define(id?, dependencies?, factory);

// 定义对象模块
define({})
// 定义方法模块
define(function() {
  return {}
})


// 定义带有依赖项的模块 -- 重点
define(['js/a'], function() {})
```

### 加载模块

- 注意：require的第一个参数必须是数组

```js
// 参数必须是数组
require(['a'])

require(['a', 'js/b'], function(a, b) {
  // 使用模块a 和 模块b 中的代码
})
```

### 路径查找说明

- requirejs 默认使用 `baseUrl+paths` 的路径解析方式
- 可以使用以下方式避开此设置：
  - 1 以`.js`结尾 require(['a.js'])
  - 2 以 `/` 开始 require(['/a'])
  - 3 包含协议：`https://` 或 `http://`

### 配置基础路径

```js
require.config({
  baseUrl: './js' // 配置基础路径为：当前目录下的js目录
})

require(['a'])    // 查找 基础路径下的 a.js
```

### 简化加载模块路径

- 例如：template.js/jquery.js 等都默认支持 AMD 规范

```js
require.config({
  baseUrl: './js',

  // 配置一次即可，直接通过路径名称（template/jquery）加载模块
  paths: {
    template: 'assets/artTemplate/template-native',
    jquery: 'assets/jquery/jquery.min'
  }
})

require(['jquery', 'template'])
```

### 非模块化和依赖项支持

- 1 添加模块的依赖模块，保证加载顺序（deps）
- 2 将非模块化模块，转化为模块化（exports）

```js
require.config({
  baseUrl: './js',
  paths: {
    noModule: 'assets/demo/noModule'
  },
  shim: {
    noModule: {
      // 比如： jquery.fullpage.js 这个插件，是依赖于 jQuery 的
      // 那么， jQuery应该先加载，然后 jquery.fullpage.js 才能加载，否则会报错
      deps: ['jquery'],         // 依赖项
      exports: 'sayHi'  // 只能将该模块中存在的函数或变量导出
    }
  }
});
```

### 注意点 - 知道

- 如果定义模块的时候，指定了模块名称，需要使用该名称来引用模块

```js
// 这个模块名称与paths中的名称相同
define('moduleA', function() {})

require.config({
  paths: {
    // 此处的模块名：moduleA
    moduleA: 'assets/demo/moduleA'
  }
})
```

### 路径加载规则

- 路径配置的优先级：
  - 1 通过 config 配置规则查找（重点，工作中就使用这种方式）
  - 2 通过 data-main 指定的路径查找
  - 3 以引入 requirejs 的页面所在路径为准查找

```html
<!-- 
  设置data-main属性
  1 data-main属性指定的文件也会同时被加载
  2 用于指定查找其他模块的基础路径
  
  在这个例子中，基础路径为： js/main.js 中 main.js 所在的目录为基础路径
-->
<script src="js/require.js" data-main="js/main.js"></script>
```

## Webpack

![webpack](./imgs/webpack-1.png)

- [webpack 官网](http://webpack.github.io/)
- bundle `[ˈbʌndl]` 捆绑，收集，归拢，把…塞入

### 概述

> webpack 是一个现代 JavaScript 应用程序的模块打包器(module bundler)  
> webpack 是一个**模块化方案（预编译）**  
> webpack获取具有依赖关系的模块，并生成表示这些模块的静态资源

- webpack的两个作用：1 模块化 2 打包
- 四个核心概念：**入口(entry)**、**输出(output)**、**加载器loader**、**插件(plugins)**
- ![webpack 与 模块化](./imgs/webpack-module.jpg)

```html
模块化方案: webpack 和 requirejs（通过编写代码的方式将前端的功能，划分成独立的模块）
补充：browserify 是与 webpack 相似的模块化打包工具

webpack 预编译 (在开发阶段通过webpack进行模块化处理, 最终项目上线, 就不在依赖于 webpack)
requirejs 线上的编译( 代码运行是需要依赖与 requirejs 的 )
```

### webpack起源

- webpack解决了现存模块打包器的两个痛点：
  - 1 **静态资源的模块化处理方案**
  - 2 **Code Spliting** - 代码分离

### webpack与模块

- 在webpack看来：**所有的静态资源都是模块**
- webpack 模块能够识别以下等形式的模块之间的依赖：

- JS的模块化规范：
  - ES2015 `import` `export`
  - CommonJS `require()` `module.exports`
  - AMD `define` 和 `require`

- 非JS等静态资源：
  - css/sass/less 文件中的 `@import`
  - 图片连接，比如：样式 `url(...)` 或 HTML `<img src=...>`
  - 字体 等

### webpack文档和资源

- [webpack 中文网](https://doc.webpack-china.org/)
- [webpack 1.0](http://webpack.github.io/docs/what-is-webpack.html)
- [webpack 2.x+](https://webpack.js.org/)
- [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f#)
- [**前端模块系统的演进**](http://zhaoda.net/webpack-handbook/module-system.html)

---

## 安装webpack

- 全局安装：`npm i -g webpack@3.10.0`
  - 目的：在任何目录中通过CLI使用 `webpack` 这个命令
- 项目安装：`npm i -D webpack@3.10.0`
  - 目的：执行当前项目的构建

## webpack的基本使用

- 安装：`npm i -D webpack`
- webpack的两种使用方式：1 命令行 2 配置文件（`webpack.config.js`）

### 命令行方式演示 - 案例：隔行变色

- 1 使用`npm init -y` 初始package.json，使用npm来管理项目中的包
- 2 新建`index.html`和`main.js`，实现隔行变色功能
- 3 运行`webpack src/js/main.js dist/bundle.js`进行打包构建，语法是：`webpack 入口文件 输出文件`
- 4 注意：需要在页面中引入 输出文件 的路径（此步骤可通过配置webpack去掉）

```js
/*
  src/js/index.js
*/

// 1 导入 jQuery
import $ from 'jquery'
// 2 获取页面中的li元素
const $lis = $('#ulList').find('li')
// 3 隔行变色
// jQuery中的 filter() 方法用来过滤jquery对象
$lis.filter(':odd').css('background-color', '#def')
$lis.filter(':even').css('background-color', 'skyblue')
```

### 配置文件方式（推荐）

```js
/*
  webpack.config.js

  运行命令：webpack

  entry 入口的配置说明：
  https://doc.webpack-china.org/concepts/entry-points
*/

var path = require('path')
module.exports = {
  // 入口文件
  entry: path.join(__dirname, 'src/js/main.js'),

  // 出口文件
  output: {
    path: path.join(__dirname, './dist'),   // 输出文件的路径
    filename: 'bundle.js'                 // 输出文件的名称
  }
}
```

## webpack-dev-server

- 安装：`npm i -D webpack-dev-server`
- 作用：配合webpack，创建开发环境（启动服务器、监视文件变化、自动编译、刷新浏览器等），提高开发效率
- 注意：无法直接在终端中执行 `webpack-dev-server`，需要通过 `package.json` 的 `scripts` 实现
- 使用方式：`npm run dev`

```json
"scripts": {
  "dev": "webpack-dev-server"
}
```

### 使用说明

- 注意：`webpack-dev-server`将打包好的文件存储在内存中，提高编译和加载速度，效率更高
- 注意：输出的文件被放到项目根目录中
  - 命令行中的提示：`webpack output is served from /`
  - 在`index.html`页面中直接通过 `/bundle.js` 来引入内存中的文件

### 配置说明 - CLI配置

- `--contentBase` ：告诉服务器在哪个目录中提供服务，此处用来指定打开哪个目录中的index.html页面
  - `--contentBase ./`：当前工作目录
  - `--contentBase ./src`：当前目录下的src目录
- `--open` ：自动打开浏览器
- `--port` ：端口号
- `--hot` ：热更新，只加载修改的文件(按需加载修改的内容)，而非全部加载

```js
/* package.json */
/* 运行命令：npm run dev */

{
  "scripts": {
    "dev": "webpack-dev-server --contentBase ./src --open --port 8888 --hot"
  }
}
```

### 配置说明 - webpack.config.js

```js
const webpack = require('webpack')

devServer: {
  // 服务器的根目录 Tell the server where to serve content from
  // https://webpack.js.org/configuration/dev-server/#devserver-contentbase
  contentBase: path.join(__dirname, './'),
  // 自动打开浏览器
  open: true,
  // 端口号
  port: 8888,

  // --------------- 1 热更新 -----------------
  hot: true
},

plugins: [
  // ---------------- 2 启用热更新插件 ----------------
  new webpack.HotModuleReplacementPlugin()
]
```

## html-webpack-plugin 插件

- 安装：`npm i -D html-webpack-plugin`
- 作用：1 根据模板生成html页面 2 自动引入用到的`bundle.js`、`css`等文件

```js
/* webpack.config.js */
const htmlWebpackPlugin = require('html-webpack-plugin')

// ...
plugins: [
  new htmlWebpackPlugin({
    // 模板页面路径
    template: path.join(__dirname, './index.html'),
    // 在内存中生成页面路径，默认值为：index.html，可省略
    // filename: 'index.html'
  })
]
```
