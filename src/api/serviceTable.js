import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/v1/service",
    method: "get",
    params: data,
  });
}

export function getServiceList(data) {
  return getList(data);
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
