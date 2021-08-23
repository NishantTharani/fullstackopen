const initialNotification = ''

export const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification: notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
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