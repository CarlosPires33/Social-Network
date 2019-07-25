import React, {Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import LandingPage from './components/layout/LandingPage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'
import Alert from './components/layout/Alert'
import PrivateRoutes from './components/routing/PrivateRoutes'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/addProfile/CreateProfile'
import EditProfile from './components/addProfile/EditProfile'
import AddExperience from './components/addProfile/AddExperience'
import AddEducation from './components/addProfile/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = ()=> {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
        <Router>
          <Fragment >
            <Navbar/>
            <Alert/>
            <Route exact path="/" component={LandingPage}/>
            <section className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/posts" component={Posts}/>
                <PrivateRoutes exact path="/dashboard" component={Dashboard}/>
                <PrivateRoutes exact path="/create-profile" component={CreateProfile}/>
                <PrivateRoutes exact path="/edit-profile" component={EditProfile}/>
                <PrivateRoutes exact path="/add-experience" component={AddExperience}/>
                <PrivateRoutes exact path="/add-education" component={AddEducation}/>
                <PrivateRoutes exact path="/post/:id" component={Post}/>
              </Switch>
            </section>
          </Fragment>
    </Router>
    </Provider>
    
  );
}

export default App;
