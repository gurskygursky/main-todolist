import React from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';

const ArrayTasks1: Array<TasksType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    {id: 4, title: 'NodeJS', isDone: false},
    {id: 5, title: 'Swift', isDone: false},
];

const ArrayTasks2: Array<TasksType> = [
    {id: 1, title: 'The Madness Of Crowds', isDone: true},
    {id: 2, title: 'Atomic Habits:', isDone: true},
    {id: 3, title: 'The Rise and Fall of the Third Reich', isDone: true},
    {id: 4, title: 'JavaScript for Kids', isDone: true},
    {id: 5, title: `JavaScript Absolute Beginner's Guide`, isDone: false},
];

export const App = () => {
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={ArrayTasks1}/>
            <Todolist title={'Books'} tasks={ArrayTasks2}/>
        </div>
    );
}
