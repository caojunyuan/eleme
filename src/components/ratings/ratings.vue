<template>
  <div class="ratings"
       ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="desc">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="text">服务态度</span>
            <span class="star-wrapper">
                                                                      <star :size="36" :score="seller.serviceScore"></star>
                                                                    </span>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="text">商品评分</span>
            <span class="star-wrapper">
                                                                      <star :size="36" :score="seller.foodScore"></star>
                                                                    </span>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="text">送达时间</span>
            <span class="score">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingfilter :rating-type="ratingType"
                    :only-content="onlyContent"
                    :desc="desc"
                    :ratings="ratings"
                    @select="selectChange"
                    @toggle="toggleContent"></ratingfilter>
      <div class="ratings-wrapper">
        <div class="rating"
             v-for="item in ratings"
             v-show="selectShow(item.rateType,item.text)">
          <div class="avatar">
            <img width="28"
                 height="28"
                 :src="item.avatar"
                 alt="">
          </div>
          <div class="content">
            <div class="username">{{item.username}}</div>
            <div class="star-wrapper">
              <star :size="24"
                    :score="item.score"></star>
              <span class="delivery"
                    v-if="item.deliveryTime">{{item.deliveryTime}}</span>
            </div>
            <p class="text">{{item.text}}</p>
            <div class="recommend"
                 v-if="item.recommend && item.recommend.length">
              <span class="icon-thumb_up"></span>
              <span class="recommend-item"
                    v-for="rec in item.recommend">{{rec}}</span>
            </div>
            <div class="time">{{item.rateTime | formatDate}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
import BScroll from 'better-scroll';
import split from '../split/split';
import ratingfilter from '../ratingfilter/ratingfilter';
import { formatDate } from '../../common/js/date';
const ALL = 2;
export default {
  components: {
    star, split, ratingfilter
  },
  props: {
    seller: Object
  },
  data() {
    return {
      ratings: [],
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
  },
  created() {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body;
      this.ratings = res.data;
      console.log(res);
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      });
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .ratings
    position: absolute
    width: 100%
    top: 174px
    bottom: 0
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        padding: 4px 0
        flex-basis: 137px
        width: 137px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width:320px)
          flex-basis: 120px
          width: 120px
        .score
          margin-bottom: 6px
          font-size: 24px
          color: rgb(255,153,0)
          line-height: 28px
        .text
          display: inline-block
          margin-bottom: 8px        
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 18px
        .desc
          font-size: 10px
          color: rgb(7,17,27)
          line-height: 10px         
      .overview-right
        flex: 1
        padding: 4px 0 4px 24px
        @media only screen and (max-width:320px)
          padding-left:6px
        &>div
          font-size: 0
          margin-bottom: 8px
          &:last-child
            margin-bottom: 0
          .text
            margin-right: 10px  
            font-size: 12px
            color: rgb(7,17,27)
            line-height: 18px
            vertical-align: top     
          .star-wrapper
            display: inline-block
            margin-right: 10px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
          &.delivery-wrapper
            .score
              color: rgb(147,153,159)
    .ratings-wrapper
      padding: 0 18px
      .rating
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .username
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .recommend-item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .recommend-item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)

</style>
