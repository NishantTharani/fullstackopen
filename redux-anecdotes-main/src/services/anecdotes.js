import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addOne = async (anecdoteText) => {
  const anecdoteObj = {
    content: anecdoteText,
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}

export default { getAll, addOne }