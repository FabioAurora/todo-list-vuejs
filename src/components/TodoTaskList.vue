<template>
  <section>
    <form @submit.prevent="addTodoTask">
      <input
        v-model="newTask"
        @keypress.enter="addTodoTask"
        type="text"
        placeholder="My task..."
      />
      <button
        type="submit"
        class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-indigo-500"
      >
        Add task
      </button>
    </form>
    <ul class="container w-96 h-64">
      <li class="bg-slate-300" v-for="(task) in this.$store.state.tasks" :key="task.id">
        {{ task.content }}
        <button type="button" class="bg-blue-300" @click="deleteTodoTask(task)">Delete</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "TodoTaskList",
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    addTodoTask() {
      if (this.newTask) {
        this.$store.dispatch("addTodoTask", this.newTask);
        this.newTask = "";
      }
    },
    deleteTodoTask(task) {
        this.$store.dispatch('deleteTodoTask', task)
    }
  },
  computed: {
  }
};
</script>
