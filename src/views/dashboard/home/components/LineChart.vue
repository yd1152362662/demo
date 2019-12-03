<!--
 * @Author: yangdan
 * @Date: 2019-10-16 10:04:43
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-21 15:57:33
 * @Description: 添加描述
 -->
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    setOptions({ orderNumber, weight } = {}) {
      this.chart.setOption({
        xAxis: {
          data: [
            '2019-10-18',
            '2019-10-19',
            '2019-10-20',
            '2019-10-21',
            '2019-10-22',
            '2019-10-23',
            '2019-10-24'
          ],
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666', // 更改坐标轴文字颜色
              fontSize: 14 // 更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: '#666' // 更改坐标轴颜色
            }
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
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed'
            }
          },
          padding: [5, 10]
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
            },
            axisLine: {
              lineStyle: {
                color: '#666' // 更改坐标轴颜色
              }
            }
          },
          {
            type: 'value',
            name: '吨',
            nameLocation: 'end',
            show: true,
            splitLine: {
              show: false
            },
            nameTextStyle: {
              padding: [0, 0, 0, 30]
            },
            axisLine: {
              lineStyle: {
                color: '#666' // 更改坐标轴颜色
              }
            }
          }
        ],
        series: [
          {
            name: '订单',
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            barGap: '0', // 柱图间距
            itemStyle: {
              normal: {
                color: '#FE3A2E',
                lineStyle: {
                  color: '#FE3A2E',
                  width: 1
                }
              }
            },
            type: 'line',
            yAxisIndex: 0,
            data: orderNumber,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '吨位',
            type: 'line',
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            itemStyle: {
              normal: {
                color: '#248AF2',
                lineStyle: {
                  color: '#248AF2',
                  width: 1
                }
              }
            },
            data: weight,
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
