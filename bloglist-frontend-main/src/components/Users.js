import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import userService from "../services/users"



const Users = () => {

  const padding = {
    padding: 5
  }

  const getUsers = async () => {
    const usersObj = await userService.getUsers()
    setUsers(usersObj)
  }


  const user = useSelector(state => state.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [user])

  return (

    <div>
      {user === null ?
        <p></p>
        :
        <div>
          <h2>Users</h2>
          {users.map(userObj =>
            <p><a href={"/users/" + userObj.id}>{userObj.name}</a> - {userObj.blogs.length}</p>
            )
          }
        </div>
      }
    </div>

  )
};

export default Users