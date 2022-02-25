import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: 0,
  current: "",
  currentIndex: null,
}

// export const getPosts = createAsyncThunk(
//     'posts/getpost',
//     async() => {
//         return fetch("https://jsonplaceholder.typicode.com/posts").then( res => res.json())
//         }
// )

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    fetch: (state, action) => {
      state.data = action.payload
    },
    currentUser: (state, action) => {
      state.current = action.payload
      const isName = (element) => element.name == action.payload;
      const index = state.data.findIndex(isName)

      state.currentIndex = index
    },

    addTask: (state, action) => {
      const isName = (element) => element.name == state.current;
      const index = state.data.findIndex(isName)
      state.data[index].tasks = [...state.data[index].tasks, action.payload]
    },
    changeStatus: (state, action) => {
      const isName = (element) => element.name == state.current;
      const isTaskName = (element) => element.name == action.payload.name;

      const index = state.data.findIndex(isName)
      const taskIndex = state.data[index].tasks.findIndex(isTaskName)

      console.log(action.payload);
      state.data[index].tasks[taskIndex].completed = !action.payload.completed
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetch, addTask, currentUser, changeStatus } = counterSlice.actions

export default counterSlice.reducer