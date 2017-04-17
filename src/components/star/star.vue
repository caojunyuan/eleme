<template>
  <div class="star" :class="starSize">
    <span v-for="item in classArray" :class="item" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      size: Number,
      score: Number
    },
    computed: {
      starSize () {
        return 'star-' + this.size;
      },
      classArray() {
        let result = [];
        let starNumber = Math.floor(this.score * 2) / 2;
        let fullStarNumber = Math.floor(starNumber);
        for (let i = 0; i < fullStarNumber; i++) {
          result.push(CLS_ON);
        }
        if (starNumber % 1 !== 0) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl';
  .star
    font-size ：0
    .star-item
      display: inline-block
      &:last-child
        margin-right: 0
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        background-repeat: no-repeat
        &.on
          background-img('star48_on')
        &.half
          background-img('star48_half')
        &.off
          background-img('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &.on
          background-img('star36_on')
        &.half
          background-img('star36_half')
        &.off
          background-img('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &.on
          background-img('star24_on')
        &.half
          background-img('star24_half')
        &.off
          background-img('star24_off')
</style>
