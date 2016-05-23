"use strict";

/**
 * Created by laixiangran on 2016/5/20.
 * 主页: http://www.laixiangran.cn
 * 常用GIS方法
 */
(function (window) {

    var eMap = window.eMap = {};

    require(["esri/map", "esri/urlUtils", "esri/config", "esri/SpatialReference", "esri/layers/WebTiledLayer", "esri/layers/TileInfo", "esri/geometry/Point", "esri/tasks/FeatureSet", "esri/tasks/ProjectParameters", "esri/dijit/OverviewMap", "esri/dijit/Scalebar", "esri/dijit/BasemapGallery", "esri/dijit/BasemapLayer", "esri/dijit/Basemap", "dojo/domReady!"], function (Map, urlUtils, esriConfig, SpatialReference, WebTiledLayer, TileInfo, Point, FeatureSet, ProjectParameters, OverviewMap, Scalebar, BasemapGallery, BasemapLayer, Basemap) {

        var mapInfo = {
            tdt: {
                // 天地图瓦片结构
                tileInfo: new TileInfo({
                    rows: 256,
                    cols: 256,
                    compressionQuality: 0,
                    origin: {
                        x: -180,
                        y: 90
                    },
                    spatialReference: {
                        wkid: 4326
                    },
                    lods: [{ "level": 2, "resolution": 0.3515625, "scale": 147748796.52937502 }, { "level": 3, "resolution": 0.17578125, "scale": 73874398.264687508 }, { "level": 4, "resolution": 0.087890625, "scale": 36937199.132343754 }, { "level": 5, "resolution": 0.0439453125, "scale": 18468599.566171877 }, { "level": 6, "resolution": 0.02197265625, "scale": 9234299.7830859385 }, { "level": 7, "resolution": 0.010986328125, "scale": 4617149.8915429693 }, { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9457714846 }, { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.4728857423 }, { "level": 10, "resolution": 0.001373291015625, "scale": 577143.73644287116 }, { "level": 11, "resolution": 0.0006866455078125, "scale": 288571.86822143558 }, { "level": 12, "resolution": 0.00034332275390625, "scale": 144285.93411071779 }, { "level": 13, "resolution": 0.000171661376953125, "scale": 72142.967055358895 }, { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.483527679447 }, { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.741763839724 }, { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.8708819198619 }, { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9354409599309 }, { "level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677204799655 }]
                }),

                // 天地图子域名
                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],

                // 天地图服务路径模板
                templateUrl: "http://${subDomain}.tianditu.com/DataServer?T=tdtType_c&X=${col}&Y=${row}&L=${level}"
            }
        };

        /**
         * @description 初始化地图
         * @method initMap
         * @for essenceMap.js
         * @param {Node,String} mapDiv 地图所在的容器（元素节点或者元素id）
         * @param {Object} params 初始化参数，具体见esri.Map中的参数
         * @param {Function} callback 地图加载完成之后的回调函数
         * @return {map}
         */
        eMap.initMap = function (mapDiv, params, callback) {
            eMap.map = new Map(mapDiv, params);
            eMap.map.on("load", callback(eMap.map));
        };

        /**
         * @description 初始化鹰眼部件
         * @method initOverviewMap
         * @for essenceMap.js
         * @param {Object} params 初始化参数，具体见esri.dijit.OverviewMap中的参数
         * @param {Node,String} srcNode 放置的容器
         * @return {OverviewMap}
         */
        eMap.initOverviewMap = function (params, srcNode) {
            params.visible = params.visible === undefined ? true : params.visible;
            params.attachTo = params.attachTo || "bottom-right";
            var overviewMapDijit = new OverviewMap(params, srcNode);
            overviewMapDijit.startup();
            return overviewMapDijit;
        };

        /**
         * @description 初始化比例尺部件
         * @method initScalebar
         * @for essenceMap.js
         * @param {Object} params 初始化参数，具体见esri.dijit.Scalebar中的参数
         * @param {Node,String} srcNode 放置的容器
         * @return {Scalebar}
         */
        eMap.initScalebar = function (params, srcNode) {
            params.scalebarUnit = params.scalebarUnit || "dual";
            return new Scalebar(params, srcNode);
        };

        /**
         * @description 初始化底图切换部件
         * @method initBasemapGallery
         * @for essenceMap.js
         * @param {Object} params 初始化参数，
         * mapType: "tdt", // 地图类型，暂支持"tdt"（天地图），"esri"（arcgis）
         * layers: [["vec", "cva"], ["img", "cia"]], // mapType = "tdt"时为服务的别名，mapType = "esri"时为arcgis地图服务url
         * titles: ["地图", "影像"], // 名称，与layers对应
         * thumbnailUrls: ["images/tianditu_map_zh.jpg", "images/tianditu_imagery_zh.jpg"] // 拇指图，与layers对应
         * @param {Node,String} srcNode 放置的容器
         * @return {BasemapGallery}
         */
        eMap.initBasemapGallery = function (params, srcNode) {
            var basemaps = [];
            if (params.mapType === "tdt") {
                params.layers.forEach(function (bs, index) {
                    var basemapLayers = [];
                    bs.forEach(function (bsl) {
                        var basemapLayer = new BasemapLayer({
                            templateUrl: mapInfo[params.mapType].templateUrl.replace("tdtType", bsl),
                            tileInfo: mapInfo[params.mapType].tileInfo,
                            subDomains: mapInfo[params.mapType].subDomains,
                            type: "WebTiledLayer"
                        });
                        basemapLayers.push(basemapLayer);
                    });
                    var basemap = new Basemap({
                        layers: basemapLayers,
                        title: params.titles[index],
                        thumbnailUrl: params.thumbnailUrls[index]
                    });
                    basemaps.push(basemap);
                });
            } else if (params.mapType === "esri") {
                params.layers.forEach(function (bs, index) {
                    bs.forEach(function (bsl) {
                        var basemapLayer = new BasemapLayer({
                            url: bsl
                        });
                        basemapLayers.push(basemapLayer);
                    });
                    var basemap = new Basemap({
                        layers: basemapLayers,
                        title: params.titles[index],
                        thumbnailUrl: params.thumbnailUrls[index]
                    });
                    basemaps.push(basemap);
                });
            }

            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: false,
                map: eMap.map,
                basemaps: basemaps
            }, srcNode);
            basemapGallery.startup();

            basemapGallery.on("error", function (msg) {
                throw "basemap gallery error:  " + msg;
            });

            return basemapGallery;
        };

        /**
         * @description 设置代理
         * @method setPoxy
         * @for essenceMap.js
         * @param {String} proxyUrl 代理文件路径
         * @param {Boolean} isAlwaysUse 是否始终使用代理
         * @return {map}
         */
        eMap.setPoxy = function (proxyUrl, isAlwaysUse) {
            esriConfig.defaults.io.proxyUrl = proxyUrl;
            esriConfig.defaults.io.alwaysUseProxy = isAlwaysUse;
            urlUtils.addProxyRule({
                urlPrefix: "route.arcgis.com",
                proxyUrl: proxyUrl
            });
        };

        /**
         * @description 注册事件
         * @method addMapEvent
         * @for essenceMap.js
         * @param {Object} obj 事件类型
         * @param {String} evtType 事件类型
         * @param {Function} callback 监听方法
         * */
        eMap.addEvent = function (obj, evtType, callback) {
            obj.on(evtType, callback);
        };

        /**
         * @description 加载天地图
         * @method addTdtLayer
         * @for essenceMap.js
         * @param {String} tdtType 地图类型，取值包括：vec：矢量地图，img：影像图，ter：地形图，cva：矢量地图中文注记，eva：矢量地图英文注记，cia：影像图中文注记，eia：影像图英文注记，cva：地形图中文注记
         * @param {Number} index 按指定的索引加载地图
         * @return {WebTiledLayer}
         */
        eMap.addTdtLayer = function () {
            var tdtId = 0;
            return function (tdtType, index) {
                var tdtLayer = new WebTiledLayer(mapInfo["tdt"].templateUrl.replace("tdtType", tdtType), {
                    id: "baseMap" + tdtId++,
                    subDomains: mapInfo["tdt"].subDomains,
                    tileInfo: mapInfo["tdt"].tileInfo
                });
                eMap.map.addLayer(tdtLayer, index);
                return tdtLayer;
            };
        }();

        /**
         * @description 根据JSON转化成featureset, 坐标系为WGS_1984（4326）
         * @method JSONToFeatureSet
         * @for essenceMap.js
         * @param {Array} dataArr 对象数组
         * @param {Number} wkid 坐标系编码
         * @return {FetureSet} 要素集
         */
        function JSONToFeatureSet(dataArr, wkid) {
            var fs = new FeatureSet(),
                inSR = new SpatialReference(wkid);

            fs.features = [];
            fs.spatialReference = inSR;
            for (var i = 0; i < dataArr.length; i++) {
                try {
                    var obj = dataArr[i];
                    var pt = new Point(latToDec(obj.x), latToDec(obj.y), inSR);
                    var gra = new Graphic(pt, null, obj);
                    fs.features.push(gra);
                } catch (e) {
                    throw e;
                }
            }
            return fs;
        }

        /**
         * @description 转换要素的坐标系，精度高
         * @method ExactProject
         * @for essenceMap.js
         * @param {FeatureSet} fs 要素集
         * @param {Number} wkid 输出坐标系编码
         * @param {Function} callback 回调函数，函数格式function(FeatureSet)
         * */
        function ExactProject(fs, wkid, callback) {
            var geometries = [],
                attrs = [],
                outSR = new SpatialReference(wkid);

            for (var i = 0; i < fs.features.length; i++) {
                var gra = fs.features[i];
                geometries.push(gra.geometry);
                attrs.push(gra.attributes);
            }
            var ps = new ProjectParameters();
            ps.geometries = geometries;
            ps.outSR = outSR;
            geometryService.project(ps, function (geometries) {
                var fs = new FeatureSet();
                fs.spatialReference = outSR;
                fs.features = [];
                for (var j = 0; j < geometries.length; j++) {
                    var geo = geometries[j];
                    var attr = attrs[j];
                    var pt = new Point(geo.x, geo.y, eMap.map.spatialReference);
                    var gra = new Graphic(pt, null, attr);
                    fs.features.push(gra);
                }
                callback(fs);
            }, function (error) {
                throw error;
            });
        }

        /**
         * @description 将坐标由度分秒表示转为十进制表示
         * @method latToDec
         * @for essenceMap.js
         * @param {String} dfm 度分秒表示-180°0′0″
         * @return {Number} 十进制
         */
        function latToDec(dfm) {
            var lod = Number(dfm.split("°")[0]),
                lom = Number(dfm.split("°")[1].split("′")[0]),
                los = Number(dfm.split("°")[1].split("′")[1].split("″")[0]);
            return lod + lom / 60 + los / 3600;
        }

        /**
         * @description 将坐标由十进制表示转为度分秒表示
         * @method decToLat
         * @for essenceMap.js
         * @param {Number} sjz 十进制表示-180.00
         * @return {String} 度分秒表示-180°0′0″
         */
        function decToLat(sjz) {
            var d = String(sjz).split("."),
                f = String(Number("0." + d[1]) * 60).split(".");
            return d[0] + "°" + f[0] + "′" + (Number("0." + f[1]) * 60).toFixed(2) + "″";
        }
    });
})(window);

//# sourceMappingURL=essenceMap-compiled.js.map