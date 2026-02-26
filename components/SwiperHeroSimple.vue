<template>
  <swiper class="hero" indicator-dots autoplay interval="4000" circular>
    <swiper-item v-for="(img,i) in images" :key="i">
      <image :src="img" mode="aspectFill" class="img" />
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  name: 'SwiperHeroSimple',
  props: { images: { type: Array, default: () => ['/static/tabbar/home.png','/static/tabbar/home.png'] } }
}
</script>

<style scoped>
.hero{height:180px;border-radius:8px;overflow:hidden;margin:12px}
.img{width:100%;height:100%}
</style>