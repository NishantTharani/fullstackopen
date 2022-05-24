import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import userService from "../services/users"

import {
  useParams
} from "react-router-dom"

const User = () => {
  const id = useParams().id

  const getUser = async () => {
    const userObj = await userService.getUser(id)
    setTheUser(userObj)
  }

  const user = useSelector(state => state.user)
  const [theUser, setTheUser] = useState(null)

  useEffect(() => {
    getUser()
  }, [user])


  return (
    <div>
      {theUser === null ?
        <p></p>
        :
        <div>
          <h2>{theUser.name}</h2>
          <h3>Added Blogs</h3>
          <ul>
            {theUser.blogs.map(blog =>
              <li key={blog.id}>{blog.title}</li>
            )
            }
          </ul>

        </div>}
    </div>
  )

}

export default User