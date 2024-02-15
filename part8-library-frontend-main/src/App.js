import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"
import { useApolloClient, useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries/queries.js"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [filteredGenre, setFilteredGenre] = useState("")
  const [bookAdded, setBookAdded] = useState(false)

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: filteredGenre },
  })

  const logout = () => {
    setToken(null)
    client.resetStore()
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommendations")}>
          recommendations
        </button>
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books
        show={page === "books"}
        booksResult={booksResult}
        filteredGenre={filteredGenre}
        setFilteredGenre={setFilteredGenre}
        bookAdded={bookAdded}
        setBookAdded={setBookAdded}
      />

      <NewBook show={page === "add"} setBookAdded={setBookAdded} />

      <Recommendations show={page === "recommendations"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
