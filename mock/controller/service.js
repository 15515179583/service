import { mock } from "mockjs";
const List = [];
const countSum = 100;
for (let i = 0; i < countSum; i++) {
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
    url: "/v1/service",
    type: "get",
    response: (config) => {
      if (!config.body) {
        return {
          code: 200,
          msg: "success",
          totalCount: countSum,
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
      const { title = "", index = 1, count = 20 } = config.query;
      let mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
      });
      const pageList = mockList.filter(
        (item, itemIndex) =>
          itemIndex < count * index && itemIndex >= count * (index - 1)
      );
      return {
        code: 200,
        msg: "success",
        total: countSum,
        data: pageList,
      };
    },
  },
  {
    url: "/v1/service",
    type: "put",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/v1/service",
    type: "delete",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];