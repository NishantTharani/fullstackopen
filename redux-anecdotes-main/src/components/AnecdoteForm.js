import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import anecdoteService from "../services/anecdotes"
import {addAnecdote} from "../reducers/anecdoteReducer";
import {setNotification, removeNotification} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    // console.log(content)
    const data = await anecdoteService.addOne(content)
    console.log(data)
    dispatch(addAnecdote(data))
    dispatch(setNotification(`you added: ${content}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm