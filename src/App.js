import React from 'react';
import './App.css';
import Auth from "./Components/Auth/Auth";
import Profile from "./Components/Profile/Profile";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <aside>
          <Nav />
        </aside>
        <main>
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/profile/:id?'>
            <Profile />
          </Route>
        </main>
      </BrowserRouter>
    </Provider>
  )
}

export default App;