import Vue from 'vue'
import Router from 'vue-router'
 
// 组件模块
import Main from './components/Pagination/index'
import Header from './components/Pagination/index'
import Admin from './components/Pagination/index'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    { path: '/', name: 'home', component: Main },
    { path: '/main', name: 'Main', component: Main },
    { path: '/header',  name: 'Header', component: Header},
    { path: '/admin',  name: 'Admin', component: Admin}
  ]
})