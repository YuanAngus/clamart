<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const filterData = ref({})
const route = useRoute()
getCategoryFilterAPI(route.params.id).then(res => {
  filterData.value = res.result
})

const goodsList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
  
function get() {
  getSubCategoryAPI(reqData.value).then(res => {
    goodsList.value = res.result.items
  })
}
get()

function tabChange() {
  reqData.value.page = 1
  get()
}

var disabled = ref(false)
function load() {
  console.log('load');
  reqData.value.page++
  getSubCategoryAPI(reqData.value).then(res => {
    goodsList.value = [...goodsList.value, ...res.result.items]
    if (res.result.items.length === 0) {
      disabled.value = true
    }
  })
}
</script>

<template>
  <div class="container ">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="'/'">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="`/category/${filterData.parentId}`">
          {{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ route.query.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="New" name="publishTime"></el-tab-pane>
        <el-tab-pane label="Trending" name="orderNum"></el-tab-pane>
        <el-tab-pane label="Most Reviewed" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <GoodsItem v-for="goods in goodsList" :goods="goods" :key="goods.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>