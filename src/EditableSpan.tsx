import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    value: string;
    callback: (value: string) => void;
}
export const EditableSpan: React.FC<PropsType> = (props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(props.value);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    const activateEditModeHandler = () => {
        setEdit(!edit);
        setInputValue(props.value);
    }
    const deactivateEditModeHandler = () => {
        setEdit(!edit);
        props.callback(inputValue);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;
        if (key === 'Enter') {
            deactivateEditModeHandler();
        }
    }

    return (

        edit
            ? <input value={inputValue}
                     onChange={onChangeHandler}
                     onKeyDown={onKeyPressHandler}
                     onBlur={deactivateEditModeHandler}
                     autoFocus
            />
            : <span onDoubleClick={activateEditModeHandler}>{props.value}</span>

    );
}