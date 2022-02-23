import './App.css';
import React,{ChangeEvent, FC, useState} from 'react';
import Navbar from './components/Navbar';
import Task from './components/Task';
import {ITask} from './Interfaces'
const App:FC = () => {

  const[task, setTask] = useState<string>("")
  const[deadline, setDeadline] = useState<number>(0)
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
    const newTask = { name: task, deadline: deadline}
    setTodoList([...todoList,newTask])
    setTask("")
    setDeadline(0)
    
  }


  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">

        <input type="text" name='task' placeholder='Task' value={task} onChange={handleChange}/>
        <input type="text" name='deadline' placeholder='Deadline in Days' value={deadline}  onChange={handleChange} />
        </div>
        {console.log(todoList)}

        <button onClick={addTask}>Add Task</button>
       <div className="todoList"></div>
        {todoList.map((item,index) => {
          return <Task key={index}/>
        })}
      </div>
    </div>
  );
}

export default App;
