import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import { useUserInfoStoreHook } from "@/store/index";

const Layout = () => import("@/layout/index.vue");

/**
 * constantRoutes: 常驻路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404/index.vue"),
    meta: {
      hidden: true,
    },
    alias: "/:pathMatch(.*)*",
  },
];

/**
 * asyncRoutes: 动态路由
 * the routes that need to be dynamically loaded base on user roles
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: Layout,
    meta: { title: "首页" },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "仪表盘",
          icon: "DashboardOutlined",
          roles: ["admin", "editor"],
        },
        children: [],
      },
    ],
  },
  {
    name: "ErrorPage",
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes.concat(asyncRoutes),
});

/** 免登录白名单 */
const whiteList = ["/login"];

/**
 * to:   即将要进入的目标
 * from: 当前导航正要离开的路由
 * next: 进入下一个目标
 */
router.beforeEach(async (to, _from, next) => {
  const store = useUserInfoStoreHook();
  if (store.accessToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

export default router;
