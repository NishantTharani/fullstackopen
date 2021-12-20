const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_MSG':
      return action.data

    default:
      return state
  }
}

export const setErrorMsg = (msg) => {
  return {
    type: 'SET_MSG',
    data: msg
  }
}

export default reducer