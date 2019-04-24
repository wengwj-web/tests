import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('@/components/grid.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/components/layout.vue')
    },
    {
      path: '/color',
      name: 'color',
      component: () => import('@/components/color.vue')
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('@/components/button.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('@/components/form.vue')
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('@/components/card.vue')
    },
    {
      path: '/collapse',
      name: 'collapse',
      component: () => import('@/components/collapse.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/components/menu.vue')
    },
    {
      path: '/tab',
      name: 'tab',
      component: () => import('@/components/tab.vue')
    },
    {
      path: '/page',
      name: 'page',
      component: () => import('@/components/page.vue')
    },
    {
      path: '/switch',
      name: 'switch',
      component: () => import('@/components/switch.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('@/components/table.vue')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('@/components/select.vue')
    },
    {
      path: '/date',
      name: 'date',
      component: () => import('@/components/date.vue')
    },
  ]
})
