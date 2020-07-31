// 根据service 返回Nodes
function convertToMenu(service) {
  let menu = {};
  menu.id = service.id;
  menu.type = "task";
  menu.name = service.name;
  menu.ico = "el-icon-time";
  return "";
}

function convertToNode(task) {
  let node = {};
  node.id = task.id;
  node.name = task.task_name;
  node.left = task.left;
  node.top = task.top;
  node.type = "task";
  node.state = "success";
  return node;
}

function ConvertToLink(taskRelation) {
  let link = {};
  link.from = taskRelation.id;
  link.to = taskRelation.to;
  link.label = taskRelation.expression;
  return link;
}
