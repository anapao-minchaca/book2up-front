import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Login from './Screens/Login'
import Home from './Screens/Home'
import Books from './Screens/Books'
import Navigation from "./Components/Navigation";
import instance from './api/book2up';
import store from './Store/store'
import {setBooks} from './Store/slices/booksSlice'

function App() {
  const { token } = useSelector(state => state.auth);
  useEffect(()=>{
      const getData = async()=>{
        try{
          const response = await instance.get('/bookdata')
          store.dispatch(setBooks(response.data))
        }
        catch(e){
          console.error(e)
        }
      }
      if(token)
      {getData()}
      
     
  },[token])
  if(!token)
  {
    return (
      <div className="">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    );
  }
  else{
    return(
      <div className="">
          <Navigation/>
          <Routes>
            <Route path="/" element={<Books />} />
          </Routes>
      </div>
    )
    
  }

  
}

export default App;