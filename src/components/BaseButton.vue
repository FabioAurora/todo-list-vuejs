<template>
  <button
  class="py-2 px-2"
    :type="type"
    @click="$emit('click')"
  ><slot></slot></button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      required: true
    },
  },
};
</script>
