import React from 'react';
import { Form } from 'react-bootstrap';

interface InputProps {
    label : string,
    name: string
}
const InputFell: React.FC<InputProps> = (props) => {

    function render() {
        const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9,10];

        return (
            elements.map((value,index)=> {
                  return(
                        <Form.Check
                            name={props.name}
                            type="radio"
                            label={value}
                            id={props.name+"_"+value}
                        />
                  )
            })
        )
      }

return (

        <>
            <label>{props.label}:</label>
            <br/>
            <div className="row">
                {render()}
            </div>
            <br/>
            <br/>
        </>
        
    )
}

export default InputFell;