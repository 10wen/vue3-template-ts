import { request} from "@/utils/service"
import * as User from "./types/index"


enum UserApi {
  login = "/login",
  logout = "/logout",
  forgotPassword = "/auth/forgotPassword",
}

export function loginApi(data: User.LoginRequestData) {
  return request<User.LoginResponseData>({
    url: UserApi.login,
    method: "POST",
    data
  })
}

export function logoutApi() {
  return request<{}>({
    url: UserApi.logout,
    method: "POST",
    data: {}
  })
}