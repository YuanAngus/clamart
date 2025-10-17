import { ref } from 'vue';
import { getBannerAPI } from '@/apis/home';

export function useBanner() {
  const bannerList = ref([])
  getBannerAPI({
    distributionSite: 2
  }).then((res) => {
    bannerList.value = res.result
  })

  return bannerList
}