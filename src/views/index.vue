<template>
  <div class="home">
    <div class="grid h-300px grid-cols-3 gap-20px">
      <Echart :options="options"></Echart>
      <div class="flex-column-end-end text-20px">
        <span>123</span>
        <span>456</span>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup name="Index">
import TextLink from '@/BaseComponent/TextLink';
import CodeInfo from '@/BaseComponent/Code';
import { technologyStacks, dependencies, projectDir } from './config';
import Echart from '@/components/Echart';
import RadioGroup from '@/components/RadioGroup';
import RadioButton from '@/components/RadioGroup/RadioButton.vue';

const fileNameInfo = [
  { name: '文件夹', description: '统一小写，多单词用驼峰' },
  {
    name: '文件(.js .vue .json)',
    description: '统一小写，多单词用驼峰'
  }
];
const componentName = [
  { name: '组件的文件', description: '统一大驼峰' },
  {
    name: '组件的目录结构',
    description: '例如 table table/src/index.vue, 统一在table/index.js导出'
  },
  {
    name: '组件导包顺序',
    description: '导vue技术栈的包 , 导第三方的工具函数 , 导本地的组件, 导本地的工具函数'
  },
  { name: '组件的名称', description: '统一大驼峰' },
  {
    name: 'template标签',
    description: '大写 ( 例如：<BaseForm/> )'
  },
  {
    name: 'template标签属性顺序',
    description: 'v-if , v-for , ref, class, style, ... ,事件'
  },
  {
    name: '组件的props',
    description: '大驼峰，必须编写类型'
  }
];
const gitInfo = [
  { name: 'add 操作', description: 'git add .' },
  { name: 'commit 操作', description: 'npm run commit ' },
  { name: 'pull 操作', description: 'git pull ' },
  { name: 'push 操作', description: 'git push ' },
  {
    name: 'git地址',
    description: 'https://gitee.com/codelm/ruoyi-vue3-lmw'
  }
];

const radioValue = ref('Hello');
const arr = [
  {
    label: 'Hello',
    value: 'Hello'
  },
  {
    label: 'UI',
    value: 'UI'
  },
  {
    label: 'World',
    value: 'World'
  }
];

const options = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
});

onMounted(() => {
  // setInterval(() => {
  //   options.series[0].data.forEach((item, index) => {
  //     options.series[0].data[index] = item + 100;
  //   });
  //   console.log(options.series[0].data);
  // }, 5000);
});
</script>

<style lang="scss">
.home {
}
</style>
