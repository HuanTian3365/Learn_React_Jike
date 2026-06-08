import { request } from "@/utils";

// 获取频道
export function getChannelApi() {
  return request({
    url: "/channels",
    method: "GET",
  });
}
