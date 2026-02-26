<template>
  <view class="community-list">
    <view v-for="post in posts" :key="post.id" class="post">
      <image class="avatar" :src="post.avatar" mode="aspectFill"/>
      <view class="content">
        <view class="head"><text class="name">{{post.name}}</text><text class="time">{{post.time}}</text></view>
        <text class="text">{{post.text}}</text>
        <view class="meta-row">
          <text class="comments">💬 {{post.comments}}</text>
          <text class="likes">👍 {{post.likes}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CommunityList',
  data() {
    return {
      posts: [
        { id:1, avatar:'/static/tabbar/user.png', name:'小明', time:'2小时前', text:'周末西山约吗？节奏轻松，适合新人~', comments:3, likes:12 },
        { id:2, avatar:'/static/tabbar/user.png', name:'小红', time:'昨天', text:'谁有登山鞋推荐？', comments:5, likes:7 }
      ]
    }
  }
}
</script>

<style scoped>
.community-list{padding:8px}
.post{display:flex;padding:10px 0;border-bottom:1px solid #f2f2f2}
.avatar{width:44px;height:44px;border-radius:22px}
.content{flex:1;padding-left:10px}
.head{display:flex;justify-content:space-between}
.name{font-weight:600;color:#222}
.time{font-size:12px;color:#999}
.text{margin-top:6px;color:#333}
.meta-row{margin-top:6px;color:#999;font-size:12px}
</style>