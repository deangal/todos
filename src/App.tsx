import './App.css';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Users } from './components/Users';
import Task from './components/Task';
import { ITask } from './Interfaces'
import { useSelector, useDispatch } from "react-redux";
import { addTask, changeStatus } from "./redux/slices/user"
import axios from 'axios';


const App: FC = () => {

  // comp state
  const [task, setTask] = useState<string>("")
  const [deadline, setDeadline] = useState<number>(0)
  const [completed, setCompleted] = useState<boolean>(false)
  const [todoList, setTodoList] = useState<ITask[]>([])

  // redux states
  let userData = useSelector((state: any) => {
    return state.users;
  });
  const dispatch = useDispatch();

  //fetch to redux so it wont rerender

  useEffect(() => {
    async function fetchTodo() {
      const response = await axios.get("http://localhost:3000/users")
      setTodoList(response.data[userData.currentIndex].tasks)
    }
    fetchTodo();
  }, [userData.current])




  // update json-server
  const updateDbAdd = async (object: any) => {
    const isName = (element: any) => element.name == userData.current;
    const index = userData.data.findIndex(isName)
    let user = await axios.get(`http://localhost:3000/users/${index + 1}`)


    user.data.tasks = [...user.data.tasks, object]
    await axios.put(`http://localhost:3000/users/${index + 1}`, user.data)
  }

  const updateDbStatus = async (object: any) => {
    const isName = (element: any) => element.name == userData.current;
    const isTaskName = (element: any) => element.name == object.name;
    const index = userData.data.findIndex(isName)
    const taskIndex = userData.data[index].tasks.findIndex(isTaskName)

    let user = await axios.get(`http://localhost:3000/users/${index + 1}`)
    user.data.tasks[taskIndex] = object
    await axios.put(`http://localhost:3000/users/${index + 1}`, user.data)
  }

  // change state function
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value)
    }
    if (event.target.name === "deadline") {
      setDeadline(Number(event.target.value))
    }
  }

  // new task function
  const addTaskHandler = (): void => {
    const newTask = { name: task, deadline: deadline, completed: completed }

    const isset = todoList.findIndex(item =>
      item.name == task
    )


    if (task == "") {
      alert('enter a task')
    }
    else if (isset != -1) {
      alert('enter a diffrent task name')
    }
    else {
      setTodoList([...todoList, newTask])
      dispatch(addTask(newTask))

      updateDbAdd(newTask)

      setTask("")
      setDeadline(0)

    }
  }

  // complete task function
  const completeTask = (taskNameToDelete: string): void => {
    let newList: any
    newList = todoList.map((task) => {
      if (task.name == taskNameToDelete) {
        dispatch(changeStatus(task))
        const updatedTask = { name: task.name, deadline: task.deadline, completed: !task.completed }

        updateDbStatus(updatedTask)
        return updatedTask
      } else {
        return task
      }
    })
    setTodoList(newList)
  }


  return (
    <div className="App">
      <Users />
      <div className="header">
        <div className="inputContainer">

          <input type="text" name='task' placeholder='Task' value={task} onChange={handleChange} />
          <input type="text" name='deadline' placeholder='Deadline in Days' value={deadline} onChange={handleChange} />
        </div>

        <button onClick={addTaskHandler}>Add Task</button>

        {userData.data[userData.currentIndex].tasks.map((task: ITask, index: number) => {
          return <Task key={index} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
