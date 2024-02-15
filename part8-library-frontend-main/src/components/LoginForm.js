import { useMutation } from "@apollo/client"
import { useState } from "react"
import { LOGIN } from "../queries/queries.js"

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      console.log("login completed")
      console.log(data)
      setToken(data.login.value)
      localStorage.setItem("library-token", data.login.value)
      setPage("authors")
    },
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n")
      setError(messages ? messages : "unknown error")
      setTimeout(() => {
        setError("")
      }, 2000)
    },
  })

  if (!show) {
    return null
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    await login({
      variables: {
        username,
        password,
      },
    })
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

      <hr />
      {error && <div>{error}</div>}
    </div>
  )
}

export default LoginForm
