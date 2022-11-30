import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TaskStatusesType = 'All' | 'Active' | 'Completed';

type TodolistPropsType = {
    todolistID: string;
    title: string;
    tasks: Array<TasksType>;
    removeTask: (taskID: string) => void;
    taskStatusesHandler: (todolistID: string, status: TaskStatusesType) => void;
    addTask: (title: string) => void;
    filter: TaskStatusesType;
}

export const Todolist = (props: TodolistPropsType) => {

    const [inputValue, setInputValue] = useState<string>('');

    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }

    const onClickTasksStatusesHandler = (todolistID: string, status: TaskStatusesType) => {
        props.taskStatusesHandler(props.todolistID, status);
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
                <button onClick={() => onClickTasksStatusesHandler(props.todolistID, 'All')}>All</button>
                <button onClick={() => onClickTasksStatusesHandler(props.todolistID, 'Active')}>Active</button>
                <button onClick={() => onClickTasksStatusesHandler(props.todolistID, 'Completed')}>Completed</button>
            </div>
        </div>
    );
}