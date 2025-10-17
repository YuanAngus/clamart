<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
</script>

<template>
  <div class="clamart-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <el-checkbox :modelValue="cartStore.isAll" @change="cartStore.allCheck" />
              </th>
              <th width="400">Product</th>
              <th width="220">Unit Price</th>
              <th width="180">Quantity</th>
              <th width="180">Subtotal</th>
              <th width="140">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in cartStore.cartList" :key="i.id">
              <td>
                <el-checkbox v-model="i.selected" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>${{ i.price }}</p>
              </td>
              <td class="tc">
                <el-input-number v-model="i.count" />
              </td>
              <td class="tc">
                <p class="f16 red">${{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm title="Delete this product?" confirm-button-text="Confirm" cancel-button-text="Cancel" @confirm="cartStore.delCart(i.skuId)">
                    <template #reference>
                      <a href="javascript:;">Delete</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="Empty Cart">
                    <el-button type="primary" @click="$router.push('/')">Return</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
      <div class="action">
        <div class="batch">
          Total {{ cartStore.allCount }} items, Selected {{ cartStore.selectedCount }} items. Total: 
          <span class="red">$ {{ cartStore.selectedPrice.toFixed(2) }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="$router.push('/checkout')" :disabled="cartStore.isNoCheck">Checkout</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.clamart-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: $clamartColor;
    }

    .clamart-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: $priceColor;
  }

  .green {
    color: $clamartColor;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .clamart-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }

}
</style>