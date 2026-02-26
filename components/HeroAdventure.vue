<template>
  <view class="hero" :style="`background-image: linear-gradient(180deg, rgba(15,23,42,0.25), rgba(0,0,0,0.35)), url(${image})`">
    <view class="overlay">
      <text class="kicker">{{ badge }}</text>
      <text class="title">{{ title }}</text>
      <view class="meta">
        <text class="date">{{ date }}</text>
        <text class="dot">·</text>
        <text class="level">{{ level }}</text>
      </view>
      <view class="actions">
        <button class="cta" @click="onJoin">立即报名</button>
        <button class="ghost" @click="onPreview">查看详情</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HeroAdventure',
  props: {
    image: { type: String, default: '/static/tabbar/home.png' },
    title: { type: String, default: '日出峰巅徒步，追逐第一缕阳光' },
    badge: { type: String, default: '限时推荐' },
    date: { type: String, default: '3月2日 05:00' },
    level: { type: String, default: '中等' }
  },
  methods: {
    onJoin() { uni.navigateTo({ url: '/pages/activity/detail?from=hero' }) },
    onPreview() { this.$emit('preview') }
  }
}
</script>

<style scoped>
.hero{height:320px;background-size:cover;background-position:center;position:relative;border-bottom-left-radius:16px;border-bottom-right-radius:16px;overflow:hidden}
.overlay{position:absolute;left:0;right:0;bottom:24px;padding:18px;color:#fff}
.kicker{background:rgba(255,107,53,0.16);color:#FF6B35;padding:6px 10px;border-radius:12px;font-size:12px}
.title{font-size:28px;font-weight:700;margin-top:8px}
.meta{margin-top:8px;color:#fff;opacity:0.9}
.actions{margin-top:14px;display:flex}
.cta{background:#FF6B35;color:#fff;border-radius:8px;padding:10px 18px;margin-right:10px}
.ghost{background:rgba(255,255,255,0.12);color:#fff;border-radius:8px;padding:10px 14px}
</style>