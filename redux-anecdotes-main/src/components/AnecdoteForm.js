import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addAnecdote} from "../reducers/anecdoteReducer";
import {setNotification, removeNotification} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content)
    dispatch(addAnecdote(content))
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