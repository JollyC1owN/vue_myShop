<template>
  <div>
    <ShopHeader />

    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
export default {
  name: 'Shop',
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('getGoods')
    this.$store.dispatch('getRatings')
    this.$store.dispatch('getInfo')
  },
  components: {
    ShopHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.tab
  height 40px
  line-height 40px
  background #fff
  bottom-border-1px(rgba(7, 17, 27, 0.1))

  .tab-item
    float left
    width 33.33333%
    text-align center
    font-size 15px
    color rgb(77, 85, 93)

    a
      display block
      position relative

      &.router-link-active
        color #ff6700

        &::after
          content ''
          position absolute
          left 50%
          bottom 1px
          width 35px
          height 2px
          transform translateX(-50%)
          background #ff6700
</style>
