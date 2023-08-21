<template>
  <form @submit.prevent="addTodoTask">
    <!-- *************************************** -->
    <div
      class="flex transition-all duration-200 ease-linear border-2 border-slate-400 focus-within:shadow-sm"
      :class="{ 'input-error': this.invalid }"
    >
      <input
        v-model="newTask"
        @keypress.enter="$emit('addTask')"
        autocomplete="off"
        type="text"
        class="w-full py-3 px-2 border-0 focus:outline-none focus-within:shadow-md"
      />
      <BaseButton type="submit">Add</BaseButton>
    </div>
    <p
      v-if="invalid"
      class="flex items-center text-sm justify-center gap-2 mt-6 text-red-400"
    >
      <Icon icon="bx:error" color="#ef4444" width="20" />
      {{ errMsg }}
    </p>
    <!-- *********************** -->
  </form>
</template>

<script>
import { Icon } from "@iconify/vue2";
import BaseButton from "./BaseButton.vue";
export default {
  name: "ToDoForm",
  components: {
    BaseButton,
    Icon,
  },
  data() {
    return {
      errMsg: "",
      invalid: false,
    };
  },
  methods: {
    addTodoTask() {
      this.invalid = false;
      this.errMsg = ''
      if (this.newTask !== '') {
        this.$store.dispatch("addTodoTask", this.newTask);
        this.newTask = "";
        return;
      }
      this.invalid = true;
      this.errMsg = "Cannot add an empty task value";
    },
  },
  computed: {
    newTask: {
      get() {
        return this.$store.state.newTask;
      },
      set(value) {
        this.$store.dispatch("updateTask", value);
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.input-error {
  @apply border-red-500;
}
</style>
