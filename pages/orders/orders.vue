<template>
  <view class="page">
    <!-- 订单列表 -->
    <scroll-view scroll-y class="order-list" v-if="orders.length > 0">
      <view
        v-for="order in orders"
        :key="order.id"
        class="order-card"
      >
        <!-- 卡片顶部：标题 + 状态 -->
        <view class="order-card-header">
          <view class="order-card-header-left">
            <text class="order-title">{{ order.courseTitle }}</text>
            <text class="order-instructor">{{ order.instructor }}</text>
          </view>
          <view class="status-badge" :class="'status-' + order.status">
            <text class="status-text">{{ getStatusText(order.status) }}</text>
          </view>
        </view>

        <!-- 卡片信息 -->
        <view class="order-meta">
          <view class="meta-row">
            <uni-icons type="clock" size="15" color="#9CA3AF" />
            <text class="meta-text">{{ order.selectedSchedule }}</text>
          </view>
          <view class="meta-row">
            <uni-icons type="location" size="15" color="#9CA3AF" />
            <text class="meta-text">{{ order.location }}</text>
          </view>
          <view class="meta-row">
            <uni-icons type="calendar" size="15" color="#9CA3AF" />
            <text class="meta-text">预约时间：{{ formatDate(order.orderDate) }}</text>
          </view>
        </view>

        <!-- 卡片底部：价格 + 操作 -->
        <view class="order-card-footer">
          <text class="order-price">¥{{ order.price }}</text>
          <button
            v-if="order.status === 'pending'"
            class="cancel-btn"
            @click="onCancelOrder(order.id)"
          >
            取消订单
          </button>
        </view>
      </view>
      <view class="list-bottom" />
    </scroll-view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <view class="empty-icon-wrap">
        <uni-icons type="calendar" size="50" color="#D1D5DB" />
      </view>
      <text class="empty-title">暂无订单</text>
      <text class="empty-sub">快去预约心仪的课程吧～</text>
    </view>

    <!-- 取消确认弹窗 -->
    <uni-popup ref="cancelPopup" type="dialog">
      <uni-popup-dialog
        type="warn"
        title="确认取消订单？"
        content="取消后将无法恢复，您需要重新预约该课程。"
        :duration="2000"
        :before-close="true"
        @close="onDialogClose"
        @confirm="confirmCancel"
      />
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: 'OrdersPage',
  data() {
    return {
      orders: [],
      cancelOrderId: null
    }
  },
  onShow() {
    this.loadOrders()
  },
  methods: {
    loadOrders() {
      const saved = uni.getStorageSync('orders')
      const list = saved ? JSON.parse(saved) : []
      list.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      this.orders = list
    },
    getStatusText(status) {
      const map = { pending: '待确认', confirmed: '已确认', cancelled: '已取消' }
      return map[status] || status
    },
    formatDate(isoStr) {
      const d = new Date(isoStr)
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
    },
    onCancelOrder(id) {
      this.cancelOrderId = id
      this.$refs.cancelPopup.open()
    },
    onDialogClose() {
      this.$refs.cancelPopup.close()
      this.cancelOrderId = null
    },
    confirmCancel() {
      if (!this.cancelOrderId) return
      const updated = this.orders.map(o =>
        o.id === this.cancelOrderId ? { ...o, status: 'cancelled' } : o
      )
      uni.setStorageSync('orders', JSON.stringify(updated))
      this.orders = updated
      this.cancelOrderId = null
      this.$refs.cancelPopup.close()
      uni.showToast({ title: '订单已取消', icon: 'success' })
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

.order-list {
  flex: 1;
  padding: 24rpx 30rpx 0;
}
.list-bottom {
  height: 30rpx;
}

/* 订单卡片 */
.order-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);
}
.order-card-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20rpx;
  gap: 16rpx;
}
.order-card-header-left {
  flex: 1;
  min-width: 0;
}
.order-title {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.order-instructor {
  font-size: 26rpx;
  color: #6B7280;
}

/* 状态徽章 */
.status-badge {
  padding: 6rpx 18rpx;
  border-radius: 100rpx;
  flex-shrink: 0;
}
.status-pending {
  background: #FEF3C7;
}
.status-pending .status-text {
  color: #D97706;
}
.status-confirmed {
  background: #D1FAE5;
}
.status-confirmed .status-text {
  color: #059669;
}
.status-cancelled {
  background: #F3F4F6;
}
.status-cancelled .status-text {
  color: #9CA3AF;
}
.status-text {
  font-size: 22rpx;
  font-weight: 500;
}

/* 订单信息 */
.order-meta {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-bottom: 24rpx;
}
.meta-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10rpx;
}
.meta-text {
  font-size: 26rpx;
  color: #6B7280;
}

/* 卡片底部 */
.order-card-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 20rpx;
  border-top: 1rpx solid #F3F4F6;
}
.order-price {
  font-size: 32rpx;
  font-weight: 700;
  color: #2563EB;
}
.cancel-btn {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 24rpx;
  background: #FFFFFF;
  color: #374151;
  font-size: 26rpx;
  border: 1rpx solid #D1D5DB;
  border-radius: 12rpx;
  text-align: center;
}
.cancel-btn::after {
  border: none;
}

/* 空状态 */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0 120rpx;
}
.empty-icon-wrap {
  width: 160rpx;
  height: 160rpx;
  background: #F3F4F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}
.empty-title {
  font-size: 30rpx;
  color: #6B7280;
  margin-bottom: 10rpx;
}
.empty-sub {
  font-size: 26rpx;
  color: #9CA3AF;
}
</style>
