<template>
  <view class="route-carousel">
    <swiper :indicator-dots="false" :autoplay="false" :circular="false" class="swp">
      <swiper-item v-for="(r,i) in routes" :key="i">
        <view class="card" :style="{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.18)), url('+r.image+')' }">
          <text class="name">{{ r.name }}</text>
          <view class="icons">
            <text>📍 {{ r.distance }}km</text>
            <text>⏱ {{ r.duration }}</text>
            <text>⬆ {{ r.ascent }}m</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: 'RouteCarousel',
  props: { routes: { type: Array, default: () => ([
    { name:'云海线路', image:'/static/tabbar/home.png', distance:6, duration:'3h', ascent:400 },
    { name:'山脊穿越', image:'/static/tabbar/home.png', distance:12, duration:'6h', ascent:900 }
  ]) } }
}
</script>

<style scoped>
.route-carousel{padding:12px}
.card{height:160px;border-radius:12px;background-size:cover;background-position:center;padding:12px;color:#fff;display:flex;flex-direction:column;justify-content:space-between}
.name{font-size:18px;font-weight:700}
.icons{display:flex;justify-content:space-between;font-size:12px;opacity:0.95}
</style>