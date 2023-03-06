import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voter(state, action) {
      const id = action.payload
      const votedAnecdote = state.find((item) => item.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voter, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(voter(votedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
