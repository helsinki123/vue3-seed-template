import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";
import home from "@/layout/index.vue"
import login from "@views/system/login.vue"
import charts from "@views/main/pages/DIYpage/charts.vue"
import map from "@views//main/pages/DIYpage/map.vue"
import dashboardpage from "@views/main/dashboard/index.vue"
import crudTable from "@views/main/pages/crudTable/index.vue"
import crudTableCopy from "@views/main/pages/crudTableCopy/index copy.vue"
import DIYpage from "@views/main/pages/DIYpage/export.vue"
import noFound from "@views/system/404.vue"
// 路由信息
const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: home,
    meta: {
      title: "index",
      keepAlive: false,
      level: 0
    },
    children: [
      {
        path: "dashboard",
        component: dashboardpage,
        meta: {
          title: "crudTable",
          keepAlive: false,
          level: 0
        },
      }
    ]
  },
  {
    path: "/pages",
    component: home,
    meta: {
      title: "home",
      keepAlive: false,
      level: 0
    },
    children: [
      {
        path: "crudTable",
        component: crudTable,
        meta: {
          title: "crudTable",
          keepAlive: false,
          level: 0
        },
      },
      {
        path: "crudTableCopy",
        component: crudTableCopy,
        meta: {
          title: "crudTableCopy",
          keepAlive: false,
          level: 0
        },
      },
      {
        path: "DIYpage",
        component: DIYpage,
        meta: {
          title: "DIYpage",
          keepAlive: false,
          level: 0
        },
        children: [
          {
            path: "test1",
            component: charts,
            meta: {
              title: "test1",
              keepAlive: false,
              level: 0
            },
          },
          {
            path: "test2",
            component: map,
            meta: {
              title: "test2",
              keepAlive: false,
              level: 0
            },
          },
        ]
      },
    ]
  },
  {
    path: "/login",
    name: login,
    component: login,
    meta: {
      title: "login",
      keepAlive: false,
      level: 0
    },
  },
  {
    path: "/404",
    name: noFound,
    component: noFound,
    meta: {
      title: "404",
      keepAlive: false,
      level: 0
    },
  },
  {
    // path: "*", // 这样用，vue3已经不支持，得下面的方式
    path: "/:pathMath(.*)", // 此处需特别注意置于最底部
    redirect: "/404"
  }
];
// 导出路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export {
  routes,
  router
};