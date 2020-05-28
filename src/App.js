import React, {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/home'
import NavBar from './components/navbar'
import RegisterForm from './components/registerform';
import RegisterSchema from './components/registerschema';
import * as yup from 'yup'
import LoginForm from './components/loginform'
import axios from 'axios';
import LoginSchema from './components/loginschema'


const originalRegisterValues = {
  username:'',
  email: '',
  password: '',
  termsOfService: false
}

const originalRegisterErrors = {
  username:'',
  email:"",
  password:"",
  termsOfService:'You must check that you have read the terms and conditions'
}

function App() {
  //variables for register form
  const [registerValues, setRegisterValues] = useState(originalRegisterValues)
  const [registerErrors, setRegisterErrors] = useState(originalRegisterErrors)
  const [registerDisabled, setRegisterDisabled] = useState(false);
  const [terms, termsRead] = useState(false);
  let history = useHistory();
//update fields on input change, and set feedback errors until matches schema  
  const registerChange = (evt) =>{
    const name= evt.currentTarget.name
    const value = evt.currentTarget.value
    // console.log(name, evt.currentTarget.value)
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
//checks values on change to enabled or disable submit button but only after a form input change
  useEffect(()=>{
    RegisterSchema.isValid(registerValues)
    .then(valid=>{
      setRegisterDisabled(!valid)
    })
  }, [registerValues])

//handles the submitting of form values, will post request to api to create a new user
  const registerSubmit = evt =>{
    evt.preventDefault();
    //checks for terms and conditions box, if not checked nothing will happen
    if(terms){
      // console.log('submit button will work')
      setRegisterErrors({...registerErrors, termsOfService:''})
    }else{
      // console.log('submit button will not work')
      setRegisterErrors({...registerErrors, termsOfService: 'Terms and Conditions must be checked read'})
      return ''
    }
//since terms is checked will attempt to register user with api
const newUser={
  username:registerValues.username,
  password: registerValues.password
}

console.log(newUser)
const url ='https://potluck-be.herokuapp.com/api/auth/register'

    axios
    .post(url, newUser)
    .then(response=>{
      console.log('response',response.data)
      history.push('/login')
    })
    .catch(err=>{console.log('err', err)})
  }
//verifies checkbox
  const registerCheckbox =evt=>{
      const {name} = evt.target;
      const {checked}= evt.target;

      // console.log(name, checked)
    termsRead(checked)
    setRegisterErrors({...registerErrors, termsOfService:''})
  }
//variables needed for login page
const [loginValues, setLoginValues] = useState({username: '', password: ''})
const [loginErrors, setLoginErrors] = useState({username:'', password:''})
const [loginDisabled, setLoginDisabled] = useState(false);
const onLoginChange = evt=>{
  const name= evt.currentTarget.name
  const value = evt.currentTarget.value
  // console.log(name, evt.currentTarget.value)
  yup
    .reach(LoginSchema, name)
    .validate(value)
    .then(valid=>{
      setLoginErrors({...loginErrors,
        [name]:''
      })
    })
    .catch(err=>{
      setLoginErrors({...loginErrors,
        [name]:err.errors[0]
      })
    })

  setLoginValues({...loginValues, [name]: value})
}

useEffect(evt =>{
  LoginSchema.isValid(loginValues)
  .then(valid=>{
    setLoginDisabled(!valid)
  })
}, [loginValues])

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/login'><LoginForm
        values={loginValues}
        onInputChange={onLoginChange}
        loginDisabled={loginDisabled}
        errors={loginErrors}
        /></Route>
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
