<template>
   <li class="flex items-center gap-2.5 py-4 px-2.5 bg-green-300 shadow-md">
    <input
      :checked="task.isDone"
      disabled
      @change="toggleCompleteTask(task)"
      class="h-5 w-5 cursor-pointer rounded-full border-0 bg-slate-200 text-green-900 focus:ring-0 focus:outline-none"
      type="checkbox"
    />
    <div class="flex-1">
      <span @keypress.enter="editTask(task)"  class="text-green-900" >{{
        task.content
      }}</span>
    </div>
  </li>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  name: "CompletedTasks",
  components: {
    Icon,
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {},
};
</script>
