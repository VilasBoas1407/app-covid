import React from 'react';
import { Form } from 'react-bootstrap';

interface InputProps {
    label : string,
    name: string,
    onChange: any,
    value : string,
    checked: boolean
}

const InputFell: React.FC<InputProps> = (props) => {

    function render() {
       

        return (
                <Form.Check
                    name={props.name}
                    type="checkbox"
                    id={props.name}
                    className="check-box"
                    onChange={props.onChange}
                    value={props.value}
                    checked = {props.checked}
                />
        )
      }

return (

        <>
            <br/>
            <div className="row">
                {render()}
            </div>
            <br/>
        </>
        
    )
}

export default InputFell;