<template>
  <view class="page">
    <scroll-view scroll-y class="scroll-wrap">
      <!-- 头像 & 昵称卡片 -->
      <view class="avatar-card">
        <view class="avatar-wrap">
          <image
            class="avatar-img"
            :src="profile.avatar || defaultAvatar"
            mode="aspectFill"
          />
          <view class="avatar-edit-btn" @click="chooseAvatar">
            <uni-icons type="camera" size="14" color="#FFFFFF" />
          </view>
        </view>
        <view class="avatar-info">
          <text class="user-name">{{ profile.name }}</text>
          <text class="avatar-hint">点击头像更换</text>
        </view>
        <button class="edit-btn" @click="openEditDialog">编辑</button>
      </view>

      <!-- 个人信息列表 -->
      <view class="info-card">
        <view class="info-item" @click="openEditDialog">
          <uni-icons type="phone" size="18" color="#9CA3AF" />
          <view class="info-item-content">
            <text class="info-label">联系电话</text>
            <text class="info-value">{{ profile.phone || '未设置' }}</text>
          </view>
          <uni-icons type="right" size="16" color="#9CA3AF" />
        </view>
        <view class="info-divider" />
        <view class="info-item" @click="openEditDialog">
          <uni-icons type="email" size="18" color="#9CA3AF" />
          <view class="info-item-content">
            <text class="info-label">电子邮箱</text>
            <text class="info-value">{{ profile.email || '未设置' }}</text>
          </view>
          <uni-icons type="right" size="16" color="#9CA3AF" />
        </view>
      </view>

      <!-- 数据统计卡片 -->
      <view class="stats-card">
        <text class="stats-title">我的数据</text>
        <view class="stats-row">
          <view class="stat-item">
            <text class="stat-num stat-blue">{{ statBooked }}</text>
            <text class="stat-label">已预约课程</text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item">
            <text class="stat-num stat-green">{{ statConfirmed }}</text>
            <text class="stat-label">已完成课程</text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item">
            <text class="stat-num stat-orange">{{ statPending }}</text>
            <text class="stat-label">待确认课程</text>
          </view>
        </view>
      </view>

      <view class="list-bottom" />
    </scroll-view>

    <!-- 编辑资料弹窗 -->
    <uni-popup ref="editPopup" type="bottom" background-color="transparent">
      <view class="edit-popup">
        <view class="edit-popup-header">
          <text class="edit-popup-title">编辑个人资料</text>
          <uni-icons type="closeempty" size="20" color="#6B7280" @click="closeEditDialog" />
        </view>
        <view class="edit-form">
          <view class="form-item">
            <text class="form-label">昵称</text>
            <view class="form-input-wrap">
              <uni-icons type="person" size="16" color="#9CA3AF" />
              <input
                class="form-input"
                v-model="editForm.name"
                placeholder="请输入昵称"
                placeholder-class="form-placeholder"
              />
            </view>
          </view>
          <view class="form-item">
            <text class="form-label">联系电话</text>
            <view class="form-input-wrap">
              <uni-icons type="phone" size="16" color="#9CA3AF" />
              <input
                class="form-input"
                v-model="editForm.phone"
                type="number"
                placeholder="请输入手机号码"
                placeholder-class="form-placeholder"
              />
            </view>
          </view>
          <view class="form-item">
            <text class="form-label">电子邮箱</text>
            <view class="form-input-wrap">
              <uni-icons type="email" size="16" color="#9CA3AF" />
              <input
                class="form-input"
                v-model="editForm.email"
                placeholder="请输入邮箱地址"
                placeholder-class="form-placeholder"
              />
            </view>
          </view>
        </view>
        <view class="edit-popup-footer">
          <button class="edit-cancel-btn" @click="closeEditDialog">取消</button>
          <button class="edit-save-btn" @click="saveProfile">保存</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
const DEFAULT_PROFILE = { name: '微信用户', phone: '', email: '', avatar: DEFAULT_AVATAR }

