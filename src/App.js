import React from 'react';
import './App.css';
import Auth from "./Components/Auth/Auth";
import Profile from "./Components/Profile/Profile";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/authReducer';
import { useEffect } from 'react';
import NotFound from './Components/NotFound/NotFound';
import Settings from './Components/Settings/Settings';
import Users from './Components/Users/Users';

const App = () => {
  const isInit = useSelector(state => state.auth.isInit)
  const isLogin = useSelector(state => state.auth.login)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  
  if (!isInit) return null
  
  return (
    <BrowserRouter>
        {!isLogin && <Redirect to='/auth' />}
        <aside className={!isLogin ? 'disable' : undefined}>
          <Nav />
        </aside>
        <main>
          <Switch>
            <Route path='/auth'>
              <Auth />
            </Route>
            <Route path="/profile/:id?">
              <Profile/>
            </Route>
            <Route path='/users/:currentPage?'>
              <Users />
            </Route>
            <Route path='/settings'>
              <Settings/>
            </Route>
            <Route exact path='/'>
              <Profile/>
            </Route>
            <Route path='*'>
                <NotFound/>
            </Route>
        </Switch>
        </main>
      </BrowserRouter>
  )
}

export default App;