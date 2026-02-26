<template>
  <view>
    <view v-if="visible" class="modal">
      <view class="sheet">
        <map class="map" latitude="{{lat}}" longitude="{{lng}}" :scale="14"></map>
        <view class="controls">
          <text class="addr">集合点：{{ address }}</text>
          <button class="nav" @click="navigate">一键导航</button>
          <button class="close" @click="$emit('close')">关闭</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MapPreview',
  props: { visible: { type: Boolean, default: false }, lat: { type: Number, default: 0 }, lng: { type: Number, default: 0 }, address: { type: String, default: '' } },
  methods: {
    navigate() { uni.openLocation({ latitude: this.lat, longitude: this.lng, name: '集合点', address: this.address }) }
  }
}
</script>

<style scoped>
.modal{position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center}
.sheet{width:92%;height:70%;background:#fff;border-radius:12px;overflow:hidden}
.map{width:100%;height:70%}
.controls{padding:12px}
.addr{display:block;margin-bottom:8px}
.nav{background:#FF6B35;color:#fff;padding:10px;border-radius:8px;margin-right:8px}
.close{background:#eee;padding:10px;border-radius:8px}
</style>