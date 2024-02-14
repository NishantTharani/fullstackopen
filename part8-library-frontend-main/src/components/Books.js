import { ALL_BOOKS } from "../queries/queries.js"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const booksResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
