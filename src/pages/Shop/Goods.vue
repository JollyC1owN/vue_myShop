<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUl">
          <!-- current currentIndex-->
          <li
            class="menu-item"
            :class="{current:currentIndex===index}"
            v-for="(good,index) in goods"
            :key="good.name"
            @click="selectItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                @click="showFood(food)"
                v-for="food in good.foods"
                :key="food.name"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food ref="food" :food="food" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import ShopCart from '../../components/ShopCart/ShopCart'
import Food from '../../components/Food/Food'
export default {
  name: 'Goods',
  data() {
    return {
      // 右侧列表滑动的y轴坐标，初始为0.在滑动的过程中实时改变的
      scorllY: 0,
      // 右侧所有分类li的top组成的数组，在列表显示之后统计一次即可
      tops: [],
      // 需要显示的food
      food: {}
    }
  },

  mounted() {
    // 如果数据已经有了
    if (this.goods.length > 0) {
      this._initScroll()
      this._initTops()
    }
  },

  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    //当前分类的下标
    currentIndex() {
      const { scorllY, tops } = this
      // 计算得到的新的下标
      const index = tops.findIndex(
        (top, index) => scorllY >= top && scorllY < tops[index + 1]
      )
      // 先比较，发现不同才保存
      if (index != this.index && this.leftScroll) {
        this.index = index
        // 让左侧滑动到对应的li
        const li = this.$refs.leftUl.children[index]
        this.leftScroll.scrollToElement(li, 500)
      }
      return index
    }
  },

  watch: {
    // 没有数据，后来有了
    goods() {
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    }
  },

  methods: {
    // methods中放的都是事件的回调函数，下面的方法并不是，所以加一个_做为标识
    _initScroll() {
      this.leftScroll = new BScroll(this.$refs.left, {
        // 允许分发点击事件
        click: true
      })
      this.rightScroll = new BScroll(this.$refs.right, {
        probeType: 1, //触发时机：触摸，实时
        // probeType: 2    //触发时机：触摸，实时
        // probeType: 3 //触发时机：触摸、惯性、编码，实时  触发频率高
        click: true
      })
      // 给rightScroll绑定scroll的监听
      this.rightScroll.on('scroll', ({ x, y }) => {
        this.scorllY = Math.abs(y)
      })
      this.rightScroll.on('scrollEnd', ({ x, y }) => {
        this.scorllY = Math.abs(y)
      })
    },
    // 设置左侧滑动区的显示
    selectItem(index) {
      const top = this.tops[index]
      // 立即更新scrollY值:解决点击后，右侧滑动停止之后才会显示左侧的高亮
      this.scorllY = top
      // 让右侧列表滑到对应位置编码滑动
      // 毫秒为单位
      this.rightScroll.scrollTo(0, -top, 500)
    },
    // 初始化tops的初始值
    _initTops() {
      const tops = []
      let top = 0
      tops.push(top)
      const lis = this.$refs.rightUl.children
      Array.prototype.forEach.call(lis, li => {
        top += li.clientHeight
        tops.push(top)
      })
      // 更新tops数据
      this.tops = tops
    },
    // 显示指定的food
    showFood(food) {
      this.food = food
      // 显示food组件界面
      this.$refs.food.toggleShow()
    }
  },

  components: {
    ShopCart,
    Food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden

  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7

    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px

      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color #ff6700
        font-weight 700

        .text
          border-none()

      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat

      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px

  .foods-wrapper
    flex 1

    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7

    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))

      &:last-child
        border-none()
        margin-bottom 0

      .icon
        flex 0 0 57px
        margin-right 10px

      .content
        flex 1

        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)

        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)

        .desc
          line-height 12px
          margin-bottom 8px

        .extra
          .count
            margin-right 12px

        .price
          font-weight 700
          line-height 24px

          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)

          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)

        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>

