<template>
  <transition name="slide-left">
    <div class="food" v-show="isShow" ref="foodScroll">
      <div class="food-content">
        <div class="food-header">
          <div class="img-wrapper"><img :src="food.image" alt=""></div>
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="count-wrapper">
              <count :food="food"></count>
            </div>
            <transition name="fade">
              <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
            </transition>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="food-ratings border-1px">
          <h1 class="title">商品评价</h1>
          <ratingfilter
            :rating-type="ratingType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @select="selectChange"
            @toggle="toggleContent"
          ></ratingfilter>
        </div>
        <div class="ratings-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-for="item in food.ratings" v-show="selectShow(item.rateType,item.text)"
                class="rating-item border-1px">
              <div class="time">{{item.rateTime | formatDate }}</div>
              <div class="content">
                <span :class="[{'icon-thumb_up':item.rateType===0},{'icon-thumb_down':item.rateType===1}]"></span>
                <span class="text">{{item.text}}</span>
              </div>
              <div class="user">
                <span class="name">{{item.username}}</span><img :src="item.avatar" width="12" height="12"
                                                                class="avatar"></span>
              </div>
            </li>
          </ul>
          <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  const ALL = 2;
  //  const POSITIVE = 1;
  //  const NWGATIVE = 0;
  import Vue from 'vue';
  import {formatDate} from '../../common/js/date';
  import count from '../count/count';
  import split from '../split/split';
  import ratingfilter from '../ratingfilter/ratingfilter';
  import BScroll from 'better-scroll';

  export default {
    props: {
      food: Object
    },
    data() {
      return {
        isShow: false,
        onlyContent: false,
        ratingType: ALL,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      count, split, ratingfilter
    },
    computed: {},
    methods: {
      selectShow(rateType, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.ratingType === ALL) {
          return true;
        } else {
          return rateType === this.ratingType;
        }
      },
      hide() {
        this.isShow = false;
      },
      show() {
        this.isShow = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodScroll, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      },
      selectChange(type) {
        this.ratingType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    background-color: #fff
    &.slide-left-enter, &.slide-left-leave-active
      transform: translateX(100%)
    &.slide-left-enter-active, &.slide-left-leave-active
      transition: all .3s
    .food-header
      position: relative
      .img-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
      .content
        position: relative
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          height: 10px
          font-size: 0
          .sell-count, .rating
            font-size: 10px
            color: rgb(147, 153, 159)
          .sell-count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .count-wrapper
          position: absolute
          right: 18px
          bottom: 15px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          border-radius: 12px
          font-size: 10px
          color: #fff
          background: rgb(0, 160, 220)
          opacity: 1
          &.fade-enter-active, &.fade-leave-active
            transition: all 0.2s
          &.fade-enter, &.fade-leave-active
            opacity: 0
            z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .food-ratings
      padding-top: 18px
      .title
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
        padding-left: 18px
    .ratings-wrapper
      margin: 0 18px
      .rating-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7, 17, 27, .1))
        .time
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 12px
          margin-bottom: 6px
        .content
          font-size: 0
          .icon-thumb_up, .icon-thumb_down
            font-size: 12px
            line-height: 16px
            margin-right: 4px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .icon-thumb_down
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            line-height: 16px
            color: rgb(7, 17, 27)
        .user
          position: absolute
          right: 0
          top: 16px
          line-height: 12px
          font-size: 0
          .name
            display: inline-block
            margin-right: 6px
            vertical-align: top
            font-size: 10px
            color: rgb(147, 153, 159)
          .avatar
            border-radius: 50%
</style>
