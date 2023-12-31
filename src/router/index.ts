import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: true, parent: '#app' });

import home from '@/pages/home/index.vue';
import me from '@/pages/me/index.vue';
import send from '@/pages/send/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: { name: 'home' },
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/send',
    name: 'send',
    component: send,
  },
  {
    path: '/me',
    name: 'me',
    component: me,
  },
];

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

router.beforeEach((_to, _from, next) => {
  NProgress.start(); // start progress bar
  next();
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

// 导出路由实例，并在 `main.ts` 挂载
export default router;
