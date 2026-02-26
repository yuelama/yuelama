<template>
  <view class="fab" @click="onClick">
    <text class="plus">＋</text>
  </view>
</template>

<script setup>
import { emit } from 'vue'
const onClick = () => {
  // placeholder: navigate to create page
  uni.navigateTo({ url: '/pages/create/create' })
}
</script>

<style scoped>
.fab{position:fixed;right:18px;bottom:78px;width:56px;height:56px;border-radius:28px;background:#0B84FF;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 6px 12px rgba(11,132,255,0.18)}
.plus{font-size:28px;line-height:28px;color:#fff}
</style>