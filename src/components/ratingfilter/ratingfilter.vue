<template>
  <div class="ratingfilter-wrapper">
    <div class="select border-1px">
      <span class="all" :class="{active:ratingType ===2}" @click="selectType(2,$event)">{{desc.all}}<span
        class="num">{{ratings.length}}</span></span>
      <span class="positive" :class="{active:ratingType ===0}" @click="selectType(0,$event)">{{desc.positive}}<span
        class="num">{{positives.length}}</span></span>
      <span class="negative" :class="{active:ratingType ===1}" @click="selectType(1,$event)">{{desc.negative}}<span
        class="num">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="only-content" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      ratingType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((item) => {
          return item.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((item) => {
          return item.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      selectType(type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);
      },
      toggleContent() {
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .ratingfilter-wrapper
    .select
      padding: 18px 0
      margin: 0 18px
      font-size: 0
      border-1px(rgba(7, 17, 27, .1))
      & > span
        display: inline-block
        padding: 8px 12px
        font-size: 12px
        line-height: 16px
        color: rgb(77, 85, 93)
        margin-right: 8px
        border-radius: 2px
        span
          font-size: 8px
        &.positive, &.all
          background-color: rgba(0, 160, 220, .2)
          &.active
            color: #fff
            background-color: rgb(0, 160, 220)
        &.negative
          background-color: rgba(77, 85, 93, .2)
        &.negative.active
          color: #fff
          background-color: rgb(77, 85, 93)
    .only-content
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
