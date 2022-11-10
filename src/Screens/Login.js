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
      <header className="login-header">
          <h1>Iniciar Sesión</h1>

          <div className="elementoForma">
            <label>Usuario:</label>
            <input
              type="text"
              placeholder="Escribe tu usuario"
              name="user"
              onChange={changeForm}
              value = {formInfo.user}
            />
          </div>
          <div className="elementoForma">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="Escribe tu contraseña"
              value = {formInfo.password}
              onChange={changeForm}
            />
          </div>
          <button className="button" onClick={submit}>Entrar</button>
          <Link to="/"><button>Registrarse</button></Link>
      </header>
      
    </>
  );
};

export default Login;
