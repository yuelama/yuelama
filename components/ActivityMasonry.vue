<template>
  <view class="masonry">
    <view class="col" v-for="(col,ci) in columns" :key="ci">
      <view v-for="item in col" :key="item.id" class="brick" @click="open(item)">
        <image :src="item.image" mode="aspectFill" class="img"/>
        <view class="caption">
          <text class="title">{{ item.title }}</text>
          <text class="meta">{{ item.time }} · {{ item.level }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ActivityMasonry',
  props: { items: { type: Array, default: () => [] }, cols: { type: Number, default: 2 } },
  computed: {
    columns() {
      const cols = Array.from({ length: this.cols }, () => [])
      this.items.forEach((it, i) => cols[i % this.cols].push(it))
      return cols
    }
  },
  methods: { open(it) { uni.navigateTo({ url: '/pages/activity/detail?id='+it.id }) } }
}
</script>

<style scoped>
.masonry{display:flex;padding:12px}
.col{flex:1;padding:6px}
.brick{margin-bottom:12px;border-radius:10px;overflow:hidden;background:#fff}
.img{width:100%;height:160px}
.caption{padding:8px}
.title{font-weight:700;color:#0F172A}
.meta{font-size:12px;color:#666;margin-top:6px}
</style>