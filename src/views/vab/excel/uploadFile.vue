<template>
  <div class="upload-file-container">
    <uploadFile-component
      :on-success="handleSuccess"
      :on-txt-success="handleTxtSuccess"
      :before-upload="beforeUpload"
    />
    <el-table :data="tableData" v-if="showTable">
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        show-overflow-tooltip
        :prop="item"
        :label="item"
      />
    </el-table>
    <el-alert v-text="data" v-if="!showTable"></el-alert>
  </div>
</template>

<script>
import UploadFileComponent from "@/components/UploadFile/index.vue";

export default {
  name: "UploadFile",
  components: { UploadFileComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      data: '',
      showTable: true,
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.showTable = true;
      this.data = '';
      this.tableData = results;
      this.tableHeader = header;
    },
    handleTxtSuccess (data) {
      this.showTable = false;
      this.data = data;
      this.tableData = [];
      this.tableHeader = [];
    },
  },
};
</script>
