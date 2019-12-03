<!--
 * @Author: yangdan
 * @Date: 2019-10-25 15:02:04
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-19 10:11:40
 * @Description: 添加描述
 -->
<template>
  <div class="basic-box">
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo"
        :center="center"
        :zoom="zoom"
        :events="mapEvents"
        :amap-manager="amapManager"
        class="amap-demo"
      >
        <!-- 标记点 -->
        <el-amap-marker
          v-for="(item, index) in datas"
          :key="index"
          class="selectedMarker"
          :position="item.lnglat"
          top-when-click="true"
          :ext-data="item"
          :content="getMarkerContent(item, 100, 100)"
          :events="markerEvents"
        />

        <!-- 聚合的示例 -->
        <el-amap-marker
          v-for="marker in markersClusterer"
          :key="marker.position[0]"
          :ext-data="marker"
          :position="marker.position"
          :content="marker.content"
          :events="marker.events"
        />
        <!-- 弹窗 -->
        <el-amap-info-window
          v-if="window"
          :position="window.position"
          :visible="window.visible"
          :offset="window.offset"
          is-custom="true"
        >
          <div class="amap-message-window">
            <span class="amap-message-window-close" @click="markerClose">x</span>
            <ul>
              <li>
                <span>姓名：</span>
                <span>张大宝</span>
              </li>

              <li>
                <span>车牌：</span>
                <span>贵A15870</span>
              </li>

              <li>
                <span>订单号：</span>
                <span>468F5D64-3043-4680-AC6E-494C738614E5</span>
              </li>

              <li>
                <span>联系方式：</span>
                <span>12345678902</span>
              </li>

              <li>
                <span>收货地址：</span>
                <span>湖南省|怀化市|鹤城区|城北街道 南方品城搅拌站</span>
              </li>

              <li>
                <span>收货时间：</span>
                <span>2019-10-31</span>
              </li>
            </ul>
            <div class="window-button-div" @click="ViewDetails(123)">
              <span>查看详情</span>
            </div>
          </div>
        </el-amap-info-window>
      </el-amap>
    </div>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
