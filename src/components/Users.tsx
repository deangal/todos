import React,{ useEffect, useState} from 'react';
import { IUser } from '../Interfaces'
import axios from 'axios';

export const Users = () => {
    const[users,setUsers] = useState<IUser[]>([])
    const[current,setCurrent] = useState<string>()

    //fetch to redux so it wont rerender
  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      setUsers(response.data)
      switchCurrent(response.data[0].name);

    }

    fetchUsers();
  }, [])


  const switchCurrent = (option: string ) : void => {
      setCurrent(option)
  }
  
  console.log(current);

  return (
      <select onChange={(e) => switchCurrent(e.target.value)} >

        {users.map( (user,index) => (
            <option key={index}>{user.name}</option>
        ))}
      </select>
  )
}
