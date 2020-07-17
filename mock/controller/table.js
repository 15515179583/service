import { mock } from "mockjs";
const List = [];
const count = 100;
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      id: "@id",
      project_id: "@id",
      queue: "@string",
      sensitivity: "@integer",
      service_outcome_id: "@id",
      spider: "@string",
      update_at: "@datetime",
    })
  );
}

export default [
  {
    url: "/table/getList",
    type: "post",
    response: (config) => {
      if (!config.body) {
        return {
          code: 200,
          msg: "success",
          totalCount: count,
          data: mock({
            "data|50": [
              {
                id: "@id",
                project_id: "@id",
                queue: "@string",
                sensitivity: "@integer",
                service_outcome_id: "@id",
                spider: "@string",
                update_at: "@datetime",
              },
            ],
          }).data,
        };
      }
      const { pageNo = 1, pageSize = 20 } = config.body;
      let mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
      });
      console.log(pageNo, pageSize)
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      );
      return {
        code: 200,
        msg: "success",
        totalCount: count,
        data: pageList,
      };
    },
  },
  {
    url: "/table/doEdit",
    type: "put",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/table/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
