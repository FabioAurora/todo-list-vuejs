<template>
  <input
    :type="type"
    name="Input"
    placeholder=""
    :value="sendValue"
    @input="updateValue($event.target.value)"
    @keyup.enter="clearInput"
    ref="input"
    :class="[
      'pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-300 border-gray-200 text-cyan-500',
    ]"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    sendValue: String,
  },
  methods: {
    updateValue(sendValue) {
        this.$emit("input", sendValue);
    },
    clearInput(e) {
      e.target.value = ''
    },
    focus() {
      this.$refs.input.focus()
    }
  },
};
</script>
