import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
   
    addTask: (state,action) => {
        // target current user from action and add task from action

    },
  },
})

// Action creators are generated for each case reducer function
export const { addTask } = counterSlice.actions

export default taskSlice.reducer