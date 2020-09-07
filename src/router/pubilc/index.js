

export default [
  {
    path: "/",
    name: 'home',
    redirect: '/login', // 重定向到登录页面
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index')
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index")
  }
];