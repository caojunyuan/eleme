<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="supports-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg-img">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="slide">
      <div v-show="isShowDetail" class="detail">
        <div class="detail-content">
          <div class="content-inner">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="title-name">优惠信息</div>
              <div class="line"></div>
            </div>
            <div v-if="seller.supports" class="supports">
              <div class="supports-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </div>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="title-name">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail"><i class="icon-close"></i></div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    components: {
      star
    },
    props: {
      seller: Object
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        isShowDetail: false
      };
    },
    methods: {
      showDetail() {
        this.isShowDetail = true;
      },
      hideDetail() {
        this.isShowDetail = false;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .header
    position: relative
    background: rgba(7, 17, 27, .5)
    color: #fff
    .content-wrapper
      position: relative
      font-size: 0
      padding: 24px 12px 18px 24px
      .avatar
        display: inline-block
        margin-right: 16px
        vertical-align: top
        img
          width: 64px
          height: 64px
          border-radius 2px
      .content
        display: inline-block
        .title
          font-size: 16px
          margin-top: 2px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            background-img('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            vertical-align: top
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .desc
          margin-top: 8px
          font-size: 12px
        .supports
          margin-top: 10px
          font-size: 0
          .icon
            display: inline-block
            margin-right: 4px
            width: 12px
            height: 12px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              background-img(decrease_1)
            &.discount
              background-img(discount_1)
            &.guarantee
              background-img(guarantee_1)
            &.invoice
              background-img(invoice_1)
            &.special
              background-img(special_1)
          .text
            font-size: 10px
            line-height: 12px
        .supports-count
          position: absolute
          right: 12px
          bottom: 18px
          padding: 0 8px
          height: 24px
          line-height: 24px
          border-radius: 14px
          background-color: rgba(0, 0, 0, .2);
          .count
            font-size: 10px
            margin-right: 2px
            vertical-align: top
          .icon-keyboard_arrow_right
            font-size: 10px
            line-height: 24px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
      background-color rgba(7, 17, 27, 0.2)
      .bulletin-icon
        display: inline-block
        vertical-align: top
        margin-top: 9px
        width: 22px
        height: 12px
        background-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        margin: 0 4px
      .icon-keyboard_arrow_right
        font-size: 12px
        position absolute
        right 12px
        top: 9px
    .bg-img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
      overflow: hidden
    .detail
      position: fixed
      display: flex
      flex-flow: column
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 100
      overflow: auto
      background-color: rgba(7, 17, 27, .8);
      .detail-content
        flex: 1
        padding-top: 64px
        .content-inner
          height: 100%
        .name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700px
        .star-wrapper
          margin-top: 12px
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px
          .title-name
            padding: 0 12px
            font-size: 14px
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, .2)
        .supports
          width: 80%
          margin: 0 auto
          .supports-item
            margin-bottom: 12px
            padding: 0 12px
            &:last-child
              margin-bottom: 0
            .icon
              display: inline-block
              margin-right: 6px
              width: 16px
              height: 16px
              vertical-align: top
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                background-img(decrease_2)
              &.discount
                background-img(discount_2)
              &.guarantee
                background-img(guarantee_2)
              &.invoice
                background-img(invoice_2)
              &.special
                background-img(special_2)
            .text
              font-size: 12px
              line-height: 16px
        .bulletin
          width: 80%
          margin: 0 auto
          p
            padding: 0 12px
            line-height: 24px
            font-size: 12px
            text-align: justify
            text-indent: 2em
      .detail-close
        padding-bottom: 32px
        font-size: 32px
        text-align: center
      &.slide-enter
        transform: translateY(-700px)
      &.slide-enter-active
        transition: all .5s
      &.slide-leave-active
        transform: translateY(-700px)
        transition: all .2s
</style>
