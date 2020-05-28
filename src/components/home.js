import React, {useState, useEffect} from 'react';

export default function Home(){
    const [token, setToken] = useState(localStorage.getItem('token'))
    return(
        <div>
            {token && (<section className='userPage'>
            
            </section>)}
        { !token && (
            <div>
            <h1>Welcome to Potluck Planning!</h1>
            <h3>Bringing people together one meal at a time. Family, friends togetherness. </h3>
            <p>Please Log In to see more!</p>
            </div>
        )}
        </div>
    )
}