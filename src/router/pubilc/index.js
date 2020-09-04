
// export default new Router({
//   routes: [{
//     path: '/',
//     name: 'index',
//     component: index,
//     children: [{
//       path: '',
//       name: 'login',
//       component: Login
//     }]
//   }]
// })

export default [
  {
    path: "/",
    name: '/',
    redirect: '/',
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