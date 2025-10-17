import { ref } from 'vue';
import { getCategoryAPI } from '@/apis/category';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export function useCategory() {
  const categoryData = ref([])
  const route = useRoute()
  const get = (id) => {
    getCategoryAPI(id).then(res => {
      categoryData.value = res.result
    })
  }

  get(route.params.id)

  onBeforeRouteUpdate((to) => {
    get(to.params.id)
  })

  return categoryData
}

