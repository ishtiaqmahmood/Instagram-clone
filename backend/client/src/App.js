import React, { useEffect, createContext, useReducer, useContext } from "react";
import './App.css';
import Navbar from './components/Navbar.js';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './components/screens/Home.js'; 
import Signin from './components/screens/Signin.js'; 
import Profile from './components/screens/Profile.js'; 
import Signup from './components/screens/Signup.js'; 
import CreatePost from './components/screens/CreatePost.js';
import { reducer,initialState } from './reducers/userReducer.js';
import UserProfile from './components/screens/UserProfile.js'; 
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'; 


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({type:"USER", payload:user})
      //history.push('/')
    } else {
      history.push('/signin')
    }
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
