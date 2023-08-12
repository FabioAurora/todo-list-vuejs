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
      ];
    },
    REMOVE_TODO_TASK(state, task) {
      state.tasks.filter((item) => item.id !== task.id);
    },
    TOGGLE_TODO_TASK(state, task) {
      task.isDone = !task.isDone;
    },
  },
  actions: {
    addTodo({ commit }, task) {
      commit("ADD_TODO_TASK", task);
    },
    removeTodoTask({ commit }, task) {
      commit("REMOVE_TODO_TASK", task);
    },
    toggleTodoTask({commit}, task) {
      commit('TOGGLE_TODO_TASK', task)
    }
  },
  getters: {},
  modules: {},
});
