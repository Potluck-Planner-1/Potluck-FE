import React, {useState, useEffect, useReducer} from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './components/home'
import NavBar from './components/navbar'
import RegisterForm from './components/RegisterForm';
import RegisterSchema from './components/registerSchema';
import * as yup from 'yup'
import LoginForm from './components/loginForm'
import axios from 'axios';
import LoginSchema from './components/loginSchema'

//from Prakash 🔽⏬//////////////////////////////////////////////////
// import React, {useState, useReducer} from 'react';
import {reducer, initialState} from './reducers/PotluckReducer';
import PrivateRoute from './components/PrivateRoute';
import AddItemForm from './components/AddItemForm';
import AddItemCard from './components/AddItemCard';
import PotluckInfoCard from './components/PotluckInfoCard';
import NewPotluckInfoForm from './components/NewPotluckInfoForm';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//from Prakash 🔼⏫////////////////////////////////////////////////


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

  // from Prakash 🔽⏬/////////////////////////////////////////////////////////////////////
  const[state, dispatch] = useReducer(reducer, initialState)
  console.log(state, '??what state says????????')
 
const addTask = (item) => {
      dispatch({type: 'ADD_TODO', payload: item})
}

const toggleCompleted = (id) => {
      dispatch({type: 'TOGGLE_COMPLETED', payload: id})
}

const clearCompleted = () => {
  dispatch({ type: 'CLEAR_COMPLETED'})
}
//from Prakash 🔼⏫///////////////////////////////////////////////////////////////////////////


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

        {/* // from Prakash 🔽⏬///////////////////////////////////////////////////////////////////// */}
        <PrivateRoute exact path='/protected' component= {NewPotluckInfoForm}/>
        <PrivateRoute exact path='/protected' component= {AddItemForm} addTask={addTask} clearCompleted={clearCompleted} />
        <PrivateRoute exact path='/protected' component={PotluckInfoCard}/>
        <PrivateRoute exact path='/protected' component={AddItemCard} state={state}  toggleCompleted={toggleCompleted} />
        {/* //from Prakash 🔼⏫/////////////////////////////////////////////////////////////////////////// */}

      </Switch>
    </div>
  );
}

export default App;
