<!--
 * @Author: yangdan
 * @Date: 2019-11-27 14:04:23
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-28 16:46:36
 * @Description: 添加描述
 -->
<template>
  <Bg>
    <p class="title">未绑定手机，请绑定手机号</p>
    <el-form
      :model="bindPhoneForm"
      :rules="rules"
      ref="bindPhoneForm"
      label-width="100px"
      class="bind-phone"
    >
      <el-form-item prop="phone">
        <el-input v-model="bindPhoneForm.phone" name="phone" placeholder="请输入手机号" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item prop="verificationCode">
        <el-input
          v-model="bindPhoneForm.verificationCode"
          name="verificationCode"
          placeholder="请输入验证码"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <el-button
          class="verificationCode"
          type="primary"
          :disabled="CodeDisabled"
          @click="HandleVerificationCode"
        >{{ VerificationCodeText }}</el-button>
      </el-form-item>
      <el-form-item class="bind-button">
        <el-button type="primary" @click.native.prevent="handleLogin">立即绑定</el-button>
      </el-form-item>
    </el-form>
  </Bg>
</template>

<script>
import Bg from "../../components/background/index";
export default {
  name: "bind-mobile-number",
  components: {
    Bg
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error("手机号的长度为11位"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };

    const validateVerificationCode = (rule, value, callback) => {
      const valueTemp = parseInt(value);
      if (isNaN(valueTemp)) {
        callback(new Error("验证码为纯数字"));
      } else if (value.length != 6) {
        callback(new Error("验证码个数为6位"));
      } else {
        callback();
      }
    };

    return {
      bindPhoneForm: {
        phone: "",
        verificationCode: ""
      },
      rules: {
        verificationCode: [
          {
            required: true,
            trigger: "change",
            validator: validateVerificationCode
          }
        ],
        phone: [{ required: true, trigger: "change", validator: validatePhone }]
      },
      VerificationCodeText: "获取验证码",
      CodeDisabled: false,
      time: 4
    };
  },
  methods: {
    // 点击获取验证码
    HandleVerificationCode() {
      console.log("点击获取验证码");
      // this.$store
      //   .dispatch("user/getVerificationCode", this.loginForm.phone)
      //   .then(res => {
      //     console.log("reslogin", res);
      //     // this.$router.push({
      //     //   path: this.redirect || "/"
      //     // });
      //   })
      //   .catch(() => {});
      var CodeDisabledTimer = setInterval(() => {
        this.CodeDisabled = true;
        this.time = this.time - 1;
        this.VerificationCodeText = `${this.time}s`;
        if (this.time < 0) {
          clearInterval(CodeDisabledTimer);
          this.VerificationCodeText = "获取验证码";
          this.CodeDisabled = false;
          this.time = 4;
        }
      }, 1000);
    },
    // 点击绑定手机号
    handleLogin() {
      this.$refs.bindPhoneForm.validate(valid => {
        if (valid) {
          this.$router.push({
            path: "/login"
          });
        } else {
          this.$message.error("请正确填写手机号和验证码");
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
  .verificationCode {
    position: absolute;
    right: 14.5%;
    top: 5%;
    font-size: 14px;
    width: 24%;
    height: 40px;
    cursor: pointer;
    padding: 0;
  }
  .is-disabled {
    background-color: #ccc;
    color: #fff;
    border-color: #ccc;
  }
}
</style>
