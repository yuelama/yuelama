<template>
  <view class="reviews">
    <text class="heading">社区评价</text>
    <view v-for="r in reviews" :key="r.id" class="review">
      <image class="avatar" :src="r.avatar"/>
      <view class="body">
        <view class="top"><text class="name">{{ r.name }}</text><text class="rating">⭐{{ r.rating }}</text></view>
        <text class="text">{{ r.text }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ReviewList',
  props: { reviews: { type: Array, default: () => ([{ id:1, avatar:'/static/tabbar/user.png', name:'小赵', rating:4.8, text:'风景绝佳，领队也很负责。' }]) } }
}
</script>

<style scoped>
.reviews{padding:12px}
.heading{font-weight:700;margin-bottom:8px;color:#0F172A}
.review{display:flex;padding:10px 0;border-bottom:1px solid #f3f3f3}
.avatar{width:44px;height:44px;border-radius:22px}
.body{flex:1;padding-left:10px}
.name{font-weight:600}
.rating{color:#FF6B35;margin-left:8px}
.text{margin-top:6px;color:#333}
</style>