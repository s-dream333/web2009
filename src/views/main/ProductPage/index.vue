<template>
  <el-table :data="productList">
    <el-table-column
      show-overflow-tooltip
      prop="id"
      label="产品ID"
      width="100"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="title"
      label="商品名称"
      width="200"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="image"
      label="商品图片"
      width="100"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="sellPoint"
      label="商品卖点"
      width="300"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="price"
      label="商品价格"
      width="100"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="num"
      label="商品数量"
      width="100"
    ></el-table-column>
    <el-table-column show-overflow-tooltip prop="descs" label="商品描述">
      <template v-slot="scope">
        <div v-html="scope.row.descs"></div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      productList: [],
    };
  },
  methods: {
    http(page) {
      this.$api
        .selectTbItemAllByPage({ page })
        .then((res) => {
          if (res.data.status === 200) {
            this.productList = res.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 编辑按钮
    handleEdit(index, row) {
      this.$bus.$emit("onEditorEvent", row);
    },
    // 删除按钮
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定删除
          this.$api
            .deleteItemById({ id: row.id })
            .then((res) => {
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.http(1);
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.http(1);
    this.$bus.$on("ProductPage", (page) => {
      this.http(page);
    });
    this.$bus.$on("searchData", (data) => {
      this.productList = data;
    });
    this.$bus.$on("ProductPage1", (page) => {
      this.http(page);
    });
  },
};
</script>


<style scoped>
</style>