<template>
  <section>
    <form @submit.prevent="addTodoTask">
      <input
        v-model="newTask"
        @keypress.enter="addTodoTask"
        type="text"
        placeholder="New task..."
      />
      <button type="submit">Add</button>
    </form>
    <div>
      <ul>
        <li v-for="task in $store.state.tasks" :key="task.id" >
          {{ task.content }}
          <button @click="showConfirmModal(task)" type="button">Delete</button>
        </li>
      </ul>
    </div>
    <ConfirmDelete v-show="isModalVisible"
    modalHeadline="Unexpected bad things will happen if you don’t read this!"
    :deleteMessage="`This will permanently delete the (${title}) task, are you sure you want to delete it?`"
    @deleteRecordEvent="deleteTodoTask"
    @close="closeConfirmModal" />
  </section>
</template>

<script>
import ConfirmDelete from './ConfirmDelete.vue';
export default {
  name: "TodoTaskList",
  components: {
    ConfirmDelete,
  },
  data() {
    return {
      newTask: "",
      isModalVisible: false,
      selectedTask: null,
      title: ''
    };
  },
  methods: {
    addTodoTask() {
      if (this.newTask) {
        this.$store.dispatch("addTodoTask", this.newTask);
        this.newTask = "";
      }
    },
    deleteTodoTask() {
      this.$store.dispatch("deleteTodoTask", this.selectedTask);
      this.isModalVisible = false
    },
    showConfirmModal(task) {
      this.isModalVisible = true;
      this.selectedTask = task,
      this.title = this.selectedTask.content
    },
    closeConfirmModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
