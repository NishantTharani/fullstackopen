import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import Togglable from "./components/Togglable";
import { useSelector, useDispatch } from 'react-redux'
import {setErrorMsg} from "./reducers/errorMsgReducer";
import {initBlogs, addBlog} from "./reducers/blogReducer";


const App = () => {
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
      setUser(user)
      blogService.setToken(user.token)
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

  const handleLogout = () => {
    window.localStorage.removeItem('blogUserJSON');
    setUser(null);
  }

  const dispatch = useDispatch()
  const errorMsg = useSelector(state => state.errorMsg)
  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);  // the entire user object

  const toggleRef = useRef()


  useEffect(() => {
    dispatch(initBlogs())
  }, [user])

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem('blogUserJSON')
    if (localUserJSON) {
      const localUser = JSON.parse(localUserJSON)
      setUser(localUser)
      blogService.setToken(localUser.token)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>

      {user === null ?
        <div>
          <p>{errorMsg}</p>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>
          {user.name} is logged in <button onClick={handleLogout}>logout</button>
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

export default App