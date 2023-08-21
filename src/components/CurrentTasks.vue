<template>
  <div>
          <div>
            <ul class="flex flex-col mt-6 gap-5" v-if="$store.state.tasks.length > 0">
                <button @click="displayPending">show pending</button>
              <TaskItem v-show="!task.isDone && !isCompleted && !IsPending" v-for="(task, index) in $store.state.tasks" :task="task" :index="index"  :key="task.id" />
              <TaskItem v-show="task.isDone && !isCompleted && !IsPending" v-for="(task, index) in $store.state.tasks" :task="task" :index="index"  :key="task.id" />
              <TaskItem v-show="IsPending && !task.isDone" v-for="(task, index) in $store.state.tasks" :task="task" :index="index"  :key="task.id" />
            </ul>
            <p class="flex items-center justify-center gap-2 mt-6" v-else>
            <Icon icon="streamline:interface-arrows-bend-down-right-1-arrow-bend-curve-change-direction-right-to-down" color="#22d3ee" width="22" :rotate="2" />
            You have no task's to complete! Add one!
            <Icon icon="streamline:interface-arrows-bend-down-left-3-arrow-bend-curve-change-direction-left-to-down" color="#22d3ee" width="22" :rotate="2" />
          </p>
        </div>
      </div>
</template>

<script>
import TaskItem from './TaskItem.vue';
import { Icon } from '@iconify/vue2';
export default {
    name: 'CurrentTasks',
    components: {
        TaskItem,
        Icon
    },
    data() {
        return {
            IsPending: false,
            isCompleted: false,
            isCurrent: true
        }
    },
    methods: {
        displayPending() {
            this.IsPending = !this.IsPending
            isCompleted = false,
            isCurrent = false
        }
    },
    computed: {
        tasks() {
            return this.$store.getters.tasks
        },
    }
}
</script>