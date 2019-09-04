<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="'http://fuss10.elemecdn.com'+category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <Shops />
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import { mapState } from 'vuex'
import Shops from '../../components/Shops/Shops'
/*解决swiper的bug--创建swiper轮播图有问题
    创建Swiper时机：必须在列表页面显示之后
    1、watch+ nextTick解决轮播图的bug
    2、callback + nextTick解决轮播图的bug
    3、利用dispatch返回的promise
         promise对象是在状态更新切界面更新之后才产生promise成功的结果
*/

export default {
  name: 'Msite',
  data() {
    return {}
  },
  // 利用：dispatch返回的是一个promise对象
  // promise对象是在状态更新切界面更新之后才产生promise成功的结果
  async mounted() {
    this.$store.dispatch('getShops')
    // 只有到await得到一个成功状态的promise之后，才执行下面的代码
    await this.$store.dispatch('getCategorys')
    new Swiper('.swiper-container', {
      loop: true, // 循环模式
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
  },
  computed: {
    ...mapState(['address', 'categorys']),
    /* 分类的二维数组
        小数组的最大长度为8
        每个小数组只能往大数组中存放一次：引用地址的问题
    */
    categorysArr() {
      const bigArr = []
      let smallArr = []
      const { categorys } = this
      // 遍历总数组
      categorys.forEach(c => {
        // 将小数组添加到大数组中
        // 每个小数组只能往大数组中存放一次
        if (smallArr.length === 0) {
          bigArr.push(smallArr)
        }
        // 将每一项添加到小数组中
        smallArr.push(c)
        // 小数组的最大长度为8
        if (smallArr.length === 8) {
          // 让smallArr指针指向改变
          smallArr = []
        }
      })
      return bigArr
    }
  },
  components: {
    Shops
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.msite // 首页
  width 100%

  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff

    .swiper-container
      width 100%
      height 100%

      .swiper-wrapper
        width 100%
        height 100%

        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap

          .link_to_food
            width 25%

            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0

              img
                display inline-block
                width 50px
                height 50px

            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666

      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #ff6700
</style>
