# **day01**

### 静态页面布局

### 动态显示字体图标高亮

1. 类名确定 但是有没有不确定 **动态绑定类名** 路由组件  **$route.path**  数据代理 上面不需要用this

   ```js
   <a href="javascript:;" class="guide_item" :class="{on:$route.path==='/msite'}">//true则添加类名
   ```

**点击时实现路由跳转**

1. 编程式实现跳转  **需要下载 core-js 包**

   - 添加点击事件goTo  参数为路径
   - 定义事件回调 接收路径参数
   - this.$route

   **注：$route 下面的参数为 path query params meta 。 而编程式路由导航 是使用路由的实例router**  

   ```js
   注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push('路径')。
   
   react 中是使用 this.props.history.push('路径')
   ```

### 实现每个组件的静态页面

# day02

### 单独拆分头部组件 （一般组件）

- css样式
- title插值  props 接收
- 左右不分定义成插槽
- 全局注册头部组件
- 替换其他组件中的头部组件 传入title 并应用插槽

**Login组件**

- 静态布局
- 配置路由(routes.js)

**以上配置好所有路由 静态页面 组件 应用插槽抽离Header**

**封装ajax请求函数模块**

- ajax---> 请求拦截器
- index--->请求函数

**请求拦截器**   回调函数接受一个配置函数  并将配置返回

```js
对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
axios.interceptors.request.use(config => {

    return config
})
```

**注 ： 只有post 请求存在参数问题 有可能后台不接受JSON格式   POST请求体参数 用data GET用 地址 ？ 传参  或者用 params传参**

**响应拦截器** 成功的回调接收一个response参数 失败的回调接收 error 统一处理错误

**根据经纬获取位置**

- 定义请求函数

**注 ： 以对象形式发送axios GET请求**

```js
// 方法一
axios.get('/user', {
    params: {// 携带 query 参数
        ID: 12345
    }
})
// 方法二 地址携带params参数
axios.get('/user?ID=12345')
```

​     	**以函数形式发送GET请求**

```js
//方法一地址栏携带参数 
export const reqAddress = (longitude, latitude) =>
ajax({
    method: 'GET', // 可省  默认GET
    url: `/position/${longitude},${latitude}` // params 参数
})
// 方法二 
export const reqShops = (longitude, latitude) =>
ajax({
    url: '/shops',
    params:{  // 第二种传递参数方式params     
        longitude,
        latitude
    }
})
```

**以对象形式发送POST请求**

```js
export const reqAddRole = (roleName) => ajax.post('/add', {roleName})
```

**以函数形式**

```js
ajax({ //配置对象  
    method:'post',
    url:BASE+'/login', 
    data:{ 
        username,
        password
    } z 
})
```



**设置默认请求 路径    ajaxi.js 中**

 `axios.defaults.baseURL = 'http://localhost:4000'` 

**配置代理解决请求跨域**

```js
// 2 版本脚手架在 config/index.js 中 proxyTable
// 3 版本脚手架新建 vue.config.中
module.exports = {
    devServer: {
        proxy: 'http://localhost:4000'
    }
}
// 或者
module.exports = {
    devServer: {
        proxy: {
            '/api': {// 以 /api开头  需要在请求地址前面都加 /api
                target: '<url>',// 目标地址
                changeOrigin: true //支持跨域
                pathRewrite: {
                '^/api/old-path': '', // 重写地址 请求时在把 /api 去掉或者改变

            },
        },
    }
}
}
```

# day03

**引入Vuex**

- 创建store 注册 store 、

- mutations中修改状态

  ```js
  // ES2015 风格--- ES6
  [RECEIVE_ADDRESS](state, address) {
      state.address = address
  },
  ```

- actions间接修改 发送异步请求 然后 commit

  ```js
  async getAddress({ commit, state }) {
      // 接收context 下面使用 context.commit
      // 1. 调用接口请求函数
      const { longitude, latitude } = state
      const result = await reqAddress(longitude, latitude)
      if (result.code === 0) {
          const address = result.data
          //2.有了结果 提交mutation
          commit(RECEIVE_ADDRESS, address)
      }
  },
  ```

- App中分发actions

  ```js
  mounted() {
      this.$store.dispatch('getAddress')
  },
  ```

- Msite中获取数据

  ```js
  computed: {
      ...mapState(['address'])
  },
   // 官网写法
   computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
      ])
  ```

**动态显示Shops页面**

- Msite 中可以分发action  

- Shops中 ...mapState

- 动态显示数据

- 星星抽离组件

- 注册全局组件

- Shops中应用星星组件

- Shops中把评分传给星星组件

