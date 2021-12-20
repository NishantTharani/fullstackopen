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

export const setErrorMsg = (msg, duration= 5) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MSG',
      data: msg
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_MSG',
        data: ''
      })
    }, duration * 1000)
  }
}

export default reducer