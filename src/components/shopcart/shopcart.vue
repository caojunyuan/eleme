<template>
  <div class="shopcart">
    <div class="content" @click="toggleShowList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:totalNum > 0}"><span class="icon-shopping_cart"></span></div>
          <span v-show="totalNum > 0" class="total-num">{{totalNum}}</span>
        </div>
        <div class="price" :class="{highlight:totalNum > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="[{enough:totalPrice>=minPrice}]" @click.stop="pay">{{payMsg}}</div>
    </div>
    <transition name="slide">
      <div class="cart-list" v-show="listShow">
        <div class="list-head">
          <span class="text-shop">购物车</span>
          <span class="text-clear" @click="clear">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="cart-item" v-for="food in buyDetail">
              <span class="food-name">{{food.name}}</span>
              <span class="food-price">￥{{food.price*food.count}}</span>
              <div class="count-wrapper">
                <count :food="food"></count>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="balls-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner js-inner"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade">
      <div class="mask" v-show="listShow" @click="toggleShowList"></div>
    </transition>

  </div>

</template>

<script type="text/ecmascript-6">
  import count from '../count/count';
  import BScroll from 'better-scroll';
  export default{
    components: {
      count
    },
    data() {
      return {
        fold: true,
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      };
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 4
      },
      minPrice: {
        type: Number,
        default: 20
      },
      goods: Array
    },
    methods: {
      toggleShowList () {
        if (!this.totalNum) return;
        this.fold = !this.fold;
      },
      clear() {
        this.buyDetail.forEach((item) => {
          item.count = 0;
        });
      },
      pay() {
        if (this.totalPrice < this.minPrice) return;
        window.alert(`支付${this.totalPrice}`);
      },
      /**
       * @param el 点击时加号的元素
       */
      drop(el) {
        for (let i = 0, len = this.balls.length; i < len; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      /**
       *
       * @param el 执行动画的元素
       */
      beforeDrop(el) {
        for (let i = 0, len = this.dropBalls.length; i < len; i++) {
          let dropBall = this.dropBalls[i];
          if (dropBall.show) {
            let addBtnOffset = dropBall.el.getBoundingClientRect();
            // 小球初始状态的偏移量
            let x = addBtnOffset.left - 32;
            let y = -(window.innerHeight - addBtnOffset.top - 22);
            // 让el元素显示
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('js-inner')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; // 触发浏览器重绘
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('js-inner')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    computed: {
      totalNum() {
        let total = 0;
        this.buyDetail.forEach((item) => {
          total += item.count;
        });
        return total;
      },
      totalPrice() {
        let total = 0;
        this.buyDetail.forEach((item) => {
          total += item.count * item.price;
        });
        return total;
      },
      payMsg() {
        if (this.totalNum === 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}起送`;
        } else {
          return '去结算';
        }
      },
      buyDetail() {
        let selection = [];
        this.goods.forEach((item) => {
          item.foods.forEach((good) => {
            if (good.count) {
              selection.push(good);
            }
          });
        });
        return selection;
      },
      listShow() {
        if (!this.totalNum) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();// 当不加refresh的时候，点击收回列表再展开，点击数量会出bug
            }
          });
        }
        return show;
      }
    }
  };
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    z-index: 50
    background-color: #141d27
    .content
      display: flex
      .content-left
        flex: 1
        font-size: 0
        background-color: #141d27
        .logo-wrapper
          display inline-block
          box-sizing: border-box
          width: 56px
          height: 56px
          padding: 6px
          margin: 0 12px
          border-radius: 50%
          background-color: #141d27
          position: relative
          bottom: 8px
          text-align: center
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            color #80858a
            &.highlight
              background rgb(0, 160, 220)
              color: #fff
            .icon-shopping_cart
              line-height 44px
              font-size 24px
          .total-num
            position: absolute
            top: 0
            right: 0
            width: 24px
            border-radius: 12px
            background-color: rgb(240, 20, 20);
            z-index: 20
            font-size: 9px
            font-weight: 700
            color: #fff
            line-height: 16px
        .price
          display: inline-block
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, .1)
          vertical-align: top
          margin-top 12px
          font-size: 16px
          font-weight: 700
          line-height 24px
          color: rgba(255, 255, 255, .4)
          &.highlight
            color: #fff
        .desc
          display inline-block
          line-height 48px
          margin-left 12px
          vertical-align: top
          color rgba(255, 255, 255, 0.4)
          font-size 10px

      .content-right
        width: 105px
        flex-basis: 105px
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        color rgba(255, 255, 255, 0.4);
        font-weight 700
        background #2b333b
        &.enough
          background-color: #00b43c
          color: #fff
    .balls-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .cart-list
      position: absolute
      top: 0
      left: 0
      width: 100%
      z-index: -1
      transform: translateY(-100%)
      &.slide-enter, &.slide-leave-active
        transform: translateY(0)
      &.slide-enter-active, &.slide-leave-active
        transition: all .5s ease
      .list-head
        display: flex
        padding: 0 18px
        line-height: 40px
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .text-shop
          flex: 1
          color: rgb(7, 17, 27)
          font-size: 14px
          font-weight 200
        .text-clear
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        max-height: 217px
        background-color: #fff
        padding: 0 18px
        overflow: hidden
        .cart-item
          display: flex
          height: 24px
          padding: 12px 0
          font-size: 14px
          line-height: 24px
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            border-none()
          .food-name
            flex: 1
            display: inline-block
            color: rgb(7, 17, 27)
          .food-price
            display: inline-block
            margin: 0 12px 0 18px
            color: rgb(240, 20, 20)
            font-weight: 700
          .count-wrapper
            display: inline-block
    .mask
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      z-index: -50
      background-color: rgba(7, 17, 27, .6)
      backdrop-filter: blur(10px)
      &.fade-enter, &.fade-leave-active
        opacity: 0
      &.fade-enter-active, &.fade-leave-active
        transition: all .4s

</style>
