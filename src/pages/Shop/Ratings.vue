<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36" />
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36" />
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <Split />

      <RatingsFilter :onlyText="onlyText" :selectType="selectType" :filterRatings="filterRatings" />

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24" />
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont icon-thumb_up"></span>
              </div>
              <div class="time">{{rating.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import RatingsFilter from './RatingsFilter'
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 是否只显示有内容的
      //rateType: 0/1
      // text: 有值/没值
      onlyText: false,
      selectType: 2 // 2: 全部, 0: 推荐, 1: 吐槽
    }
  },
  methods: {
    changeType(type) {
      this.selectType = type
    },
    changeText() {
      this.onlyText = !this.onlyText
    }
  },
  mounted() {
    this.$eventBus.$on('changeType', this.changeType)
    this.$eventBus.$on('changeText', this.changeText)
    if (this.ratings.length > 0) {
      // 从其它路由切换过来, 数据已经有了
      new BScroll('.ratings', {
        click: true
      })
    }
  },
  computed: {
    ...mapState({
      info: state => state.shop.info,
      ratings: state => state.shop.ratings
    }),
    // 点击不同按钮后筛选后的数组
    filterRatings() {
      // 拿到评论数组
      const { ratings, onlyText, selectType } = this
      return ratings.filter(rating => {
        // 数组中每一项中都有评论类型和评论内容
        const { rateType, text } = rating
        //  selectType: 2: 全部, 0: 推荐, 1: 吐槽
        //rateType: 0/1  0: 推荐, 1: 吐槽

        // text: 有值/没值
        // onlyText: true/false
        /* 
        点击类型按钮 2 1 0
        全部显示            当前点击的类型与数据中的类型一致
        selectType===2  ||   selectType===rateType
        点击了只看有内容的评价按钮后：onlyText===true
        */
        return (
          (selectType === 2 || selectType === rateType) &&
          (!onlyText || text.length > 0)
        )
      })
    }
  },
  watch: {
    ratings() {
      // 在当前路由刷新: 初始显示没有数据, 后面才有了数据
      this.$nextTick(() => {
        new BScroll('.ratings', {
          click: true
        })
      })
    }
  },
  components: {
    RatingsFilter
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'

.ratings
  position absolute
  top 225px
  bottom 0
  left 0
  width 100%
  overflow hidden
  background #fff

  .overview
    display flex
    padding 18px 0

    .overview-left
      flex 0 0 137px
      padding 6px 0
      width 137px
      border-right 1px solid rgba(7, 17, 27, 0.1)
      text-align center

      @media only screen and (max-width: 320px)
        flex 0 0 120px
        width 120px

      .score
        margin-bottom 6px
        line-height 28px
        font-size 24px
        color rgb(255, 153, 0)

      .title
        margin-bottom 8px
        line-height 12px
        font-size 12px
        color rgb(7, 17, 27)

      .rank
        line-height 10px
        font-size 10px
        color rgb(147, 153, 159)

    .overview-right
      flex 1
      padding 6px 0 6px 24px

      @media only screen and (max-width: 320px)
        padding-left 6px

      .score-wrapper
        margin-bottom 8px
        font-size 0

        .title
          display inline-block
          line-height 18px
          vertical-align top
          font-size 12px
          color rgb(7, 17, 27)

        .star
          display inline-block
          margin 0 12px
          vertical-align top

        .score
          display inline-block
          line-height 18px
          vertical-align top
          font-size 12px
          color rgb(255, 153, 0)

      .delivery-wrapper
        font-size 0

        .title
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)

        .delivery
          margin-left 12px
          font-size 12px
          color rgb(147, 153, 159)

  .rating-wrapper
    padding 0 18px

    .rating-item
      display flex
      padding 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))

      .avatar
        flex 0 0 28px
        width 28px
        margin-right 12px

        img
          border-radius 50%

      .content
        position relative
        flex 1

        .name
          margin-bottom 4px
          line-height 12px
          font-size 10px
          color rgb(7, 17, 27)

        .star-wrapper
          margin-bottom 6px
          font-size 0

          .star
            display inline-block
            margin-right 6px
            vertical-align top

          .delivery
            display inline-block
            vertical-align top
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)

        .text
          margin-bottom 8px
          line-height 18px
          color rgb(7, 17, 27)
          font-size 12px

        .recommend
          line-height 16px
          font-size 0

          .icon-thumb_up, .icon-thumb_down, .item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px

          .icon-thumb_up
            color $yellow

          .icon-thumb_down
            color rgb(147, 153, 159)

          .item
            padding 0 6px
            border 1px solid rgba(7, 17, 27, 0.1)
            border-radius 1px
            color rgb(147, 153, 159)
            background #fff

        .time
          position absolute
          top 0
          right 0
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
</style>


