import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'
export const useCategoryStore = defineStore('category', () => {
  // state
  const categoryList = ref([])

  // action
  function getCategory() {
    getCategoryAPI().then(res => {
      categoryList.value = res.result
    })
  }

  return {
    categoryList,
    getCategory
  }
})