- 依据评分动态显示星星

  1. shops将分数和尺寸传入start组件
  2. star根据分数 生成一个 类名数组 通过计算属性 生成星星

  ```js
  computed: {
      starClasses() {
          const { score } = this
          const scoreInteger = Math.floor(score)
          const arr = []  // 注意push的顺序
          for (let i = 0; i < scoreInteger; i++) {
              arr.push('on')
          }
          if (score * 10 - scoreInteger * 10 >= 5) {
              arr.push('half')
          }
          while (arr.length < 5) {
              arr.push('off')
          }
          return arr
      }
  }
  // 遍历数组 绑定类名
  <span class="star-item" v-for="(c, index) in starClasses" :key="index" :class="c"></span>
  ```

**三种方法解决轮播失效问题**

1. watch + nextTick()
2. callback + nextTick() 在分发actions时候传入回调函数 该回调函数在commit之后执行
3. 利用dispatch()返回的promise

   ```js
watch: {
    // 更新状态数据 ==> 立即同步调用监视的回调函数 ==> 异步更新界面
    categorys() {
        // categorys状态数据更新了
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
            // 回调函数在界面更新之后执行
            new Swiper('.swiper-container', {
                loop: true, 
                pagination: {
                    el: '.swiper-pagination'
                }
            })
        })
    }
}, 
   ```

```js
// 分发actions 时候传入callback 在actions中commit之后执行callback
mounted() {
    this.$store.dispatch('getShops')
    this.$store.dispatch('getCategorys', () => {
        //知道categorys变化了
        this.$nextTick(() => {
            new Swiper('.swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            })
        })
    })
},
```



```js
async mounted() {
    this.$store.dispatch('getShops')
    await this.$store.dispatch('getCategorys')
    new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination'
        }
    })
},
```



# day04

### **Login组件_前台交互**

1. 2种登录方式的切换

   - 通过模拟数据 loginWay的 布尔值 动态设置类名  on 来控制显示隐藏

2. 手机号验证

   - 表单数据收集

   - 通过计算属性 正则匹配手机号(返回的布尔值) 动态显示类名以及 禁用按钮是否显示

   - 按钮一旦禁用 一切类名以及事件都不会生效

     ```js
     // 电话号码 正确  以及数字 = 0 时候 都是禁用的
     :disabled="!isRightPhone || computeTime >0 "
     ```

     

   - 添加对应类名的文字颜色样式

   - 获取验证码 添加点击事件alert 发送请求------->阻止form表单的默认行为

3. 倒计时

   - 数据驱动视图----->开始准备好  后面只要数据改变了  视图就会改变
   - 设置数据 computeTime button内容插值语法 内部 三元 判断显示内容(>0显示倒计时)
   - 点击或去验证码 将computeTime  设置一个最大值 然后慢慢减少 至0 
   - 一旦到了0, 清除定时器 

4. 密码显示/隐藏切换

   - 设置状态 isShowPwd  动态显示输入框 type 类型  （内部三元  注意是 字符串）
   - 添加点击事件 点击切换  isShowPwd  
   - 三元 动态添加类名 on 或 off 
   - 小圆点 添加类名 right ---> 与isShowPwd  同步
   - 给小圆点添加 过度样式
   - 文本内容 通过三元 判断 isShowPwd  

5. 前台表单验证

   - 应用 vee-validate 插件 读文档 自己解决

### Login组件 前后台交互功能

1. 一次性图形验证码

   - 实现点击图片，重新发送请求

   - 绑定点击事件 点击时重新指定 src属性 
   - 绑定ref ----->为了获取节点
   - 地址需要 ? +time 保证每次不一样，要不然不发送请求

2. 一次性短信验证码

   - 定义接口请求函数
   - 点击获取验证码的时候 发送axios请求
   - 成功（使用mint-ui库）
   - 失败 提示msg 然后清理定时器 

3. 手机号和短信验证码登录

   - 定义接口请求函数
   - 收集数据
   - 依据loginWay 调用请求函数
   - 依据请求结果进行响应处理(块级作用域)
   - 完善操作，Sms登录请求完成后 停止计时器
   - 密码登录 如果失败 更新图形验证码，并清空用户输入
   - 保存用户 state中定义用户对象状态 
   - 组件中dispatch action 并携带user
   - action中定义saveUser方法接收commit user
   - 定义mutation-type 中的变量
   - 定义mutation 中的 方法
   - action中 commit 指定方法 并携带user

4. 自动登录(token)

### mint-ui

1. 按需加载在 babel.config 中配置
2. 由于mint-ui是根据 脚手架2设计的 根据官网配置 时会报错，第二个参数应该是对象

**修改profile页面**

