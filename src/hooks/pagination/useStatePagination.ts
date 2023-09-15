import { reactive, onBeforeMount } from "vue"
import { onBeforeRouteLeave } from "vue-router";

interface DefaultPaginationData {
  total: number
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

interface PaginationData {
  total?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

/** 默认的分页参数 */
const defaultPaginationData: DefaultPaginationData = {
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
}


export const usePagination = (reFetchFn?:VoidFunction, initPaginationData:PaginationData = {}) => {
  const paginationData = reactive({
    ...defaultPaginationData,
    ...initPaginationData
  })

  // 保存到session
  const saveSessionStorage = () => {
    sessionStorage.setItem("sPageSize", JSON.stringify(paginationData.pageSize));
    sessionStorage.setItem("sCurrentPage", JSON.stringify(paginationData.currentPage));
  }

  // 从Session获取
  const getSessionStorage = () => {
    const sessionPageSize = sessionStorage.getItem("sPageSize");
    const sessionPage = sessionStorage.getItem("sCurrentPage");
    if (sessionPageSize && sessionPage) {
      paginationData.pageSize = parseInt(sessionPageSize);
      paginationData.currentPage = parseInt(sessionPage);
    }
  }

  // 清除Session
  const removeSessionStorage = () => {
    sessionStorage.removeItem("sPageSize");
    sessionStorage.removeItem("sCurrentPage");
  }

  // 页码改变
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value
    saveSessionStorage()
    reFetchFn?.()
  }

  // 页码大小改变
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value
    saveSessionStorage()
    reFetchFn?.()
  }

  // 初始化 pagination
  onBeforeMount(() => {
    getSessionStorage();
  })

  // 两个table页面跳转清除sessionPage
  onBeforeRouteLeave((to, _from) => {
    const toBreadcrumbs: any[] = to.meta.breadcrumbs as any[];
    if (!toBreadcrumbs || toBreadcrumbs.length < 3) {
      removeSessionStorage();
    } else {
      saveSessionStorage();
    }
  });

  return {
    paginationData,
    handleCurrentChange,
    handleSizeChange
  }
}