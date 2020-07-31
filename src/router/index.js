/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";
import { routerMode } from "@/config/settings";

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/personalCenter",
    component: Layout,
    hidden: true,
    redirect: "personalCenter",
    children: [
      {
        path: "personalCenter",
        name: "PersonalCenter",
        component: () => import("@/views/personalCenter/index"),
        meta: {
          title: "个人中心",
        },
      },
    ],
  },
  {
    path: "/upload",
    component: Layout,
    redirect: "upload",
    children: [
      {
        path: "",
        name: "UploadFile",
        component: () => import("@/views/upload/index"),
        meta: {
          title: "文件上传",
          icon: "file-upload",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/control",
    component: Layout,
    redirect: "service",
    meta: { title: "服务管理" },
    children: [
      {
        path: "service",
        name: "Service",
        component: () => import("@/views/service/index"),
        meta: {
          title: "服务列表",
          icon: "ambulance",
        },
      },
    ],
  },
  {
    path: "/template",
    component: Layout,
    redirect: "template",
    meta: { title: "数据模板" },
    children: [
      {
        path: "template",
        name: "Template",
        component: () => import("@/views/template/list"),
        meta: {
          title: "列表",
          icon: "ambulance",
          //affix: true,
        },
      },
      {
        path: "template-detail",
        name: "TemplateDetail",
        component: () => import("@/views/template/config"),
        meta: {
          title: "模板配置",
          icon: "ambulance",
          //affix: true,
        },
      },
    ],
  },
  // {
  //   path: "/error",
  //   component: EmptyLayout,
  //   redirect: "noRedirect",
  //   name: "Error",
  //   meta: { title: "错误页", icon: "bug" },
  //   children: [
  //     {
  //       path: "401",
  //       name: "Error401",
  //       component: () => import("@/views/401"),
  //       meta: { title: "401" },
  //     },
  //     {
  //       path: "404",
  //       name: "Error404",
  //       component: () => import("@/views/404"),
  //       meta: { title: "404" },
  //     },
  //   ],
  // },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/*const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};*/

export function resetRouter() {
  router.matcher = new VueRouter({
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;
