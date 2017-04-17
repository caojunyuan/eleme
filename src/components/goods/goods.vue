<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item"
            :class="{current : currentIndex === index}"
            @click="selectFoods(index,$event)">
          <span class="text border-1px"><span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="food-icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <div v-if="food.description" class="food-desc">{{food.description}}</div>
                <div class="other-msg"><span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">{{food.rating}}%</span>
                </div>
                <div class="food-price">
                  <span class="now-price">￥{{food.price}}</span><span v-if="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="count-wrapper">
                <count :food="food"></count>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :goods="goods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>

  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import count from '../count/count';
  import food from '../food/food';
  const ERR_OK = 0;
  export default {
    components: {
      shopcart, count, food
    },
    props: {
      seller: Object
    },
    data() {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        heightArray: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0, len = this.heightArray.length; i < len; i++) {
          let height1 = this.heightArray[i];
          let height2 = this.heightArray[i + 1];
          if ((this.scrollY >= height1 && this.scrollY < height2) || !height2) {
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.$http.get('static/data.json').then((res) => {
//        res = res.body;
//        if (res.errno === ERR_OK) {
          this.foods = res.data.foods;
          this.$nextTick(() => {
            this.initScroll();
            this.calcHeight();
          });
//        }
      });
    },
    methods: {
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
          probeType: 3,
          click: true
        });
        this.goodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calcHeight() {
        let height = 0;
        this.heightArray.push(height);
        let foodsList = this.$refs.goodsWrapper.getElementsByClassName('foods-list');
        for (let i = 0, len = foodsList.length; i < len; i++) {
          height += foodsList[i].clientHeight;
          this.heightArray.push(height);
        }
      },
      selectFoods(index, event) {
        if (!event._constructed) return;
        let foodsList = this.$refs.goodsWrapper.getElementsByClassName('foods-list');
        let el = foodsList[index];
        this.goodsScroll.scrollToElement(el, 200);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .goods
    position: absolute
    display: flex
    width: 100%
    top: 174px
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      width: 80px
      flex-basis: 80px
      background-color: #f2f5f7
      .menu-item
        display: table
        width: 56px
        height: 54px
        padding: 0 12px
        font-size: 12px
        line-height: 14px
        &.current
          background-color: #fff
          position: relative
          margin-top: -1px
          z-index: 10
          font-weight: 700
          .text
            border-none()
        .text
          position: relative
          display: table-cell
          vertical-align: middle
          border-1px(rgba(7, 17, 27, .1))
          .icon
            display: inline-block
            margin-right: 2px
            width: 12px
            height: 12px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              background-img(decrease_3)
            &.discount
              background-img(discount_3)
            &.guarantee
              background-img(guarantee_3)
            &.invoice
              background-img(invoice_3)
            &.special
              background-img(special_3)
    .goods-wrapper
      flex: 1
      .foods-list
        .title
          font-size: 12px
          line-height: 26px
          background-color: #f3f5f7
          padding-left: 14px
          border-left: 2px solid #d9dde1
          color: rgb(147, 153, 159)
        .food-item
          display: flex
          padding: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          position: relative
          &:last-child
            border-none()
          .food-icon
            display: inline-block
            flex-basis: 57px
            margin-right: 10px
            font-size: 0
          .food-content
            flex 1
            .food-name
              margin 2px 0 8px 0
              font-size 14px
              line-height 14px
              height 14px
              color rgb(7, 17, 27)
            .food-desc, .other-msg
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
            .food-desc
              margin-bottom 8px
              line-height 12px
            .other-msg
              .sell-count
                margin-right 12px
            .food-price
              line-height 24px
              .now-price
                font-weight 700
                margin-right 8px
                font-size 14px
                color rgb(240, 20, 20)
              .old-price
                font-size 10px
                font-weight 700
                color rgb(147, 153, 159)
                text-decoration line-through

          .count-wrapper
            position: absolute
            right: 18px
            bottom: 12px

</style>
