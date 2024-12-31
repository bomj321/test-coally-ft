import { createSlice } from "@reduxjs/toolkit";
import { State } from "@enums/StateEnum";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    dataSelected: null,
    data: [],
    check: true,
  },
  reducers: {
    setCheck: (state, action) => void (state.check = action.payload),
    setTasks: (state, action) => void (state.data = action.payload),
    setTask: (state, action) => void (state.dataSelected = action.payload),
    remove: (state) => void (state.dataSelected = null),
    addTask: (state, action) => {
      if (state.check && action.payload.state === State.COMPLETED) {
        state.data.push(action.payload);
      }

      if (!state.check && action.payload.state === State.TO_DO) {
        state.data.push(action.payload);
      }
    },
    updateTask: (state, action) => {
      const { _id, updatedTask } = action.payload;

      const index = state.data.findIndex((task) => task._id === _id);

      if (index !== -1) {
        state.data[index] = updatedTask;
      }
    },
    removeTask: (state, action) => {
      const idToRemove = action.payload;
      const arrayFiltered = state.data.filter(
        (task) => task._id !== idToRemove
      );
      state.data = arrayFiltered;
    },
  },
});

export const {
  setCheck,
  setTasks,
  setTask,
  remove,
  addTask,
  updateTask,
  removeTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
