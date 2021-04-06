/*
 * @Author: Aven
 * @Date: 2021-04-02 14:59:50
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-06 22:07:47
 * @Description:
 */
import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('src/pages/Home.vue')
      },
      {
        path: '/history',
        component: () => import('src/pages/History.vue')
      },
      {
        path: '/ranking',
        component: () => import('src/pages/Ranking.vue')
      },
      { path: '/challenge', component: () => import('src/pages/Challenge.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
