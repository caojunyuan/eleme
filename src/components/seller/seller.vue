<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="title">{{seller.name}}</div>
        <div class="star-wrapper border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="delivery">
          <li class="border-1px">
            <div class="title">起送价</div>
            <div class="text">
              <span class="strong">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="border-1px">
            <div class="title">商家配送</div>
            <div class="text">
              <span class="strong">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="border-1px">
            <div class="title">平均配送时间</div>
            <div class="text">
              <span class="strong">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="text-wrapper border-1px">
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li v-for="item in seller.supports" class="support-item">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pics-wrapper" ref="picScroll">
          <ul class="pics-list" ref="picList">
            <li v-for="item in seller.pics" class="pic">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '../split/split';
  import star from '../star/star';
  import BScroll from 'better-scroll';
  import {saveToLocal, getFromLocal} from '../../common/js/saveToLocal.js';
  export default {
    props: {
      seller: Object
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        favorite: (() => {
          return getFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    components: {
      split, star
    },
    watch: {
      seller() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPicScroll();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPicScroll();
      });
    },
    methods: {
      _initScroll() {
        if (!this.Scroll) {
          this.Scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.Scroll.refresh();
        }
      },
      _initPicScroll() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
        }
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picScroll, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      },
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    }
  };
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .seller
    position: absolute
    width: 100%
    top: 174px
    bottom: 0
    overflow: hidden
    .overview
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .star-wrapper
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        padding-bottom: 18px
        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px
        .text
          margin-right: 12px
          font-size: 10px
          line-height: 18px
          color: rgb(77, 85, 93)
          vertical-align: top
      .delivery
        display: flex
        padding-top: 18px
        & > li
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          .title
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .text
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)
            .strong
              font-size: 24px
      .favorite
        position: absolute
        width: 50px
        right: 11px
        top: 18px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .text-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .text
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)
      .supports
        .support-item
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          &:last-child
            border-none()
        .icon
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            background-img('decrease_4')
          &.discount
            background-img('discount_4')
          &.guarantee
            background-img('guarantee_4')
          &.invoice
            background-img('invoice_4')
          &.special
            background-img('special_4')
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)

    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .pics-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pics-list
          font-size: 0
          .pic
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .info
      padding: 18px 18px 0 18px
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 12px
        line-height: 14px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 14px
      .info-item
        padding: 16px 12px
        line-height: 16px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
        &:last-child
          border-none()
</style>
