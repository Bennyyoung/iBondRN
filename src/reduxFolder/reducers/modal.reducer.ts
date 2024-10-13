import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: boolean
}

const initialState: any = {
  value: false
}

const modalSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    showModal: (state, action: { payload: boolean }) => {
      state.value = action.payload
    },
    resetModal: (state: InitialState) => {
      state.value = initialState.value
    }
  }
})

export const { showModal, resetModal } = modalSlice.actions

export default modalSlice.reducer