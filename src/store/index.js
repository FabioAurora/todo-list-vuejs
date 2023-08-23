import Vue from "vue";
import Vuex from "vuex";
import { uid } from "uid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    newTask: "",
  },
  mutations: {
    ADD_TODO_TASK(state, task) {
      state.tasks.unshift({
        id: uid(),
        content: task,
        isDone: false,
        isEditing: false,
      });
    },
    SORTED_TASKS(state) {
      state.tasks.sort((taskA, taskB) => {
        if (!taskA.isDone && taskB.isDone) return -1;
        if (taskA.isDone && taskB.isDone) return 0;
        if (taskA.isDone && !taskB.isDone) return 1;
      });
    },
    DELETE_TODO_TASK(state, task) {
      state.tasks = state.tasks.filter((item) => item.id !== task.id);
      /* state.tasks.splice(state.tasks.indexOf(task, 1)) */
    },
    TOGGLE_COMPLETE_TASK(state, task) {
      task.isDone = !task.isDone;
    },
    TOGGLE_EDIT_TASK(state, task) {
      task.isEditing = !task.isEditing;
    },
    UPDATE_TASK(state, newTask) {
      state.newTask = newTask;
    },
    EDIT_TASK(state, task) {
      state.tasks.map((item) => {
        if (item.id === task.id) {
          item.content = task.content;
        }
      });
    },
    CLEAR_TASKS(state) {
      state.tasks = state.tasks.filter(task => !task.isDone)
    },
  },
  actions: {
    addTodoTask({ commit }, task) {
      commit("ADD_TODO_TASK", task);
    },
    deleteTodoTask({ commit }, task) {
      commit("DELETE_TODO_TASK", task);
    },
    toggleCompleteTask({ commit }, task) {
      commit("TOGGLE_COMPLETE_TASK", task);
    },
    toggleEditTask({ commit }, task) {
      commit("TOGGLE_EDIT_TASK", task);
    },
    updateTask({ commit }, newTask) {
      commit("UPDATE_TASK", newTask);
    },
    editTask({ commit }, task) {
      commit("EDIT_TASK", task);
    },
    clearTasks({ commit }) {
      commit("CLEAR_TASKS");
    },
  },
  getters: {
    tasks: (state) => state.tasks.filter((task) => !task.isDone),
    pendingTasks: (state) => state.tasks.filter((task) => !task.isDone),
    completedTasks: (state) => state.tasks.filter((task) => task.isDone),
    sortedTasks: (state) =>
      state.tasks.sort((taskA, taskB) => {
        if (!taskA.isDone && taskB.isDone) return -1;
        if (taskA.isDone && taskB.isDone) return 0;
        if (taskA.isDone && !taskB.isDone) return 1;
      }),
  },
  modules: {},
});
