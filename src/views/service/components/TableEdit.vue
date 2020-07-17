<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="项目名" prop="project_id">
        <el-input v-model.trim="form.project_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="绑定队列" prop="queue">
        <el-input v-model.trim="form.queue" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="敏感度" prop="sensitivity">
        <el-input v-model.trim="form.sensitivity" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="输出类型" prop="service_outcome_id">
        <el-input v-model.trim="form.service_outcome_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="爬虫名" prop="spider">
        <el-input v-model.trim="form.spider" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/table";

export default {
  name: "TableEdit",
  data() {
    return {
      form: {
        title: "",
        author: "",
        project_id: "",
        queue: "",
        sensitivity: "",
        service_outcome_id: "",
        spider: "",
        update_at: "",
      },
      rules: {
        title: [{ required: true, trigger: "blur", message: "请输入标题" }],
        author: [{ required: true, trigger: "blur", message: "请输入作者" }],
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  created() {},
  methods: {
    showEdit(row) {
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    save() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.form.update_at = new Date();
          const { msg } = await doEdit(this.form);
          this.$baseMessage(msg, "success");
          this.$refs["form"].resetFields();
          this.dialogFormVisible = false;
          this.$emit("fetchData");
          this.form = this.$options.data().form;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
