import { ApiBaseParams, ApiBaseResponse, BaseTableRequest } from "../api.config"

//#region login
export interface LoginParams {
  lang: 'zh_HK' | 'en_US';
  username: string;
  password: string;
}

export interface SystemFunction {
	id: number;
	code: string;
	name: string;
	type: number;
	isDisplay: boolean;
	parentId: number;
	icon: string;
	webInfo: string;
	permissionType?: any;
	displayOrder: number;
}

export interface SystemAction {
	id: number;
	code: string;
	name: string;
	type: number;
	isDisplay: boolean;
	parentId: number;
	icon?: any;
	webInfo?: any;
	permissionType: string;
	displayOrder: number;
}
export type LoginResponseData = ApiBaseResponse<{
  tokenType: string;
	accessToken: string;
	refreshToken: string;
	username: string;
	departmentId: number;
	isSupperAdmin: boolean;
	systemFunctions: SystemFunction[];
	systemActions: SystemAction[];
}>
//#endregion

//#region refresh token
export interface RefreshTokenParams {
  refreshToken: string;
}
export type RefreshTokenResponseData = ApiBaseResponse<{
	accessToken: string;
	refreshToken: string;
	tokenType: string;
}>
//#endregion


// System User
//#region system user list
export interface CmsUser {
  id?: number;
	username: string;
	status: number;
	departmentId: number;
	roleName?: string;
	email?: string;
	password?: string;
	nickname?: string;
	staffNo?: string;
	phoneNo?: string;
	updatedTime?: string;
	systemRoleId?: number;
	roleId?: number;
}

export type GetSystemUserListParams = BaseTableRequest
export type GetSystemUserListResponse = ApiBaseResponse<CmsUser[]>
//#endregion

//#region system user detail
export interface GetUserDetailParams extends ApiBaseParams {
  id: number;
}
export type GetUserDetailResponse = ApiBaseResponse<CmsUser>

//#endregion

//#region system user delete
export interface DeleteSystemUserParams extends ApiBaseParams {
  ids: number[];
}
export type DeleteSystemUserResponse = ApiBaseResponse<null>

//#endregion

//#region system user update
export interface UpdateSystemUserParams extends ApiBaseParams {
  departmentId: number;
	email: string;
	id: number;
	nickname: string;
	password: string;
	phoneNo: string;
	staffNo: string;
	status: number;
	roleId: number;
	username: string;
}
export type UpdateSystemUserResponse = ApiBaseResponse<null>

//#endregion

//#region system user create
export interface CreateSystemUserParams extends ApiBaseParams {
  ids: number[];
}
export type CreateSystemUserResponse = ApiBaseResponse<null>

//#endregion