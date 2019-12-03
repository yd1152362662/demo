<!--
 * @Author: yangdan
 * @Date: 2019-11-01 17:14:06
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-01 17:51:33
 * @Description: 添加描述
 -->
<template>
  <div>
    <p class="title">订单信息</p>
    <div class="order-message-content">
      <el-row type="flex">
        <el-col :span="7">
          <p class="order-message-content-text">
            <span>订单号：</span>
            <span>938493860484927437</span>
          </p>
          <p class="order-message-content-text">
            <span>订单状态：</span>
            <span>运输中</span>
          </p>
          <p class="order-message-content-text">
            <span>装货时间：</span>
            <span>2019-10-30 16：00</span>
          </p>
          <p class="order-message-content-text">
            <span>装货地址：</span>
            <span>贵州省铜仁市思南县贵州沿河西南水泥有限公司</span>
          </p>
        </el-col>

        <el-col :span="7">
          <p class="order-message-content-text">
            <span>收货人：</span>
            <span>赵小二</span>
          </p>
          <p class="order-message-content-text">
            <span>联系方式：</span>
            <span>13090909900</span>
          </p>
          <p class="order-message-content-text">
            <span>收货时间：</span>
            <span>2019-10-30 16：00</span>
          </p>
          <p class="order-message-content-text">
            <span>收货地址：</span>
            <span>贵州省铜仁市思南县贵州沿河西南水泥有限公司</span>
          </p>
        </el-col>

        <el-col :span="5">
          <p class="order-message-content-text">
            <span>货物名称：</span>
            <span>石将军牌水泥</span>
          </p>
          <p class="order-message-content-text">
            <span>货物类型：</span>
            <span>PC32.5袋装</span>
          </p>
          <p class="order-message-content-text">
            <span>货物重量：</span>
            <span>20吨</span>
          </p>
          <p class="order-message-content-text">
            <span>装卸需求：</span>
            <span>一装一卸</span>
          </p>
        </el-col>

        <el-col :span="5">
          <p class="order-message-content-text">
            <span>承运司机：</span>
            <span>张大宝</span>
          </p>
          <p class="order-message-content-text">
            <span>联系方式：</span>
            <span>13323233232</span>
          </p>
          <p class="order-message-content-text">
            <span>车牌号码：</span>
            <span>贵A12121</span>
          </p>
          <p class="order-message-content-text">
            <span>订单模式：</span>
            <span>一单一运</span>
          </p>
        </el-col>
      </el-row>
      <el-divider />
      <el-row type="flex">
        <el-col :span="7">
          <p class="order-message-content-text">
            <span>结算方式：</span>
            <span>自主结算</span>
          </p>
        </el-col>
        <el-col :span="7">
          <p class="order-message-content-text">
            <span>运费：</span>
            <span>0 元</span>
          </p>
        </el-col>
        <el-col :span="7">
          <p class="order-message-content-text">
            <span>回单：</span>
            <span>需要</span>
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 37px;
  padding: 0 0 20px 24px;
}
.order-message-content {
  padding: 0 0 20px 24px;
}
.order-message-content-text {
  span:nth-of-type(1) {
    font-size: 16px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 22px;
  }
  span:nth-of-type(2) {
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 22px;
  }
}
</style>
