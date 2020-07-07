import React from 'react';
import { Form } from 'react-bootstrap';

interface InputProps {
    label : string,
    name: string
}

const InputFell: React.FC<InputProps> = (props) => {

    function render() {
       

        return (
                <Form.Check
                    name={props.name}
                    type="checkbox"
                    id={props.name}
                    className="check-box"
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