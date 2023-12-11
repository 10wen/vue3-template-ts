import { request } from "@/utils/service"
import type * as User from "./types"
import { apiUrl, BaseTableResponse, BaseTableRequest } from "../api.config"
export type * from "./types"

// refresh token
export function refreshTokenApi(data: User.RefreshTokenParams) {
  return request<User.RefreshTokenResponseData>({
    url: apiUrl.refreshToken,
    method: 'post',
    data
  })
}

// cms user login
export function loginApi(data: User.LoginParams) {
  return request<User.LoginResponseData>({
    url: apiUrl.userLogin,
    method: 'post',
    data
  })
}


// System User
// user list 
export function getSystemUserListApi(data: BaseTableRequest) {
  return request<BaseTableResponse<User.CmsUser[]>>({
    url: apiUrl.getSystemUserList,
    method: 'post',
    data
  })
}

// user detail 
export function getSystemUserDetailApi(data: User.GetUserDetailParams) {
  return request<User.GetUserDetailResponse>({
    url: apiUrl.getSystemUserDetail,
    method: 'post',
    data
  })
}

// user delete
export function deleteSystemUserApi(data: User.DeleteSystemUserParams) {
  return request<User.DeleteSystemUserResponse>({
    url: apiUrl.deleteSystemUser,
    method: 'delete',
    data
  })
}

// user update
export function updateSystemUserApi(data: User.UpdateSystemUserParams) {
  return request<User.UpdateSystemUserResponse>({
    url: apiUrl.updateSystemUser,
    method: 'put',
    data
  })
}

// user create
export function createSystemUserApi(data: User.CreateSystemUserParams) {
  return request<User.CreateSystemUserResponse>({
    url: apiUrl.createSystemUser,
    method: 'post',
    data
  })
}