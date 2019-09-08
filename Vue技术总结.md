## Vue技术总结

### 1.什么是Vue

是一套用于构建用户界面的**渐进式框架**,渐进式(理解):本身实现功能有限,但是相关的包或者插件很多,按需引入即可实现更多功能

[Vue Devtools浏览器插件](https://cn.vuejs.org/v2/guide/installation.html#Vue-Devtools)在使用 Vue 时，我们推荐在你的浏览器上安装 [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools)。它允许你在一个更友好的界面中审查和调试 Vue 应用。

### 2.特点

​	1.易用,灵活,高效

​	2.兼容性:Vue **不支持** IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有兼容 ECMAScript 5 的浏览器。

​	3.MVVM模式,数据代理,数据绑定,组件化,

### 3.安装和基本使用

#### 安装

1. 直接通过在线的方式引入:[BootCDN]([https://www.bootcdn.cn/](https://www.bootcdn.cn/))搜索vue,把相关的script标签复制到自己的html页面中


```javascript
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
```

2.通过github下载压缩包引入:[github下载vue压缩包]([https://github.com/vuejs/vue/tree/master](https://github.com/vuejs/vue/tree/master)),解压后,找到vue.js文件在自己的html页面中引入

```javascript
 <script type="text/javascript" src="./js/vue.js"></script>
```

3.通过[vue-cli]([https://github.com/vuejs/vue-cli/tree/master](https://github.com/vuejs/vue-cli/tree/master))脚手架下载webpack 包引入vue直接使用

```javascript
npm install -g vue-cli 下载vue脚手架
vue init webpack my-project 下载webpack包
npm install----这一步可以自动安装,也可以手动安装
通过webstorm或者vscode打开进行使用
```

#### 使用

以安装中第二种方式来举例说明使用vue

1.vue基本语法之初次体验

```html
<!--id为app的这个div是一个容器,里面的内容就是一个模版(后面解释什么叫模版)--> 
<div id="app">
    <input type="text" v-model="msg"><!--v-model是vue中的一个指令(vue写法的html的属性),作用:数据绑定-->
    <p>{{msg}}</p>			<!--{{msg}}:叫插值语法,msg是表达式(需要先在vue实例对象中定义才能使用)-->
</div>
  <script src="./js/vue.js"></script>		<!--引入vue.js-->
  <script type="text/javascript">
    // 实例化Vue对象,{}中写的是配置,el:通过选择器的方式找到对应的容器对象(html标签)
    const vm = new Vue({
      el:'#app',
      // 通过data对象定义相关的要使用的容器
      data:{
        //属性和值的定义---msg在data中叫属性,在上面的html内部叫表达式,先在data中定义属性,才能在html中使用该表达式 
        msg:'hello world'
      }
    })
  </script>
```

2.vue中的基本指令及模版语法

```javascript
1.插值:{{表达式}}
2.表达式:可以是一个变量,一个方法的调用,但不能是语句(var num=10，这是语句),控制也不可以,但是可以使用三元表达式
3.指令:
	控制指令:v-if,v-else,v-else if,v-show
	数据绑定指令:v-bind,v-model
    	v-bind可以简写----->   :
        如: v-bind:class="cls"---------->简写---------> :class="cls"
	文本指令:v-text,v-html
	事件指令:v-on:
    	v-on:可以简写----->   @
        如: v-on:onclick="clickHandle"--------->简写---------> @click="clickHandle"  
```

​	1)模版语法:

```html


<div id="app">
  <p>{{msg}}</p>	<!--使用插值语法,显示msg表达式的值-->
  <input type="text" v-model="msg" /> <!--v-model双向数据绑定,文本框的值改变,p标签中的msg值也会改变-->
  <p v-bind:class="cls">这是p</p>	<!--v-bind强制数据绑定,class属性中的cls是动态数据-->
  <p :class="cls">这是p</p>	<!--v-bind的简写方式,使用的是冒号,此时class中的cls是动态的数据-->
  <button v-on:click="clickHandle">按钮</button>	<!--v-on:是绑定事件-->
  <button @click="clickHandle">按钮</button>	<!--@是v-on的简写方式-->
</div>
<style type="text/css">
  .cls{
    color:red;
  }
</style>
<script type="text/javascript" src="./js/vue.js"></script>
<script type="text/javascript">
  const vm = new Vue({
    el:'#app',
    // 定义属性----数据的设置
    data:{
      msg:'hello',
      cls:'.cls'
    }, 
    // 添加方法--
    methods:{
      clickHandle(){
        console.log('按钮被点击了')
      }
    }
  })
</script>


总结:
如果想要设置一个html中的属性的值是动态的,那么使用v-bind指令,可以简写   :
如果想要设置双向数据效果,使用v-model---->一般用在表单标签中
双向数据绑定:文本框中的数据改变,相关联的标签中数据也会改变(p标签中使用msg表达式,input标签中也使用了msg表达式)
表单标签:html中涉及到提交的标签,这些标签一般都是在form标签中书写的(如:input标签,select标签,textarea标签等等...)
想要在标签的中间显示文本内容,一般使用v-text或者v-html指定(相当于innerText/textContent或者innerHTML操作)
想要为标签绑定事件(事件监听/添加事件)使用v-on指定,可以简写为@
如果页面中使用了动态的数据,那么一般保存该数据的表达式会在实例对象vue中data对象中定义成属性
如果页面中使用事件,那么一般会把该事件的方法(回调函数/监听)放在实例对象中methods中定义该方法
```

### 4.计算属性和监视

计算属性:computed,什么时候使用计算属性?当模版中使用未定义的表达式的时候,但是与其相关联的数据发生变化的同时,该表达式的值也会发生变化

监视:watch,什么时候使用监视?如果数据变化的时候要执行异步操作,或者数据变化比较频繁的操作的时候可以使用

```javascript
//computed:计算属性
//watch:监视器
 <div id="app">
    <input type="text" v-model="firstName"> <!--firstName值发生改变,fullName表达式的值改变-->
    <p>{{fullName}}</p>
    <input type="text" v-model="lastName"><!--lastName值改变,那么fullName2表达式的值改变-->
    <p>{{fullName2}}</p>
  </div>
  <script src="./js/vue.js"></script>
  <script type="text/javascript">
    const vm = new Vue({
      el: '#app',
      data: {
        msg: 'hello world',
        firstName: '',
        lastName: '',
        fullName2: ''
      },
		      //计算属性
      computed: {
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        }
      },
      //监听属性
      watch: {
        firstName: function (val) {
          this.fullName2 = val + ' ' + this.lastName
        },
        lastName: function (val) {
          this.fullName2 = this.firstName + ' ' + val
        }
      }
    })
  </script>
    总结:
当一个A属性值改变,相关联的B属性值也发生改变的时候,那么,使用计算属性,计算属性中写B即可
当一个A属性值改变,相关联的B属性值也发生改变的时候,那么,使用监视,监视中写A即可，当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
```

### 5.class与style操作样式

class操作:数组或者对象方式两种方式居多

```html
<fieldset>
    <legend>class绑定:直接设置class值</legend>
    <p :class="myClass">这是一个P</p>
    <button @click="changeClassName">改变样式</button>
</fieldset>
<fieldset>
    <legend>class绑定:使用对象的方式(cls是类名,固定的写法(写的肯定是类名,后面跟的是布尔值))</legend>
    <p :class="{cls1:isCls1,cls2:isCls2}">不乱于心,不困于情</p>
    <button @click="toggleClassName">改变样式</button>
</fieldset>
<fieldset>
    <legend>class绑定:使用数组方式([]里面是动态的属性,需要在data中定义)</legend>
    <p :class="[classA,classB,classC]">不念过去,不畏将来</p>
    <button @click="addClassName">改变样式</button>
</fieldset>
```



style操作:对象和数组的方式居多

```html
<fieldset>
    <legend>style操作:style中书写的时候有多个值,采用对象写法</legend>
    <p :style="{color:fontColor,fontSize:size+'px'}">健哥</p>
    <button @click="changeStyle1">修改style</button>
</fieldset>
<fieldset>
    <legend>style操作:动态操作设置键值,采用数组写法</legend>
    <p :style="[styleColor,styleFont]">健哥</p>
    <button @click="changeStyle2">添加style样式</button>
</fieldset>
```

### 6.条件指令渲染

v-if和v-show使用比较多

```html
<fieldset>
    <legend>
        通过v-if和v-else指令操作:对元素(标签)干掉或者新增
    </legend>
    <input type="button" value="切换显示效果" @click="toggleIsOK">
    <p id="p1" v-if="isOk">我喜欢你</p>
    <p id="p2" v-else>我讨厌你</p>
</fieldset>
<fieldset>
    <legend>通过v-show指令操作:对元素(标签)样式的操作</legend>
    <input type="button" value="切换效果" @click="show=!show">
    <p id="p3" v-show="show">在一起</p>
    <p id="p4" v-show="!show">分开</p>
</fieldset>
总结:
v-if指令使用条件:(下面说明不够严谨,在vue项目中可明确体现)
如果当前元素在页面中是否显示的条件是动态数据及不需要样式操作,那么建议使用v-if指令
如果当前元素显示或者隐藏的时候不涉及到样式的操作,那么此时使用v-if指令 
v-show指令使用条件:(下面说明也不够严谨,在vue项目中可明确体现)
如果当前元素涉及到动态显示,并有样式操作,那么使用v-show指令合适
```

### 7.列表渲染

v-for指令

```html
<ul>
    <li v-for="(per,index) in persons" :key="per.id">
        索引:{{index}}---id:{{per.id}}====名字:{{per.name}}====年龄:{{per.age}}====描述:{{per.desc}}
    </li>
</ul>
总结:
v-for指令使用条件:
当请求后获取多个数据,需要动态创建列表的时候,那么此时可以使用v-for指令进行遍历,同时加一个:key进行唯一标识绑定
可以遍历数组,也可以遍历对象
```



### 8.事件处理及按键修饰符

v-on指令或者简写:@

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>每天都被自己帅醒!</title>
        <link rel="stylesheet" href="">
        <script type="text/javascript" src="../js/vue.js"></script>
    </head>
    <body>
    <div id="app">
       <button @click="showMsg('哈哈,我又变帅了')">按钮1</button>
       <button @click="showMsg2('我喜欢男人,健哥说',$event)">按钮2</button>
    </div>
        <script type="text/javascript">
            const vm = new Vue({
                el:'#app',
                //方法
                methods: {
                    showMsg(txt){
                        console.log(txt)
                    },
                    showMsg2(txt,evt){
                        //此事需要这个事件参数
                        console.log(txt+'====='+evt.target.innerHTML)
                    }
                }
            })
        </script>   
    </body>
</html>
总结:
v-on指令可以简写为@
绑定事件需要的回调函数一般都在vue生命周期的methods对象中定义该回调函数.
如果想要在Vue实例对象的某些相关方法中使用到事件参数对象(前提是在html模版中已经传了其他的参数了,或者没有传,但是还要想使用事件参数对象)就需要在html模版中的某个事件的回调函数中传入$event
此时在方法中进行接收该参数,可以直接使用该事件参数对象

事件修饰符和按键修饰符
<a href="http://www.baidu.com"  @click.prevent="stopPrevent2">百度2</a>
<a href="http://www.baidu.com"  @click.stop="stopPrevent2">百度2</a>
<input type="text" value="" v-model="msg" @keyup.enter="enterHandler2">
<input type="text" value="" v-model="msg" @keyup.13="enterHandler3">
事件修饰符常用的有两个:
.prevent 阻止默认行为
.stop 阻止事件冒泡
按键修饰符常用的:(举两个例子,课后自己去vue官网再找几个)
.enter 回车
.13 回车
```



### 9.表单数据绑定

v-model指令绑定表单数据

### 10.生命周期

```javascript
1). vue的生命周期: 创建=>挂载=>更新=>销毁
2). vue的生命周期勾子:
    初始化(一次): beforeCreate() => created() => beforeMount() => mounted()
    更新(n次): beforeUpdate() => updated()
    销毁(一次): beforeDestroy() => destroyed()
3). 一些细节
	beforeCreate(): 在实例初始化之后，立即同步调用，在数据观察(data observer)和 event/watcher 配置之前被调用。
	created(): 可以读取或修改data中的数据, 已经完成数据观察(data observer)和 event/watcher 配置
	beforeMount(): 模板已经在内存中编译, 但还没有挂载到页面上, 不能通过ref找到对应的标签
	mounted(): 页面已经初始显示, 可以通过ref找到对应的标签
	beforeUpdate(): 在数据更新之后, 界面更新前调用, 只能访问到原有的界面
	updated(): 在界面更新之后调用, 此时可以访问最新的界面
	beforeDestroy(): 实例销毁之前调用, 此时实例仍然完全可用。
	destroyed(): Vue 实例销毁后调用, 数据绑定/事件监听器都没了, 但dom结构还在
```



![生命周期图](7. vue生命周期1.png)

### 11.过渡和动画

```html

 <style type="text/css">
    /*过渡的时候的样式*/
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
<div id="app">
    <button @click="isOk=!isOk">切换效果</button>
    <!--name="fade"决定上面style中fade-开头的名字-->
    <transition name="fade">
        <p v-show="isOk">这是P</p>
    </transition>
</div>
<script type="text/javascript">
    const vm = new Vue({
        el: '#app',
        data: {
            isOk: true
        }
    })
</script>
过渡总结:
把需要过渡的标签使用<transition> 并且在该标签内部添加一个name的属性,然后在style标签中使用该name的属性值开头书写过渡的样式,动画也是如此
```



### 12.过滤器(格式化)

filter:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>每天都被自己帅醒!</title>
    <link rel="stylesheet" href="">
    <script type="text/javascript" src="../js/vue.js"></script>
</head>
<body>
    <div id="app">
        <h2>显示格式化的日期时间</h2>
        <h3>{{time}}</h3>
        <h3>{{time|formatDate1}}</h3>
        <h3>{{time|formatDate2('HH:mm:ss')}}</h3>
        <h3>{{time|formatDate3('YYYY-MM-DD')}}</h3>
    </div>
    <script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.js"></script>
    <script type="text/javascript">
        /**
         * Vue1.0中有自己的过滤器:filter
         * Vue2.0中所有过滤器全部被干掉,如果需要则自己定义
         * 过滤器:对要显示的数据进行特定格式化再显示
         * 1.定义 过滤器:
         * Vue.Filter(filterName,function(value,[arg1,arg2,...]){
         * return newValue
         * })
         * 2.使用 过滤器:
         * <div>{{myData|filterName}}</div>
         * <div>{{myData|filterName(arg)}}</div>
         * 去下面的网址找moment.js
         *  https://www.bootcdn.cn/
         * 或者这个网址
         * https://www.bootcdn.cn/moment.js/
         * 把 https://cdn.bootcss.com/moment.js/2.24.0/moment.js 通过script标签引入到当前的页面
         * 
         * http://momentjs.cn/ 官网
         * 
         * 
        */
        //定义过滤器:

        //需求:通过自定义过滤器实现日期的格式化操作
        //全局的过滤器
        Vue.filter('formatDate1',(value)=>{
            return moment(value).format('YYYY-MM-DD HH:mm:ss'); 
        })
        Vue.filter('formatDate2',(value,str)=>{
            return moment(value).format(str); 
        })
        Vue.filter('formatDate3',(value,str)=>{
            return moment(value).format(str||'YY-MM-DD HH:mm:ss'); 
        })
        const vm = new Vue({
            el:'#app',
            data:{
                time:Date.now()-1000
            }
        })
    </script>
</body>

</html>
总结过滤器(filter):对要显示的数据进行特定格式化再显示
Vue1.0中有自己的过滤器:filter
Vue2.0中所有过滤器全部被干掉,如果需要则自己定义
一般过滤器大多数情况都是全局使用,所以,通过Vue.filter的方式来定义

过滤器的常见两种方式:两种方式都可以安装使用
1.使用moment
2.使用date-fns/format 

自定义过滤器模块:
import Vue from 'vue'
import moment from 'moment'      
import format from 'date-fns/format'
// 日期格式化过滤器: date-format
Vue.filter('date-format', (value, formatStr) => {
  // return moment(value).format(formatStr || 'YYYY-MM-DD HH:mm:ss') moment方式
  return format(value, formatStr || 'YYYY-MM-DD HH:mm:ss')
})
```



### 13.插件

vue使用插件插件,几乎都是同一个流程:安装,引入,use,使用

### 14.插槽:普通插槽,具名插槽,作用域操作

```javascript
1). 插槽的作用:
    父组件向子组件传递标签结构(也可以是数据)
    通过标签体传递, 而不再是标签属性
2). slot的分类
    普通插槽(slot)
    命名插槽(named slot)
    作用域插槽(scoped slot)
3). 区别
    普通插槽: 子组件只能有一个插槽, 标签体内容在父组件中解析好后(数据在父组件), 传递给这个插槽
    命名插槽: 子组件有多个指定了name的插槽, 标签体内容在父组件中解析好后(数据在父组件), 分别传递给对应的插槽
    作用域插槽: 数据在子组件, 子组件有部分结构需要父组件传递, 但父组件需要读取子组件数据
                子组件需要先向父组件传递数据, 父组件根据数据渲染标签结构后传递给子组件的插槽
    需求: todo列表组件: 根据内部的todos数据显示todo列表, 但列表项的样式由使用者决定
```

```javascript
<template>
  <div>
    <Slot1>
      我来啦
      <a href="http://www.baidu.com">我是百度,红颜祸水</a>
    </Slot1>
    <hr />
      <Slot2>
       <p slot="bottom"><a href="http://www.baidu.com">百度2</a></p>
        <p>我是中间的标签啊,哈哈=====</p>
       <p slot="top"><a href="http://www.baidu.com">百度1</a></p>
      </Slot2>
  <Slot3>
    <template slot-scope="slotProps">
      <!--只在isComplete为true的的数据的后面有✔-->
      <p v-if="slotProps.todo.isComplete">{{slotProps.todo.title}}✔</p>
    </template>
  </Slot3>
  </div>
</template>
<script>
/**
 * 1.使用普通插槽,没有名字的插槽,直接传值即可：父级组件向子级组件中传入数据
 * 2.具名插槽传值,只能使用名字,其他的内容是不会被传递的(标签名字,标签位置这些都没有关系,只要有slot="插槽名字"即可传值)
 * 3.作用域插槽,子组件向父级组件传递数据,父级组件根据数据渲染标签结构传递给子组件
 *
 */
Slot1组件代码-----------------------------
  <div>
    <h2>普通插槽</h2>
    <p>我是一个p标签</p>
    <slot>我是一个普通的插槽</slot>
  </div>
Slot2组件代码--------------------------------
  <div>
    <slot name="top">哈哈1</slot>
      <p>这是一个普通的文本内容</p>
    <slot name="bottom">哈哈2</slot>
  </div>
Slot3组件代码-------------------------------------
  <div>
    <ul>
      <li v-for="(todo,index) in todos" :key="index">
        <slot :todo="todo">{{todo.title}}</slot>
      </li>
    </ul>
  </div>
export default {
  data () {
    return {
      todos:[
        {title:'奔驰',isComplete:false},
        {title:'宝马',isComplete:true},
        {title:'奥迪',isComplete:false}
      ]
    }
  }
}
```



### 15.组件之间通信总结

```javascript
1). 组件通信的5种方式
	props
	vue的自定义事件
	全局事件总线
	slot
	vuex(后面单独讲)
2). props:
    父子组件间通信的基本方式
    属性值的2大类型:
        一般/非函数: 父组件-->子组件
        函数: 子组件-->父组件
	隔层组件间传递: 必须逐层传递(麻烦)
	兄弟组件间: 必须借助父组件(麻烦)
2). vue自定义事件
    给子组件标签绑定事件监听
	子组件向父组件的通信方式
	功能类似于function props
	不适合隔层组件和兄弟组件间的通信
3). 全局事件总线
	利用vm对象的$on()/$emit()/$off()
	利用vm对象是组件对象的原型对象
	创建vm对象作为全局事件总线对象保存到Vue的原型对象上, 所有的组件对象都可以直接可见:
		Vue.prototype.$bus = new Vue()
    任意组件A可以通过this.$bus.$on()绑定监听接收数据
	任意组件B可以通过this.$bus.$emit()分发事件, 传递数据
4). slot
    父组件向子组件通信
    通信是带数据的标签
    注意: 标签是在父组件中解析
5). vuex
    多组件共享状态(数据的管理)
    组件间的关系也没有限制
    功能比事件总线强大, 更适用于vue项目
6).pubsub
```



### 16.异步操作

```javascript
方式1:需要安装
import VueResource from 'vue-resource'
Vue.use(VueResource)
方式2:需要安装
import axios from "axios";
```

### 17.Mint-UI使用

```javascript
先安装
npm i mint-ui
也可以按需引入
npm install babel-plugin-component -D
然后砸 .babelrc进行修改：
  "plugins": [["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
  上面的方式是脚手架2中的写法,脚手架3中的写法如下(脚手架3在babel.config.js文件中):
  "plugins": [["component",
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]
  
  总结:
常用的UI组件库
    PC: Element / iview /
    Mobile: mint-ui / cube-ui
mint-ui的使用
    根据官方文档使用
    按需打包
```

### 18.vue-router

```javascript
vue用来实现SPA的插件
使用vue-router
    1. 创建路由器: router/index.js
      new VueRouter({
        mode: 'hash/history'
        routes: [
          { // 一般路由
            path: '/about',
            component: About
          },
          { // 自动跳转路由
            path: '/',
            redirect: '/about'
          }
        ]
      })
    2. 注册路由器: main.js
       import router from './router'
       	new Vue({
       		router
       	})
    3. 使用路由组件标签:
       	<router-link to="/xxx">Go to XXX</router-link>
       	<router-view></router-view>
    4. 2个对象
        $router: 代表路由器对象, 包含一些实现路由跳转/导航的方法: push()/replace()/back()
        $route: 代表当前路由对象, 包含一些路由相关的属性: path/params/query/meta
编写路由的3步
    1. 定义路由组件
    2. 映射路由
    3. 编写路由2个标签
嵌套路由
    children: [
        {
          path: '/home/news/:xxx/:yyy',
          component: news
        },
        {
          path: 'message',
          component: message
        }
    ]
向路由组件传递数据
    params/query: <router-link to="/home/news/abc/123?zzz=1234">
    将请求参数映射成props: props: route => ({id: route.params.id})
    变相props: <router-view msg='abc'>
缓存路由组件
    路由组件对象默认的生命周期: 被切换时就会死亡, 切换回来时重新创建
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
路由的编程式导航
    this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
    this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
    this.$router.back(): 请求(返回)上一个记录路由
```

### 19.路由懒加载

```javascript
// 开始不执行,第一次请求时候才执行
const MSite=()=>import('../pages/MSite/MSite.vue')
const Search=()=>import('../pages/Search/Search.vue')
const Order=()=>import('../pages/Order/Order.vue')
const Profile=()=>import('../pages/Profile/Profile.vue')
总结:
项目优化会用到,按需打包
```

### 20.数据状态管理

```javascript
1.vuex是什么?
github站点: https://github.com/vuejs/vuex
在线文档: https://vuex.vuejs.org/zh-cn/
简单来说: 对应用中组件的状态进行集中式的管理(读/写)
2.vuex的状态管理
state: 驱动应用的数据源
view: 以声明方式将state映射到视图
actions: 响应在view上的用户输入导致的状态变化(包含n个更新状态的方法)

3. 多组件共享状态的问题

    多个视图依赖于同一状态
    来自不同视图的行为需要变更同一状态
    以前的解决办法
    	* 将数据以及操作数据的行为都定义在父组件
    	* 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)
    vuex就是用来解决这个问题的



4. vuex的核心概念

1). state

    vuex管理的状态对象
    它应该是唯一的
    const state = {
    	xxx: initValue
    }

2). mutations

    包含多个直接更新state的方法(回调函数)的对象
    谁来触发: action中的commit('mutation名称')
    只能包含同步的代码, 不能写异步代码
    const mutations = {
    	yyy (state, {data1}) { 
    		// 更新state的某个属性
    	}
    }

3). actions

    包含多个事件回调函数的对象
    通过执行: commit()来触发mutation的调用, 间接更新state
    谁来触发: 组件中: $store.dispatch('action名称')  // 'zzz'
    可以包含异步代码(定时器, ajax)
    const actions = {
    	zzz ({commit, state}, data1) {
    		commit('yyy', {data1})
    	}
    }

4). getters

    包含多个计算属性(get)的对象
    谁来读取: 组件中: $store.getters.xxx
    const getters = {
    	mmm (state) {
    		return ...
    	}
    }

5). modules

    包含多个module
    一个module是一个store的配置对象
    是将一复杂应用的vuex代码进行多模块拆分的第2种方式

6). 向外暴露store对象

    export default new Vuex.Store({
    	state,
    	mutations,
    	actions,
    	getters,
    	modules: {
    		a,
    		b
    	}
    })

7). 组件中:

    import {mapState, mapGetters} from 'vuex'
    export default {
    	computed: (
    		...mapState(['xxx']),
    		...mapGetters(['yyy'])
    	)
    	methods: {
            test () {
                this.$store.dispatch('zzz', data)
            }
    	}
    }

8). 映射store: main.js

    import store from './store'
    new Vue({
    	store
    })

9). store对象

    1.所有用vuex管理的组件中都多了一个属性$store, 它就是一个store对象
    2.属性:
      state: 注册的state对象
      getters: 注册的getters对象
    3.方法:
      dispatch(actionName, data): 分发action 
```

### 21源码分析

```javascript
1.数据代理
 vue数据代理: data对象的所有属性的操作(读/写)由vm对象来代理操作
 好处: 通过vm对象就可以方便的操作data中的数据
 实现:proxyData
  1). 通过Object.defineProperty(vm, key, {})给vm添加与data对象的属性对应的属性
  2). 所有添加的属性都包含get/set方法
  3). 在get/set方法中去操作data中对应的属性
2.模版解析
解析的过程,把html中容器中的所有的节点放在文档碎片中,然后找到每个节点,判断是文本节点还是标签节点,
  如果是文本节点还要判断是不是插值文本(正则),如果是就把data对象中属性的值获取到并进行替换
  如果是标签节点则找到标签上的属性是不是vue的指令属性,要判断该指令是普通指令还是事件指定
  如果是普通指定,那么使用updater中的相对的方法进行修改数据操作(修改innerText,修改className,修改innerHTMl,修改value)
  如果是事件指令就通过bind绑定事件监听
3.劫持和监听,如下:
  源码分析全程
   界面显示之前
数据代理: proxyData()方法
通过上面的方法实现数据代理,目的是为了方便vm可以直接调用data中的属性
数据的劫持:Observer
劫持后,里面把data中所有的属性遍历,并且为每个属性添加一个dep对象,对应depId的值,及添加一个subs数组(订阅器)
一个属性对应一个dep
开始模版解析Compile
解析的过程:先根据el获取当前对应的容器(div#app),把当前的容器中所有的节点全部的加入到文档碎片对象中
开始执行init()方法,在该方法的内部,获取文档对象里面所有的节点,进行遍历,在遍历的过程中,判断当前的节点是不是标签,是不是文本,当前的节点里面是否还有子节点
1.如果当前的节点是标签:
则获取该节点的所有的属性,判断该属性是不是指令属性,而且还要判断,指令是不是事件指令,或者是不是普通指定

1.1如果是事件指令:
把当前的事件指令的v-去掉,还要获取里面的on:click="showName"click，及对应的showName表达式,然后通过vm找到methods中对应的showName方法,再通过addEventListener为当前的标签绑定click事件,并且把showName也绑定到click事件中
1.2如果是普通指令:
判断当前的普通指令是什么指令(v-text,v-html,v-class)根据对应的指令去updater中找对应的方法,开始更新(把v-text的指令,使用标签的textContent属性进行值的替换,把v-html指令使用标签的innerHTML属性进行值的替换,把v-class指令使用的是className属性进行替换),最终把页面中标签里之前所写的vue的指令全部删除(删除标签中所有的属性)

2.如果当前的节点是文本,并且复合插值的正则表达式:
找到upater中对应的textUpdater方法,对标签的textContent属性进行值的替换

100-以上所有的操作,都会直接或者间接的调用bind方法,并且在bind方法内部,new Watcher对象,传入对应的回调函数(该回调函数会在更新表达式的值,或者替换值的时候才调用----都会找到对应的updater对象中对应的方法进行更新)

watcher中
进来后,重写属性的get方法的操作,当属性的值获取的时候,就会自动的调用get方法,在内部,使用Dep.target=this这个操作,把当前的watcher对象,添加到Dep对象的subs数组中,并且会直接回到addDep(该方法是watcher中的方法),把对应的dep添加到对应的watcher对象的depIds对象中{0:dep,1:dep}(添加之前新判断当前的watcher对象的depIds中是否存在dep),此时dep和watcher形成关系(添加watcher的这个操作,属于添加消息订阅)
模版解析后,此时dep和watcher关系已经全部建立了
一个属性对应一个dep---depId----subs数组
一个表达式对应一个watcher---depIds
如果页面中有一个属性,表达式也有一个,此时是:1对1的关系
如果页面中有多个属性,表达式只有一个,此时是:多对1的关系
如果页面中有一个属性,表达式有多个,此时是:1对多的关系
如果页面中有多个属性,表达式也有多个,此时是:多对多的关系

以上:-------模版解析结束做的事情
如果在界面中对属性进行修改或者是更新操作,此时直接进入到劫持对象找修改的是哪个属性,就会找对应的dep,该dep对象直接回通过notify()方法找到当前该dep中的subs数组直接遍历里面所有的watcher对象(消息发布),watcher此时接到更新的消息后,先和自己的depIds中的depid值及发布消息的dep的id值做对比,如果能够对应上,此时开始调用update()方法,内部调用run方法,内部调用的是对应的回调函数(在100-的时候传入的回调函数)开始找compile中的updater对象中及对应的更新数据的方法,开始更新,更新后,此时界面发生变化

双向数据绑定: 劫持是有的,模版解析也是有,在判断当前标签中属性是不是指令之后,还要判断当前的属性是不是v-model属性,如果是则调用当前的model相关的方法,为当前的标签通过addEventListener添加input事件,并且绑定对应的methods中的方法
如果页面发生变化(数据改变了)就会直接找updater中对应的model中的方法进行更新数据,同时开始调用绑定的事件的回调函数,把对应的其他的标签(p中用到了v-model中的表达式---<input type="text" v-model="msg"><p>{{msg}}</p>)中的插值也会进行替换
```





### 22.脚手架2和脚手架3

Vue脚手架中,有2的版本和3的版本

区别:

```javascript
1.安装不同(可以使用npm或者yarn)
	脚手架2安装:
		npm install vue-cli
        vue init webpack 项目名字
        npm run dev(npm start)
        npm run build(打包后的目录dist目录)
        serve dist
    脚手架3安装:先卸载脚手架2
    	先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载
        npm install -g @vue/cli 安装
        npm install -g @vue/cli-init (使用该命令后可以兼容脚手架2)
2.目录个数不同
	脚手架2中的目录及文件个数超过了脚手架3中的个数
3.配置不同(这个是重点)
	eslint检查配置:
	脚手架2中配置eslint检查在.eslintrc.js的rules对象中或者eslintignore中*.vue这种方式
    脚手架3中配置eslint检查在package.json文件中,如:
        "rules": {
      		"generator-star-spacing": "off"
    	},
	vue.esm.js配置不同:
    脚手架2中在webpack.base.config.js(build目录)文件中
    	resolve: {
    	extensions: ['.js', '.vue', '.json'],
    	alias: {
      		'vue$': 'vue/dist/vue.esm.js',
      		'@': resolve('src'),
    		}
  		},
     脚手架3中在vue.config.js文件(该文件需要自己创建)中
     同时不仅是vue.esm.js的配置,还有代理的配置(脚手架2中在webpack.dev.conf.js)
     下面的代码是脚手架3中配置代理及vue.esm.js的配置
const path = require('path')
function resolve(dir) {
  // return path.join(__dirname, '..', dir)
  return path.join(__dirname, dir)
}
// vue.config.js
//import Star from '../xyz/components/Star/Star.vue'
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'xyz': resolve('src'),
      }
    },
  },
  //配置代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, //是否支持跨域
        pathRewrite: {
          '^/api': '', // rewrite path
        },
      },
    }
  }
}
```







### 23.Vue中混合

```javascript
1). 作用:
    复用多个组件重复的JS代码(配置)
    一个mixin是一个可复用的组件配置对象
2). 定义mixin
    var myMixin = {
      data () {
        return {
          a: 'a1111',
        }
      },
      computed: {
        length () {
          return this.a.length
        }
      }
    }
3). 多组件中引入mixin
    通过mixins配置引用: mixins: [myMixin]
    mixin中的配置与当前组件的配置会自动合并
    
    总结：在Vue的组件中,如果多个组件同时都使用到了相同的数据或者方法等等,可以单独抽出来放在一个mixin.js的文件中,然后在需要使用该文件的组件中引入,通过mixins:[]引入即可
import {mixin} from "./mixin.js";
export default {
  mixins: [mixin],
};
```



### 24.动态组件/缓存组件/异步组件

```javascript
1). 动态组件
    通过<component :is="componentName">来动态决定渲染哪个组件
    被切换的组件默认会被自动销毁
2). 缓存组件
    通过<keep-alive>来缓存被切换的动态组件(非路由组件)
    也可以缓存路由组件
3). 异步组件
    在需要组件时, 才异步请求加载组件的代码(从后台)
    Vue 能够将组件定义为一个工厂函数(factory function)，此函数可以异步地解析(resolve)组件
    import()的语法比较适合的是路由组件的异步懒加载
```

### 25.原生事件/自定义事件

```javascript
1). 什么条件下绑定的原生DOM事件监听?
    a. 给html标签绑定dom事件监听: <div @click="handleClick">
    b. 给组件标签绑定dom事件监听(使用.native): <MyCommponent @click.native="handleClick">
2). 什么条件下绑定的vue自定义事件监听?
    a. 自定义事件名:  <MyComponent @xxx="handleClick2">
    b. 与dom事件名同名: <MyComponent @click="handleClick">
3). 利用vm实现全局eventBus
    a. 前置知识:
        Vue原型对象上有3个事件处理的方法: $on() / $emit() / $off()
        组件对象的原型对象是一个vm对象: 组件对象可以直接访问Vue原型对象上的方法
    b. 实现
        创建vm作为全局事件总线对象: Vue.prototype.$bus = new Vue()
        分发事件/传递数据的组件: this.$bus.$emit('eventName', data)
        处理事件/接收数据的组件: this.$bus.$on('eventName', (data) => {})
```

### 26.v-model的本质

```javascript
1). v-model的本质
    <input v-model="name">
    <input :value="name" @input="name = $event.target.value">
2). 在自定义组件上使用v-model
    <MyInput v-model="name">
    MyInput.vue
        props: ['value']
        <input :value='value' @input="$emit('input', $event.target.value)">
        =============================
<input type="text" v-model="msg">
    <p>{{msg}}</p>
    <hr>
    =================
        <input type="text" :value="msg" @input="msg=$event.target.value" >
    <p>{{msg}}</p>
    ==========================
    <Model1></Model1>
   <hr>
   <Model2 v-model="msg2"></Model2>
    <span>{{msg2}}</span>
    ===============================
        <input type="text" :value="value" @input="$emit('input',$event.target.value)">
        props:['value']
    =================================
    <hr>
     <Model3 :value="msg3" @input="msg3=$event"></Model3>
    <span>{{msg3}}</span>
    ==========================
    <input type="text" :value="value" @input="$emit('input',$event.target.value)">
    props:['value']
    =================================================
```



### 27.响应式原理

```javascript
1). 关注点有哪些?
    vue的数据绑定效果: 组件更新data数据后, 当前组件及相关的子组件都会更新相应的节点
    如何知道数据变化了?
    通知哪些组件更新渲染?
    组件更新渲染是同步还是异步的?
    
2). 基本原理
    在初始化时: 利用Object.defineProperty()给data属性添加 setter 监视数据变化
    在初始化时: 每个组件实例都有相应的观察者 watcher 对象, 每个属性都关联上所有相关的watcher对象
    在更新数据后: 对应的setter调用, 通知所有相关的watcher, watcher内异步更新节点或者子组件

3). 一些细节
    只有data中属性是响应式的, 只在组件对象上的属性不是响应式的
    data中所有层次属性都是响应式的
    直接能data中响应式属性对象添加一个新的属性, 默认不是响应式的, 需要用Vue提供的语法添加
        Vue.set(obj, propName, value)
        vm.$set(obj, propName, value)
    vue的异步更新: 
        vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，
        如果执行环境不支持，会采用 setTimeout(fn, 0) 代替
    关于<Root>组件标签: 
        整体应用界面的根标签不是<App>, 而是<Root>, 
        <Root>对应的是vm
        index页面中的的div元素会被替换, 而不是插入其中
    组件的data配置不能是对象?
        组件会被多次使用, 每次使用都会读取data配置值, 如果是对象, 那就会共用一个data对象
        而函数就没有问题, 
```

### 28.正向代理

```javascript
1). 正向代理
    代理客户端
    隐藏真实的客户，为客户端收发请求，使真实客户端对服务器不可见;
    一个局域网内的所有用户可能被一台服务器做了正向代理，由该台服务器负责 HTTP 请求;
    例子: http-proxy-middleware / 翻墙软件
2). 反向代理
    代理服务器;
    隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见;
    例子: Nginx 服务器
```

### 29.webpack优化

```javascript

module.exports = {
   mode: '',
   entry: '',
   output: '',
   plugins: [],
   module: [],
   resolve: '',
   devServer: {}

```

1.entry

入口起点：用来指示webpack应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack会找出有哪些模块和库是入口起点(直接和间接)依赖的。

可以通过在webpack配置中配置entry属性，来指定一个入口起点(或多个入口起点)。默认为 ./src

一般单入口(单页应用)项目的entry是这个样子的

```javascript

module.exports = {
   mode: 'development',
   entry: './src/index.js'
}  
```

用来告诉webpack，从./src/index.js开始进行解析打包

而多入口(多页应用)项目的entry是这个样子的

```javascript

module.exports = {
   mode: 'development',
   entry: {
      index: './src/index.js',
      home: './src/home.js'
   }
}  
```

这是用来告诉webpack需要2个独立分离的依赖文件进行起始打包工作

在多页应用中，(译注：每当页面跳转时)服务器将为你获取一个新的HTML文档。页面重新加载新文档，并且资源被重新下载。然而，这给了我们特殊的机会去做很多事情：

   使用CommonsChunkPlugin为每个页面间的应用程序共享代码创建bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，从而可以极大的从这些技术中受益

根据经验，每个HTML文档只使用一个入口起点

2.output

配置output选项可以控制webpack如何向硬盘写入编译文件。注意，即使可以存入多个入口起点，但只指定一个输出配置。

用法：

在webpack中配置output属性的最低要求是，将它的值设置为一个对象，包括filename(用于输出文件的文件名)，path(目标输出目录path的绝对路径)

```javascript
module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__diename,'dist')
   }
```

此配置将一个单独的index.js文件输出到了dist文件夹下，名为bundle.js

多入口起点如何打包?

```javascript

module.exports = {
   mode: 'development',
   entry: {
      index: './src/index.js',
      home: './src/home.js',
   },
   output: {
      filename: '[name].js',
      path: path.resolve(__diename,'dist')
   }
```

如果配置创建了多个单独的chunk，则应该使用占位符来确保每个文件具有唯一的名称。

扩展：还可以使用CDN和资源hash

```javascript

module.exports = {
   mode: 'development',
   entry: {
      index: './src/index.js',
      home: './src/home.js',
   },
   output: {
      filename: '[name].[hash].js',
      publicPath:'http://www.baidu.com/'
      path: path.resolve(__diename,'dist')
   }
```

3.devServer

devServer的功能有很多，以下列举一些比较常用的：

```javascript

deveServer: {
   port: 3000,
   open: true,
   host: 'localhost',
   hot: true,
   https: true,
   progress: true,
   contentBase:'./build',
   compress:true,
   proxy: {
      "/api": {
         target: "http://localhost:3000",
         pathRewrite: {"/api" : ""}
      }
   }
```

port:指定要监听请求的端口号

open:是否要打开浏览器

host:使用一个指定的host,默认是localhost,如果希望服务器外部访问，指定为0.0.0.0

hot:启动热加载(需引入插件)

https:默认情况下dev-server通过http提供服务，也可以选择带有https的http/2服务

progress:打包进度条

contentBase:提供的静态资源目录

compress:一切服务都启用gzip压缩

proxy:

如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。

详细解读webpack配置之plugins、resolve、module

4.plugins(插件)

port:指定要监听请求的端口号

open:是否要打开浏览器

host:使用一个指定的host,默认是localhost,如果希望服务器外部访问，指定为0.0.0.0

hot:启动热加载(需引入插件)

https:默认情况下dev-server通过http提供服务，也可以选择带有https的http/2服务

progress:打包进度条

contentBase:提供的静态资源目录

compress:一切服务都启用gzip压缩

proxy:

如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。

详细解读webpack配置之plugins、resolve、module

4.plugins(插件)

plugins选项用于以各种方式自定义webpack构建过程。webpack附带了各种内置插件，可以通过webpack.[plugin-name]访问这些插件， 这里 获取插件列表和对应文档。但请注意，这只是其中的一部分，社区中还有很多插件

```javascript

module.exports = {
   plugins: [
     new HtmlWebpackPlugin({})
   ]
}
```

5.resolve(解析)

这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。关于 resolver 具体如何工作的更多解释说明，请查看 [模块解析](https://www.webpackjs.com/configuration/resolve/) 。

```javascript
module.exports = {
   resolve:{
      modules:[path.resolve("node_modules"),path.resolve("dist")]
   }
}
```

6.module(模块)

在webpack中任何一个东西都称为模块，js就不用说了。一个css文件，一张图片、一个less文件都是一个模块，都能用导入模块的语法（commonjs的require，ES6的import）导入进来。webpack自身只能读懂js类型的文件，其它的都不认识。但是webpack却能编译打包其它类型的文件，像ES6、JSX、less、typeScript等，甚至css、images也是Ok的，而想要编译打包这些文件就需要借助loader

loader就像是一个翻译员，浏览器不是不认识这些东西么?那好交给loader来办，它能把这些东西都翻译成浏览器认识的语言。loader描述了webpack如何处理非js模块，而这些模块想要打包loader必不可少，所以它在webpack里显得异常重要。loader跟插件一样都是模块，想要用它需要先安装它，使用的时候把它放在module.rules参数里，rules翻译过来的意思就是规则，所以也可以认为loader就是一个用来处理不同文件的规则
```javascript

module.exports = {
   module: {
      rules: [
         {
         	test:/\.css$/,
         	use:['style-loader','css-loader']
         }
      ]
   }
}
```

