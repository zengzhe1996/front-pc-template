<template>
  <label class="tab" :for="`radio-${value}`">
    <input
      type="radio"
      :id="`radio-${value}`"
      :name="value"
      :checked="modelValue === value"
      @change="handleChangeTab"
    />
    <slot>
      <span>{{ label }}</span>
    </slot>
  </label>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String
  },
  value: {
    type: String
  }
});
const modelValue = inject('modelValue');

function handleChangeTab() {
  modelValue.value = props.value;
  nextTick(() => {});
}
</script>

<style lang="scss" scoped></style>
