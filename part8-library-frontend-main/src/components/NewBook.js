import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_BOOK, ALL_BOOKS } from "../queries/queries.js"

const NewBook = (props) => {
  const setBookAdded = props.setBookAdded
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  const [errorMsg, setError] = useState("")
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n")
      setError(messages ? messages : "unknown error")
      setTimeout(() => {
        setError("")
      }, 2000)
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log("add book...")

    addBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres,
      },
    })
    setBookAdded(true)

    setTitle("")
    setPublished("")
    setAuthor("")
    setGenres([])
    setGenre("")
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
      <hr />
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  )
}

export default NewBook
