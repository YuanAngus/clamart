<script setup>
import { getOrderAPI } from '@/apis/pay'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const orderInfo = ref({})

getOrderAPI(route.query.orderId).then(res => orderInfo.value = res.result)
</script>

<template>
  <div class="clamart-pay-page">
    <div class="container">
      <div class="pay-result" v-if="$route.query.payResult === 'true'">
        <span class="iconfont icon-queren2 green"></span>
        <p class="tit">Payment Successful</p>
        <p class="tip">Your order will be delivered soon!</p>
        <p>Payment Method: <span>Bank Card</span></p>
        <p>Amount: <span>${{ orderInfo.payMoney?.toFixed(2) }}</span></p>
        <div class="btn">
          <el-button type="primary" @click="$router.push('/member/order')">History Orders</el-button>
          <el-button type="primary" @click="$router.push('/')">Return to Home</el-button>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          Reminder: For your safety, please keep your account information and payment details secure.
        </p>
      </div>
      <div class="pay-result" v-else>
        <span class="iconfont icon-shanchu red"></span>
        <p class="tit">Payment Failed</p>
        <div class="btn">
          <el-button type="primary" @click="$router.push('/member/order')">History Orders</el-button>
          <el-button type="primary" @click="$router.push('/')">Return to Home</el-button>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          Reminder: For your safety, please keep your account information and payment details secure.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  >.iconfont {
    font-size: 100px;
  }

  .green {
    color: #1dc779;
  }

  .red {
    color: $priceColor;
  }

  .tit {
    font-size: 24px;
  }

  .tip {
    color: #999;
  }

  p {
    line-height: 40px;
    font-size: 16px;
  }

  .btn {
    margin-top: 50px;
  }

  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>