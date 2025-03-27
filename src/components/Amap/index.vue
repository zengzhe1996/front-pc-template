<template>
  <div ref="amapRef" class="size-full"></div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';

const props = defineProps({
  center: {
    type: Array,
    default: () => [117.114185, 36.660611]
  },
  zoom: {
    type: [Number, Array],
    default: 10
  },
  // 要绘制的城市或区县名称 为空则不绘制
  polygon: {
    type: String,
    default: ''
  },
  // 绘制级别 city/district
  drawLevel: {
    type: String,
    default: 'city'
  },
  markers: {
    type: Array,
    default: () => []
  }
});

const amapRef = useTemplateRef('amapRef');

let map;
async function loadMap() {
  AMapLoader.reset();
  const AMap = await AMapLoader.load({
    key: '92d7eddcd95f6b36f19f86329799b5ac',
    version: '2.0',
    plugins: ['AMap.MouseTool', 'AMap.DistrictSearch']
  });
  map = new AMap.Map(amapRef.value, {
    viewMode: '3D', //是否为3D地图模式
    center: props.center, //中心点坐标
    mapStyle: 'amap://styles/darkblue',
    zoom: props.zoom
  });
}

// 搜索地图 返回市区边界线数据
// subdistrict显示下级行政区级数 行政区级别包括：国家、省/直辖市、市、区/县4个级别）可选值：0、1、2、3，默认值：1
// extensions //返回行政区边界坐标组等具体信息 base | all
// level //查询行政级别
function mapSearchAsync(name, opts = {}) {
  return new Promise((resolve, reject) => {
    const districtSearch = new AMap.DistrictSearch({
      extensions: 'all',
      level: 'city',
      ...opts
    });
    districtSearch.search(name, (status, result) => {
      if (status == 'complete') {
        resolve(result.districtList[0]);
      } else {
        reject('搜索失败');
      }
    });
  });
}

// 绘制行政边界
function drawBoundaries({ boundaries, center, adcode }) {
  let polygons = [];
  for (let i = 0, l = boundaries.length; i < l; i++) {
    // 创建一个多边形对象
    const polygon = new AMap.Polygon({
      path: boundaries[i], // 每个区域的坐标
      strokeWeight: 2, // 边框宽度
      fillOpacity: 0.15, // 填充透明度
      fillColor: 'rgba(76, 196, 255, 1)', // 填充颜色
      strokeColor: 'rgba(76, 196, 255, 1)' // 边框颜色
    });

    polygon.on('mouseover', () => {
      polygon.setOptions({
        fillColor: '#3A88FF',
        fillOpacity: 0.4
      });
    });
    polygon.on('mouseout', () => {
      polygon.setOptions({
        fillColor: 'rgba(76, 196, 255, 1)',
        fillOpacity: 0.15
      });
    });
    // 双击进行下钻 清除polygons 创建一个新的polygon
    polygon.on('dblclick', async e => {
      map.clearMap();
      polygons = [polygon];
      map.add(polygons);
      map.setZoomAndCenter(10.5, [center.lng, center.lat]);
    });
    // 将每个多边形添加到数组中
    polygons.push(polygon);
  }
  // 将所有多边形添加到地图上
  map.add(polygons);
  map.setFitView(polygons); // 自适应视口，展示所有区域
}

// 创建marker
function createMarker() {
  props.markers.forEach(item => {
    const markerInstance = new AMap.Marker({
      map: map,
      position: item.position,
      title: '',
      anchor: 'center'
      // content: createApp(Marker, {
      //   message: 'Evan',
      //   handle() {
      //     console.log(data);
      //   }
      // }).mount(document.createDocumentFragment()).$el
    });
    map.add(markerInstance);
  });
  return;
}

// watch(props.markers, val => {
//   createMarker();
// });

onMounted(async () => {
  await loadMap();
  if (props.polygon) {
    const res = await mapSearchAsync(props.polygon);
    if (props.drawLevel == 'city') {
      drawBoundaries(res);
    } else {
      const arr = [];
      for (const item of res.districtList) {
        const res = await mapSearchAsync(item.name, { level: 'district' });
        arr.push(res);
      }
      arr.forEach(item => {
        drawBoundaries(item);
      });
    }
    createMarker();
  }
});

onMounted(() => {});
</script>

<style lang="scss"></style>
