<!--
 * @Author: yangdan
 * @Date: 2019-11-28 11:37:07
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-28 17:39:22
 * @Description: 添加描述
 -->
<template>
  <el-form
    :model="accountForm"
    :rules="rules"
    ref="accountForm"
    label-width="100px"
    class="bind-phone"
  >
    <el-form-item prop="username">
      <el-input
        v-model="accountForm.username"
        name="username"
        placeholder="请输入账号"
        autocomplete="on"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="accountForm.password"
        name="password"
        :type="passwordType"
        placeholder="请输入密码"
        ref="password"
        autocomplete="on"
        @keyup.enter.native="handleLogin"
      ></el-input>
      <span class="show-pwd" @click="showPwd">
        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
      </span>
    </el-form-item>
    <el-form-item class="bind-button">
      <el-button type="primary" @click.native.prevent="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Account",
  mounted() {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length != 6) {
        callback(new Error("密码为6位数"));
      } else {
        callback();
      }
    };
    return {
      accountForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "change",
            validator: validateUsername
          }
        ],
        password: [
          { required: true, trigger: "change", validator: validatePassword }
        ]
      },
      passwordType: "password"
    };
  },
  methods: {
    // 点击是否显示密码
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 点击登录
    handleLogin() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          sessionStorage.setItem("mark", "2");
          if (this.accountForm.username === "test") {
            this.$message({
              dangerouslyUseHTMLString: true,
              customClass: "waring-bind-phone",
              duration:0,
              message: `<div>
                          <p style="color:#000;font-size:16px;margin-bottom:10px">请绑定手机号</p>
                          <p style="font-size:14px;color:rgba(0,0,0,0.65);line-height:15px;">系统检测到您未绑定手机号，即将前往绑定手机号页面。</p>
                       </div>`,
              type: "warning"
            });
            // setTimeout(() => {
            //   this.$router.push({
            //     path: "/bind-phone"
            //   });
            // }, 2 * 1000);
          } else {
            this.$router.push({
              path: this.redirect || "/"
            });
          }
        } else {
          this.$message.error("请正确填写账号和密码");
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  line-height: 28px;
  font-size: 20px;
  color: #999;
  margin-block-start: 0;
  margin-block-end: 0;
}
.bind-phone {
  padding-top: 25px;
  >>> .el-form-item__content {
    margin-left: 0 !important;
    padding: 0 14.5%;
    .el-input__inner {
      border: 0 !important;
      border-radius: 0;
      border-bottom: 1px solid #ccc !important;
      padding: 15px 0 0 0 !important;
    }
    .el-input__inner::placeholder {
      color: #ccc;
    }
    .el-form-item__error {
      padding: 0 14.5%;
      padding-top: 1px;
      height: 17px;
      font-size: 12px;
      color: #e00c00;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #333;
      height: 47px;
      caret-color: rgba(36, 139, 242, 0.575);
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }
  .bind-button {
    display: flex;
    justify-content: center;
    padding-top: 45px;
    button {
      width: 260px;
      height: 50px;
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      box-shadow: 0 10px 10px 0 #248bf25c;
    }
  }
  .show-pwd {
    position: absolute;
    right: 15%;
    top: 15px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}

</style>
