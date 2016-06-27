"use strict";

/**
 * Created by laixiangran on 2016/5/20.
 * 主页: http://www.laixiangran.cn
 * 具体业务
 */

// 对外接口
var mapJs = {};
dojo.ready(function () {
    // 初始化地图
    eMap.initMap("mapDiv", {
        logo: false,
        slider: false,
        spatialReference: { wkid: 4326 }
    }, function (map) {

        // 添加天地图
        var vecLayer = eMap.addTdtLayer("vec");
        var cvaLayer = eMap.addTdtLayer("cva");

        // 设置中心点与比例
        map.centerAndZoom(new esri.geometry.Point(120.16615469608554, 31.15140595493059), 7);

        // 初始化鹰眼部件
        eMap.initOverviewMap({
            map: map,
            visible: false
        });

        // 初始化比例尺部件
        eMap.initScalebar({
            map: map
        });

        // 初始化底图切换部件
        eMap.initBasemapGallery({
            mapType: "tdt",
            layers: [["vec", "cva"], ["img", "cia"], ["ter", "cta"]],
            titles: ["地图", "影像", "地形"],
            thumbnailUrls: ["images/layer-icons/tianditu_map_zh.jpg", "images/layer-icons/tianditu_imagery_zh.jpg", "images/layer-icons/tianditu_terrain_zh.jpg"]
        }, basemapGallery);

        map.on("layer-remove", function (evt) {
            console.log(evt.layer.id);
            if (evt.layer.id === vecLayer.id) {
                cvaLayer.setVisibility(false);
            }
        });

        map.on("layer-add", function (evt) {
            if (evt.layer.id === vecLayer.id) {
                cvaLayer.setVisibility(true);
            }
        });

        require(["esri/SpatialReference", "esri/geometry/Point", "esri/tasks/FeatureSet", "esri/layers/MapImageLayer", "esri/layers/MapImage"], function (SpatialReference, Point, FeatureSet, MapImageLayer, MapImage) {
            var mi = new MapImage({
                extent: {
                    xmin: 120.555278,
                    ymin: 30.849125,
                    xmax: 120.670143,
                    ymax: 30.920900,
                    spatialReference: { wkid: 4326 }
                },
                href: "images/wujing/1.png",
                width: 1877,
                height: 1353
            });
            var miLayer = new MapImageLayer();
            miLayer.addImage(mi);
            map.addLayer(miLayer);
        });
    });
});

//# sourceMappingURL=map-compiled.js.map