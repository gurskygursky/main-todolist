import React from 'react';

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}
export type TaskStatusesType = 'All' | 'Active' | 'Completed';

type TodolistPropsType = {
    title: string;
    tasks: Array<TasksType>;
    removeTask: (taskID: number) => void;
    taskStatusesHandler: (status: TaskStatusesType) => void;
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTask = (taskID: number) => {
        props.removeTask(taskID);
    }

    const onClickTasksStatusesHandler = (status: TaskStatusesType) => {
        props.taskStatusesHandler(status);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    return (
                        <li>
                            <button onClick={() => {removeTask(task.id)}}>x</button>
                            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => onClickTasksStatusesHandler('All')}>All</button>
                <button onClick={() => onClickTasksStatusesHandler('Active')}>Active</button>
                <button onClick={() => onClickTasksStatusesHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
}