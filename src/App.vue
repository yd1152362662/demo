<!--
 * @Author: yangdan
 * @Date: 2019-11-30 14:14:02
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-30 15:24:26
 * @Description: 添加描述
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted: () => {
    let arr = [1, 2, 1];
    console.log(arr.findIndex(item => item === 1));
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
