import React, {useReducer, useState} from 'react';
import MainPageStatic from './MainPageStatic'

const Signup = () => {
    const [ inputError, setInputError ] = useState(false);
    const [ userIn, setUserIn ] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
        username:'',
        email: '',
        password: '',
        }
      );

      const handleChangePass = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserIn({[name]: newValue});
    }

    const signUp = async () => {
        if (userIn.email !== '' && userIn.password !== '') {
            setInputError(false);
            await fetch(`http://localhost:3000/signup/${userIn.email}/${userIn.password}`)
                .then(res => res.json())
                // .then(res => res !=='Err' ? sendToken(res): setSignUpError(true))
                .catch(err => console.log(err))
        } else {
            setInputError(true);
        }
    }
    return(
        <div className="login-wrapper">
            <MainPageStatic />
            <div className="login-right">
                <div className="login-right-title">
                    <h3>
                        Make a new account!
                    </h3>
                    
                </div>
                <div className="login-right-wrapper">
                <div className="login-right-inputs">
                    <input className="login-input" type="text" name="username" value={userIn.username} placeholder="Username*" onChange={ handleChangePass } />
                    <input className="login-input" type="email" name="email" value={userIn.email} placeholder="Email*" onChange={ handleChangePass } />
                    <input className="login-input" type="password" name="password" value={userIn.password} placeholder="Password*" onChange={ handleChangePass } />
                </div>
                <div className="login-right-buttons">
                    <input className="login-login" type="submit" value="Sign up" onClick={signUp}/>
                </div>
                </div>
                <div className="login-input-error">
                    {inputError ? <h3> Fill all the blanks </h3> : null }
                    {/* {accountError ? <h3> This account does not exict</h3>: null} */}
                </div>
            </div>
        </div>
    )
}

export default Signup;