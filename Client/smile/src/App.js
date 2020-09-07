import React,{useState} from 'react';
import { BrowserRouter, Switch, Route } from'react-router-dom';
import Login from './Components/Login'
import SignUp from './Components/Signup'
import Profile from './Components/Profile'
import Fullscreen from './Components/Fullscreen'
import './App.css';

function App() {
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');



  const getImageName = (childData) => {
    setImageName(childData)
  }

  const getImageUrl = (childData) => {
    setImageUrl(childData)
  }
  return (
    <div className="App">
        <BrowserRouter>
              <Switch>
                <Route exact path="/" render={() => <Profile getImageName={getImageName} getImageUrl={getImageUrl} />}/>
                <Route path="/Login" render={() => <Login />}/>
                <Route path="/signup" render={() => <SignUp />}/>
                <Route path={`/${imageName}`} render={() => <Fullscreen imageUrl={imageUrl}/>}/>
              </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
