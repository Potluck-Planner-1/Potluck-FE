import React from 'react';
import {useHistory} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

const styling = {
    marginLeft: 'auto',
    marginRight: '0',
    textAlign:'right',
    display:'flex',
    justifyContent:'space-between',
    width:'500px'
};


export default function NavBar(){
    let history = useHistory();


    // const token = localStorage.getItem('token')
    // console.log(token)
    return(
        <div style={styling}>
            {/* {
                    token ? (<button onClick={e=>{
                        e.preventDefault();
                        localStorage.removeItem('token')
                        history.push('/')
                        window.location.reload();
                    }}>Log Out</button>):(<button onClick={e=>{
                        e.preventDefault();
                        localStorage.setItem('token', 'something')
                        window.location.reload();
                    }}>Log In</button>)
            } */}
        <NavLink to="/">Home</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <span>Already have an Account?<NavLink to='/login'>Log In</NavLink></span>
        </div>
    )
}