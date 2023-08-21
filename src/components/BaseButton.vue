<template>
  <button :type="type" class="px-3 border-0"><slot></slot></button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
