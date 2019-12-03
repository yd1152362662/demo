<!--
 * @Author: yangdan
 * @Date: 2019-10-25 14:26:08
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-11 11:52:23
 * @Description: 添加描述
 -->

<template>
  <div class="create-order">
    <el-row>
      <el-col :span="24">
        <div class="title">
          <span>{{ title }}</span>
          <span>{{ initState(titleState) }}</span>
        </div>
        <slot />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    titleState: {
      type: Number
    },
    divder: {
      type: Boolean
    },
    footer: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {
    initState(titleState) {
      if (parseInt(titleState) === 1) {
        return '(选填)';
      }

      return '(必填)';
    }
  }
};
</script>

<style lang="scss" scoped>
.create-order {
   padding: 10px 0 0 60px;
  .el-divider--horizontal {
    margin: 0;
  }
  .el-divider {
    background-color: #efefef;
  }
  .title {
    color: #333;
    display: flex;
    align-items: center;

    span:nth-of-type(1) {
      font-size: 26px;
      font-weight: 500;
      line-height: 37px;
    }
    span:nth-of-type(2) {
      font-size: 14px;
      line-height: 20px;
      margin-left: 10px;
      color: #666;
    }
  }
  .footer {
    height: 6px;
    background:rgba(234,239,243,0.52);
  }
}

</style>
