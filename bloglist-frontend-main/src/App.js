import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
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

  const createForm = () => {
    return (
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
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
      setErrorMessage("Invalid Login Credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault();

    const blogObj = {
      title: title,
      author: author,
      url: url
    }

    await blogService.createBlog(blogObj)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogUserJSON');
    setUser(null);
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);  // the entire user object
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")


  useEffect(() => {
    blogService.getAll().then(blogs =>
      {
        setBlogs(blogs)
      }
    )
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
          <p>{errorMessage}</p>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>
          {user.name} is logged in <button onClick={handleLogout}>logout</button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
          <h2>create new</h2>
          {createForm()}
        </div>
      }
    </div>
  )
}

export default App