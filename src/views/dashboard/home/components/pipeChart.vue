<!--
 * @Author: yangdan
 * @Date: 2019-10-15 16:32:57
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-15 17:04:15
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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    };
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
      this.chart = echarts.init(this.$el, 'macarons');

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['2.0w以上', '1.5-2.0w', '1.0-1.5w', '0.5-1.0w']
        },
        series: [
          {
            name: '我的订单',
            type: 'pie',
            // roseType: 'radius',
            radius: [65, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: '2.0w以上' },
              { value: 240, name: '1.5-2.0w' },
              { value: 149, name: '1.0-1.5w' },
              { value: 100, name: '0.5-1.0w' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            itemStyle: {
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = ['#0636E7', '#0674E7', '#4D98E8', '#7BB0E8'];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
