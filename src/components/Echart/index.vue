<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import * as echarts from 'echarts';

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  }
});

const chartRef = useTemplateRef('chartRef');

let myChart;
function initChart() {
  myChart?.dispose();
  myChart = echarts.init(chartRef.value);
  myChart.setOption(props.options, true);

  window.addEventListener('resize', () => {
    myChart?.resize();
  });
}

watch(
  () => props.options,
  () => {
    myChart.setOption(props.options, true);
  },
  { deep: true }
);

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  myChart?.dispose();
});

defineExpose({
  initChart,
  myChart
});
</script>

<style lang="scss"></style>
