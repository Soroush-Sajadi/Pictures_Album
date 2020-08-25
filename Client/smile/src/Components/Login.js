import React,{useReducer} from 'react';
import  '../Style/Login.css'

const Login = () => {
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

    const logIn = () => {
        console.log('log in')
    }

    const signIn = () => {
        console.log('sign in')
    }
    return(
        <div className="login-wrapper">
            <div className="login-left">
                <h1>Smile</h1>
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
                    <input className="login-signin" type="submit" value="Sign in" onClick={signIn}/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login;