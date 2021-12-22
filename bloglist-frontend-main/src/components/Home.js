import React, { useState, useEffect, useRef } from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import userLikesService from '../services/userLikes'
import userService from '../services/users'
import CreateForm from '../components/CreateForm'
import Togglable from "../components/Togglable";
import { useSelector, useDispatch } from 'react-redux'
import {setErrorMsg} from "../reducers/errorMsgReducer";
import {initBlogs, addBlog} from "../reducers/blogReducer";
import {setUser} from "../reducers/userReducer";


const Home = () => {
  const loginForm = () => {
    return (
      <form onSubmit={handleLogin} id={"loginForm"}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      })
      dispatch(setUser(user))
      blogService.setToken(user.token)
      userLikesService.setToken(user.token)
      userService.setToken(user.token)
      window.localStorage.setItem('blogUserJSON', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorMsg("Invalid Login Credentials", 5))
    }
  }

  const createBlog = async (title, author, url) => {
    toggleRef.current.toggleVisibility()

    const blogObj = {
      title: title,
      author: author,
      url: url
    }

    dispatch(addBlog(blogObj))
  }


  const dispatch = useDispatch()
  const errorMsg = useSelector(state => state.errorMsg)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleRef = useRef()


  useEffect(() => {
    dispatch(initBlogs())
  }, [user])


  return (
    <div>

      {user === null ?
        <div>
          <p>{errorMsg}</p>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}

          <Togglable buttonLabel={"create blog"} ref={toggleRef}>
            <h2>create new</h2>
            <CreateForm
              createBlog={createBlog}
            />
          </Togglable>
        </div>
      }
    </div>
  )
};

export default Home