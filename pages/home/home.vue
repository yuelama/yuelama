<template>
  <view class="page">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input-wrap">
        <uni-icons type="search" size="18" color="#9CA3AF" class="search-icon" />
        <input
          class="search-input"
          v-model="searchQuery"
          placeholder="搜索课程名称、老师、分类..."
          placeholder-class="search-placeholder"
        />
      </view>
    </view>

    <!-- 课程列表 -->
    <scroll-view scroll-y class="course-list">
      <view v-if="filteredCourses.length === 0" class="empty-state">
        <text class="empty-text">暂无相关课程</text>
      </view>
      <view
        v-for="course in filteredCourses"
        :key="course.id"
        class="course-card"
        @click="openBookDialog(course)"
      >
        <image
          class="course-image"
          :src="course.imageUrl"
          mode="aspectFill"
          @error="onImageError"
        />
        <view class="course-info">
          <view class="course-header">
            <text class="course-title">{{ course.title }}</text>
            <text class="course-price">¥{{ course.price }}</text>
          </view>
          <text class="course-meta">{{ course.instructor }} · {{ course.category }}</text>
          <view class="course-detail-row">
            <uni-icons type="clock" size="13" color="#9CA3AF" />
            <text class="detail-text">{{ course.duration }}</text>
          </view>
          <view class="course-detail-row">
            <uni-icons type="location" size="13" color="#9CA3AF" />
            <text class="detail-text location-text">{{ course.location }}</text>
          </view>
          <view class="course-detail-row">
            <uni-icons type="person" size="13" color="#9CA3AF" />
            <text class="detail-text">剩余 {{ course.availableSeats }} 个名额</text>
          </view>
          <button
            class="book-btn"
            :class="{ 'book-btn-disabled': course.availableSeats === 0 }"
            :disabled="course.availableSeats === 0"
            @click.stop="openBookDialog(course)"
          >
            {{ course.availableSeats === 0 ? '已满' : '立即预约' }}
          </button>
        </view>
      </view>
      <view class="list-bottom" />
    </scroll-view>

    <!-- 预约弹窗 -->
    <uni-popup ref="bookPopup" type="bottom" background-color="transparent">
      <view class="popup-wrap" v-if="selectedCourse">
        <view class="popup-header">
          <text class="popup-title">预约课程</text>
          <uni-icons type="closeempty" size="20" color="#6B7280" @click="closePopup" />
        </view>
        <view class="popup-course-info">
          <text class="popup-course-name">{{ selectedCourse.title }}</text>
          <text class="popup-course-sub">{{ selectedCourse.instructor }}</text>
          <text class="popup-course-sub">{{ selectedCourse.location }}</text>
          <text class="popup-course-price">¥{{ selectedCourse.price }}</text>
        </view>
        <view class="popup-section">
          <text class="popup-section-label">选择上课时间</text>
          <view
            v-for="schedule in selectedCourse.schedules"
            :key="schedule"
            class="schedule-item"
            :class="{ 'schedule-item-active': selectedSchedule === schedule }"
            @click="selectedSchedule = schedule"
          >
            <view class="schedule-radio" :class="{ 'schedule-radio-active': selectedSchedule === schedule }">
              <view v-if="selectedSchedule === schedule" class="schedule-radio-dot" />
            </view>
            <text class="schedule-text">{{ schedule }}</text>
          </view>
        </view>
        <view class="popup-footer">
          <button class="popup-cancel-btn" @click="closePopup">取消</button>
          <button class="popup-confirm-btn" @click="confirmBooking">确认预约</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mockCourses } from '@/common/mockData.js'

export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
      courses: mockCourses,
      selectedCourse: null,
      selectedSchedule: ''
    }
  },
  computed: {
    filteredCourses() {
      const q = this.searchQuery.trim().toLowerCase()
      if (!q) return this.courses
      return this.courses.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      )
    }
  },
  methods: {
    openBookDialog(course) {
      if (course.availableSeats === 0) return
      this.selectedCourse = course
      this.selectedSchedule = course.schedules[0]
      this.$refs.bookPopup.open()
    },
    closePopup() {
      this.$refs.bookPopup.close()
    },
    confirmBooking() {
      if (!this.selectedCourse || !this.selectedSchedule) return
      const newOrder = {
        id: Date.now().toString(),
        courseId: this.selectedCourse.id,
        courseTitle: this.selectedCourse.title,
        instructor: this.selectedCourse.instructor,
        selectedSchedule: this.selectedSchedule,
        orderDate: new Date().toISOString(),
        status: 'pending',
        price: this.selectedCourse.price,
        location: this.selectedCourse.location
      }
      const orders = JSON.parse(uni.getStorageSync('orders') || '[]')
      orders.unshift(newOrder)
      uni.setStorageSync('orders', JSON.stringify(orders))
      this.closePopup()
      uni.showToast({ title: '预约成功！', icon: 'success', duration: 2000 })
      this.selectedCourse = null
      this.selectedSchedule = ''
    },
    onImageError(e) {}
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F3F4F6;
}

