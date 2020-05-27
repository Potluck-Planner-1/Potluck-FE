import React, {useState, useEffect} from 'react';

export default function Home(){
    // const [token, setToken] = useState(localStorage.getItem('token'))
    return(
        <div>
            {/* {!token && (<section className='login'><article>
                login form
            </article>
            <article>
                register form
            </article>
            </section>)} */}

            <h1>Welcome to Potluck Planning!</h1>
            <h3>Bringing people together one meal at a time. Family, friends togetherness. </h3>
            <p>Our site focuses on creating a collaborative envionment for people to discuss and plan potluck meals. Users may log in and designate the dishes they intend to bring, and others will be able to plan and show their intended dishes as well. Please Log In to see more!</p>
        </div>
    )
}