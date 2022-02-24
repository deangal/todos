import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const getPosts = createAsyncThunk(
    'posts/getpost',
    async() => {
        return fetch("https://jsonplaceholder.typicode.com/posts").then( res => res.json())
        }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    fetch: (state,action) => {
      state.value = action.payload
    },
    addTask: (state,action) => {
        // target current user from action and add task from action

    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer