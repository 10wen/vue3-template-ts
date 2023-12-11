/** 所有 api 接口的响应数据都应该准守该格式 */
export interface ApiBaseParams {
  lang: "zh_HK" | "en_US";
}
export interface ApiBaseResponse<T> {
  result: T;
  errorCode: string;
  errorMessage: string;
}

export interface BaseTableRequest extends ApiBaseParams {
  criteriaMap: any;
  sortField: string;
  sortType: string;
  startRow: number;
  maxRows?: number;
}
export interface BaseTableResponse<T> extends ApiBaseResponse<T> {
  totalRows: number;
}

export const apiUrl: Record<string, string> = {
  refreshToken: "/auth/jwtTokenRefresh",
  userLogin: "/login",

};
