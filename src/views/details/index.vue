<!--
 * @Author: yangdan
 * @Date: 2019-11-01 09:42:46
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-12 11:33:06
 * @Description: 添加描述
 -->
<template>
  <div class="basic-box">
    <div class="content-box">
      <!-- 返回和刷新 -->
      <div :class="isCollapse==true ? 'operation-btn-collapse' : 'operation-btn'">
        <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
        <el-button @click="reloadFun()">刷新</el-button>
      </div>
      <!-- map 和 echarts -->
      <MapEcharts />
      <!-- 步骤条 -->
      <Steps />
      <!-- 订单信息 -->
      <OrderMessage />
      <!-- 事件记录 -->
      <EventLog />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import MapEcharts from './components/map-echarts';
import Steps from './components/steps';
import OrderMessage from './components/order-message';
import EventLog from './components/event-log';

export default {
  name: '',
  inject: ['reload'],
  components: {
    MapEcharts,
    Steps,
    OrderMessage,
    EventLog
  },
  data() {
    return {
      top: '',
      left: ''
    };
  },
  mounted() {},
  methods: {
    reloadFun() {
      this.reload();
      // const { fullPath } = this.$route;
      // this.$router.replace({
      //   path: "/redirect" + fullPath
      // });
    },
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

<style lang="scss" scoped>
.content-box {
  background-color: #fff;
  border-radius: 10px;
  padding-bottom: 87px;
}
.operation-btn {
  position: fixed;
  top: 100px;
  left: 285px;
  z-index: 100;
}
.operation-btn-collapse {
  position: fixed;
  top: 100px;
  left: 95px;
  z-index: 100;
}
</style>
