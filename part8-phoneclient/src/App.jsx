import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import { ALL_PERSONS } from "./queries/queries"
import PersonForm from "./components/PersonForm"
import { useState } from "react"

const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  //   return <Persons persons={result.data.allPersons} />
  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
    </>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>
}

export default App
