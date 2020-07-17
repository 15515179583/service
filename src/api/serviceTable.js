import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/v1/service",
    method: "get",
    params: {
      index: data.index,
      count: data.count,
    },
  });
}

export function doEdit(data) {
  return request({
    url: "/v1​/service",
    method: "put",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/v1/service",
    method: "delete",
    data,
  });
}
