import { ALL_BOOKS, ME } from "../queries/queries.js"
import { useQuery } from "@apollo/client"

const Recommendations = (props) => {
  const booksResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)

  if (booksResult.loading || meResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = meResult.data.me.favoriteGenre
  const books = booksResult.data.allBooks.filter((book) =>
    book.genres.includes(favoriteGenre)
  )

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: {favoriteGenre}</p>
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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
