<template>
  <div>
    <h3 v-if="completed.length > 0">Completed({{ completed.length }})</h3>
    <ul class="flex flex-col mt-6 gap-5">
      <li
        class="flex items-center justify-between gap-2.5 py-4 px-2.5 bg-slate-100 shadow-md"
        v-for="task in completed"
        :key="task.id"
      >
        {{ task.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  name: "CompletedTasks",
  components: {
    Icon,
  },
  methods: {},
  computed: {
    completed() {
      return this.$store.getters.completedTasks;
    },
  },
};
</script>
