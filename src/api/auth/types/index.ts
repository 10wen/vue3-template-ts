
export interface LoginRequestData {
  username: string
  password: string
}

interface SystemAction {
  id: number
  code: string
  name: string
  type: number
  isDisplay: boolean
  displayOrder: number
  icon: string
  parentId: number
  permissionType: string
  webInfo: string
}

interface LoginResponse {
  username: string
  tokenType: string
  accessToken: string
  refreshToken: string
  systemActions: Array<SystemAction>
  systemFunctions: Array<SystemAction>
}

export type LoginResponseData = ApiResponseData<LoginResponse>
