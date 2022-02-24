import React from 'react'
import { ITask } from '../Interfaces'
interface Props {
  task: ITask,
  completeTask(taskNameToDelete:string): void;
}
const Task = ({task, completeTask}:Props) => {
  return (
  <div className={task.completed == true ? 'task active' : 'task'}>
      <div className="content">
        <span>{task.name} </span>
        <span>{task.deadline}</span>
    </div>
    <button className='delete' onClick={() => completeTask(task.name)}>X</button>
  </div>
  )
}



export default Task