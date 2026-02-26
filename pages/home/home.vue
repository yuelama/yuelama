<template>
  <view class="page">
    <view class="header">
      <view class="search" @click="onSearch">🔍 搜索活动、地点或组织者</view>
      <view class="filter">筛选 ▾</view>
    </view>

    <view class="section">
      <text class="section-title">社区热议</text>
      <CommunityList />
    </view>

    <view class="section">
      <text class="section-title">本周热门活动</text>
      <ActivityCard v-for="act in activities" :key="act.id" :activity="act" />
    </view>

    <Fab />
    <BottomTab />
  </view>
</template>

<script>
import ActivityCard from '../../components/ActivityCard.vue'
import CommunityList from '../../components/CommunityList.vue'
import BottomTab from '../../components/BottomTab.vue'
import Fab from '../../components/Fab.vue'

export default {
  name: 'HomePage',
  components: { ActivityCard, CommunityList, BottomTab, Fab },
  data() {
    return {
      activities: [
        { id:1, image:'/static/tabbar/home.png', title:'周日轻松登山（西山）', organizer:'小王', time:'3月1日 08:00', participants:8, capacity:20, level:'简单' },
        { id:2, image:'/static/tabbar/home.png', title:'日出峰中穿越', organizer:'小李', time:'3月2日 05:00', participants:15, capacity:18, level:'中等' }
      ]
    }
  },
  methods: {
    onSearch() {
      uni.navigateTo({ url: '/pages/search/search' })
    }
  }
}
</script>

<style scoped>
.page{padding-bottom:80px;background:#fff;min-height:100vh}
.header{display:flex;align-items:center;justify-content:space-between;padding:12px;background:linear-gradient(90deg,#f8fbff,#fff)}
.search{flex:1;background:#f2f6fb;padding:10px;border-radius:20px;color:#999}
.filter{margin-left:8px;color:#0B84FF}
.section{padding:12px}
.section-title{font-weight:700;color:#222;margin-bottom:8px}
</style>
