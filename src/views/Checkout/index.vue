<script setup>
import { getCheckoutInfoAPI } from '@/apis/checkout';
import { reactive, ref } from 'vue'
import { createOrderAPI } from '@/apis/checkout';
import router from '@/router'
import { useCartStore } from '@/stores/cartStore';
import { addAddressAPI, defaultAddressAPI } from '@/apis/user';
import { ElMessage } from 'element-plus';

const cartStore = useCartStore()

const checkInfo = ref({})
const curAddress = ref({})
const delivery = ref()
const payment = ref()
const form = reactive({
  receiver: '',
  contact: '',
  address: ''
})

getCheckoutInfoAPI().then(res => {
  checkInfo.value = res.result
}).then(() => {
  curAddress.value = checkInfo.value.userAddresses.find(item => item.isDefault)
})

const showDialog = ref(false)
const showAdd = ref(false)

const activeAddress = ref({})
function switchAddress(item) {
  activeAddress.value = item
}

function confirm() {
  curAddress.value = activeAddress.value
  defaultAddressAPI(curAddress.value.id).then(() => {
    ElMessage.success('Address updated')
  })
  showDialog.value = false
}

function confirmAdd() {
  addAddressAPI({
    receiver: form.receiver,
    contact: form.contact,
    address: form.address,
    fullLocation: ''
  }).then(() => {
    getCheckoutInfoAPI().then(res => {
      checkInfo.value = res.result
      curAddress.value = activeAddress.value = checkInfo.value.userAddresses.find(item => item.isDefault)
      showAdd.value = false
      form.receiver = ''
      form.contact = ''
      form.address = ''
      ElMessage.success('Address added')
    })
  })
}

function createOrder() {
  const createTime = Date.now();
  const countdown = createTime + 30 * 60 * 1000;
  createOrderAPI({
    createTime,
    countdown,
    orderState: 1,
    payMoney: cartStore.selectedPrice,
    postFee: checkInfo.value.summary?.postFee,
    goods: cartStore.cartList
    .filter(item => item.selected)
    .map(item => {
      return {
        id: item.id,
        skuId: item.skuId,
        name: item.name,
        image: item.picture,
        attrsText: item.attrsText,
        realPay: item.price,
        quantity: item.count
      }
    }),
    addressId: curAddress.value.id
  }).then(res => {
    router.push({
      path: 'pay',
      query: {
        id: res.result.id
      }
    })
    cartStore.delCart(cartStore.cartList.filter(item => item.selected).map(i => i.skuId))
  })
}

</script>

<template>
  <div class="clamart-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <h3 class="box-title">Delivery Address</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">Please add delivery address</div>
              <ul v-else>
                <li><span>Name:</span>{{ curAddress.receiver }}</li>
                <li><span>Phone:</span>{{ curAddress.contact }}</li>
                <li><span>Address:</span>{{ curAddress.fullLocation + curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">Change</el-button>
              <el-button size="large" @click="showAdd = true">Add</el-button>
            </div>
          </div>
        </div>
        <h3 class="box-title">Item Info</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">Product</th>
                <th width="170">Unit Price</th>
                <th width="170">Quantity</th>
                <th width="170">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="i in cartStore.cartList">
                <tr v-if="i.selected" :key="i.id">
                  <td>
                    <a href="javascript:;" class="info">
                      <img :src="i.picture" alt="">
                      <div class="right">
                        <p>{{ i.name }}</p>
                        <p>{{ i.attrsText }}</p>
                      </div>
                    </a>
                  </td>
                  <td>${{ i.price }}</td>
                  <td>{{ i.count }}</td>
                  <td>${{ (i.price * i.count).toFixed(2) }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <h3 class="box-title">Delivery Time</h3>
        <div class="box-body">
          <el-radio-group v-model="delivery" size="large" fill="#68cfb9">
            <el-radio-button label="No Specific Time" value="1" />
            <el-radio-button label="Weekdays: Monday to Friday" value="2" />
            <el-radio-button label="Weekends or Holidays" value="3" />
          </el-radio-group>
        </div>
        <h3 class="box-title">Payment Method</h3>
        <div class="box-body">
          <el-radio-group v-model="payment" size="large" fill="#68cfb9">
            <el-radio-button label="Online Payment" value="1" />
            <el-radio-button label="Cash on Delivery" value="2" />
          </el-radio-group>
        </div>
        <h3 class="box-title">Payment Details</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>Quantity:</dt>
              <dd>{{ cartStore.selectedCount }} items</dd>
            </dl>
            <dl>
              <dt>Sum:</dt>
              <dd>${{ cartStore.selectedPrice }}</dd>
            </dl>
            <dl>
              <dt>Delivery Fee:</dt>
              <dd>${{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>Total:</dt>
              <dd class="price">{{ (cartStore.selectedPrice + checkInfo.summary?.postFee).toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <div class="submit">
          <el-button type="primary" size="large" @click="createOrder">Place Order</el-button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="showDialog" title="Change Default Address" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" @click="switchAddress(item)" :class="{active: activeAddress === item}" v-for="item in checkInfo.userAddresses"  :key="item.id">
        <ul>
        <li><span>Name: </span>{{ item.receiver }} </li>
        <li><span>Phone: </span>{{ item.contact }}</li>
        <li><span>Address: </span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showAdd" title="Add Delivery Address" width="30%" center>
    <div class="addressWrapper">
      <el-form :model="form" label-width="auto">
        <el-form-item label="Name">
          <el-input v-model="form.receiver" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAdd = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAdd">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.clamart-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $clamartColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $clamartColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $clamartColor;
      background: lighten($clamartColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>