import React, { useEffect, useState } from 'react';
import { IUser } from '../Interfaces'
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { fetch, currentUser } from "../redux/slices/user";

export const Users = () => {

  // comp state
  const [users, setUsers] = useState<IUser[]>([])

  //redux
  let userData = useSelector((state: any) => {
    return state.users;
  });
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get("http://localhost:3000/users")
      switchCurrent(userData.current);
      setUsers(response.data)
      dispatch(fetch(response.data))

    }
    fetchUsers();
  }, [])

  // switch current user handler
  const switchCurrent = (option: string): void => {
    dispatch(currentUser(option))
  }


  return (
    <select defaultValue={'DEFAULT'} onChange={(e) => switchCurrent(e.target.value)} >

      {users.map((user: IUser, index: number) => {
        // map users to options and load selected user
        if (userData.current == user.name) {

          return <option selected key={index}>{user.name}</option>
        }
        return <option value={user.name} key={index}>{user.name}</option>
      })}
    </select>
  )
}
