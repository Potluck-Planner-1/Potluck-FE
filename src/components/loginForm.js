import React from 'react';
import {Form, FormGroup, FormFeedback, Label, Input, Row} from 'reactstrap';
import Axios from 'axios';

const styling = {
    width:'400px',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'right',
    paddingRight: '35px',
    paddingLeft: 'auto'
}
const url ='https://potluck-be.herokuapp.com/api/auth/login'

const LoginForm = props =>{

    const {
        values,
        onInputChange,
        loginDisabled,
        errors,
        login
    } = props;

    return(
        <Form style={styling}>
            <h2>Login</h2>
            <FormGroup>
                <Row>
                <Label>Username</Label>
                <Input name='username' placeholder='Enter Name' type='text' value={values.username} onChange={onInputChange} />
    <FormFeedback name='nameErrors'>{errors.username}</FormFeedback>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row>
                <Label>Password</Label>
                <Input name='password' placeholder='password' type='password' value={values.password} onChange={onInputChange} />
    <FormFeedback name='passwordErrors'>{errors.password}</FormFeedback>
                </Row>
            </FormGroup>
            <button disabled={loginDisabled} onClick={event=>{
                event.preventDefault()
                const cred = {username:values.username,password: values.password}
                Axios
                .post(url, cred)
                .then(response =>{console.log('logged in!', response)})
            }} name='loginSubmit'>Login</button>
        </Form>
    )
}

export default LoginForm