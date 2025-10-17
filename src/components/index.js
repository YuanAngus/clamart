// 全局注册components中的所有组件
// 插件化方式
import ImageView from './ImageView/index.vue'
import Sku from './Sku/index.vue'
import GoodsItem from './GoodsItem/index.vue'
export const componentPlugin = {
  install(app) {
    app.component('ImageView', ImageView)
    app.component('Sku', Sku)
    app.component('GoodsItem', GoodsItem)
  }
}