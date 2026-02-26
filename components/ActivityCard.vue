<template>
  <view class="activity-card">
    <image class="thumb" :src="activity.image" mode="aspectFill" />
    <view class="body">
      <view class="title-row">
        <text class="title">{{ activity.title }}</text>
        <text class="level" :class="activity.level">{{ activity.level }}</text>
      </view>
      <view class="meta">
        <text class="organizer">发起：{{ activity.organizer }}</text>
        <text class="dot">·</text>
        <text class="time">{{ activity.time }}</text>
      </view>
      <view class="footer">
        <view class="participants">报名 {{ activity.participants }}/{{ activity.capacity }}</view>
        <button class="join-btn" type="primary">加入</button>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  activity: { type: Object, required: true }
})
</script>

<style scoped>
.activity-card{display:flex;padding:12px;background:#fff;border-radius:8px;margin-bottom:12px;box-shadow:0 2px 6px rgba(0,0,0,0.04)}
.thumb{width:110px;height:80px;border-radius:6px;flex-shrink:0}
.body{flex:1;padding-left:12px;display:flex;flex-direction:column;justify-content:space-between}
.title{font-size:16px;color:#0B84FF;font-weight:600}
.level{font-size:12px;padding:2px 6px;border-radius:10px;background:#f0f6ff;color:#0B84FF;margin-left:8px}
.meta{color:#666;font-size:12px;margin-top:6px}
.footer{display:flex;justify-content:space-between;align-items:center;margin-top:8px}
.join-btn{background:#34C759;color:#fff;border-radius:6px;padding:6px 12px}
.participants{font-size:12px;color:#999}
</style>