import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  lists: [
    {
      name: "",
      id: "",
      selected: false,
      tasks: [
        {
          name: "",
          id: "",
          completed: false,
          selected: false,
        },
      ],
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    signIn(state, action) {
      state.value = action.payload;
    },

    signUp(state, action) {
      state.value = action.payload;
    },

    addList(state, action) {
      const prevState = state.value.lists;
      state.value.lists = [...(prevState || []), action.payload];
    },

    removeList(state, action) {
      const filteredArray = state.value.lists.filter(
        (item: { name: string; id: string }) => item.id !== action.payload.id
      );
      state.value.lists = filteredArray;
    },

    chooseList(state, action) {
      const filteredArray = state.value.lists.filter(
        (item: { name: string; id: string; selected: boolean }) =>
          item.id !== action.payload.id
      );
      filteredArray.map(
        (data: { name: string; id: string; selected: boolean }) => {
          if (data.selected === true) {
            data.selected = false;
          }
          return data;
        }
      );

      const selected = state.value.lists.filter(
        (item: {
          name: string;
          id: string;
          selected: boolean;
          tasks: { name: string; id: string; completed: boolean }[];
        }) => item.id === action.payload.id
      );

      const selectedList = { ...action.payload, tasks: [...selected[0].tasks] };

      state.value.lists = [selectedList, ...(filteredArray || [])];
    },

    addTask(state, action) {
      const oldTasks = state.value.lists[0].tasks;
      const taskIndex = oldTasks.length;
      const taskWithName = `${action.payload.name + (taskIndex + 1)}`;
      action.payload.name = taskWithName;

      state.value.lists[0].tasks = [...(oldTasks || []), action.payload];
    },

    completeTask(state, action) {
      const filteredArray = state.value.lists[0].tasks.filter(
        (item: { name: string; id: string; completed: boolean }) =>
          item.id !== action.payload.id
      );

      state.value.lists[0].tasks = [...filteredArray, action.payload];
    },

    selectTask(state, action) {
      const filteredArray = state.value.lists[0].tasks.filter(
        (item: { name: string; id: string; completed: boolean }) =>
          item.id !== action.payload.id
      );

      filteredArray.map(
        (data: {
          name: string;
          id: string;
          selected: boolean;
          completed: boolean;
        }) => {
          if (data.selected === true) {
            data.selected = false;
          }
          return data;
        }
      );

      state.value.lists[0].tasks = [action.payload, ...filteredArray];
      console.log(state.value.lists[0].tasks);
    },

    removeTask(state, action) {
      const filteredArray = state.value.lists[0].tasks.filter(
        (item: { name: string; id: string }) => item.id !== action.payload.id
      );

      state.value.lists[0].tasks = filteredArray;
    },
  },
});

export const {
  signUp,
  addList,
  removeList,
  chooseList,
  addTask,
  completeTask,
  selectTask,
  removeTask,
  signIn,
} = userSlice.actions;

export default userSlice.reducer;
