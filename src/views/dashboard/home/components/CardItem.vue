<!--
 * @Author: yangdan
 * @Date: 2019-10-15 14:15:54
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-26 13:50:00
 * @Description: 添加描述
 -->
<template>
  <div
    class="card-item-box"
    :style="{background:backgroundColor,boxShadow:boxShadow,color:textColor,border:borderColor}"
  >
    <div class="card-item">
      <div class="card-item-div">
        <p :class="Expand?'card-item-title-Expand':'card-item-title'">{{ titleLeft }}</p>
        <p v-if="Expand" style="padding:10px 0 0 0">{{ ExpandTitieFun(ExpandTitieState) }}</p>
        <p :class="Expand?'card-item-num-Expand':'card-item-num'">98432</p>
      </div>
      <div class="card-item-div">
        <p :class="Expand?'card-item-title-Expand':'card-item-title'">{{ titleRight }}</p>
        <p v-if="Expand" style="padding:10px 0 0 0">{{ ExpandTitieFun(!ExpandTitieState) }}</p>
        <p :class="Expand?'card-item-num-Expand':'card-item-num'">98432</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleLeft: {
      type: String
    },
    titleRight: {
      type: String
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    boxShadow: {
      type: String,
      default: '0px 2px 20px 0px rgba(36,139,242,0.13)'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    borderColor: {
      type: String,
      default: ' 1px solid transparent'
    },
    Expand: {
      type: Boolean,
      default: false
    },
    ExpandTitieState: {
      type: String
    }
  },
  data() {
    return {
      ExpandTitie: ''
    };
  },
  created() {},
  methods: {
    ExpandTitieFun(ExpandTitieState) {
      if (parseInt(ExpandTitieState) === 1) {
        return '已安装设备';
      } else {
        return '未安装设备';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-item-box {
  border-radius: 10px;
  height: 218px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .card-item {
    width: 99%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #fff;
    height: 210px;
    .card-item-div {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .card-item-title {
        font-size: 20px;
        font-weight: 400;
        line-height: 34px;
      }
      .card-item-title-Expand {
        font-size: 20px;
        font-weight: 400;
        line-height: 15px;
      }
      .card-item-num {
        font-size: 48px;
        font-weight: 400;
        line-height: 126px;
      }
      .card-item-num-Expand {
        font-size: 48px;
        font-weight: 400;
        line-height: 90px;
        padding-bottom: 10px;
      }
    }
  }
}
</style>

// 屏幕适配
<style  scoped>
@media (min-width: 320px) and (max-width: 375px) {
  .card-item-box .card-item .card-item-div .card-item-num {
    font-size: 35px;
  }
   .card-item-box .card-item .card-item-div .card-item-num-Expand {
    font-size: 35px;
  }
}
</style>
