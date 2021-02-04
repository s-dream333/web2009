<template>
  <div class="pagination-container">
    <el-pagination
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :total="total"
      :current-page.sync="currentPage"
      @size-change="handleSizechange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.$api
      .total()
      .then((res) => {
        if (res.data.status === 200) {
          this.total = res.data.result[0]["count(*)"];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleSizechange() {},
    handleCurrentChange(val) {
      this.$bus.$emit("ProductPage", val);
    },
  },
};
</script>

<style scoped>
.pagination-container {
  margin-top: 40px;
}
</style>