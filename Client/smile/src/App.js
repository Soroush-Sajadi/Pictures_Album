import React,{useState} from 'react';
import { BrowserRouter, Switch, Route } from'react-router-dom';
import Login from './Components/Login'
import SignUp from './Components/Signup'
import Profile from './Components/Profile'
import './App.css';

function App() {
  const [ profileNameRoute, setProfileNameRoute ] = useState('');

  const getProfileNameRoute = (childData) => {
    setProfileNameRoute(childData);
  }
  return (
    <div className="App">
        <BrowserRouter>
              <Switch>
                <Route exact path="/" render={() => <Profile />}/>
                <Route exact path="/Login" render={() => <Login getProfileNameRoute={getProfileNameRoute}/>}/>
                <Route path="/signup" render={() => <SignUp />}/>
                {/* <Route path={`/${profileNameRoute}`} render={() => <Profile profileNameRoute={profileNameRoute} />} /> */}
              </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
