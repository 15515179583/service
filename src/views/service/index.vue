<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">删除</el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form ref="form" :model="queryForm" :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="queryForm.id" placeholder="服务编号" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.project_id" placeholder="项目名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.queue" placeholder="指定队列" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.sensitivity" placeholder="敏感度" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.service_outcome_id" placeholder="输出类型" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.spider" placeholder="爬虫名" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column show-overflow-tooltip type="selection" width="55"></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="project_id" label="项目编号"></el-table-column>
      <el-table-column show-overflow-tooltip label="绑定队列" prop="queue"></el-table-column>
      <el-table-column show-overflow-tooltip label="敏感度" prop="sensitivity" sortable></el-table-column>
      <el-table-column show-overflow-tooltip label="输出类型" prop="service_outcome_id"></el-table-column>
      <el-table-column show-overflow-tooltip label="爬虫名" prop="spider"></el-table-column>
      <el-table-column show-overflow-tooltip label="修改时间" prop="update_at" width="200"></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.index"
      :layout="layout"
      :page-size="queryForm.count"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/serviceTable";
import TableEdit from "./components/TableEdit";
export default {
  name: "ServiceTable",
  components: {
    TableEdit,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        index: 1,
        count: 20,
        id: "",
        queue: "",
        spider: "",
        project_id: "",
        sensitivity: "",
        service_outcome_id: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    tableSortChange() {
      const imageList = [];
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img);
      });
      this.imageList = imageList;
    },
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleAdd() {
      this.$refs["edit"].showEdit();
    },
    handleEdit(row) {
      this.$refs["edit"].showEdit(row);
    },
    handleDelete(row) {
      if (row.id) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          const { msg } = await doDelete({ ids: row.id });
          this.$baseMessage(msg, "success");
          this.fetchData();
        });
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join();
          this.$baseConfirm("你确定要删除选中项吗", null, async () => {
            const { msg } = await doDelete({ ids: ids });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          this.$baseMessage("未选中任何行", "error");
          return false;
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.count = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.index = val;
      this.fetchData();
    },
    handleQuery() {
      this.queryForm.index = 1;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      const { data, total } = await getList(this.queryForm);
      this.list = data;
      this.total = total;
      setTimeout(() => {
        this.listLoading = false;
      }, 500);
    },
  },
};
</script>
