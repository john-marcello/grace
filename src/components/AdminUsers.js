import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { adminify } from '../api/index'

// import './ModalLogin.css'

const AdminUsers = ({ user, setUser }) => {

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    function localStorageUser() {
        if (localStorage.getItem('user')) {
            const localStorageUser = JSON.parse(localStorage.getItem('user'));
            return localStorageUser;
        } else {
            return {};
        }
    }

    const handleAdminify = (event) => {
        event.preventDefault();
        if (password1 === password2) {
            adminify({ username, password: password1, admin: true })
                .then((data) =>
                    setUser(localStorageUser(data))
                );
        }
    };

    const handleUser = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword1 = (event) => {
        setPassword1(event.target.value);
    };
    const handlePassword2 = (event) => {
        setPassword2(event.target.value);
    };

    return (

        <Form onSubmit={handleAdminify}>

            <Form.Group className="form-group">
                <Form.Label htmlFor="username">Email Address</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-envelope"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        id="field-username" name="username"
                        className="form-control" placeholder="Enter email"
                        type="text" onChange={handleUser}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group className="form-group">
                <Form.Label htmlFor="password">Password</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        id="field-password" name="password"
                        className="form-control" placeholder="Enter password"
                        type="password" onChange={handlePassword1}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group className="form-group">
                <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        id="field-password-confirm" name="password-confirm"
                        className="form-control" placeholder="Confirm password"
                        type="password" onChange={handlePassword2}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Text id="passwordHelpBlock" className="ml-1 mb-4" muted>Your password must contain 8-20 characters and may consist of a combination of letters or numbers.</Form.Text>

            <Button className="btn btn-enter" variant="primary" type="submit">Sign Up <i className="fa fa-sign-in-alt ml-2"></i></Button>

        </Form>

    )
};

export default AdminUsers;