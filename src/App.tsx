import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TaskStatusesType, TasksType, Todolist} from './Todolist';

// const ArrayTasks1: Array<TasksType> = [
//     {id: 1, title: 'HTML&CSS', isDone: true},
//     {id: 2, title: 'JS', isDone: true},
//     {id: 3, title: 'ReactJS', isDone: false},
//     {id: 4, title: 'NodeJS', isDone: false},
//     {id: 5, title: 'Swift', isDone: false},
// ];

// const ArrayTasks2: Array<TasksType> = [
//     {id: 1, title: 'The Madness Of Crowds', isDone: true},
//     {id: 2, title: 'Atomic Habits:', isDone: true},
//     {id: 3, title: 'The Rise and Fall of the Third Reich', isDone: true},
//     {id: 4, title: 'JavaScript for Kids', isDone: true},
//     {id: 5, title: `JavaScript Absolute Beginner's Guide`, isDone: false},
// ];

export const App = () => {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'NodeJS', isDone: false},
        {id: v1(), title: 'Swift', isDone: false},
    ]);

    const [taskStatus, setTasksStatus] = useState<TaskStatusesType>('All');

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((task: TasksType) => task.id !== taskID));
    }
    const taskStatusesHandler = (status: TaskStatusesType) => {
        setTasksStatus(status);
    }

    let filteredTasks = tasks;

    if (taskStatus === 'Completed') {
        filteredTasks = tasks.filter((task: TasksType) => task.isDone);
    }
    if (taskStatus === 'Active') {
       filteredTasks = tasks.filter((task: TasksType) => !task.isDone);
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      taskStatusesHandler={taskStatusesHandler}

            />
            {/*<Todolist title={'Books'} tasks={ArrayTasks2}/>*/}
        </div>
    );
}
