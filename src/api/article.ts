/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/utils";

// 获取频道
export function getChannelApi() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

// 新增文章
export function createArticleApi(formData: any) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data: formData,
  });
}

// 获取文章列表
export function getArticleListApi(params: any) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

// 删除文章
export function deleteArticleApi(id: string) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}
