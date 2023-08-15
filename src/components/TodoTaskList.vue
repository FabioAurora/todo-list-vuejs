<template>
  <section class="min-h-screen bg-gray-100 p-0 sm:p-12">
    <div
      class="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl"
    >
      <h1 class="text-2xl font-bold mb-8">VueJs Todo List</h1>
      <form @submit.prevent="addTodoTask">
        <!-- *************************************** -->
        <div class="relative z-0 w-full mb-5">
          <BaseInput
          v-model="newTask"
          @keypress.enter="addTodoTask"
            type="text"
           required
          />
          <label
            class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            for="task"
            >Enter new task</label
          >
          <button type="submit">
            <i
              class="fa-solid fa-arrow-right-from-bracket fa-lg text-gray-400 absolute top-6 right-0 hover:text-cyan-300"
            ></i>
          </button>
        </div>
        <!-- *********************** -->
      </form>

      <p v-show="!$store.state.tasks.length">No current lists</p>
      <div>
        <div class="flex" v-for="task in $store.state.tasks" :key="task.id">
          <input
            class="max-h-9 mb-4 overflow-hidden border-none"
            v-model="task.content"
            maxlength="26"
            title="Click to edit task"
          />
          <div>
            <button
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="showConfirmModal(task)"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <ConfirmDelete
        v-show="isModalVisible"
        modalHeadline="Unexpected bad things will happen if you don’t read this!"
        :deleteMessage="`This will permanently delete the (${title}) task, are you sure you want to delete it?`"
        @deleteRecordEvent="deleteTodoTask"
        @close="closeConfirmModal"
      />
    </div>
  </section>
</template>

<script>
import ConfirmDelete from "./ConfirmDelete.vue";
import BaseInput from "./BaseInput.vue";

export default {
  name: "TodoTaskList",
  components: {
    ConfirmDelete,
    BaseInput,
  },
  data() {
    return {
      isModalVisible: false,
      selectedTask: null,
      title: "",
    };
  },
  methods: {
    addTodoTask() {
      if (this.newTask) {
        this.$store.dispatch("addTodoTask", this.newTask);
        this.newTask = ''
      }
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
    newTask: {
      get() {
        return this.$store.state.newTask
      },
      set(value) {
        this.$store.dispatch('updateTask', value)
      }
    }
  }
};
</script>
