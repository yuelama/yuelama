<template>
  <view class="card" @click="$emit('open', activity)">
    <image class="thumb" :src="activity.image" mode="aspectFill"/>
    <view class="info">
      <view class="row">
        <text class="title">{{ activity.title }}</text>
        <text class="level">{{ activity.level }}</text>
      </view>
      <text class="meta">{{ activity.time }} · {{ activity.organizer }}</text>
      <view class="bottom-row">
        <view class="progress-wrap">
          <view class="bar"><view class="fill" :style="{ width: (100*(activity.participants/activity.capacity)) + '%' }"></view></view>
          <text class="remain">剩余 {{ Math.max(activity.capacity - activity.participants,0) }} 名</text>
        </view>
        <button class="join" @click.stop="$emit('join', activity)">报名</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ActivityCardSimple',
  props: { activity: { type: Object, required: true } }
}
</script>

<style scoped>
.card{display:flex;padding:12px;background:#fff;border-radius:10px;margin:12px 12px 0;box-shadow:0 6px 12px rgba(46,139,87,0.06);align-items:center}
.thumb{width:110px;height:80px;border-radius:8px;flex-shrink:0}
.info{flex:1;padding-left:12px}
.row{display:flex;justify-content:space-between;align-items:center}
.title{font-size:18px;color:#222;font-weight:700}
.level{background:#eaf6ef;color:#2E8B57;padding:4px 8px;border-radius:12px;font-size:12px}
.meta{color:#666;font-size:14px;margin-top:6px}
.bottom-row{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.bar{width:120px;height:6px;background:#f2f2f2;border-radius:6px;overflow:hidden;margin-right:8px}
.fill{height:100%;background:#FFD27F}
.remain{font-size:12px;color:#999;margin-left:6px}
.join{background:#FF6B35;color:#fff;padding:8px 14px;border-radius:8px}
</style>