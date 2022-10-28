import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TaskStatusesType = 'All' | 'Active' | 'Completed';

type TodolistPropsType = {
    title: string;
    tasks: Array<TasksType>;
    removeTask: (taskID: string) => void;
    taskStatusesHandler: (status: TaskStatusesType) => void;
    addTask: (title: string) => void;
}

export const Todolist = (props: TodolistPropsType) => {

    const [inputValue, setInputValue] = useState<string>('');

    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }

    const onClickTasksStatusesHandler = (status: TaskStatusesType) => {
        props.taskStatusesHandler(status);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    const addTask = () => {
        if (inputValue.trim() !== null) {
            props.addTask(inputValue);
        }
        setInputValue('');
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;

        if (key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                            <button onClick={() => removeTask(task.id)}>x</button>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
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