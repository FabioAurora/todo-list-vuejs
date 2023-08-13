<template>
  <main id="app" class="justify-center flex bg-slate-200 items-center h-screen">
    <TodoTaskList />
  </main>
</template>

<script>
import TodoTaskList from './components/TodoTaskList.vue';
export default {
  name: "App",
  components: {
    TodoTaskList,
  }
};
</script>