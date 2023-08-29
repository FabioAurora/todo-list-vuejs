import Vue from "vue";
import Vuex from "vuex";
import { uid } from "uid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: uid(),
        content: 'Learn Vue.js 2',
        isDone:true,
        isEditing: false,
        dueDate: '',
      },
      {
        id: uid(),
        content: 'Learn Vue.js 3',
        isDone:false,
        isEditing: false,
        dueDate: '02 Oct 2023',
      },
      {
        id: uid(),
        content: 'Learn unit testing',
        isDone:false,
        isEditing: false,
        dueDate: '26 Aug 2023',
      },
    ],
    newTask: "",
    dueDate: 'not specified',
  },
  mutations: {
    SORTED_TASKS(state) {
      state.tasks.sort((taskA, taskB) => {
        // pushing completed tasks to the bottom
        if (!taskA.isDone && taskB.isDone) return -1;
        if (taskA.isDone && taskB.isDone) return 0;
        if (taskA.isDone && !taskB.isDone) return 1;
      });
    },
    ADD_TODO_TASK(state, task) {
      state.tasks.unshift({
        id: uid(),
        content: task,
        isDone: false,
        isEditing: false,
        dueDate: state.dueDate,
      });
    },
    ADD_DUE_DATE(state, dueDate) {
      if(dueDate === '') return
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dueDate).toLocaleDateString(undefined, options);
      state.dueDate = date;
    },
    DUPLICATE_TASK(state, task) {
      const taskIndex = state.tasks.findIndex((item) => item.id === task.id);
      if (taskIndex !== -1) {
        const duplicatedTask = { ...state.tasks[taskIndex], id: uid() };
        state.tasks.splice(taskIndex + 1, 0, duplicatedTask);
      }
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
      state.tasks = state.tasks.filter((task) => !task.isDone);
    },
  },
  actions: {
    addTodoTask({ commit }, task) {
      commit("ADD_TODO_TASK", task);
    },
    addDueDate({ commit }, dueDate) {
      commit("ADD_DUE_DATE", dueDate);
    },
    duplicateTask({ commit }, task) {
      commit("DUPLICATE_TASK", task);
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
