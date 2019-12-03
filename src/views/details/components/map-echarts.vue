<!--
 * @Author: yangdan
 * @Date: 2019-11-02 09:19:48
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-11 14:26:07
 * @Description: 添加描述
 -->
<template>
  <div class="el-vue-amap-echarts">
    <!-- map -->
    <div>
      <el-amap
        vid="amapDemo"
        :amap-manager="amapManager"
        :center="center"
        :zoom="zoom"
        :events="mapEvents"
        class="amap-echarts"
      >
        <!-- 标记点 -->

        <!-- 车的点 -->
        <el-amap-marker z-index="100" :position="markerPosition" :content="carContent()" />
        <!-- 起点 -->
        <el-amap-marker
          :position="polyline.path[0]"
          z-index="100"
          :content="getMarkerContentStart('发','贵州科特林水泥有限公司')"
        />
        <el-amap-marker
          :position="polyline.path[0]"
          z-index="99"
          :content="`<div class='startPoint'></div>`"
        />
        <!-- 终点 -->
        <el-amap-marker
          :position="EndMarkPosition(polyline.path)"
          :content="getMarkerContentStart('收','贵州科特林水泥有限公司')"
        />
        <el-amap-marker
          :position="EndMarkPosition(polyline.path)"
          z-index="100"
          :content="
            `<div class='endPoint'><span class='nav'></span></div>`"
        />
        <!-- 事件的markes -->

        <!-- 线路 -->
        <el-amap-polyline
          :editable="polyline.editable"
          :path="polyline.path"
          :events="polyline.events"
          is-outline="true"
          outline-color="#248BF2"
          stroke-color="#248BF2"
        />
      </el-amap>
    </div>
    <!-- echarts -->
    <div style="position:relative">
      <div class="echarts-title">
        车辆重量和速度
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>
      <!-- markerPoint的部分 -->
      <div style="display:flex">
        <div>
          <span class="tags" style="color:transparent;background-color: transparent;" />
          <span class="tags" style="color:transparent;background-color: transparent;" />
        </div>
        <transition name="list" mode="out-in">
          <div v-show="echartsEvent">
            <span class="tags">贵州省铜仁大叔大婶市小小乡</span>
            <span class="tags">空车装货 装货13吨 ,货物重量13吨</span>
          </div>
        </transition>
      </div>

      <div id="myChart" :style="{width: '100%', height: '300px', paddingTop:'5px'}" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';
import { AMapManager } from 'vue-amap';
const amapManager = new AMapManager();

