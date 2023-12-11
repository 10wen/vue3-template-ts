import { BaseTableResponse, BaseTableRequest } from "@/api/api.config";
import { usePagination } from "./pagination/usePagination";

interface PaginationData {
  total?: number;
  currentPage?: number;
  pageSizes?: number[];
  pageSize?: number;
  layout?: string;
}

interface GetListParams {
  criteriaMap?: any;
  lang?: "zh_HK" | "en_US";
  sortField?: string;
  sortType?: string;
  startRow?: number;
  maxRows?: number;
}

const defaultGetListParams: BaseTableRequest = {
  criteriaMap: {},
  lang: "en_US",
  sortField: "id",
  sortType: "desc",
  startRow: 0,
  maxRows: 10,
};

interface Options<T> {
  getListApi: (params: BaseTableRequest) => Promise<BaseTableResponse<T[]>>;
  getListParams?: GetListParams; // 配置Api请求参数
  initialPaginationData?: PaginationData; // 配置分页初始化参数
}

export function useListDataUtil<T>(options: Options<T>) {
   // table data
   const loading = ref<boolean>(false);
   const listData = ref<T[]>();

  // pagination
  const { paginationData, handleCurrentChange, handleSizeChange } =
    usePagination();
  // column sortable 
  const sortableData = reactive({ 
    sortField: options.getListParams?.sortField || defaultGetListParams.sortField, 
    sortType: options.getListParams?.sortType || defaultGetListParams.sortType
  })
  // filter criteriaMap
  const isFilter = ref(false)
  const criteriaMap = reactive<any>(options.getListParams?.criteriaMap || defaultGetListParams.criteriaMap);

  //#region filter 相关
  const checkIsFilter = (criteriaObj: any) => {
    isFilter.value = false
    const objectKeys = Object.keys(criteriaObj);
    objectKeys.forEach(key => {
      if (criteriaObj[key] !== "" && criteriaObj[key] !== undefined && criteriaObj[key] !== null) {
        isFilter.value = true;
      }
    })
  }

  const handleFilter = () => {
    paginationData.currentPage = 1
    getListData()
  }

  const handleResetFilter = () => {
    const defaultCriteriaMap = options.getListParams?.criteriaMap || defaultGetListParams.criteriaMap;
    Object.assign(criteriaMap, defaultCriteriaMap);
    getListData()
  }

  //#endregion

  const getListData = async () => {
    loading.value = true;

    const eventObj: BaseTableRequest = {
      // ...defaultGetListParams,
      // ...options.getListParams,
      lang: defaultGetListParams.lang,
      criteriaMap: criteriaMap,
      sortField: sortableData.sortField,
      sortType: sortableData.sortType,
      startRow: (paginationData.currentPage - 1) * paginationData.pageSize,
      maxRows: paginationData.pageSize,
    };
    const data = await options.getListApi(eventObj);
    listData.value = data.result;
    paginationData.total = data.totalRows;

    checkIsFilter(eventObj.criteriaMap)
    loading.value = false;
  };


  const sortChange = ({ prop, order }: { prop: string; order: string }) => {
    const defaultSortField = options.getListParams?.sortField || defaultGetListParams.sortField;
    const defaultSortType = options.getListParams?.sortType || defaultGetListParams.sortType;
    switch (order) {
      case "ascending":
        sortableData.sortField = prop;
        sortableData.sortType = "asc"
        break;
      case "descending":
        sortableData.sortField = prop;
        sortableData.sortType = "desc"
        break;
      default:
        sortableData.sortField = defaultSortField;
        sortableData.sortType = defaultSortType
        break;
    }
    getListData();
  };


  watch(
    [() => paginationData.currentPage, () => paginationData.pageSize],
    () => {
      getListData();
    },
    { immediate: true }
  );

  return {
    loading,
    listData,
    sortChange,
    paginationData,
    handleCurrentChange,
    handleSizeChange,
    isFilter,
    criteriaMap,
    handleFilter,
    handleResetFilter,
  };
}



// 使用
// const criteriaMapRaw = {
//   updatedTimeFrom: "",
//   updatedTimeTo: "",
// }
// const {
//   loading,
//   listData,
//   sortChange,
//   paginationData,
//   handleCurrentChange,
//   handleSizeChange,
//   criteriaMap,
//   handleFilter,
// } = useListDataUtil<AuditLog>({
//   getListApi: getAuditLogListApi,
//   getListParams: { 
//     criteriaMap: criteriaMapRaw 
//   }
// });