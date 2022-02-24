import './App.css';
import React,{ChangeEvent, FC, useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import Count from './components/Count'
import { Users } from './components/Users';
import Task from './components/Task';
import {ITask , IUser} from './Interfaces'
import { stringify } from 'querystring';
const App:FC = () => {

  const[task, setTask] = useState<string>("")
  const[deadline, setDeadline] = useState<number>(0)
  const[completed, setCompleted] = useState<boolean>(false)
  const[todoList, setTodoList] = useState<ITask[]>([])


  
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === "task"){
      setTask(event.target.value)
    }
    if(event.target.name === "deadline"){
      setDeadline(Number(event.target.value))
    }
  }

  const addTask = (): void => {
    const newTask = { name: task, deadline: deadline, completed:completed}
    if(task == ""){
      alert('enter a task')
    } else {
      setTodoList([...todoList,newTask])
      setTask("")
      setDeadline(0)
    }
  }

  const completeTask = (taskNameToDelete: string) : void => {
    let newList:any
    newList = todoList.map((task) => {
      if( task.name == taskNameToDelete){
       return { name: task.name, deadline: task.deadline, completed:!task.completed}
      } else {
        return task
      }
    })
    setTodoList(newList)
  }


  return (
    <div className="App">
      <Users/>
      <div className="header">
        <div className="inputContainer">

        <input type="text" name='task' placeholder='Task' value={task} onChange={handleChange}/>
        <input type="text" name='deadline' placeholder='Deadline in Days' value={deadline}  onChange={handleChange} />
        </div>
        {console.log(todoList)}

        <button onClick={addTask}>Add Task</button>
       <div className="todoList"></div>
        {todoList.map((task:ITask,index:number) => {
          return <Task key={index} task={task} completeTask={completeTask}/>
        })}
      </div>
    </div>
  );
}

export default App;
