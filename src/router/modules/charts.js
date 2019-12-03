/*
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-23 16:42:12
 * @Description: 添加描述
 */
/** When your routing table is too long, you can split it into small modules**/

// import Layout from "@/layout";
// console.log('Layout',Layout)

const chartsRouter = [
  {
    path: '/tabone',
    component: () => import('@/layout'),
    hidden: true,
    name: 'Tabone',
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tabone',
        meta: { title: '表格1', icon: 'tab' }
      }
    ]
  }
];
export default chartsRouter;
