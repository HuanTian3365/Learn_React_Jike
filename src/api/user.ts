/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/utils";

// 登录
export function loginApi(formData: any) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}

// 获取用户信息
export function getProfileApi() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}
