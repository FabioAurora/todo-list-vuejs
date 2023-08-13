import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {
    ADD_TODO_TASK(state, task) {
      state.tasks = [
        {
          id: crypto.randomUUID(),
          content: task,
          isDone: false,
        },
        ...state.tasks,
      ];
    },
    DELETE_TODO_TASK(state, task) {
      state.tasks = state.tasks.filter(item => item.id !== task.id)
    },
    TOGGLE_TODO_TASK(state, task) {
      task.isDone = !task.isDone;
    },
  },
  actions: {
    addTodoTask({ commit }, task) {
      commit("ADD_TODO_TASK", task);
    },
    deleteTodoTask({ commit }, task) {
      commit("DELETE_TODO_TASK", task);
    },
    toggleTodoTask({ commit }, task) {
      commit("TOGGLE_TODO_TASK", task);
    },
  },
  getters: {
  },
  modules: {},
});
