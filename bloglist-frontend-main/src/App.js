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
import BlogPage from "./components/BlogPage";
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
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <span><em>{user.name} is logged in</em> <button onClick={handleLogout}>logout</button></span>
          :
          <span></span>
        }
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/users" element={<Users />} />

        <Route path="/users/:id" element={<User />} />

        <Route path="/blogs/:id" element={<BlogPage />} />

      </Routes>
    </Router>
  )
};

export default App