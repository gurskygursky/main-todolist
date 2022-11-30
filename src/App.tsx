import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskStatusesType, TaskType, Todolist} from './Todolist';

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

type TodolistType = {
    id: string;
    title: string
    taskStatus: TaskStatusesType;
}

// const todolistID1 = v1();
// const todolistID2 = v1();
//
// const [lists, setLists] = useState([
//
// ])


export const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [lists, setLists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', taskStatus: 'All'},
        {id: todolistID2, title: 'What to read', taskStatus: 'All'},
    ])

    const [tasks, setTasks] = useState<any>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'NodeJS', isDone: false},
            {id: v1(), title: 'Swift', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'The Madness Of Crowds', isDone: true},
            {id: v1(), title: 'Atomic Habits:', isDone: true},
            {id: v1(), title: 'The Rise and Fall of the Third Reich', isDone: true},
            {id: v1(), title: 'JavaScript for Kids', isDone: true},
            {id: v1(), title: `JavaScript Absolute Beginner's Guide`, isDone: false},
        ]
    })

    // const [tasks, setTasks] = useState<Array<TasksType>>([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'NodeJS', isDone: false},
    //     {id: v1(), title: 'Swift', isDone: false},
    // ]);

    // const [taskStatus, setTasksStatus] = useState<TaskStatusesType>('All');

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((task: TaskType) => task.id !== taskID)})
        // setTasks(tasks.filter((task: TaskType) => task.id !== taskID));
    }
    const taskStatusesHandler = (todolistID: string, status: TaskStatusesType) => {
        setLists(lists.map((todolist: TodolistType) => todolist.id === todolistID ? {
            ...todolist,
            taskStatus: status
        } : todolist))
        // setTasksStatus(todolistID, status);
    }

    // let filteredTasks = tasks;
    //
    // if (taskStatus === 'Completed') {
    //     filteredTasks = tasks.filter((task: TasksType) => task.isDone);
    // }
    // if (taskStatus === 'Active') {
    //     filteredTasks = tasks.filter((task: TasksType) => !task.isDone);
    // }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks]);
    }

    const taskIsChecked = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID]
                .map((task: TaskType) => task.id === taskID ? {...task, isDone} : task)
        });
    }

    return (
        <div className="App">
            {lists.map((todolist: TodolistType) => {

                    // let allTodolistTasks = tasks[todolist.id];
                    let filteredTasks = tasks[todolist.id];

                    if (todolist.taskStatus === 'Completed') {
                        filteredTasks = tasks[todolist.id].filter((task: TaskType) => task.isDone);
                    }
                    if (todolist.taskStatus === 'Active') {
                        filteredTasks = tasks[todolist.id].filter((task: TaskType) => !task.isDone);
                    }

                    return <Todolist key={todolist.id}
                                     todolistID={todolist.id}
                                     title={todolist.title}
                                     tasks={filteredTasks}
                                     removeTask={removeTask}
                                     taskStatusesHandler={taskStatusesHandler}
                                     addTask={addTask}
                                     filter={todolist.taskStatus}
                                     taskIsChecked={taskIsChecked}
                    />
                }
            )}
            {/*<Todolist title={'What to learn'}*/}
            {/*          tasks={filteredTasks}*/}
            {/*          removeTask={removeTask}*/}
            {/*          taskStatusesHandler={taskStatusesHandler}*/}
            {/*          addTask={addTask}*/}
            {/*/>*/}
            {/*<Todolist title={'Books'} tasks={ArrayTasks2}/>*/}
        </div>
    );
}