export default {
  name: '',
  // echarts配置
  mixins: [resize],

  data() {
    const self = this;
    return {
      // map data
      amapManager,
      center: [116.478998, 39.998555],
      zoom: 17,
      mapEvents: {
        init(o) {
          o.setMapStyle('amap://styles/1f7efa97a80abba5167638db8d03c397');
        }
      },

      markerPosition: [],
      polyline: {
        path: [
          [116.478935, 39.997761],
          [116.478939, 39.997825],
          [116.478912, 39.998549],
          [116.478912, 39.998549],
          [116.478998, 39.998555],
          [116.478998, 39.998555],
          [116.479282, 39.99856],
          [116.479658, 39.998528],
          [116.480151, 39.998453],
          [116.480784, 39.998302],
          [116.480784, 39.998302],
          [116.481149, 39.998184],
          [116.481573, 39.997997],
          [116.481863, 39.997846],
          [116.482072, 39.997718],
          [116.482362, 39.997718],
          [116.483633, 39.998935],
          [116.48367, 39.998968],
          [116.484648, 39.999861]
        ],
        events: {
          click(e) {
            console.log('e', e);
          },
          end: e => {
            const newPath = e.target
              .getPath()
              .map(point => [point.lng, point.lat]);
            // console.log(newPath);
          }
        },
        editable: false
      },
      echartsEvent: false,
      // echarts data
      orderNumber: [
        100,
        52,
        169,
        134,
        105,
        160,
        55,
        52,
        169,
        134,
        105,
        52,
        169,
        134,
        105,
        52,
        169,
        134,
        105
      ],
      weight: [
        134,
        75,
        160,
        165,
        40,
        120,
        161,
        134,
        75,
        160,
        165,
        40,
        120,
        161,
        134,
        75,
        160,
        165,
        40
      ],
      markPointData: [
        { xAxis: 1, yAxis: 75 },
        { xAxis: 5, yAxis: 120 },
        { xAxis: 10, yAxis: 165 },
        { xAxis: 15, yAxis: 75 }
      ]
    };
  },
  // echarts
  mounted() {
    this.drawLine();
    this.markerPosition = this.polyline.path[0];
    console.log('刷新了');
    const map = this.amapManager.getMap();
  },
  methods: {
    // map

    EndMarkPosition(path) {
      return path[path.length - 1];
    },
    getMarkerContentStart(state, name) {
      return `<div class="map-start" style="display:flex;width:400px">
         <p class="map-state">${state}</p>
         <p class="map-companies">${name}</p>
      </div>`;
    },
    carContent() {
      const carIMG = require('../../../assets/amap/car.png');
      return `<div style="left:-36px;position:relative">
                  <img src=${carIMG} style="width:90px;height:80px"/>
                  <div style="margin-top:-35px;text-align:center;color:#fff">贵A1234</div>
               </div>`;
    },
    // echarts
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.on('mouseover', params => {
        if (params.componentType === 'markPoint') {
          this.echartsEvent = true;
        }
      });

      myChart.on('mouseout', params => {
        if (params.componentType === 'markPoint') {
          this.echartsEvent = false;
        }
      });

      myChart.setOption({
        xAxis: {
          data: [
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:30',
            '19:00',
            '19:30'
          ],
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        legend: {
          itemHeight: 10,
          itemWidth: 10,
          textStyle: {
            // 图例文字的样式
            color: '#333',
            fontSize: 14
          },
          data: [
            {
              name: '订单',
              icon: 'circle'
            },
            {
              name: '吨位',
              icon: 'circle'
            }
          ]
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          padding: [5, 10],
          formatter: params => {
            const index = params[0].dataIndex;
            const path = [
              this.polyline.path[index].lng,
              this.polyline.path[index].lat
            ];
            this.markerPosition = path;

            return `<div>
              <p>${params[0].axisValueLabel}<p>
              <p style="display:flex;align-items:center">
              <span style="display:block;width:6px;height:6px;background-color:#1890FF;border-radius:50%;margin:0 8px 0 0 ;"></span>
              <span>重量：${params[0].data}</span>
              </P>
               <p style="display:flex;align-items:center ">
               <span style="display:block;width:6px;height:6px;background-color:#2FC25B;border-radius:50%;margin:0 8px 0 0 ;"></span>
              <span>速度：${params[1].data}</span>
              </P>
            </div>`;
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '单',
            nameLocation: 'end',
            show: true,
            splitLine: {
              show: false
            },
            nameTextStyle: {
              padding: [0, 30, 0, 0]
            }
          },
          {
            type: 'value',
            name: '吨',
            nameLocation: 'end',
            show: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#efefef'],
                width: 1,
                type: 'dashed'
              }
            },
            nameTextStyle: {
              padding: [0, 0, 0, 30]
            }
          }
        ],
        series: [
          {
            name: '速度',
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            barGap: '0', // 柱图间距
            itemStyle: {
              normal: {
                color: '#80D748',
                lineStyle: {
                  color: '#80D748',
                  width: 1
                }
              }
            },

            type: 'line',
            yAxisIndex: 0,
            data: this.orderNumber,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '重量',
            type: 'line',
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            itemStyle: {
              normal: {
                color: '#1890FF',
                lineStyle: {
                  color: '#1890FF',
                  width: 1
                }
              }
            },
            markPoint: {
              symbolSize: 30, // 控制气泡大小
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    color: '#000000' // 气泡中字体颜色
                  }
                }
              },
              data: this.markPointData
            },
            data: this.weight,
            yAxisIndex: 1,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.el-vue-amap-echarts .amap-echarts {
  height: 441px;
  border-radius: 10px;

  #amapDemo {
    border-radius: 10px;
  }

  >>> .startPoint {
    width: 18px;
    height: 18px;
    background-color: #fff;
    border: 5px solid #248bf2;
    border-radius: 50%;
    position: relative;
    top: 26px;
    left: 1px;
  }
  >>> .endPoint {
    position: relative;
    top: 14px;
    left: -17px;
    .nav {
      width: 26px;
    }
    .nav:before {
      content: "";
      height: 20px;
      width: 20px;
      display: block;
      position: absolute;
      top: -3px;
      left: 15px;
      z-index: 1;
      line-height: 26px;
      background: #fff;
      border-radius: 40px;
      border: 5px solid #248bf2;
      -webkit-border-radius: 40px;
      -moz-border-radius: 40px;
      color: #fff;
      text-align: center;
    }
    .nav:after {
      content: "";
      height: 0px;
      width: 0px;
      border: 10px transparent solid;
      display: block;
      position: absolute;
      top: 14px;
      left: 18px;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #248bf2;
      border-left: 7px solid transparent;
      transform: rotate(180deg);
    }
  }
  >>> .map-state {
    background-color: #248bf2;
    padding: 6px;
    border-radius: 6px 0 0 6px;
  }
  >>> .map-start {
    position: relative;
    top: -31px;
    right: 65px;
  }
  >>> .map-start:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 10px solid;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    top: 46px;
    left: 65px;
  }
  >>> .map-companies {
    background-color: #fff;
    padding: 6px;
    border-radius: 0 6px 6px 0;
  }
}
.echarts-title {
  font-size: 26px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 37px;
  margin: 30px 0 0 24px;
  display: flex;
}
.tags {
  border-radius: 5px;
  background-color: #248bf2;
  color: #fff;
  padding: 2px 5px;
  margin: 20px 0 5px 0;
  font-size: 11px;
}

// 起点

// 动画效果
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}
</style>