const amapManager = new AMapManager();
let mapData;
export default {
  name: '',
  data() {
    const self = this;
    return {
      zoom: 20,
      center: [121.5253184, 31.21515044],
      marker: {
        position: [121.52014, 31.198862]
      },
      amapManager,
      address: '',
      lng: 0,
      lat: 0,
      src: require('../../assets/amap/carSelect.png'),
      src2: require('../../assets/amap/car.png'),
      datas: [
        {
          id: 0,
          title: '1',
          level: 'A',
          lnglat: [121.5273285, 31.21515044]
        },
        {
          id: 1,
          title: '2',
          level: 'A',
          lnglat: [121.5253184, 31.21515044]
        },
        {
          id: 2,
          title: '3',
          level: 'A',
          lnglat: [121.5253184, 31.21315044]
        }
      ],
      markerRefs: [],
      markersClusterer: [],
      windows: [
        {
          position: [121.5273285, 31.21515044],
          offset: [150, -35],
          visible: false
        },
        {
          position: [121.5253184, 31.21515044],
          offset: [150, -35],
          visible: false
        },
        {
          position: [121.5253184, 31.21315044],
          offset: [150, -35],
          visible: false
        },
        {
          position: [122.5253184, 31.21315044],
          offset: [150, -35],
          visible: false
        },
        {
          position: [121.5253184, 31.51315044],
          offset: [150, -35],
          visible: false
        }
      ],
      window: '',
      clickedMarker: null, // 保存当前点击的Marker
      mapEvents: {
        init(o) {
          o.setMapStyle('amap://styles/1f7efa97a80abba5167638db8d03c397');
          setTimeout(() => {
            console.log(self.markerRefs);
            const cluster = new AMap.MarkerClusterer(o, self.markerRefs, {
              gridSize: 80
            });
          }, 1000);
        },
        complete() {
          const map = self.amapManager.getMap(); // 获取地图组件实例
          // setFitView(overlayList:Array)
          // 根据地图上添加的覆盖物分布情况，
          // 自动缩放地图到合适的视野级别，参数overlayList默认为当前地图上添加的所有覆盖物图层
          map.setFitView();
        }
      },
      markerEvents: {
        click(e) {
          let data = {};
          // if (self.clickedMarker === e.target) return; // 点击的是同一个Marker
          data = e.target.getExtData();
          console.log('data', data);
          self.windows.forEach(window => {
            window.visible = false;
          });
          self.window = self.windows[data.id];
          self.$nextTick(() => {
            self.window.visible = true;
          });
          if (self.clickedMarker) {
            // 先恢复上次点击的Marker的样式
            // self.clickedMarker.setOffset(new AMap.Pixel(-10, -30));
            self.clickedMarker.setContent(
              self.getMarkerContent(self.clickedMarker.getExtData(), 110, 110)
            );
          }
          e.target.setContent(self.getMarkerContent(data, 110, 110, true));
          // e.target.setOffset(new AMap.Pixel(-18, -50));
          self.clickedMarker = e.target;
        }
      },
      info: []
    };
  },
  created() {
    const self = this;
    const markers = [];
    let index = 0;

    const basePosition = [121.59996, 31.197646];

    while (++index <= 100) {
      markers.push({
        id: index + 4,
        position: [basePosition[0] + 0.01 * index, basePosition[1]],
        content: this.getMarkerContent(1, 110, 110),
        events: {
          init(o) {
            self.markerRefs.push(o);
          },
          click(e) {
            let data = {};
            // if (self.clickedMarker === e.target) return; // 点击的是同一个Marker
            data = e.target.getExtData();
            console.log('data', data);
            self.windows.forEach(window => {
              window.visible = false;
            });
            self.window = self.windows[data.id];
            self.$nextTick(() => {
              self.window.visible = true;
            });
            if (self.clickedMarker) {
              // 先恢复上次点击的Marker的样式
              // self.clickedMarker.setOffset(new AMap.Pixel(-10, -30));
              self.clickedMarker.setContent(
                self.getMarkerContent(self.clickedMarker.getExtData(), 110, 110)
              );
            }
            e.target.setContent(self.getMarkerContent(data, 110, 110, true));
            // e.target.setOffset(new AMap.Pixel(-18, -50));
            self.clickedMarker = e.target;
          }
        }
      });

      this.windows.push({
        position: [basePosition[0] + 0.01 * index, basePosition[1]],
        offset: [150, -35],
        visible: false
      });
    }

    this.markersClusterer = markers;
  },
  mounted() {
    this.datas.push(
      {
        id: 3,
        title: '3',
        level: 'A',
        lnglat: [122.5253184, 31.21315044]
      },
      {
        id: 4,
        title: '3',
        level: 'A',
        lnglat: [121.5253184, 31.51315044]
      }
    );
    this.$loading.show();

    setTimeout(() => {
      this.$loading.hide();
    }, 2000);
  },
  methods: {
    getMarkerContent(item, width, height, isSelect = false) {
      const srcxxx = isSelect ? this.src : this.src2;
      const fontsize = isSelect ? 20 : 18;
      const marginTop = isSelect ? -43 : -42;
      const content = `<div>
                            <img src=${srcxxx} style="width:${width}px;height:${height}px"/>
                            <div style="margin-top:${marginTop}px;text-align:center;color:#fff;font-size:${fontsize}px">贵A12345</div>
                      </div>`;
      return content;
    },
    markerClose() {
      this.windows.forEach(window => {
        window.visible = false;
      });
      this.clickedMarker.setContent(
        this.getMarkerContent(this.clickedMarker.getExtData(), 100, 100)
      );
      const map = this.amapManager.getMap(); // 获取地图组件实例
      // setFitView(overlayList:Array)
      // 根据地图上添加的覆盖物分布情况，
      // 自动缩放地图到合适的视野级别，参数overlayList默认为当前地图上添加的所有覆盖物图层
      map.setFitView();
    },
    ViewDetails(id) {
      console.log('id', id);
      this.$router.push('/orderList/orderList');
    }
  }
};
</script>

<style lang="scss" >
@import "./index.scss";
</style>

