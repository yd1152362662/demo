<!--
 * @Author: yangdan
 * @Date: 2019-11-28 11:08:45
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-28 14:18:23
 * @Description: 添加描述
 -->
<template>
  <Bg>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="手机登录" name="Phone" :key="'Phone'">
        <Phone v-if="Phone"></Phone>
      </el-tab-pane>
      <el-tab-pane label="账号登录" name="Account" :key="'Account'">
        <Account v-if="Account"></Account>
      </el-tab-pane>
    </el-tabs>
  </Bg>
</template>

<script>
import Bg from "../../components/background/index";
import Phone from "./components/phone";
import Account from "./components/account";
export default {
  name: "login-test",
  components: {
    Bg,
    Phone,
    Account
  },
  data() {
    return {
      //默认第一个选项卡
      activeName: "Phone",
      Phone: true,
      Account: false
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.name == "Phone") {
        this.Phone = true;
        this.Account = false;
      } else if (tab.name == "Account") {
        this.Phone = false;
        this.Account = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  >>>.el-tabs__nav {
    height: 30px;
  }
  >>> .el-tabs__nav-wrap::after {
    height: 0;
  }
  >>> .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    .el-tabs__active-bar {
      width: 13% !important;
      margin-left: 6.5%;
    }
  }
  >>> .el-tabs__item {
    font-size: 20px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 28px;
  }
  >>> .is-active {
    color: #248bf2;
  }
  >>>#tab-Phone,
  >>>#tab-Account {
    padding: 0 38px;
  }
}
</style>
