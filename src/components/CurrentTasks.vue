<template>
  <div>
    <div>
      <ul class="flex flex-col mt-6 gap-5" v-if="hasTasks">
        <div>
          <div v-if="isCurrent">
            <TaskItem
              class="mt-2"
              v-for="task in sortedTasks"
              :task="task"
              :key="task.id"
            />
          </div>
          <!-- Rendering task items based on the currently selected display mode -->
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
            <!-- Display buttons to toggle the task display mode -->
            <BaseButton
            type="button"
              :class="buttonClass(isCurrent)"
              @click="displayTasks('current')"
            >
              All
            </BaseButton>

            <BaseButton
            type="button"
            :class="buttonClass(isPending)"
              @click="displayTasks('pending')"
            >
              Pending
              <sup class=" text-sky-700">{{ pendingTasks.length }}</sup>
            </BaseButton>

            <BaseButton
            type="button"
            :class="buttonClass(isCompleted)"
              @click="displayTasks('completed')"
            >
              Completed
              <sup class=" text-green-700">{{completedTasks.length}}</sup>
            </BaseButton>
          </div>
          <!-- Button to clear completed tasks -->
          <BaseButton
          type="button"
            class="hover:bg-slate-300 text-slate-600 font-semibold hover:text-slate-700 border border-slate-700 hover:border-transparent rounded text-xs"
          @click="clearCompletedTasks"
          >
            Clear completed
          </BaseButton>
        </div>
      </ul>
      <!-- Display message if there are no tasks added -->
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
import BaseButton from "./BaseButton.vue";
export default {
  name: "CurrentTasks",
  components: {
    TaskItem,
    Icon,
    CompletedTasks,
    BaseButton,
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
    displayTasks(type) {
      this.isPending = type === 'pending';
      this.isCompleted = type === 'completed';
      this.isCurrent = type === 'current'
    },
    clearCompletedTasks() {
      this.$store.dispatch('clearTasks')
    },
    buttonClass(isActive) {
      return [
        isActive ? "hover:bg-slate-100 text-sky-500 font-bold text-xs border border-gray-300" : "hover:bg-slate-100 text-gray-500 font-bold text-xs",
      ];
    }
  },
  computed: {
    ...mapGetters(["pendingTasks", "completedTasks", "sortedTasks"]),
    displayedTasks() {
      if(this.isPending) {
        return this.isCompleted;
      }else if (this.isCompleted) {
        return this.completedTasks;
      }
      return this.sortedTasks
    },
    hasTasks() {
      return this.$store.state.tasks.length > 0;
    },
  },
};
</script>
