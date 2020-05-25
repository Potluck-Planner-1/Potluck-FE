import React, {useState, useEffect} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Home from './components/home'
import NavBar from './components/navbar'
import RegisterForm from './components/RegisterForm';
import RegisterSchema from './components/registerSchema';
import * as yup from 'yup'

const originalRegisterValues = {
  username:'',
  email: '',
  password: '',
  termsOfService: false
}

const originalRegisterErrors = {
  username:'',
  email:"",
  password:""
}

function App() {
  const [registerValues, setRegisterValues] = useState(originalRegisterValues)
  const [registerErrors, setRegisterErrors] = useState(originalRegisterErrors)
  const [registerDisabled, setRegisterDisabled] = useState(false);

//update fields on input change, and set feedback errors until matches schema  
  const registerChange = (evt) =>{
    const name= evt.currentTarget.name
    const value = evt.currentTarget.value
    yup
      .reach(RegisterSchema, name)
      .validate(value)
      .then(valid=>{
        setRegisterErrors({...registerErrors,
          [name]:''
        })
      })
      .catch(err=>{
        setRegisterErrors({...registerErrors,
          [name]:err.errors[0]
        })
      })

    setRegisterValues({...registerValues, [name]: value})
  }
//checks values on change to enabled or disable submit button
  useEffect(()=>{
    RegisterSchema.isValid(registerValues)
    .then(valid=>{
      setRegisterDisabled(!valid)
    })
  }, [registerValues])
//handles the submitting of form values, will post request to api to create a new user
  const registerSubmit = evt =>{

  }

  const registerCheckbox =evt=>{

  }

  return (
    <div className="App">
      <NavBar />
      <Switch>

        <Route path='/register'> <RegisterForm 
        values={registerValues} 
        onInputChange={registerChange}
        registerSubmit={registerSubmit}
        registerDisabled={registerDisabled}
        errors={registerErrors}
        termsOfService={registerCheckbox}
        /></Route>
        <Route path='/'><Home /></Route>
      </Switch>
    </div>
  );
}

export default App;