/* 搜索栏 */
.search-bar {
  background: #FFFFFF;
  padding: 20rpx 30rpx;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);
}
.search-input-wrap {
  display: flex;
  align-items: center;
  background: #F3F4F6;
  border-radius: 16rpx;
  padding: 16rpx 24rpx;
  gap: 12rpx;
}
.search-icon {
  flex-shrink: 0;
}
.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #374151;
  background: transparent;
  border: none;
  outline: none;
}
.search-placeholder {
  color: #9CA3AF;
  font-size: 28rpx;
}

/* 课程列表 */
.course-list {
  flex: 1;
  padding: 16rpx 24rpx 0;
}
.list-bottom {
  height: 20rpx;
}
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}
.empty-text {
  font-size: 28rpx;
  color: #9CA3AF;
}

/* 课程卡片 */
.course-card {
  display: flex;
  flex-direction: row;
  background: #FFFFFF;
  border-radius: 16rpx;
  margin-bottom: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);
}
.course-image {
  width: 160rpx;
  height: 160rpx;
  flex-shrink: 0;
  background: #E5E7EB;
}
.course-info {
  flex: 1;
  padding: 16rpx 20rpx 16rpx 16rpx;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.course-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8rpx;
  margin-bottom: 4rpx;
}
.course-title {
  flex: 1;
  font-size: 28rpx;
  font-weight: 600;
  color: #111827;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.course-price {
  font-size: 28rpx;
  font-weight: 700;
  color: #2563EB;
  flex-shrink: 0;
}
.course-meta {
  font-size: 22rpx;
  color: #6B7280;
  margin-bottom: 8rpx;
}
.course-detail-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rpx;
  margin-bottom: 4rpx;
}
.detail-text {
  font-size: 20rpx;
  color: #9CA3AF;
}
.location-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200rpx;
}

/* 预约按钮 */
.book-btn {
  margin-top: 10rpx;
  width: 100%;
  height: 52rpx;
  line-height: 52rpx;
  background: #2563EB;
  color: #FFFFFF;
  font-size: 24rpx;
  font-weight: 500;
  border-radius: 10rpx;
  text-align: center;
  border: none;
  padding: 0;
}
.book-btn-disabled {
  background: #D1D5DB;
  color: #9CA3AF;
}
.book-btn::after {
  border: none;
}

/* 弹窗 */
.popup-wrap {
  background: #FFFFFF;
  border-radius: 32rpx 32rpx 0 0;
  padding: 32rpx 32rpx calc(32rpx + env(safe-area-inset-bottom));
}
.popup-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28rpx;
}
.popup-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #111827;
}
.popup-course-info {
  background: #F9FAFB;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 28rpx;
}
.popup-course-name {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8rpx;
}
.popup-course-sub {
  display: block;
  font-size: 26rpx;
  color: #6B7280;
  margin-bottom: 4rpx;
}
.popup-course-price {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
  color: #2563EB;
  margin-top: 12rpx;
}
.popup-section {
  margin-bottom: 32rpx;
}
.popup-section-label {
  font-size: 26rpx;
  color: #374151;
  font-weight: 500;
  margin-bottom: 16rpx;
  display: block;
}
.schedule-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F3F4F6;
}
.schedule-radio {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #D1D5DB;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.schedule-radio-active {
  border-color: #2563EB;
  background: #EFF6FF;
}
.schedule-radio-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #2563EB;
}
.schedule-text {
  font-size: 28rpx;
  color: #374151;
}
.popup-footer {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
  margin-top: 8rpx;
}
.popup-cancel-btn {
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
.popup-cancel-btn::after {
  border: none;
}
.popup-confirm-btn {
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
.popup-confirm-btn::after {
  border: none;
}
</style>