export default {
  name: 'ProfilePage',
  data() {
    return {
      defaultAvatar: DEFAULT_AVATAR,
      profile: { ...DEFAULT_PROFILE },
      editForm: { ...DEFAULT_PROFILE }
    }
  },
  computed: {
    statBooked() {
      const orders = JSON.parse(uni.getStorageSync('orders') || '[]')
      return orders.filter(o => o.status !== 'cancelled').length
    },
    statConfirmed() {
      const orders = JSON.parse(uni.getStorageSync('orders') || '[]')
      return orders.filter(o => o.status === 'confirmed').length
    },
    statPending() {
      const orders = JSON.parse(uni.getStorageSync('orders') || '[]')
      return orders.filter(o => o.status === 'pending').length
    }
  },
  onShow() {
    this.loadProfile()
  },
  methods: {
    loadProfile() {
      const saved = uni.getStorageSync('userProfile')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.profile = { ...DEFAULT_PROFILE, ...parsed }
        this.editForm = { ...this.profile }
      }
    },
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempPath = res.tempFilePaths[0]
          this.profile = { ...this.profile, avatar: tempPath }
          this.editForm = { ...this.editForm, avatar: tempPath }
          const toSave = { ...this.profile, avatar: tempPath }
          uni.setStorageSync('userProfile', JSON.stringify(toSave))
        }
      })
    },
    openEditDialog() {
      this.editForm = { ...this.profile }
      this.$refs.editPopup.open()
    },
    closeEditDialog() {
      this.$refs.editPopup.close()
    },
    saveProfile() {
      this.profile = { ...this.editForm }
      uni.setStorageSync('userProfile', JSON.stringify(this.profile))
      this.closeEditDialog()
      uni.showToast({ title: '个人资料已更新', icon: 'success' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #F3F4F6;
}
.scroll-wrap {
  flex: 1;
  padding: 24rpx 30rpx 0;
}
.list-bottom {
  height: 30rpx;
}

/* 头像卡片 */
.avatar-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 36rpx 28rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
}
.avatar-wrap {
  position: relative;
  flex-shrink: 0;
}
.avatar-img {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background: #E5E7EB;
}
.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48rpx;
  height: 48rpx;
  background: #2563EB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(37,99,235,0.4);
}
.avatar-info {
  flex: 1;
  min-width: 0;
}
.user-name {
  display: block;
  font-size: 34rpx;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6rpx;
}
.avatar-hint {
  font-size: 24rpx;
  color: #9CA3AF;
}
.edit-btn {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 28rpx;
  background: #FFFFFF;
  color: #374151;
  font-size: 26rpx;
  border: 1rpx solid #D1D5DB;
  border-radius: 12rpx;
  text-align: center;
  flex-shrink: 0;
}
.edit-btn::after {
  border: none;
}

/* 信息卡片 */
.info-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  margin-bottom: 24rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
}
.info-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20rpx;
  padding: 28rpx;
}
.info-item-content {
  flex: 1;
  min-width: 0;
}
.info-label {
  display: block;
  font-size: 22rpx;
  color: #9CA3AF;
  margin-bottom: 4rpx;
}
.info-value {
  font-size: 28rpx;
  color: #111827;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-divider {
  height: 1rpx;
  background: #F3F4F6;
  margin: 0 28rpx;
}

/* 统计卡片 */
.stats-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
}
.stats-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #111827;
  margin-bottom: 28rpx;
  display: block;
}
.stats-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}
.stat-divider {
  width: 1rpx;
  height: 60rpx;
  background: #F3F4F6;
}
.stat-num {
  font-size: 48rpx;
  font-weight: 700;
}
.stat-blue { color: #2563EB; }
.stat-green { color: #059669; }
.stat-orange { color: #D97706; }
.stat-label {
  font-size: 22rpx;
  color: #9CA3AF;
}

/* 编辑弹窗 */
.edit-popup {
  background: #FFFFFF;
  border-radius: 32rpx 32rpx 0 0;
  padding: 32rpx 32rpx calc(32rpx + env(safe-area-inset-bottom));
}
.edit-popup-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32rpx;
}
.edit-popup-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #111827;
}
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 32rpx;
}
.form-item {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
.form-label {
  font-size: 26rpx;
  color: #374151;
  font-weight: 500;
}
.form-input-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  border: 1rpx solid #E5E7EB;
  border-radius: 12rpx;
  padding: 20rpx 24rpx;
  background: #FAFAFA;
}
.form-input {
  flex: 1;
  font-size: 28rpx;
  color: #111827;
  background: transparent;
}
.form-placeholder {
  color: #9CA3AF;
  font-size: 28rpx;
}
.edit-popup-footer {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
}
.edit-cancel-btn {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  background: #F3F4F6;
  color: #374151;
  font-size: 30rpx;
  border-radius: 16rpx;
  text-align: center;
  border: none;
  padding: 0;
}
.edit-cancel-btn::after {
  border: none;
}
.edit-save-btn {
  flex: 2;
  height: 88rpx;
  line-height: 88rpx;
  background: #2563EB;
  color: #FFFFFF;
  font-size: 30rpx;
  font-weight: 600;
  border-radius: 16rpx;
  text-align: center;
  border: none;
  padding: 0;
}
.edit-save-btn::after {
  border: none;
}
</style>
