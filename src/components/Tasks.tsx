import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { addTask, changeStatus } from "../redux/slices/user"
import { useSelector, useDispatch } from "react-redux";
import Task from '../components/Task';

import axios from 'axios';
import { ITask, IUser } from '../Interfaces'

export const Tasks = () => {

    const [todoList, setTodoList] = useState<ITask[]>([])


    // redux states
    let userData = useSelector((state: any) => {
        return state.users;
    });


    const dispatch = useDispatch();

    const updateDbStatus = async (object: any) => {
        const isName = (element: any) => element.name == userData.current;
        const isTaskName = (element: any) => element.name == object.name;
        const index = userData.data.findIndex(isName)
        const taskIndex = userData.data[index].tasks.findIndex(isTaskName)

        let user = await axios.get(`http://localhost:3000/users/${index + 1}`)
        user.data.tasks[taskIndex] = object
        await axios.put(`http://localhost:3000/users/${index + 1}`, user.data)
    }


    // complete task function
    const completeTask = (taskNameToDelete: string): void => {
        let newList: any
        newList = todoList.map((task: any) => {
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
        <div className="todoList">
            {userData.data[userData.currentIndex].tasks.map((task: ITask, index: number) => {
                return <Task key={index} task={task} completeTask={completeTask} />
            })}
        </div>
    );
};
