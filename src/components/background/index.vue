<!--
 * @Author: yangdan
 * @Date: 2019-11-27 14:11:44
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-28 11:26:17
 * @Description: 添加描述
 -->
<template>
  <div class="container">
    <div class="main">
      <div class="header"></div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <p class="footer">贵州梵途科技有限公司</p>
  </div>
</template>

<style lang="scss" >
.container {
  height: 100vh;
  background-image: url("../../assets/login/login-bg.png");
  background-size: 100vw 115vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  .main {
    width: 500px;
    height: 400px;
    margin-top:11vh;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 2px 15px 40px rgba(36, 139, 242, 0.29);
    position: relative;
    z-index: 100;
    .header {
      width: 74.4%;
      height: 100px;
      position: absolute;
      top: -40px;
      left: 12.8%;
      background-image: url("../../assets/login/title.png");
      background-size: 100% 100%;
    }
    .content {
      width: 100%;
      position: absolute;
      top:73px;
    }
  }
  .footer {
    position: absolute;
    bottom: 13px;
    font-size: 20px;
    color: #666;
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>
