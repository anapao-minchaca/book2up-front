import React, {useState} from "react";
import "./Login.css";
import instance from '../api/book2up'
import { useNavigate } from 'react-router-dom';
import store from '../Store/store'
import { setToken } from '../Store/slices/authSlice'
import { Link } from 'react-router-dom';

const Login = () => {
  const [formInfo,setFormInfo] = useState({user:'', password:''})
  const navigate = useNavigate();
  const changeForm=(event)=>{
    const {name,value} = event.target
    setFormInfo({...formInfo,[name]:value})
  }
  const submit = async()=>{
    const {user,password} =formInfo
    try{
        const response = await instance.post('/validar',{user,password})
        store.dispatch(setToken(response.data))
        navigate('/')
    }
    catch(e){
        alert(e)
    }
    
  }
  return (
    <>
    <div className="container">
      <div className ="login__content">
        <img src="https://raw.githubusercontent.com/anapao-minchaca/Book2Up/main/frontend/img/bg.png" alt="login" className="login__img"></img>
          {/* <header className="login-header"> */}
              <div className="login__form">

                <h1 className="login__title"><span>Book2Up</span></h1>
                <p className="login__description">
                  Bienvenido a Book2Up! Inicia sesión para continuar.
                </p>

                <div className="login__inputs">
                  <label className="login__label">Usuario:</label>
                  <input
                    type="text"
                    placeholder="Escribe tu usuario"
                    name="user"
                    onChange={changeForm}
                    value = {formInfo.user}
                    required
                    className="login__input"
                  />
                  <label className="login__label">Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Escribe tu contraseña"
                    value = {formInfo.password}
                    onChange={changeForm}
                    required
                    className="login__input"
                  />
                </div>

                <div className="login__buttons">
                  <button className="login__button" onClick={submit}>Entrar</button>
                  <Link to="/"><button className="login__button login__button-ghost">Registrarse</button></Link>
                </div>
              </div>
          {/* </header> */}
      </div>
    </div>  
    </>
  );
};

export default Login;
