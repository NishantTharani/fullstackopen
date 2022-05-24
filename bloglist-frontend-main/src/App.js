import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import Home from "./components/Home";
import {setUser} from "./reducers/userReducer";
import Users from "./components/Users";
import User from "./components/User";
import blogService from "./services/blogs";
import userLikesService from "./services/userLikes";
import userService from "./services/users";



const App = () => {

  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUserJSON');
    dispatch(setUser(null));
  }

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem('blogUserJSON')
    if (localUserJSON) {
      const localUser = JSON.parse(localUserJSON)
      dispatch(setUser(localUser))
      blogService.setToken(localUser.token)
      userLikesService.setToken(localUser.token)
      userService.setToken(localUser.token)
    } else {
      dispatch(setUser(null))
    }
  }, [])

  return (
    <Router>
      <h2>blogs</h2>
      {user === null ?
        <p></p>
        :
        <div>{user.name} is logged in <button onClick={handleLogout}>logout</button></div>
      }

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/users" element={<Users />} />

        <Route path="/users/:id" element={<User />} />

      </Routes>
    </Router>
  )
};

export default App