<script setup>
import DetailHot from './components/DetailHot.vue';
import { getDetail } from '@/apis/detail'
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()

const goods = ref({})
const route = useRoute()
getDetail(route.params.id).then(res => {
  goods.value = res.result
})

let skuObj = {}
function skuChange(sku) {
  skuObj = sku
}

const count = ref(1)

function addCart() {
  if (skuObj.skuId) {
    cartStore.addCart({
      id:goods.value.id,
      name: route.query.name,
      picture: goods.value.mainPictures[0],
      price: goods.value.price,
      count: count.value,
      skuId: skuObj.skuId,
      attrsText: skuObj.specsText,
      selected: true
    })
    ElMessage.success('Added to cart')
  }
  else{
    ElMessage.warning('Please select the spec')
  }
}

</script>

<template>
  <div class="clamart-goods-page">
    <div class="container" v-if="goods.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="'/'">Home</el-breadcrumb-item>
          <el-breadcrumb-item :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="`/category/${goods.categories[0].id}`">{{ goods.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ route.query.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <ImageView :imageList="goods.mainPictures"></ImageView>
              <ul class="goods-sales">
                <li>
                  <p>Sales</p>
                  <p>{{ goods.salesCount }}+</p>
                  <p><i class="iconfont icon-task-filling"></i>Sales</p>
                </li>
                <li>
                  <p>Reviews</p>
                  <p>{{ goods.commentCount }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>Reviews</p>
                </li>
                <li>
                  <p>Likes</p>
                  <p>{{ goods.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>Likes</p>
                </li>
                <li>
                  <p>Brand</p>
                  <p>{{ goods.brand.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>Brand</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <p class="g-name">{{ route.query.name }}</p>
              <p class="g-desc">{{ goods.desc }}</p>
              <p class="g-price">
                <span>{{ goods.price }}</span>
                <span>{{ goods.oldPrice }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>Deals</dt>
                  <dd>Limited time offer</dd>
                </dl>
                <dl>
                  <dt>Service</dt>
                  <dd>
                    <span>Return</span>
                    <span>Delivery</span>
                    <span>Packaging</span>
                    <a href="javascript:;">Learn More</a>
                  </dd>
                </dl>
              </div>
              <Sku :goods="goods" @change="skuChange"></Sku>
              <el-input-number :min="1" v-model="count" />
              <div>
                <el-button size="large" class="btn" @click="addCart">
                  Add to Cart
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <div class="goods-tabs">
                <nav>
                  <a>Details</a>
                </nav>
                <div class="goods-detail">
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <img v-for="img in goods.details.pictures" :src="img" :key="img" alt="">
                </div>
              </div>
            </div>
            <div class="goods-aside">
              <DetailHot :hotType="1"></DetailHot>
              <DetailHot :hotType="2"></DetailHot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.clamart-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "$";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 65px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $clamartColor;
              margin-right: 2px;
            }
          }

          a {
            color: $clamartColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $clamartColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $clamartColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>