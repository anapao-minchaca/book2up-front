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
import {setCart} from './Store/slices/cartSlice'
import BookDetails from './Screens/BookDetails';
import Cart from './Screens/Cart';
function App() {
  const { token } = useSelector(state => state.auth);
  useEffect(()=>{
      const getData = async()=>{
        try{
          const response = await instance.get('/bookdata')
          store.dispatch(setBooks(response.data))
          const cart = await instance.get('/cartdata')
          store.dispatch(setCart(cart.data))
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
            <Route exact path="/book/:id" element={<BookDetails />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
      </div>
    )
    
  }

  
}

export default App;