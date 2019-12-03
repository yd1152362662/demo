<!--
 * @Author: yangdan
 * @Date: 2019-10-15 14:15:54
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-16 10:30:51
 * @Description: 添加描述
 -->
<template>
  <div class="title-box">
    <p>{{ title }}</p>
    <el-divider />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.title-box {
  color: #454450;
  font-size: 24px;
  line-height: 28px;
  padding: 0 34px;
  p {
    margin-block-start: 0;
    margin-block-end: 0;
    padding: 15px 0 0 0;
  }
  .el-divider--horizontal {
    margin: 24px  0 10px 0;
  }
}
</style>
