import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callback: (value: string) => void;
}
export const InputForm: React.FC<PropsType> = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
        setError('');
    }

    const addTodolist = () => {
        if (inputValue.trim() !== '') {
            props.callback(inputValue);
            setInputValue('');
        } else {
            setError('Invalid input value!');
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;
        if (key === 'Enter') {
            if (inputValue.trim() !== null) {
                addTodolist();
                setInputValue('');
            } else {
                setError('Invalid input value!');
            }
        }
    }

    return (
        <div>
            <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
            <button onClick={addTodolist}>+</button>
            <div style={{color: 'crimson'}}>{error}</div>
        </div>
    );
}