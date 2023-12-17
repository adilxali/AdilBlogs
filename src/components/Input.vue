<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  id: {
    type: String,
  },
});
const emits = defineEmits(["update:modelValue"]);
</script>
<template>
  <div>
    <label
      v-if="props.label"
      :for="props.id"
      class="block mb-2 text-sm font-medium text-gray-900"
      >{{ props.label }}</label
    >
    <input
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="props.type"
      :id="props.id"
      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      :placeholder="props.placeholder"
      required
    />
  </div>
</template>
