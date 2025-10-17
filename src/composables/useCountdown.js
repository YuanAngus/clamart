import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export function useCountdown() {
  let timer = null
  const time = ref(0)
  const formatTime = computed(() => {
    const d = dayjs.duration(time.value);
    return d.minutes().toString().padStart(2, '0') + ':' + d.seconds().toString().padStart(2, '0');
  })

  function start(expireTime) {
    time.value = expireTime - Date.now()
    if (time.value <= 0) {
      time.value = 0
      return
    }
    timer = setInterval(() => {
      if (time.value - 1000 <= 0) {
        clearInterval(timer)
        time.value = 0
        return
      }
      time.value -= 1000
    }, 1000)
  }

  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}