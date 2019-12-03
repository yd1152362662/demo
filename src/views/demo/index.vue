<!--
 * @Author: yangdan
 * @Date: 2019-11-19 14:18:29
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-23 15:52:58
 * @Description: 添加描述
 -->
<template>
  <div class="basic-box">
    <div class="amap-page-container">
      <!-- 地图 -->
      <el-amap
        vid="Demo"
        :center="center"
        :zoom="zoom"
        :events="mapEvents"
        :amap-manager="amapManager"
        class="amap-demo"
      ></el-amap>
    </div>

    <div>
      <el-button type="primary" @click="play">点击播放语音</el-button>
    </div>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager();

export default {
  name: "",
  data() {
    let self = this;
    return {
      zoom: 8,
      center: [121.5253184, 31.21515044],
      amapManager,
      mapEvents: {
        init(o) {
          o.setMapStyle("amap://styles/1f7efa97a80abba5167638db8d03c397");
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initMap(); // 初始化数据self指向this
          });
        },
        complete() {
          const map = self.amapManager.getMap(); // 获取地图组件实例
          // setFitView(overlayList:Array)
          // 根据地图上添加的覆盖物分布情况，
          // 自动缩放地图到合适的视野级别，参数overlayList默认为当前地图上添加的所有覆盖物图层
          map.setFitView();
        }
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    initMap() {
      var colors = [
        "#3366cc",
        "#dc3912",
        "#ff9900",
        "#109618",
        "#990099",
        "#0099c6",
        "#dd4477",
        "#66aa00",
        "#b82e2e",
        "#316395",
        "#994499",
        "#22aa99",
        "#aaaa11",
        "#6633cc",
        "#e67300",
        "#8b0707",
        "#651067",
        "#329262",
        "#5574a6",
        "#3b3eac"
      ];
      const map = this.amapManager.getMap(); // 获取地图组件实例

      AMapUI.load(
        ["ui/geo/DistrictExplorer", "lib/$", "ui/misc/PointSimplifier"],
        function(DistrictExplorer, $, PointSimplifier) {
          //创建一个实例
          var districtExplorer = (window.districtExplorer = new DistrictExplorer(
            {
              map: map,
              eventSupport: true, //打开事件支持
              preload: [520600] //预加载全国
            }
          ));

          //要聚合的点列表
          var lngLatList;

          //当前聚焦的区域
          var currentAreaNode = null;

          //鼠标hover提示内容
          var $tipMarkerContent = $('<div class="tipMarker top"></div>');

          var tipMarker = new AMap.Marker({
            content: $tipMarkerContent.get(0),
            offset: new AMap.Pixel(0, 0),
            bubble: true
          });

          //根据Hover状态设置相关样式
          function toggleHoverFeature(feature, isHover, position) {
            tipMarker.setMap(isHover ? map : null);

            if (!feature) {
              return;
            }

            var props = feature.properties;

            if (isHover) {
              var points = groupedPointsCache[props.adcode] || [];

              //更新提示内容
              $tipMarkerContent.html(
                props.adcode + ": " + props.name + "(" + points.length + ")"
              );

              //更新位置
              tipMarker.setPosition(position || props.center);
            }

            $("#area-tree")
              .find('h2[data-adcode="' + props.adcode + '"]')
              .toggleClass("hover", isHover);

            //更新相关多边形的样式
            var polys = districtExplorer.findFeaturePolygonsByAdcode(
              props.adcode
            );
            for (var i = 0, len = polys.length; i < len; i++) {
              polys[i].setOptions({
                fillOpacity: isHover ? 0.5 : 0.2
              });
            }
          }

          //监听feature的hover事件
          districtExplorer.on("featureMouseout featureMouseover", function(
            e,
            feature
          ) {
            toggleHoverFeature(
              feature,
              e.type === "featureMouseover",
              e.originalEvent ? e.originalEvent.lnglat : null
            );
          });

          //监听鼠标在feature上滑动
          districtExplorer.on("featureMousemove", function(e, feature) {
            //更新提示位置
            tipMarker.setPosition(e.originalEvent.lnglat);
          });

          //feature被点击
          districtExplorer.on("featureClick", function(e, feature) {
            var props = feature.properties;

            //如果存在子节点
            if (props.childrenNum > 0) {
              //切换聚焦区域
              switch2AreaNode(props.adcode);
            }
          });

          //外部区域被点击
          districtExplorer.on("outsideClick", function(e) {
            districtExplorer.locatePosition(
              e.originalEvent.lnglat,
              function(error, routeFeatures) {
                if (routeFeatures && routeFeatures.length > 1) {
                  //切换到省级区域
                  switch2AreaNode(routeFeatures[1].properties.adcode);
                } else {
                  //切换到全国
                  switch2AreaNode(100000);
                }
              },
              {
                levelLimit: 2
              }
            );
          });

          //绘制区域面板的节点
          function renderAreaPanelNode(ele, props, color) {
            var $box = $("<li/>").addClass("lv_" + props.level);

            var points = groupedPointsCache[props.adcode] || [];

            var $h2 = $("<h2/>")
              .addClass("lv_" + props.level)
              .attr({
                "data-adcode": props.adcode,
                "data-level": props.level,
                "data-children-num": props.childrenNum || void 0,
                "data-center": props.center.join(",")
              })
              .html(props.name + "(" + points.length + ")")
              .appendTo($box);

            if (color) {
              $h2.css("borderColor", color);
            }

            //如果存在子节点
            if (props.childrenNum > 0) {
              //显示隐藏
              $('<div class="showHideBtn"></div>').appendTo($box);

              //子区域列表
              $("<ul/>")
                .addClass("sublist lv_" + props.level)
                .appendTo($box);

              $('<div class="clear"></div>').appendTo($box);

              if (props.level !== "country") {
                $box.addClass("hide-sub");
              }
            }

            $box.appendTo(ele);
          }

          //填充某个节点的子区域列表
          function renderAreaPanel(areaNode) {
            var props = areaNode.getProps();

            var $subBox = $("#area-tree")
              .find('h2[data-adcode="' + props.adcode + '"]')
              .siblings("ul.sublist");

            if (!$subBox.length) {
              //父节点不存在，先创建
              renderAreaPanelNode($("#area-tree"), props);
              $subBox = $("#area-tree").find("ul.sublist");
            }

            if ($subBox.attr("data-loaded") === "rendered") {
              return;
            }

            $subBox.attr("data-loaded", "rendered");

            var subFeatures = areaNode.getSubFeatures();

            subFeatures.sort(function(f1, f2) {
              var props1 = areaNode.getPropsOfFeature(f1),
                props2 = areaNode.getPropsOfFeature(f2);

              var points1 = groupedPointsCache[props1.adcode] || [],
                points2 = groupedPointsCache[props2.adcode] || [];

              return points2.length - points1.length;
            });

            //填充子区域
            for (var i = 0, len = subFeatures.length; i < len; i++) {
              renderAreaPanelNode(
                $subBox,
                areaNode.getPropsOfFeature(subFeatures[i]),
                colors[i % colors.length]
              );
            }

            return $subBox;
          }

          //绘制某个区域的边界
          function renderAreaPolygons(areaNode) {
            //更新地图视野
            map.setBounds(areaNode.getBounds(), null, null, true);

            //清除已有的绘制内容
            districtExplorer.clearFeaturePolygons();

            //绘制子区域
            districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
              var fillColor = colors[i % colors.length];
              var strokeColor = colors[colors.length - 1 - (i % colors.length)];

              return {
                cursor: "default",
                bubble: true,
                strokeColor: strokeColor, //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 1, //线宽
                fillColor: fillColor, //填充色
                fillOpacity: 0.35 //填充透明度
              };
            });

            //绘制父区域
            districtExplorer.renderParentFeature(areaNode, {
              cursor: "default",
              bubble: true,
              strokeColor: "#fff", //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: null, //填充色
              fillOpacity: 0.35 //填充透明度
            });
          }

          //切换区域后刷新显示内容
          function refreshAreaNode(areaNode) {
            districtExplorer.setHoverFeature(null);

            renderAreaPolygons(areaNode);

            //更新选中节点的class
            var $nodeEles = $("#area-tree").find("h2");

            $nodeEles.removeClass("selected");

            var $selectedNode = $nodeEles
              .filter("h2[data-adcode=" + areaNode.getAdcode() + "]")
              .addClass("selected");

            //展开下层节点
            $selectedNode.closest("li").removeClass("hide-sub");

            //折叠下层的子节点
            $selectedNode
              .siblings("ul.sublist")
              .children()
              .addClass("hide-sub");
          }

          //切换区域
          function switch2AreaNode(adcode, callback) {
            if (
              currentAreaNode &&
              "" + currentAreaNode.getAdcode() === "" + adcode
            ) {
              return;
            }

            loadAreaNode(adcode, function(error, areaNode) {
              if (error) {
                if (callback) {
                  callback(error);
                }

                return;
              }

              currentAreaNode = window.currentAreaNode = areaNode;

              //设置当前使用的定位用节点
              districtExplorer.setAreaNodesForLocating([currentAreaNode]);

              refreshAreaNode(areaNode);

              if (callback) {
                callback(null, areaNode);
              }
            });
          }

          var groupedPointsCache = {};

          function getGroupedPoints(adcode) {
            return groupedPointsCache[adcode] || lngLatList;
          }

          //保留中间聚合结果
          function saveGroupedPoints(areaNode, groups) {
            for (var i = 0, len = groups.length; i < len; i++) {
              var subFeature = groups[i].subFeature; //所属子区域

              if (!subFeature) {
                groupedPointsCache["-out-" + areaNode.getAdcode()] =
                  groups[i].points;
                continue;
              }

              groupedPointsCache[subFeature.properties.adcode] =
                groups[i].points;
            }
          }

          //加载区域
          function loadAreaNode(adcode, callback) {
            districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
              if (error) {
                if (callback) {
                  callback(error);
                }

                console.error(error);

                return;
              }

              var points = getGroupedPoints(adcode);

              //当前子区域聚合
              var groups = areaNode.groupByPosition(points, function(item) {
                return item;
              });

              saveGroupedPoints(areaNode, groups);

              var $subBox = renderAreaPanel(areaNode);

              if (groups.length && !groups[groups.length - 1].subFeature) {
                renderAreaPanelNode(
                  $subBox,
                  {
                    adcode: "-out-" + areaNode.getAdcode(),
                    name: "区域外",
                    center: groups[groups.length - 1].points[0]
                  },
                  "gray"
                );
              }
              if (callback) {
                callback(null, areaNode);
              }
            });
          }

          $("#area-tree").on(
            "mouseenter mouseleave",
            "h2[data-adcode]",
            function(e) {
              if (e.type === "mouseleave") {
                districtExplorer.setHoverFeature(null);
                return;
              }

              var adcode = $(this).attr("data-adcode");

              districtExplorer.setHoverFeature(
                currentAreaNode.getSubFeatureByAdcode(adcode)
              );
            }
          );

          $("#area-tree").on("click", "h2[data-children-num]", function() {
            var adcode = $(this).attr("data-adcode");

            switch2AreaNode(adcode);
          });

          $("#area-tree").on("click", ".showHideBtn", function() {
            var $li = $(this).closest("li");

            $li.toggleClass("hide-sub");

            if (!$li.hasClass("hide-sub")) {
              //子节点列表被展开
              var $subList = $li.children("ul.sublist");

              //尚未加载
              if (!$subList.attr("data-loaded")) {
                $subList.attr("data-loaded", "loading");

                $li.addClass("loading");

                //加载
                loadAreaNode(
                  $li.children("h2").attr("data-adcode"),
                  function() {
                    $li.removeClass("loading");
                  }
                );
              }
            }
          });

          $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(
            document.body
          );
          $.get("https://a.amap.com/amap-ui/static/data/10w.txt", function(
            csv
          ) {
            $("#loadingTip").remove();

            var lines = csv.split("\n");

            var lngLats = [];

            for (var i = 0, len = lines.length; i < len; i++) {
              if (!lines[i]) {
                continue;
              }

              var parts = lines[i].split(",");

              lngLats.push([parseFloat(parts[0]), parseFloat(parts[1])]);
            }

            lngLatList = lngLats;

            groupedPointsCache["520600"] = lngLats;

            //加载全国
            switch2AreaNode(520600);
          });
        }
      );
    },
    // 播放语音的函数
    play() {
      console.log("播放");
      var speechSU = new window.SpeechSynthesisUtterance();
      speechSU.text = "您车牌号是 贵A12345";
      window.speechSynthesis.speak(speechSU);
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-page-container {
  background: #fff;
  height: 850px;
  border-radius: 8px;
  >>> .tipMarker {
     background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
     border-radius: 5px;
     color: #fff;
  }
}
</style>
