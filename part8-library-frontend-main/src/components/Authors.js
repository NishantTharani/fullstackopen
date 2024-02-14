import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries/queries.js"
import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import Select from "react-select"

const Authors = (props) => {
  const [author, setAuthor] = useState("")
  const [born, setBorn] = useState("")

  const authorsResult = useQuery(ALL_AUTHORS)

  const [errorMsg, setError] = useState("")
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
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

  if (authorsResult.loading) {
    return <div>loading...</div>
  }

  const authors = authorsResult.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    console.log("update author...")

    editAuthor({
      variables: {
        name: author,
        setBornTo: parseInt(born),
      },
    })

    setAuthor("")
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <form onSubmit={submit}>
        <div>
          name
          <Select
            options={authors.map((a) => ({ label: a.name, value: a.name }))}
            onChange={(e) => setAuthor(e.value)}
          />
          {/* <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          /> */}
        </div>
        <div>
          born
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  )
}

export default Authors
