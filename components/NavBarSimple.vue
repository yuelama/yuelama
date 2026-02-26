<template>
  <view class="nav">
    <text class="title">发现</text>
    <view class="right">
      <text @click="onSearch">🔍</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'NavBarSimple',
  methods: { onSearch(){ uni.navigateTo({ url: '/pages/search/search' }) } }
}
</script>

<style scoped>
.nav{height:56px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;background:transparent}
.title{font-size:20px;color:#222;font-weight:700}
.right{text-color:#2E8B57}
</style>