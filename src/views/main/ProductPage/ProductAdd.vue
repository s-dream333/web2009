<template>
  <el-dialog
    title="添加产品"
    :visible.sync="dialogAddVisible"
    width="70%"
    @before-close="handleClose"
  >
    <el-form label-width="70px" :model="addForm" ref="addForm">
      <el-form-item label="商品类目">
        <el-button type="primary" class="location" @click="dialogCategoryHandle"
          >类目选择</el-button
        >
        <span class="tree">{{ treeData.name }}</span>
        <el-dialog
          width="50%"
          append-to-body
          title="类目选择"
          :visible.sync="dialogCategoryVisible"
        >
          <ProductTree @onTree="getTreeData" />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogCategoryVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="addForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="addForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-button type="primary" class="location" @click="dialogUploadHandle"
          >图片上传</el-button
        >
        <img class="upload-img" :src="uploadData.url" alt="" />
        <el-dialog
          width="50%"
          append-to-body
          title="图片上传"
          :visible.sync="dialogUploadVisible"
        >
          <ProductImg @onUpload="getOnUpload" />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogUploadVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <ProductWangEdiutor @onEditor="getEditor" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible = false">取 消</el-button>
      <el-button type="primary" @click="addProductHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ProductWangEdiutor from "./ProductWangEdiutor";
import ProductTree from "./ProductTree";
import ProductImg from "./ProductImg";
export default {
  components: {
    ProductWangEdiutor,
    ProductTree,
    ProductImg,
  },
  data() {
    return {
      dialogCategoryVisible: false,
      dialogAddVisible: false,
      dialogUploadVisible: false,
      addForm: {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      },
      treeData: {}, //类目选择
      uploadData: {}, //照片路径
      editorData: "", //富文本
    };
  },
  mounted() {
    this.$bus.$on("onAddEvent", (flag) => {
      this.dialogAddVisible = flag;
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 富文本
    getEditor(data) {
      this.editorData = data;
    },
    // 获取类目
    getTreeData(data) {
      this.treeData = data;
    },
    // 类目选择
    dialogCategoryHandle() {
      this.dialogCategoryVisible = true;
    },
    // 照片选择
    dialogUploadHandle() {
      this.dialogUploadVisible = true;
    },
    // 获取照片
    getOnUpload(data) {
      console.log(data);
      if (data.url) {
        data.url = data.url.replace("upload", "http://localhost:3000");
      }
      this.uploadData = data;
      console.log(this.uploadData);
    },
    /**
     * 添加产品
     */
    addProductHandle() {
      this.$api
        .insertTbItem({
          cid: this.treeData.cid,
          title: this.addForm.name,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.editorData,
          image: this.uploadData.url,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.dialogAddVisible = false;
            this.$bus.$emit("refresh", true);
            this.$bus.$emit("ProductPage1", 1);
            this.addForm = {
              name: "",
              sellPoint: "",
              price: "",
              num: "",
            };
            this.treeData = {}; //类目选择
            this.uploadData = {}; //照片路径
            this.editorData = ""; //富文本
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.location {
  float: left;
}
.tree {
  float: left;
  margin-left: 10px;
}
.upload-img {
  float: left;
  width: 300px;
  margin-left: 10px;
}
</style>