import React from 'react';
import './App.css';
import Auth from './Components/Auth/Auth';
import Profile from './Components/Profile/Profile';
import Nav from './Components/Nav/Nav';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/authReducer';
import { useEffect } from 'react';
import NotFound from './Components/NotFound/NotFound';
import Settings from './Components/Settings/Settings';
import Users from './Components/Users/Users';
import Friends from './Components/Friends/Friends';
import About from './Components/About/About';

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
        <aside className={!isLogin ? 'disable' : null}>
          <Nav />
        </aside>
        <main>
        {!isLogin && <div className='testdata'><p>Registration is closed. Use test credentials to login:</p><p>dmitry.fcz@gmail.com</p><p>ZMSxmTjsvPMN</p></div>}
          <div className='main'>
            <Switch>
              <Route path='/auth'>
                {!isLogin ? <Auth/> : <Redirect to='/profile' />}
              </Route>
              <Route path='/profile/:id?'>
                <Profile/>
              </Route>
              <Route path='/users/:currentPage?'>
                <Users />
              </Route>
              <Route path='/friends/:currentPage?'>
                <Friends />
              </Route>
              <Route path='/about'>
                <About/>
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
        </div>
        </main>
      </BrowserRouter>
  )
}

export default App;