1. 获取用户信息
2. 根据用户信息显示页面 显示、隐藏 、 用户信息
3. 点击时 判断user._id是否存在 存在去userdetail  不存在去 login 页面
4. 引入mint-ui Button 组件 做成退出登录  当用户存在时 显示
5. 绑定点击监听 点击退出登录
6. 点击时提示 messagebox 组件 并分发action （logout）
7. 定义logout action mutation 等  点击时 将user设为空
8. 解决控制台报错  在 MessageBox.confirm  的回调函数中 再添加一个回调

**解决刷新profile页面 数据丢失问题----->没有存储用户信息 **

### 1.  token的理解和使用


1). 作用

- 是一个包含特定信息的字符串:　id / 失效的时间
-  对请求进行一定的检查限制, 防止恶意请求
- 后台部分接口需要进行token验证  ==> 只有请求这些接口时才携带token

2). 使用流程

- 客户端发送登陆的请求, 服务器端进行用户名和密码查询,   如果user存在, 根据user的id值生成token(指定了有效期), 将user和token返回给客户端

- 客户端接收到登陆成功的响应后, 将token保存localStorage, 将user和token保存在vuex的state
-  在请求需要授权检查的接口前(在请求拦截器做) 如果token不存在, 不发请求, 直接进行错误流程(响应拦截器的错误处理): throw error对象(status: 401)如果token存在, 将token添加到请求头中: config.headers.Authorization = token

- 在响应拦截器中处理错误

​    1). 如果error中没有response
​        判断error的status为401, 如果当前没有在登陆页面, 跳转到登陆页面
​    2). 如果error中有response, 取出response中的status
​        status为: 401: token过期了, 退出登陆(清除local中的token和state中user与token), 并跳转到登陆页面
​        status为: 404: 提示访问的资源不存在

**token存储**

1. saveUser中 取出token 并保存到localStorage中 id 和值
2. 在state中设置toke初始状态 初始值去localStorage中读取
3. 将token保存到状态中 定义mutation 然后commit
4. 删除user中的tokendelete user.token 
5. 退出登录时 commit  RESET_TOKEN  并移除 localStorage 中的token （removeItem ）
6. 定义 RESET_TOKEN 的 mutation  state.token = ' ' 

**实现自动登录 **

**在请求拦截器中**

1. 引入store 判断 请求是否需要tokenconfig.headers.needToken  

2. 如果需要则取出token 继续判断

3. 如果取不出token  抛出异常 如果有 则添加到请求头中

   ```js
   if (!token) {
       const error = new Error('没有token，不能发送请求')
       throw error
   } else {
       // - 有token ，添加到请求头中：Authorization=token
       config.headers['Authorization'] = token
   }
   ```

   

   **配置请求接口 需要toke的 则**

   ```js
   export const reqCategorys = () =>
   ajax.get('/index_category', {
       headers: {
           needToken: true
       }
   }) 
   ```

   **分情况处理错误**     没有code   const status = response.status 

   1. 没有token 则 code 码为 401    error.code = 401 

   2. 取出error 中的 response code message 

   3. 请求前失败了

      - code===401 跳转到登录页面
      - router.currentRoute.path !== './login' 
      - Toast(message)

   4. 请求之后失败了   

      - code=401 退出登录，跳转到登录页面
      - code=404 Toast 请求资源不存在
      - 其他情况 Toast messagre

      

      **自动登录**

      1. 定义自动登录接口请求函数（需要token）
      2. App中分发 autoLogin  actions
      3. 定义actons  如果状态中有token，发送自动登录请求 
      4. 如果成功，取出user commit saveuser

      

   

   # day05

   **shop 商家详情组件**

   1. 定义注册一级路由
   2. 给每个商家绑定店家事件，点击跳转到 shop 页面
   3. 定义shop 组件公共组件 ShopHeader 组件
   4. 点餐  商品 详情 组件 使用声明式路由导航   shop的子路由
   5. 点击路由跳转  replace  +      <router-view /> 

   **mock数据/接口**

   1. 引入mock
   2. main.js 中 引入mock 
   3. 定义接口请求函数
   4. 设计状态数据 存储接口请求回来的数据
   5. shop组件中分发action（3个）

   **vuex 模块化**

   1. 依据组件分类 modules 下属 msite  shop user 

   2. 每个文件中 包含所有 vuex 相关操作 全部引入  只能操作自己组件的状态

      ```js
      export default {
        state,
        mutations,
        actions,
        getters
      }
      ```

   3. 原本的vux 文件 为总操作状态数据的 方法

      ```js
      // 总 action
      export default {
          yyy ({commit, state}) {
              // state: 总的state
              // commit('zzz')  // 匹配所有的mutation函数
          }
      }
      ```

   4. index 中引入 modules 下的文件 并配置

      ```js
      export default new Store({
          mutations,
          actions,
          getters,
      
          // 配置应用中所有的功能相关的配置
          modules: {// vuex 多模块变成
              msite: msite, // key 为标识
              user: user,
              shop: shop
          }
      })
      ```

   5. 将所有的...mapState进行修改 (知道读状态的操作 都要多加一层)

      ```js
      // ...mapState(['address', 'categorys','user']),只会去总状态中找   
      ...mapState({
          address:state=>state.msite.address,// 函数的返回值为属性值
          categorys:state=>state.msite.categorys,
          user:state=>state.user.user
      }),
      ```

   **ShopHeader组件**

   1. 读取商品信息状态数据

      ```js
      ...mapState({
          info: state => state.shop.info
      })
      ```

   

   2. info.supports  初始化显示 会不存在  会导致下面读取不到而报错 

      ```js
      v-if="info.supports"
      ```

      



