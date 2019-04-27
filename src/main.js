// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css';

Vue.use(iView)

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   const nextRoute = ['tab', 'table', 'button']
//   const auth = sessionStorage['userInfo']
//   iView.LoadingBar.start();
//   if (nextRoute.indexOf(to.name) != -1) {
//     if (!auth) {
//       router.push({ path: '/login' })
//       console.log(111)
//     } else {
//       next()
//     }
//   }
//   //已登录的情况再去登录页，跳转至首页
//   if (to.name === 'login') {
//     if (auth) {
//       router.push({ path: '/' });
//     }
//   }
//   next()
// })

// router.afterEach(to => {
//   console.log(to)
//   iView.LoadingBar.finish();
//   window.scrollTo(0, 0)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
