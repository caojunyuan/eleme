<template>
  <div class="count">
    <transition name="move">
      <div class="minus" @click.stop="minus($event)" v-show="food.count > 0">
        <div class="inner"><span class="icon-remove_circle_outline"></span></div>
      </div>
    </transition>
    <div class="num" v-show="food.count > 0">{{food.count}}</div>
    <div class="add" @click.stop="add($event)">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: Object
    },
    data () {
      return {
        num: 0
      };
    },
    methods: {
      add () {
        if (!event._constructed) return;
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      minus () {
        if (!event._constructed) return;
        this.food.count--;
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .count
    font-size: 0
    .minus, .add
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
    .minus
      .inner
        transition: all 0.3s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.3s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .num
      display: inline-block
      width: 24px
      text-align: center
      vertical-align: top
      font-size: 10px
      line-height: 24px
      color: rgb(147, 153, 159)
</style>
