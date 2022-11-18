import React from "react";
import './Navigation.css'
import store from '../Store/store'
import { Link } from 'react-router-dom';
import {removeToken} from '../Store/slices/authSlice'
const Navigation = () => {
const logOut = () => {
    store.dispatch(removeToken())
}
  return (
    <nav>
      <div className="header">
        <a href="/"><img src="https://github.com/anapao-minchaca/Book2Up/blob/main/frontend/img/logo.png?raw=true" alt="book2uplogo"/></a>
      </div>

      <ul>
        <li key="libros"><Link to="/">Libros</Link></li>
         <li key="carrito"><Link to="/cart">Carrito</Link></li>
         <li key="LogOut"><button onClick={logOut}>Cerrar Sesion</button></li>
      </ul>
    </nav>
  );
};

export default Navigation;
