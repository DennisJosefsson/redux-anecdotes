import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    notifier(state, action) {
      return action.payload
    },
    remover(state, action) {
      return action.payload
    },
  },
})

export const { notifier, remover } = notificationSlice.actions

export const setNotification = (notification, timeout) => {
  return (dispatch) => {
    dispatch(notifier(notification))
    setTimeout(() => {
      dispatch(remover(''))
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
