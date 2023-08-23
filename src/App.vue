<template>
  <section id="app" class=" bg-slate-200 min-h-screen">
    <ToDoHeader class="w-full max-w-xl mx-auto" />
    <main class="flex flex-col w-full max-w-lg mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold text-center mb-4">Create Task</h1>
        <ToDoForm />
        <CurrentTasks v-if="currentTasks" />
      <CompletedTasks v-if="showCompleted" />
    </main>
  </section>
</template>

<script>
import ToDoForm from "./components/ToDoForm.vue";
import ToDoHeader from "./components/ToDoHeader.vue";
import CompletedTasks from './components/CompletedTasks.vue';
import CurrentTasks from './components/CurrentTasks.vue';

export default {
  name: "app",
  components: {
    ToDoHeader,
    ToDoForm,
    CompletedTasks,
    CurrentTasks,
  },
  data() {
    return {
      showCompleted: false,
      currentTasks: true,
    }
  },
  methods: {
    displayCompleted() {
      this.showCompleted = !this.showCompleted
      this.currentTasks = !this.currentTasks
    },
  },
  computed: {
    completed() {
      return this.$store.getters.completedTasks;
    },
    pending() {
      return this.$store.getters.tasks
    }
  },
};
</script>
