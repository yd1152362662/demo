<!--
 * @Author: yangdan
 * @Date: 2019-11-01 09:42:46
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-01 11:56:18
 * @Description: 添加描述
 -->
<template>
  <div>
    <p class="title">事件记录</p>
    <div class="event-log">
      <div class="event-div event-left" @click="eventLeft">
        <img src="../../../assets/details/Arrow.png" alt="左箭头">
      </div>
      <div class="event-div event-right" @click="eventRight">
        <img src="../../../assets/details/Arrow.png" alt="右箭头">
      </div>
      <!-- 内容 -->
      <div class="event-content" :style="{'left':left+'px'}">
        <div v-for="item in items" :key="item" class="event-item">
          <div class="event-item-content">
            <p class="event-item-content-title">停车事件{{ item }}</p>
            <p class="event-item-content-title-p">
              <span>开始时间：</span>
              <span>2019-10-31 14：06</span>
            </p>
            <p class="event-item-content-title-p">
              <span>停车时长：</span>
              <span>30分钟</span>
            </p>
            <p class="event-item-content-title-p">
              <span>所在位置：</span>
              <span>贵州省铜仁市沿河县滨江大道99号 贵州省铜仁市沿河县滨江大道99号</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      left: 20
    };
  },
  methods: {
    eventLeft() {
      if (this.left < -20) {
        this.left = this.left + 370;
      }
    },
    eventRight() {
      if (this.left > -(this.items.length - 4) * 350) {
        this.left = this.left - 370;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// 事件记录
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 37px;
  padding:0 0 20px 24px;
}
.event-log {
  height: 190px;
  position: relative;
  overflow: hidden;

  .event-div {
    width: 20px;
    height: 190px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    cursor: pointer;
    z-index: 999;
  }
  .event-left {
    position: absolute;
    left: 0;
    top: 0;
    img {
      transform: rotate(180deg);
    }
  }
  .event-right {
    position: absolute;
    right: 0;
    top: 0;
  }

  .event-content {
    position: absolute;
    display: flex;
    height: 190px;
    transition: all 1s;
    .event-item {
      width: 350px;
      height: 190px;
      background-color: #fafafa;
      margin: 0 20px 0 0;
      border-radius: 10px;
      border: 1px solid rgba(238, 238, 238, 1);
      .event-item-content {
        margin: 20px 0 0 24px;
        .event-item-content-title {
          font-size: 20px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
        }
        .event-item-content-title-p {
          padding-top: 10px;
          span {
            line-height: 20px;
          }
          span:nth-of-type(1) {
            font-size: 14px;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
          }
          span:nth-of-type(2) {
            font-weight: 400;
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }
    .event-item:nth-of-type(1) {
      margin: 0 20px 0 4px;
    }
  }
}
</style>
