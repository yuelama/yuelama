<template>
  <view class="simple-page">
    <NavBarSimple />
    <SwiperHeroSimple :images="heroImages" />

    <ChipsFilter :chips="chips" :selected="selectedChip" @change="onChipChange" />

    <view class="list">
      <ActivityCardSimple v-for="act in filteredActivities" :key="act.id" :activity="act" @join="onJoin" @open="onOpen" />
    </view>

    <BottomTab />
  </view>
</template>

<script>
import NavBarSimple from '../../components/NavBarSimple.vue'
import SwiperHeroSimple from '../../components/SwiperHeroSimple.vue'
import ChipsFilter from '../../components/ChipsFilter.vue'
import ActivityCardSimple from '../../components/ActivityCardSimple.vue'
import BottomTab from '../../components/BottomTab.vue'

export default {
  name: 'HomeSimple',
  components: { NavBarSimple, SwiperHeroSimple, ChipsFilter, ActivityCardSimple, BottomTab },
  data(){
    return {
      heroImages: ['/static/tabbar/home.png','/static/tabbar/home.png'],
      chips: ['全部','周末','近郊','难度:简单','难度:中等'],
      selectedChip: 0,
      activities: [
        { id:1, image:'/static/tabbar/home.png', title:'周日轻松登山（西山）', organizer:'小王', time:'3月1日 08:00', participants:8, capacity:20, level:'简单' },
        { id:2, image:'/static/tabbar/home.png', title:'日出峰中穿越', organizer:'小李', time:'3月2日 05:00', participants:15, capacity:18, level:'中等' },
        { id:3, image:'/static/tabbar/home.png', title:'城市绿道慢行', organizer:'小陈', time:'3月6日 09:00', participants:3, capacity:12, level:'简单' }
      ]
    }
  },
  computed: {
    filteredActivities(){
      if(this.selectedChip===0) return this.activities
      const key = this.chips[this.selectedChip]
      if(key.includes('难度')){
        const lv = key.split(':')[1]
        return this.activities.filter(a=>a.level===lv)
      }
      if(key==='周末') return this.activities.filter(a=>a.time.includes('周'))
      return this.activities
    }
  },
  methods:{
    onChipChange(c,i){ this.selectedChip = i },
    onJoin(act){ uni.navigateTo({ url: '/pages/activity/detail?id='+act.id }) },
    onOpen(act){ uni.navigateTo({ url: '/pages/activity/detail?id='+act.id }) }
  }
}
</script>

<style scoped>
.simple-page{background:#FAFBFC;min-height:100vh;padding-bottom:80px}
.list{padding-bottom:20px}
</style>
