import React,{useReducer, useState} from 'react';
import { NavLink, Redirect } from'react-router-dom';
import MainPageStatic from './MainPageStatic'
import  '../Style/Login.css'
import SignUpIcon from '../Images/person.svg'


const Login = () => {
    const [ inputError, setInputError ] = useState(false);
    const [ accountError, setLogInError ] = useState(false);
    const [ uid, setUid ] = useState(window.localStorage.getItem('uid'));
    const [ userIn, setUserIn ] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
        email: '',
        password: '',
        }
      );

    const handleChangePass = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserIn({[name]: newValue});
    }

    const logIn = async () => {
        if (userIn.email !== '' && userIn.password !== '') {
            setInputError(false);
            await fetch(`http://localhost:3000/login/${userIn.email}/${userIn.password}`)
                .then(res => res.json())
                .then(res => res !== 'Err' ? window.localStorage.setItem('uid', `${res}`) : setLogInError(true))
                .then(res => setUid(res))
        } else {
            setInputError(true);
        }
    }
    return(
        <div className="login-wrapper">
            {uid !== null ? <Redirect  to={`/`} />: null}
           <MainPageStatic />
            <div className="login-right">
                <div className="login-right-img">
                    <NavLink to="/signup">
                        <img src={SignUpIcon} alt="signup" />
                    </NavLink>
                </div>
                <div className="login-right-title">
                    <h3>
                        Let's do it together
                    </h3>
                    
                </div>
                <div className="login-right-wrapper">
                   
                <div className="login-right-inputs">
                    <input className="login-input" type="email" name="email" value={userIn.email} placeholder="Email*" onChange={ handleChangePass } />
                    <input className="login-input" type="password" name="password" value={userIn.password} placeholder="Password*" onChange={ handleChangePass } />
                </div>
                <div className="login-right-buttons">
                    <input className="login-login" type="submit" value="Log in" onClick={logIn}/>
                </div>
                </div>
                <div className="login-input-error">
                    {inputError ? <h3> Fill all the blanks </h3> : null }
                    {accountError ? <h3> This account does not exict</h3>: null}
                </div>
            </div>
            
        </div>
    )
}

export default Login;