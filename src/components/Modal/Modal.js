import React, {useState} from 'react';
import store from '../../store/store';
import validate from '../../validate';
import { Modal, Button, Form } from 'react-bootstrap';

const Example = props => {
    const [ show, setShow ] = useState(false);
    const [ values, setValues ] = React.useState({uuid: props.id, name: "", last: "", country: "", city: "", email: ""});
    const [ error, setError ] = React.useState({email: ""});

    const handleChange = e => {
        const { name, value } = e.target;
        
        setValues({
          ...values,
          [name]: value
        })
      }

      const handlerEditPerson = data => {
        const action = { type: "EDIT_PERSON", data};
        store.dispatch(action)
      }

      const handleSubmit = e => {
        e.preventDefault();
        
        setError(validate(values))

        if(values.email.length > 0) {
          handlerEditPerson(values);
        }
      }

    return (
      <>
        <Button variant={props.variant} onClick={() => setShow(true)}>{props.name}</Button>
  
        <Modal show={show} onHide={() => setShow(false)} animation={true}>
          <Modal.Header>
            <Modal.Title>{props.content}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {
                props.name === "Edit" 
                ? (
                    <Form onSubmit={handleSubmit}>                      
                        <Form.Group>
                             <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" name="name" value={values.name} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                             <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="First name" name="last" value={values.last} onChange={handleChange}/>
                        </Form.Group>         
                        <Form.Group>
                             <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Country" name="country" value={values.country} onChange={handleChange}/>
                        </Form.Group>           
                        <Form.Group>
                             <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" name="city" value={values.city} onChange={handleChange}/>
                        </Form.Group>    
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange} />
                            <Form.Text className="text-muted">
                            {error.email && <span>{error.email}</span>}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                ) : (
                    null
                )
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            {
              props.name === "Edit" ? <Button variant="primary" onClick={handleSubmit}>Edit</Button> : <Button variant={props.variant} onClick={props.onClick}>{props.buttonContent}</Button>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default Example;