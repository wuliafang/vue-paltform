import ratary from './modules/ratary'

const commonRoutes = [
  {
    path: "/",
    name: '/',
    component: () => import(/* webpackChunkName: 'login' */ '../../views/login/index')
    // hidden: true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index")
    // hidden: true
  }
];

export default [
  ...commonRoutes,
  ...ratary
]