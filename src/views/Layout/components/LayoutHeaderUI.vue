<script setup>
import { useCategoryStore } from '@/stores/categoryStore';
const categoryStore = useCategoryStore()
</script>

<template>
    <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">Home</RouterLink>
    </li>
    <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
      <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  z-index: 998;

  li {
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $clamartColor;
        border-bottom: 1px solid $clamartColor;
      }
    }

    .active {
      color: $clamartColor;
      border-bottom: 1px solid $clamartColor;
    }
  }
}
</style>