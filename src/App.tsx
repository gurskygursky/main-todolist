import React, {ChangeEvent, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskStatusesType, TasksType, TaskType, Todolist, TodolistType} from './Todolist';

export const App = () => {

    const [inputValue, setInputValue] = useState('');

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [lists, setLists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', taskStatus: 'All'},
        {id: todolistID2, title: 'What to read', taskStatus: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
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
        ],
    })

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((task: TaskType) => task.id !== taskID)});
    }
    const taskStatusesHandler = (todolistID: string, status: TaskStatusesType) => {
        setLists(lists.map((todolist: TodolistType) => todolist.id === todolistID ? {
            ...todolist,
            taskStatus: status
        } : todolist));
    }

    const addTask = (todolistID: string, title: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}, ...tasks[todolistID]]});
    }

    const taskIsChecked = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID]
                .map((task: TaskType) => task.id === taskID ? {...task, isDone} : task)
        });
    }

    const removeTodolist = (todolistID: string) => {
        setLists(lists.filter((list: TodolistType) => list.id !== todolistID));
        delete tasks[todolistID];
        setTasks({...tasks});
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    const addTodolist = (title: string) => {
        if (inputValue.trim() !== '') {
            const newTodolistID = v1();
            setLists([{id: newTodolistID, title, taskStatus: 'All'}, ...lists]);
            setTasks({...tasks, [newTodolistID]: []});
        }
        setInputValue('');
    }

    return (
        <div className="App">
            <div>
                <input value={inputValue} onChange={onChangeHandler}/>
                <button onClick={() => addTodolist(inputValue)}>+</button>
            </div>
            {lists.map((todolist: TodolistType) => {

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
                                     removeTodolist={removeTodolist}
                    />
                }
            )}
        </div>
    );
}
