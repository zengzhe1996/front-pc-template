<template>
  <div class="radio-button tabs">
    <slot></slot>
    <!-- <template v-for="(item, index) in tabs" :key="item.id">
      <input
        type="radio"
        :id="`radio-${index}`"
        :name="item.value"
        @change="handleChangeTab(item, index)"
        :checked="modelValue === item.value"
      />
      <label class="tab" :for="`radio-${index}`">{{ item.label }}</label>
    </template> -->
    <span class="glider" :style="`transform: translateX(${index * 100}%)`"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [
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
    ]
  }
});
const modelValue = defineModel({ type: [String, Number] });
provide('modelValue', modelValue);

const index = computed(() => {
  return props.tabs.findIndex(item => item.value === modelValue.value);
});
</script>

<style lang="scss">
.radio-button {
  &.tabs {
    display: flex;
    position: relative;
    background-color: #fff;
    box-shadow:
      0 0 1px 0 rgba(24, 94, 224, 0.15),
      0 6px 12px 0 rgba(24, 94, 224, 0.15);
    padding: 0.75rem;
    border-radius: 99px;
  }

  &.tabs * {
    z-index: 2;
  }

  input[type='radio'] {
    display: none;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 50px;
    font-size: 0.8rem;
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
  }

  // .notification {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 0.8rem;
  //   height: 0.8rem;
  //   position: absolute;
  //   top: 10px;
  //   left: 30%;
  //   font-size: 10px;
  //   margin-left: 0.75rem;
  //   border-radius: 50%;
  //   margin: 0px;
  //   background-color: #e6eef9;
  //   transition: 0.15s ease-in;
  // }

  input[type='radio']:checked + span {
    color: #185ee0;
  }

  // input[type='radio']:checked + label > .notification {
  //   background-color: #185ee0;
  //   color: #fff;
  //   margin: 0px;
  // }

  // input[id='radio-1']:checked ~ .glider {
  //   transform: translateX(0);
  // }

  // input[id='radio-2']:checked ~ .glider {
  //   transform: translateX(100%);
  // }

  // input[id='radio-3']:checked ~ .glider {
  //   transform: translateX(200%);
  // }

  .glider {
    position: absolute;
    display: flex;
    height: 30px;
    width: 50px;
    background-color: #e6eef9;
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
  }
}
</style>
