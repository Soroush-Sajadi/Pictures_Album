import React,{useReducer, useState} from 'react';
import  '../Style/Login.css'
import LogInImage from '../Images/LoginImage.jpeg'

const Login = () => {
    const [ inputError, setInputError ] = useState(false);
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
        
        

    }

    const signUp = async () => {
        if (userIn.email !== '' && userIn.password !== '') {
            setInputError(false);
            await fetch(`http://localhost:3000/signup/${userIn.email}/${userIn.password}`)
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(err => console.log(err))
        } else {
            setInputError(true);
        }
    }
    return(
        <div className="login-wrapper">
            <div className="login-left">
                <h1>Smile</h1>
                <img src={LogInImage} alt="image" />
            </div>
            <div className="login-right">
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
                    <input className="login-signin" type="submit" value="Sign in" onClick={signUp}/>
                </div>
                </div>
                <div className="login-input-error">
                    {inputError ? <h3> Fill all the blanks </h3> : null }
                </div>
            </div>
        </div>
    )
}

export default Login;