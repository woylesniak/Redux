import React, { Component } from 'react';
import axios from 'axios';
import store from '../../store/store';
import { connect } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import Modal from '../Modal';

class Main extends Component {

    state = {
        people: [],
    }

    componentDidMount() {
        if(this.props.isLoaded === false) {
            axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                console.log(res);
				store.dispatch({type: 'LOAD_PEOPLE', people: res.data.results})
            })
            .catch(error => {
				console.log(error);
            });
        }
        console.log(this.props);
    }

    handlerEditPerson = data => {
        const action = { type: "EDIT_PERSON", data};
        store.dispatch(action)
    }

    handlerRemove = uuid => {
        const action = { type: "REMOVE_PERSON", uuid};
        store.dispatch(action)
    }

    render() { 
        const { people } = this.props;

        return (
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Last name</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Email</th>
                            <th>Picture</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            people.map(el => {
                                return (
                                    <tr key={el.login.uuid}>
                                        <td></td>
                                        <td>{el.name.first}</td>
                                        <td>{el.name.last}</td>
                                        <td>{el.location.city}</td>
                                        <td>{el.location.country}</td>
                                        <td>{el.email}</td>
                                        <td><img src={el.picture.thumbnail} alt={`${el.name.first} ${el.name.last}`}/></td>
                                        <td>
                                            <Modal 
                                                name="Edit" 
                                                variant="primary" 
                                                content="Change person data" 
                                                buttonContent="Edit" 
                                                id={el.login.uuid}
                                            />
                                        </td>
                                        <td>
                                            <Modal 
                                                name="Delete" 
                                                content="Do you want to delete this person?" 
                                                buttonContent="Delete" 
                                                variant="danger" 
                                                onClick={() => {this.handlerRemove(el.login.uuid)}} 
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
            </Container>
        )
    }
}

export default connect(state => ({
	people: state.people,
	isLoaded: state.isLoaded
}))(Main);