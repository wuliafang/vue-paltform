import Vue from 'vue'
import Router from 'vue-router'
import publicRouters from './pubilc'
import limitedRouters from './limited'

Vue.use(Router)


/** 因为基于SPA模式开发，所以页面仅有一个，实现页面切换是利用哈希与组件的映射关系，
  vue-router 是通过哈希来模拟完整的 url，但是对于页面来说仍是一个 url，所以在任何一个组件滚动页面，
  切换到其他组件的时候，页面仍保持滚动之前的状态，这就是出现上述现象的原因。
  */

const router = new Router({
  mode: 'hash',
  routers: publicRouters.concat(limitedRouters),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
})

console.log(router)
export default router;