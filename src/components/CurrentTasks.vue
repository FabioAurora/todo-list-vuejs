<template>
  <div>
    <div>
      <ul class="flex flex-col mt-6 gap-5" v-if="$store.state.tasks.length > 0">
        <div>
          <div v-if="isCurrent">
            <TaskItem
              class="mt-2"
              v-for="task in sortedTasks"
              :task="task"
              :key="task.id"
            />
          </div>

          <div v-else-if="isPending">
            <TaskItem
              class="mt-2"
              v-for="task in pendingTasks"
              :task="task"
              :key="task.id"
            />
          </div>

          <div v-else-if="isCompleted">
            <CompletedTasks
            v-show="task.isDone"
              class="mt-2"
              v-for="task in completedTasks"
              :task="task"
              :key="task.id"
            />
          </div>

        </div>
        <div class="flex flex-col gap-3 sm:flex-row justify-between items-center  py-2">
          <div class="inline-flex">
            <button
              :class="[
                isCurrent
                  ? 'hover:bg-slate-100 text-slate-600 font-bold py-2 px-2  text-xs border border-gray-300'
                  : 'hover:bg-slate-100 text-slate-600 font-bold py-2 px-2  text-xs',
              ]"
              @click="displayCurrent"
            >
              All
            </button>
            <button
              class="hover:bg-slate-100 text-slate-600 font-semibold hover:text-slate-700 py-2 px-2 border focus:border-gray-300 hover:border-transparent text-xs"
              @click="displayPending"
            >
              Pending
              <sup class=" text-sky-700">{{ pendingTasks.length }}</sup>
            </button>

            <button
              class="hover:bg-slate-100 text-slate-600 font-semibold hover:text-slate-700 py-2 px-2 border hover:border-transparent text-xs focus:border-gray-300"
              @click="displayCompleted"
            >
              Completed
              <sup class=" text-green-700">{{completedTasks.length}}</sup>
            </button>
          </div>
          <button
            class="hover:bg-slate-300 text-slate-600 font-semibold hover:text-slate-700 py-2 px-3 border border-slate-700 hover:border-transparent rounded text-xs"
          @click="clearTasks"
          >
            Clear completed
          </button>
        </div>
      </ul>
      <p class="flex items-center justify-center gap-2 mt-6" v-else>
        <Icon
          icon="streamline:interface-arrows-bend-down-right-1-arrow-bend-curve-change-direction-right-to-down"
          color="#22d3ee"
          width="22"
          :rotate="2"
        />
        You have no task's to complete! Add one!
        <Icon
          icon="streamline:interface-arrows-bend-down-left-3-arrow-bend-curve-change-direction-left-to-down"
          color="#22d3ee"
          width="22"
          :rotate="2"
        />
      </p>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import { Icon } from "@iconify/vue2";
import { mapActions, mapGetters } from "vuex";
import CompletedTasks from "./CompletedTasks.vue";
export default {
  name: "CurrentTasks",
  components: {
    TaskItem,
    Icon,
    CompletedTasks,
  },
  data() {
    return {
      isPending: false,
      isCompleted: false,
      isCurrent: true,
    };
  },
  methods: {
    ...mapActions(["clearTasks"]),
    displayPending() {
      (this.isPending = true),
        (this.isCompleted = false),
        (this.isCurrent = false);
    },
    displayCompleted() {
      (this.isCompleted = true),
        (this.isPending = false),
        (this.isCurrent = false);
    },
    displayCurrent() {
      (this.isCurrent = true),
        (this.isCompleted = false),
        (this.IsPending = false);
    },
    clearTasks() {
      this.$store.dispatch('clearTasks')
    }
  },
  computed: {
    ...mapGetters(["tasks", "pendingTasks", "completedTasks", "sortedTasks"]),
  },
};
</script>
