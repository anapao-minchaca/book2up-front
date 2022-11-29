import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import store from "../Store/store";
import instance from '../api/book2up'
import { useNavigate } from 'react-router-dom';
import { setLocalCart } from "../Store/slices/localCartSlice";
import {setHistory} from '../Store/slices/historySlice'
const TableInventory = ({ elementos }) => {
  const [quantity, setQuantity] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [elementsInCart, setElementsInCart] = useState(elementos);
  useEffect(() => {
    setLoading(true);
    let object = {};
    elementos.forEach((element) => {
      object = { ...object, [element.SKU]: element.cantidad };
    });
    setQuantity(object);
    setLoading(false);
  }, []);

  const changeValue = (event) => {
    const { name, value } = event.target;
    if(value<0){
      setQuantity({ ...quantity, [name]: 1 });
    }
    else{
      setQuantity({ ...quantity, [name]: value });
    }
    store.dispatch(setLocalCart(quantity));
  };

  const deleteFromCart = (SKU) => {
    let newElements = [];
    let updatedCart = {};
    for (let key in quantity) {
      if (key !== SKU) {
        updatedCart = { ...updatedCart, [key]: quantity[key] };
      }
    }
    elementsInCart.forEach((element) => {
      if (element.SKU !== SKU) {
        newElements.push(element);
      }
    });
    setQuantity(updatedCart);
    if(Object.keys(updatedCart).length !== 0){
       store.dispatch(setLocalCart(updatedCart));
       setElementsInCart(newElements);
    }
   else{
    store.dispatch(setLocalCart(null))
    setElementsInCart(null);
   }
    
  };
  const renderElements = () => {
    return elementsInCart.map((item) => {
      return (
        <tr key={item.SKU}>
          <td className="table-element">{item.titulo}</td>
          <td className="table-element">
            <input
              type="number"
              name={item.SKU}
              min="1"
              max="10"
              value={quantity ? quantity[item.SKU] : 1}
              onChange={changeValue}
            />
          </td>
          <td className="table-element">
            {quantity ? quantity[item.SKU] * item.precio : item.precio}
          </td>
          <td className="table-element">
            <button onClick={() => deleteFromCart(item.SKU)}>Eliminar</button>
          </td>
        </tr>
      );
    });
  };
  const calculateTotal = () => {
    const total = elementsInCart.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual.precio * quantity[valorActual.SKU];
    }, 0);
    return total;
  };
  const purchaseELements=async()=>{
    const cartItem = {productos:quantity, total: calculateTotal()}
    try{
      const response = await instance.post('/purchase', cartItem);
      store.dispatch(setLocalCart(null));
      const updatedHistory = await instance.get("/purchase-history");
      store.dispatch(setHistory(updatedHistory.data));
      alert(response.data)
      navigate('/')
    }catch(e){
      console.error(e)
    }
  }
  return (loading ? (
    <LoadingSpinner />
  ) : elementsInCart?(
    <div>
      <table className="table-product">
        <thead>
          <tr>
            <th className="table-element">Titulo</th>
            <th className="table-element">cantidad</th>
            <th className="table-element">Subtotal</th>
          </tr>
        </thead>
        <tbody>{renderElements()}</tbody>
      </table>

      <div className="payment">
        <div>{quantity ? `Total a pagar $${calculateTotal()}` : "0"}</div>
        <div>
          <button onClick={() => purchaseELements()}>Pagar</button>
        </div>
      </div>
    </div>
  ):<>No hay elementos en el carrito</>);
};
export default TableInventory;
