<script setup>

import { deleteUserOrder, getUserOrder } from '@/apis/order'
import { ref } from 'vue'

const orderList = ref([])
const total = ref(0)
const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 4
})

function getOrder() {
  getUserOrder(params.value).then(res => {
    orderList.value = res.result.items
    total.value = res.result.counts
  })
}
getOrder()

function deleteOrder(id) {
  deleteUserOrder(id).then(() => {
    getOrder()
  })
}

const tabTypes = [
  { name: "all", label: "All" },
  { name: "unpay", label: "Unpaid" },
  { name: "complete", label: "Completed" }
]

function tabChange(type) {
  params.value.orderState = type
  getOrder()
}

function pageChange(page) {
  params.value.page = page
  getOrder()
}
</script>

<template>
  <div class="order-container">
    <el-tabs @tabChange="tabChange">
      <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />

      <div class="main-container">
        <div class="holder-container" v-if="orderList.length === 0">
          <el-empty description="No orders" />
        </div>
        <div v-else>
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <div class="head">
              <span>Order Time: {{ new Date(order.createTime).toLocaleString() }}</span>
              <span>Order #: {{ order.id }}</span>
              <span class="down-time" v-if="order.orderState === 1">
                <i class="iconfont icon-down-time"></i>
                <b>Due on: {{new Date(order.countdown).toLocaleString()}}</b>
              </span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li v-for="item in order.goods" :key="item.id">
                    <a class="image" href="javascript:;">
                      <img :src="item.image" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">
                        {{ item.name }}
                      </p>
                      <p class="attr ellipsis">
                        <span>{{ item.attrsText }}</span>
                      </p>
                    </div>
                    <div class="price">${{ item.realPay?.toFixed(2) }}</div>
                    <div class="count">x{{ item.quantity }}</div>
                  </li>
                </ul>
              </div>
              <div class="column state">
                <p>{{ tabTypes[order.orderState].label }}</p>
              </div>
              <div class="column amount">
                <p class="red">${{ order.payMoney?.toFixed(2) }}</p>
                <p>(Delivery Fee: ${{ order.postFee?.toFixed(2) }})</p>
              </div>
              <div class="column action">
                <el-button  v-if="order.orderState === 1" type="primary" @click="$router.push(`/pay?id=${order.id}`)">
                  Pay Now
                </el-button>
                <p><a href="javascript:;" @click="deleteOrder(order.id)">Delete Order</a></p>
              </div>
            </div>
          </div>
          <div class="pagination-container">
            <el-pagination :total="total" :page-size="params.pageSize" @currentChange="pageChange" background layout="prev, pager, next" />
          </div>
        </div>
      </div>

    </el-tabs>
  </div>

</template>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      >p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: $clamartColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $clamartColor;
          }
        }
      }
    }
  }
}
</style>