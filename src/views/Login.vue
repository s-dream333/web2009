<template>
  <div class="login">
    <el-card class="box-card">
      <span>Ego登录注册界面</span>
      <el-tabs v-model="activeName" stretch>
        <!-- 登录 -->
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="loginForm"
            status-icon
            ref="loginForm"
            :rules="rules"
          >
            <el-form-item label="用户名" label-width="80px" prop="username">
              <el-input type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 注册 -->
        <el-tab-pane label="注册" name="register">
          <el-form
            :model="registerForm"
            status-icon
            ref="registerForm"
            :rules="rules"
          >
            <el-form-item label="用户名" label-width="80px" prop="username">
              <el-input type="text" v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              label-width="80px"
              prop="configurePassword"
            >
              <el-input
                type="password"
                v-model="registerForm.configurePassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px" prop="email">
              <el-input type="text" v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('registerForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import api from "../api";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空！"));
      } else {
        callback();
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空！"));
      } else {
        callback();
      }
    };
    var validateConfigurePassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空！"));
      } else {
        callback();
      }
    };
    return {
      activeName: "login",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        configurePassword: "",
        email: "",
      },
      rules: {
        username: [
          {
            validator: validateUserName,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePassWord,
            trigger: "blur",
          },
        ],
        configurePassword: [
          {
            validator: validateConfigurePassword,
            trigger: "blur",
          },
        ],
        email: [
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations("login", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (formName === "loginForm") {
          if (valid) {
            api
              .login(this.loginForm)
              .then((res) => {
                if (res.data.status === 200) {
                  console.log(res.data);
                  this.setUser(res.data);
                  localStorage.setItem("ego", JSON.stringify(res.data));
                  this.$router.push("/");
                } else {
                  const h = this.$createElement;
                  this.$notify({
                    title: "登陆失败",
                    message: h("i", "用户名密码错误"),
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          if (valid) {
            api
              .register(this.registerForm)
              .then((res) => {
                if (res.data.status === 200) {
                  const h = this.$createElement;
                  this.$notify({
                    title: "注册成功",
                    message: h("i", "请前往登陆页面登陆"),
                  });
                } else {
                  const h = this.$createElement;
                  this.$notify({
                    title: "注册失败",
                    message: h("i", "请重新注册"),
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.login {
  width: 1200px;
  margin: 0 auto;
  .box-card {
    width: 600px;
    margin: 100px auto;
    text-align: center;
  }
}
</style>