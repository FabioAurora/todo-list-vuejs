import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    newTask: '',
  },
  mutations: {
    ADD_TODO_TASK(state) {
      state.tasks = [
        {
          id: crypto.randomUUID(),
          content: state.newTask,
          isDone: false,
        },
        ...state.tasks,
      ];
    },
    DELETE_TODO_TASK(state) {
      state.tasks = state.tasks.filter(item => item.id !== state.newTask.id)
      /* state.tasks.splice(state.tasks.indexOf(task, 1)) */
    },
    TOGGLE_TODO_TASK(state, task) {
      task.isDone = !task.isDone;
    },
    UPDATE_TASK(state, newTask) {
      state.newTask = newTask
    }
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
    updateTask({commit}, newTask) {
      commit('UPDATE_TASK', newTask)
    }
  },
  getters: {
  },
  modules: {},
});
