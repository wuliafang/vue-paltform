// 模板 标签页
import {Layout} from '@/views/ratary/layout'

export default [
  // 轮转首页
  {
    path: '/ratary-home',
    component: Layout, 
    redirect: '/ratary-home/index',
    children: [
      {
        name: 'ratary-home',
        path: 'index',
        component: () => import(/* webpackChunkName: 'ratary-home' */ '@/views/ratary/ratary-home'),
        meta: {
          withoutLayout: false
        }
      }
    ]
  }
]