import React,{useState} from 'react';
import { BrowserRouter, Switch, Route } from'react-router-dom';
import Login from './Components/Login'
import SignUp from './Components/Signup'
import Profile from './Components/Profile'
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
              <Switch>
                <Route exact path="/" render={() => <Profile />}/>
                <Route exact path="/Login" render={() => <Login />}/>
                <Route path="/signup" render={() => <SignUp />}/>
              </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
