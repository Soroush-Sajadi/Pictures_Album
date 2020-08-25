import React,{useReducer} from 'react';

const Login = () => {
    const [ userIn, setUserIn ] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
        firstPass: '',
        secondPass: '',
        }
      );
      const handleChangePass = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserIn({[name]: newValue});
    }
    console.log(userIn)
    return(
        <div>
            <input  className="login" type="email" name="firstPass" value={userIn.firstPass} placeholder="First password" onChange={ handleChangePass } />
            <input  className="login" type="password" name="secondPass" value={userIn.secondPass} placeholder="Second password" onChange={ handleChangePass } />
        </div>
    )
}

export default Login;