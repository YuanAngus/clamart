<script setup>
import { useUserStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cartStore';
import router from '@/router';

const userStore = useUserStore()
const cartStore = useCartStore()
function confirm() {
  userStore.clearUserInfo()
  cartStore.clearCart()
  router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo.nickname }}</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="Sign out?" confirm-button-text="Confirm" cancel-button-text="Cancel">
              <template #reference>
                <a href="javascript:;">Sign Out</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="$router.push('/member/order')">Orders</a></li>
          <li><a href="javascript:;" @click="$router.push('/member')">Account</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">Sign In</a></li>
          <li><a href="javascript:;">Help</a></li>
          <li><a href="javascript:;">About</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $clamartColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>