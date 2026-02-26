<template>
  <view class="bottom-tab">
    <view class="tab" @click="go('pages/home/home')">
      <image class="icon" src="/static/tabbar/home.png"/>
      <text>发现</text>
    </view>
    <view class="tab center" @click="go('pages/create/create')">
      <view class="big">发起</view>
    </view>
    <view class="tab" @click="go('uni_modules/uni-id-pages/pages/userinfo/userinfo')">
      <image class="icon" src="/static/tabbar/user.png"/>
      <text>我的</text>
    </view>
  </view>
</template>

<script setup>
const go = (path) => uni.switchTab({ url: '/' + path })
</script>

<style scoped>
.bottom-tab{height:56px;background:#fff;border-top:1px solid #eee;display:flex;align-items:center;justify-content:space-around}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#666}
.icon{width:22px;height:22px}
.center .big{background:#34C759;color:#fff;padding:8px 14px;border-radius:18px}
</style>