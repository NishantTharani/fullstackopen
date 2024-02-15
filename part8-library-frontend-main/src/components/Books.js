import { ALL_BOOKS } from "../queries/queries.js"
import { useQuery } from "@apollo/client"
import { useState } from "react"

const Books = (props) => {
  const booksResult = useQuery(ALL_BOOKS)
  const [filteredGenre, setFilteredGenre] = useState("")

  if (booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks
  const genres = books.map((book) => book.genres).flat()

  const filterGenre = (event) => {
    console.log(event.target.value)
    if (filteredGenre === event.target.value) {
      setFilteredGenre("")
    } else {
      setFilteredGenre(event.target.value)
    }
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(
              (book) =>
                filteredGenre === "" || book.genres.includes(filteredGenre)
            )
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((a) => (
        <button key={a} value={a} onClick={filterGenre}>
          {a}
        </button>
      ))}
    </div>
  )
}

export default Books