**Goods 组件 以及滑动**

1. 静态页面并获取state数据

2. 动态显示页面

3. 引入第三方库 better-scroll   ui滑动库

4. ref 两个容器  new BSscroll  第一个参数 选择器  第二个参数配置对

5. 完美做法

   ```js
   watch: {
       goods() {
           // goods 数据有了
           this.$nextTick(() => {// 以防万一
               new BSscroll(this.$refs.left, {})
               new BSscroll(this.$refs.right, {})
           })
       }
   }
   ```

# day06

**左右联动**

1. 设置状态数据

   ```js
   data() {
       return {
           scrollY: 0, // 右侧 上下滑动距离 实时改变
           tops: [0,5,8,12] // 右侧所有分类 li 的top 组成的数组 在列表显示之后统计一次即可
       }
   },
   ```

2. 定义滑动添加类名的计算方法

   ```js
   currentIndex() {
       const { scrollY, tops } = this
       return tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1] )
   }
   ```

3. 解决切换时 Goods 组件滑动失效

   - 将 new BSscroll  定义成方法 （_ 标识） 在监听中调用
   - 在mouted中 也调用

4. 收集Tops值

   - 定义方法 同上两个位置调用

   ```js
   _initTops() {
       const tops = []
       let top = 0
       tops.push(top)
       const lis = this.$refs.rightUL.children
       // 让一个维数组 去执行真数组的方法
       Array.prototype.forEach.call(lis, li => {
           top += li.clientHeight
           tops.push(top)
       })
       // 更新tops数据状态
       this.tops = tops
       console.log(tops)
   }
   ```

5. 设置  probeType: 1   并绑定 scrollEnd事件 

   ```js
   rightScorll.on('scrollEnd', ({ x, y }) => {
       this.scrollY = Math.abs(y)
   })
   ```

6. 左侧列表绑定点击监听 传入index值

7. 设置事件回调函数

   ```js
   selectItem(index) {
       const top = this.tops[index]  // 拿出来的都是正值
       // 立即更新scorllY值 (解决延迟问题 )
       this.scrollY = top 
       // 让右侧列表滑动到对应位置
       this.rightScorll.scrollTo(0, -top, 500)
   }
   ```

8. 右侧滑动 左侧列表始终可见

   ```js
   currentIndex() {
       const { scrollY, tops } = this
       // 计算得到新的下标
       const index = tops.findIndex(
           (top, index) => scrollY >= top && scrollY < tops[index + 1]
       )
       // 先比较 发现不同才保存
       if (index != this.index && this.leftScorll) {
           this.index = index
           // 如果不同 则让左侧列表 滑动到 index 对应的 li
           const li = this.$refs.leftUL.children[index]
           this.leftScorll.scrollToElement(li, 500)
       }
       return index
   }
   ```

   

**CartControl 组件**

1. 非路由组件静态页面

2. 全局注册组件

3. Goods组件中 使用该组件

4. 由于需要食物的count数量，并且会更新数据状态 所以该组件直接接收由Goods传来 food 对象

5. 给+  -  添加点击事件  点击是分发 action

6. 定义action  mutations

   ```js
   [ADD_FOOD_COUNT](state, { food }) {
       if (food.count) {
           food.count++
       } else {
           // 给 food 添加一个新的属性 属性名是count 值是1
           // 新添加的属性 不会有数据绑定
           // food.count = 1
           // 为响应式对象添加一个属性  // 属性名是字符串
           Vue.set(food,'count',1)
       }
   },
       [REDUCE_FOOD_COUNT](state, { food }) {
           if (food.count > 0) {
               food.count--
           }
       }
   ```

7. this.scroll.refresh()     重新计算



