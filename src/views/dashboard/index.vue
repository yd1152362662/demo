<!--
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-23 15:44:55
 * @Description: 添加描述
 -->
<template>
  <div class="dashboard-container">
    <adminDashboard />
  </div>
</template>

<script>
import adminDashboard from './home';

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  computed: {},
  created() {

  },
  mounted() {
  }
};
</script>
