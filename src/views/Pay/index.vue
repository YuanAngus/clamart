<script setup>
import { getOrderAPI, payOrderAPI } from '@/apis/pay'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCountdown } from '@/composables/useCountdown';
import { ElMessage } from 'element-plus';
import router from '@/router';

const route = useRoute()
const payInfo = ref({})
const countdown = useCountdown()
const form = reactive({
  card: '4882664999007',
  expiry: '07/30',
  cvv: '506',
})

getOrderAPI(route.query.id).then(res => {
  payInfo.value = res.result
  countdown.start(res.result.countdown)
})

const confirm = () => {
  payOrderAPI(route.query.id);
  ElMessage({
    type: 'success',
    message: 'Payment successful!'
  });
  router.push(`/paycallback?orderId=${route.query.id}&payResult=true`)
}
</script>


<template>
  <div class="clamart-pay-page">
    <div class="container">
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>Order placed successfully! Please proceed to payment.</p>
          <p>Expire in: <span>{{ countdown.formatTime }}</span></p>
        </div>
        <div class="amount">
          <span>Total: </span>
          <span>${{ payInfo.payMoney?.toFixed(2) }}</span>
        </div>
      </div>
      <div class="pay-type">
        <p class="head">Payment method</p>
        <div class="item">
          <p>Apple Pay</p>
          <a class="btn apple" href="javascript:;"></a>
        </div>
        <div class="item">
          <p>Pay by card</p>
          <el-form :model="form" label-width="auto" class="card">
            <el-form-item label="Card number">
              <el-input v-model="form.card" />
            </el-form-item>
            <el-form-item label="Expiry">
              <el-input v-model="form.expiry" />
            </el-form-item>
            <el-form-item label="CVV">
              <el-input v-model="form.cvv" />
            </el-form-item>
            <div class="confirm">
              <el-button type="primary" @click="confirm">Confirm</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.clamart-pay-page {
  margin-top: 20px;
}

.pay-info {

  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: $clamartColor;
    }

    &.apple {
      background: url("@/assets/images/apple-pay.png") no-repeat center / contain;
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }

  .card {
    padding: 0 500px;
  }

  .confirm {
    display: flex;
    justify-content: center;

    button {
      margin-left: 40px;
    }
  }
}
</style>