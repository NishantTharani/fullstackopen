import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote, initAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteForm from "./components/AnecdoteForm"
import {useEffect} from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdotes"


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(data => {
      dispatch(initAnecdotes(data))
    })
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App