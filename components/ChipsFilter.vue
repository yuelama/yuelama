<template>
  <scroll-view class="chips" scroll-x="true">
    <view v-for="(c,i) in chips" :key="i" :class="['chip', selected===i? 'active':'' ]" @click="$emit('change', c, i)">{{ c }}</view>
  </scroll-view>
</template>

<script>
export default {
  name: 'ChipsFilter',
  props: { chips: { type: Array, default: () => ['全部','周末','近郊','难度:简单'] }, selected: { type: Number, default: 0 } }
}
</script>

<style scoped>
.chips{display:flex;padding:8px 12px}
.chip{padding:8px 12px;margin-right:8px;border-radius:16px;background:#fff;color:#2E8B57;border:1px solid #e6f0ea}
.chip.active{background:#2E8B57;color:#fff}
</style>