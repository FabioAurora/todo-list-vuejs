<template>
  <li :class="[`
  flex items-center gap-2.5 py-4 px-2.5 bg-slate-100 shadow-md`,{taskNotCompletedOnTime}]">
    <input
      :checked="task.isDone"
      @change="toggleCompleteTask(task)"
      class="h-5 w-5 cursor-pointer rounded-full border-0 bg-slate-200 text-green-600 focus:ring-0 focus:outline-none"
      type="checkbox"
    />
    <div class="flex-1">
      <input
        v-if="task.isEditing"
        class="w-full py-1 px-1 border border-green-300"
        type="text"
        :value="task.content"
        @keypress.enter="editTask(task)"
        @keyup.enter="toggleEditTask(task)"
        @input="inputValue"
      />

      <span @keypress.enter="editTask(task)" @dblclick="toggleEditTask(task)" :class="[taskIsDoneClass, taskNotCompletedOnTime]" v-else  >{{
        task.content
      }}</span>
    </div>
    <div class="flex gap-2">

      <div class="mr-2">
        <div v-if="!task.isDone && dueDate < currentDay">
          <p :class="taskNotCompletedOnTime" class="text-xs" >overdue
          </p>
        </div>

        <div v-else-if="task.isDone && dueDate < currentDay">
          <p class="text-xs text-gray-400">completed after due date
          </p>
        </div>

        <div v-else-if="task.isDone && dueDate > currentDay">
          <p class="text-xs text-gray-400">completed
          </p>
        </div>
        <p class="text-xs text-gray-400" v-else>due date</p>
        <span class="text-sm">{{ task.dueDate }}</span>
      </div>

      <button v-if="task.isEditing" @click="toggleEditTask(task)">
        <Icon
          class="cursor-pointer"
          icon="ph:check-circle"
          color="#41b080"
          width="22"
        />
      </button>
      <button v-else @click="toggleEditTask(task)">
        <Icon
          class="cursor-pointer"
          icon="ph:pencil-fill"
          color="#22d3ee"
          width="22"
        />
      </button>

      <button @click="duplicateTask(task)" v-show="!task.isEditing">
        <Icon icon="mingcute:copy-fill" color="blue" width="22" />
      </button>

      <button @click="showConfirmModal(task)">
        <Icon
          class="cursor-pointer"
          color="#f95e5e"
          icon="ph:trash"
          width="22"
        />
      </button>

    </div>
    <ConfirmDelete
        v-show="isModalVisible"
        modalHeadline="Unexpected bad things will happen if you don’t read this!"
        :deleteMessage="`This will permanently delete the (${title}) task, are you sure you want to delete it?`"
        @deleteRecordEvent="deleteTodoTask"
        @close="closeConfirmModal"
      />
  </li>
</template>

<script>
import { Icon } from "@iconify/vue2";
import ConfirmDelete from "./ConfirmDelete.vue";
export default {
  name: "TaskItem",
  components: {
    Icon,
    ConfirmDelete,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newValue: "",
      newTask: this.task,
      isModalVisible: false,
      selectedTask: null,
      title: "",
      currentDay: new Date(),
      dueDate: new Date(this.task.dueDate),
      differenceMessage: ''
    };
  },
  methods: {
    duplicateTask(task) {
      this.$store.dispatch('duplicateTask', task)
    },
    toggleCompleteTask(task) {
      this.$store.dispatch("toggleCompleteTask", task);
    },
    toggleEditTask(task) {
      this.$store.dispatch("toggleEditTask", task);
    },
    editTask(task) {
      task.content = this.newValue;
      this.$store.dispatch("editTask", task);
    },
    inputValue(e) {
      return (this.newValue = e.target.value);
    },
    deleteTodoTask() {
      this.$store.dispatch("deleteTodoTask", this.selectedTask);
      this.isModalVisible = false;
    },
    showConfirmModal(task) {
      this.isModalVisible = true;
      (this.selectedTask = task), (this.title = this.selectedTask.content);
    },
    closeConfirmModal() {
      this.isModalVisible = false;
    },

  },
  computed: {
    taskIsDoneClass() {
      return [
      { 'line-through text-gray-400': this.task.isDone }
      ]
    },
    taskNotCompletedOnTime() {
      return {'text-red-500 font-bold': this.dueDate <= this.currentDay && !this.task.isDone}
    },
  },
};
</script>
