import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Signout from '../Images/logout.svg';
import '../Style/SignOutIcon.css'

const SignOut = () => {
    const [ out, setOut ] = useState(false)
    const getSignOut = async() => {
        await fetch('http://localhost:3000/signout')
            .then(res => res.json())
            .then(res => res === 'done' ? window.localStorage.removeItem('uid') || setOut(true): null)

    }
    return(
        <div className="sign-out-wrapper">
            <img src={Signout} alt="sign out" onClick={getSignOut}/>
            {out ? <Redirect to='/Login'/>:null}
        </div>
    )
}

export default SignOut;