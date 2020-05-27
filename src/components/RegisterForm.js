import React from 'react';
import {Form, FormGroup, FormFeedback, Label, Input, Row} from 'reactstrap';


const styling = {
    width:'400px',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'right',
    paddingRight: '35px',
    paddingLeft: 'auto'
}
const RegisterForm = (props) =>{
    const {
        values,
        onInputChange,
        registerSubmit,
        registerDisabled,
        errors,
        termsOfService
    } = props;
    return (
        <Form style={styling}>
            <h2>Register a new Account</h2>
            <FormGroup>
                <Row>
                <Label>Username</Label>
                <Input name='username' placeholder='Enter Name' type='text' value={values.username} onChange={onInputChange} />
    <FormFeedback name='nameErrors'>{errors.username}</FormFeedback>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row>
                <Label>Email</Label>
                <Input name='email' placeholder='Enter email' type='text' value={values.email} onChange={onInputChange} />
    <FormFeedback name='emailErrors'>{errors.email}</FormFeedback>
                </Row>
            </FormGroup>

            <FormGroup>
                <Row>
                <Label>Password</Label>
                <Input name='password' placeholder='password' type='password' value={values.password} onChange={onInputChange} />
                <FormFeedback name='passwordErrors'>{errors.password}</FormFeedback>
                </Row>
            </FormGroup>

            <FormGroup>
                <Label>Have you read the Terms and Conditions</Label>
                <Input name='termsOfService' type='checkbox' onClick={termsOfService}/>
                <FormFeedback name='termsOfServiceErrors'>{errors.termsOfService}</FormFeedback>
            </FormGroup>
            <button disabled={registerDisabled} onClick={registerSubmit} name='registerSubmit'>Submit</button>
        </Form>
    )
}

export default RegisterForm