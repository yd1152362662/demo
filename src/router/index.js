/*
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-12-02 16:34:48
 * @Description: 添加描述
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

/* Layout */
import Layout from '@/layout';
// console.log('Layout', Layout)

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table';
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/bind-phone',
    name: 'bindPhone',
    component: () => import('@/views/bind-phone/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页看板',
        meta: {
          title: '首页看板',
          icon: 'sidebar-home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/orderIssue',
    component: Layout,
    redirect: '/orderIssue',
    name: '订单发布',
    meta: {
      title: '订单发布',
      icon: 'sidebar-order-issue'
    },
    alwaysShow: true,
    children: [
      {
        path: 'create-order',
        component: () => import('@/views/order-issue/create-order'),
        name: '创建订单',
        hidden: false,
        meta: {
          title: '创建订单',
          icon: 'sidebar-order-issue-create',
          disabled: false
        }
      },
      {
        path: 'erp-order',
        component: () => import('@/views/order-issue/erp-order'),
        name: '工厂ERP订单发布',
        hidden: false,
        meta: {
          title: '工厂ERP订单发布',
          icon: 'sidebar-order-issue-erp',
          disabled: false
        }
      }
    ]
  },
  {
    path: '/orderList',
    component: Layout,
    redirect: '/orderList',
    name: '订单列表',
    meta: {
      title: '订单列表',
      icon: 'sidebar-order-list'
    },
    children: [
      {
        path: 'orderList',
        component: () => import('@/views/order-list/index'),
        name: '订单列表 ',
        meta: {
          title: '订单列表'
        }
      }
    ]
  },
  {
    path: '/flowManagement',
    component: Layout,
    redirect: '/flowManagement',
    name: '流向管理',
    meta: {
      title: '流向管理',
      icon: 'sidebar-flow-management'
    },
    children: [
      {
        path: 'flowManagement',
        component: () => import('@/views/flow-management/index'),
        name: '流向管理 ',
        meta: {
          title: '流向管理'
        }
      }
    ]
  },

  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    name: '报表统计',
    alwaysShow: true,
    meta: {
      title: '报表统计',
      icon: 'sidebar-report'
    },
    children: [
      {
        path: 'report',
        component: () => import('@/views/report-statistics/index'),
        name: '已完成订单明细 ',
        meta: {
          title: '已完成订单明细',
          icon: 'sidebar-report-completed'
        }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: {
          title: 'Profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/details',
    component: Layout,
    redirect: '/details/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/details/index'),
        name: 'details',
        meta: {
          title: '详情',
          icon: 'user',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    redirect: '/demo/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/index'),
        name: 'demo',
        meta: {
          title: 'demo',
          icon: 'user',
          noCache: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

export const constantRoutes1 = [
  {
    path: '/tab1',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '正常发单',
      icon: 'tab'
    },
    children: [
      {
        path: 'index1',
        component: () => import('@/views/tab/index'),
        name: 'Tab1',
        meta: {
          title: '正常发单'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: {
          title: 'erp发单',
          icon: 'tab'
        }
      }
    ]
  },
  {
    path: '/online-car',
    component: Layout,
    redirect: '/online-car/appointed-task',
    name: 'online-car',
    meta: {
      title: '在线找车',
      icon: 'excel'
    },
    children: [
      {
        path: 'appointed-task',
        component: () => import('@/views/online-car/appointed-task'),
        name: 'AppointedTask',
        meta: {
          title: '指派任务'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
