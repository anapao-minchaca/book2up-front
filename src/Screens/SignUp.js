import React, { useState } from "react";
import instance from "../api/book2up";
import "./SignUp.css";
import { Link } from "react-router-dom";
import store from '../Store/store'
import {setToken} from '../Store/slices/authSlice'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [form, setForm] = useState({ nombre: "", user: "", password: "" });
  const { nombre, user, password } = form;
  const navigate = useNavigate()
  const changeForm=(e)=>{
    const {name,value} = e.target
    setForm({...form, [name]:value})
  }
  const submitForm = async() => {
        try{
            const response = await instance.post('/signup', form);
            store.dispatch(setToken(response.data))
            navigate('/')
        }catch(e){
            alert(e)
        }
  };
  return (
    <div className="container">
      <div className="signup__content">
        <img
          src="https://raw.githubusercontent.com/anapao-minchaca/Book2Up/main/frontend/img/bg.png"
          alt="signup"
          className="signup__img"
        ></img>
        <div className="signup__form">
          <h1 className="signup__title">
            <span>Book2Up Registro</span>
          </h1>

          <div className="signup__inputs">
            <label className="signup__label">Nombre:</label>
            <input
              type="text"
              name="nombre"
              placeholder="Escribe tu nombre"
              value={nombre}
              onChange={changeForm}
              required
              className="signup__input"
            />
            <label className="signup__label">Usuario:</label>
            <input
              type="text"
              placeholder="Escribe tu usuario"
              name="user"
              onChange={changeForm}
              value={user}
              required
              className="signup__input"
            />
            <label className="signup__label">Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={changeForm}
              required
              className="signup__input"
            />
          </div>
          <div className="signup__buttons">
            <button className="signup__button" onClick={submitForm}>Enviar</button>
            <Link to="/">
              <button className="signup__button signup__button-ghost">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
