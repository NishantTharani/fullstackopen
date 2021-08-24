const initialNotification = ''

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification: content
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, duration * 1000)
  }
}

const reducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification

    case 'REMOVE_NOTIFICATION':
      return ''

    default:
      return state
  }
}

export default reducer