<!--
 * @Author: yangdan
 * @Date: 2019-11-01 09:42:46
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-01 17:13:09
 * @Description: 添加描述
 -->
<template>
  <div class="Steps-div">
    <div class="Steps-content">
      <el-steps :active="4">
        <el-step>
          <template slot="icon">
            <svg-icon icon-class="invoice-steps" class="Steps-icon" />
          </template>
          <template slot="title">
            <p class="Steps-title">发布订单</p>
          </template>
          <template slot="description">
            <p style="color:#999">
              <span>发布人：</span>
              <span>翠花wf</span>
            </p>
            <p style="color:#999">
              <span>发布时间：</span>
              <span>2019-10-31 09：23</span>
            </p>
          </template>
        </el-step>
        <el-step icon="el-icon-upload">
          <template slot="icon">
            <svg-icon icon-class="receipt-steps" class="Steps-icon" />
          </template>
          <template slot="title">
            <p class="Steps-title">接收订单</p>
          </template>
          <template slot="description">
            <p style="color:#999">
              <span>承运司机：</span>
              <span>翠花wf</span>
            </p>
            <p style="color:#999">
              <span>车牌号码：</span>
              <span>贵D98756</span>
            </p>
            <p style="color:#999">
              <span>接单时间：</span>
              <span>2019-10-31 09：41</span>
            </p>
          </template>
        </el-step>
        <el-step icon="el-icon-picture">
          <template slot="icon">
            <svg-icon icon-class="vehicle-entry-steps" class="Steps-icon" />
          </template>
          <template slot="title">
            <p class="Steps-title">车辆进厂</p>
          </template>
          <template slot="description">
            <p style="color:#999">
              <span>发布人：</span>
              <span>翠花wf</span>
            </p>
            <p style="color:#999">
              <span>车牌号码：</span>
              <span>贵D98756</span>
            </p>
            <p style="color:#999">
              <span>进厂时间：</span>
              <span>2019-10-31 09：41</span>
            </p>
          </template>
        </el-step>
        <el-step icon="el-icon-upload">
          <template slot="icon">
            <svg-icon icon-class="vehicle-leaving-steps" class="Steps-icon" />
          </template>
          <template slot="title">
            <p class="Steps-title">车辆出厂</p>
          </template>
          <template slot="description">
            <p style="color:#999">
              <span>接单司机：</span>
              <span>翠花wf</span>
            </p>
            <p style="color:#999">
              <span>车牌号码：</span>
              <span>贵D98756</span>
            </p>
            <p style="color:#999">
              <span>出厂时间：</span>
              <span>2019-10-31 09：41</span>
            </p>
          </template>
        </el-step>
        <el-step icon="el-icon-upload">
          <template slot="icon">
            <svg-icon icon-class="waiting-receipt-steps" class="Steps-icon" />
          </template>
          <template slot="title">
            <p class="Steps-title">等待签收</p>
          </template>
          <template slot="description">
            <p style="color:#999">
              <span>操作人：</span>
              <span>翠花wf</span>
            </p>
            <p style="color:#999">
              <span>接单司机：</span>
              <span>翠花wf</span>
            </p>
            <p style="color:#999">
              <span>车牌号码：</span>
              <span>贵D98756</span>
            </p>
            <p style="color:#999">
              <span>操作时间：</span>
              <span>2019-10-31 09：41</span>
            </p>
          </template>
        </el-step>
        <el-step>
          <template slot="icon">
            <svg-icon icon-class="finish-signing-steps" class="Steps-icon" />
          </template>
          <template slot="title">
            <p class="Steps-title">完成签收</p>
          </template>
          <template slot="description">
            <p style="color:#999">
              <span>操作人：</span>
              <span>翠花wf</span>
            </p>
            <p style="color:#999">
              <span>签收时间：</span>
              <span>2019-10-31 09：23</span>
            </p>
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.Steps-div {
  margin: 30px 24px;
  background-color: #fafafa;
  height: 290px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .Steps-content {
    width: 1350px;
    .Steps-icon {
      width: 46px;
      height: 46px;
    }
    .Steps-title {
      color: #333;
      font-weight: normal;
      padding-top: 10px;
    }

    >>> .el-step__line {
      width: 65%;
      margin-left: 30%;
      background-color: transparent;
      border: 1px dashed;
      top: 25px;
    }

    >>> .el-step__line:after {
      content: "";
      display: block;
      position: absolute;
      right: -12px;
      top: -11px;
      width: 0;
      height: 0;
      border: 10px solid;
      border-color: transparent transparent transparent #ccc;
    }

    >>> .el-step__icon {
      width: 46px;
      height: 46px;
      background-color: #fafafa;
    }
    >>> .el-step {
      position: relative;
    }

    >>> .el-step__line-inner {
      border-style: none;
    }
    >>> .el-step__head.is-process {
      color: #ccc;
      .el-step__icon {
        color: #fff;
        background-color: #80d748;
      }
    }
    >>> .is-process:after {
      width: 80px;
      height: 80px;
      content: "";
      display: block;
      position: absolute;
      left: -18px;
      top: -18px;
      background-color: #80d748;
      border-radius: 50%;
    }
    >>> .el-step__head.is-finish {
      color: #80d748;
      border-color: #80d748;
      .el-step__line {
        width: 60%;
        margin-left: 28%;
      }

      .el-step__line:after {
        content: "";
        display: block;
        position: absolute;
        right: -12px;
        top: -11px;
        width: 0;
        height: 0;
        border: 10px solid;
        border-color: transparent transparent transparent #80d748;
      }
    }
    >>> .el-step__icon.is-text {
      border: 0;
      border-radius: 0;
    }
  }
}
</style>
