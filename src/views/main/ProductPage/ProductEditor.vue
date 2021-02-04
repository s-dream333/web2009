<template>
  <el-dialog
    title="添加产品"
    :visible.sync="dialogEditorVisible"
    width="70%"
    @before-close="handleClose"
  >
    <el-form label-width="70px" :model="editorForm" ref="editorForm">
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
        <el-input v-model="editorForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="editorForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="editorForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="editorForm.num"></el-input>
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
      <el-button @click="dialogEditorVisible = false">取 消</el-button>
      <el-button type="primary" @click="editorProductHandle">确 定</el-button>
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
      dialogEditorVisible: false,
      dialogUploadVisible: false,
      editorForm: {
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
    this.$bus.$on("onEditorEvent", (row) => {
      this.dialogEditorVisible = true;
      // 获取预更新数据
      this.currentData = row;
      this.$api.preUpdateItem({ id: row.id }).then((res) => {
        console.log(res.data.result[0].descs);
        /* 赋值 */
        this.treeData.name = res.data.result[0].cid;
        this.editorForm.name = res.data.result[0].title;
        this.editorForm.sellPoint = res.data.result[0].sellPoint;
        this.editorForm.price = res.data.result[0].price;
        this.editorForm.num = res.data.result[0].num;
        this.uploadData.url = res.data.result[0].image;
        this.editorData = res.data.result[0].descs;
      });
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
     * 修改产品
     */
    editorProductHandle() {
      this.$api
        .updateTbItem({
          id: this.currentData.id,
          cid: this.treeData.cid,
          title: this.editorForm.name,
          sellPoint: this.editorForm.sellPoint,
          price: this.editorForm.price,
          num: this.editorForm.num,
          desc: this.editorData,
          image: this.uploadData.url,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.dialogEditorVisible = false;
            this.$bus.$emit("refresh", true);
            this.$bus.$emit("ProductPage1", 1);
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