import React  from 'react';


interface InputProps {
    id: string,
    name: string,
    type: string,
    placeholder: string,
    required: boolean
}
const Input: React.FC<InputProps>   = (props) =>{
    return(
        <input
            type={props.type}
            name={props.name}
            id={props.id}
            placeholder={props.placeholder}
            required={props.required}
        />
    )
};

export default Input;