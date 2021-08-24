const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const toChange = state.find(anecdote => anecdote.id === action.id)
      const changed = {
        ...toChange,
        votes: toChange.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id === action.id ? changed : anecdote)
      return newState

    case 'ADD_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const voteAnecdote = (noteId) => {
  return {
    type: "VOTE_ANECDOTE",
    id: noteId
  }
}

export const addAnecdote = (newAnecdote) => {
  return {
    type: "ADD_ANECDOTE",
    data: newAnecdote
  }
}

export const initAnecdotes = (anecdotesData) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotesData
  }
}

export default reducer