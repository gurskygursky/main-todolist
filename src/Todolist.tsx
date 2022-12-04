import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TasksType = {
    [key: string]: TaskType[];
}
export type TodolistType = {
    id: string;
    title: string
    taskStatus: TaskStatusesType;
}

export type TaskStatusesType = 'All' | 'Active' | 'Completed';

type TodolistPropsType = {
    todolistID: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    taskStatusesHandler: (todolistID: string, status: TaskStatusesType) => void;
    addTask: (todolistID: string, title: string) => void;
    filter: TaskStatusesType;
    taskIsChecked: (todolistID: string, taskID: string, isDone: boolean) => void;
    removeTodolist: (todolistID: string) => void;
    editTodolistTitle: (todolistID: string, title: string) => void;
    editTaskTitle: (todolistID: string, taskID: string, title: string) => void;
}

export const Todolist = (props: TodolistPropsType) => {

    const [inputValue, setInputValue] = useState<string>('');

    const removeTask = (todolistID: string, taskID: string) => {
        props.removeTask(props.todolistID, taskID);
    }

    const onClickTasksStatusesHandler = (todolistID: string, status: TaskStatusesType) => {
        props.taskStatusesHandler(props.todolistID, status);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    const addTask = () => {
        if (inputValue.trim() !== null) {
            props.addTask(props.todolistID, inputValue);
        }
        setInputValue('');
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;

        if (key === 'Enter') {
            addTask();
        }
    }

    const onCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.taskIsChecked(props.todolistID, taskID, isDone);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    const editTodolistTitle = (title: string) => {
        props.editTodolistTitle(props.todolistID, title);
    }
    const editTaskTitle = (taskID: string, title: string) => {
        props.editTaskTitle(props.todolistID, taskID, title);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title}
                              callback={(value) => editTodolistTitle(value)}
                />
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input type={'text'}
                       value={inputValue}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <button onClick={() => removeTask(props.todolistID, task.id)}>x</button>
                            <input type="checkbox" checked={task.isDone}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                       onCheckboxHandler(task.id, event.currentTarget.checked)
                                   }/>
                            <EditableSpan value={task.title}
                                          callback={(value) => editTaskTitle(task.id, value)}
                            />
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => onClickTasksStatusesHandler(props.todolistID, 'All')}>All</button>
                <button onClick={() => onClickTasksStatusesHandler(props.todolistID, 'Active')}>Active</button>
                <button onClick={() => onClickTasksStatusesHandler(props.todolistID, 'Completed')}>Completed</button>
            </div>
        </div>
    );
}