import React from "react";
import { useSelector } from 'react-redux'
import './Books.css'
const Books =()=>{
    const books = useSelector(state => state.books);
    const comprarLibro=(SKU)=>{
        console.log(SKU)
    }
    const generateBooks = ()=>{
        return books.map((book)=>{
            return(
                <div className="card" >
                    <img src={book.img} alt={book.titulo}/>
                    <div className="info">
                        <h1>{book.titulo}</h1>
                        <p>{book.autor}</p>
                        <p className="price">{`$ ${book.precio}`}</p>
                    </div>
                    <button onClick={()=>comprarLibro(book.SKU)} className="comprar-buton">Comprar</button>
                </div>
            )
        })
    }
    return(
        <div className="books-area">
        {generateBooks()}
        </div>
    )
}

export default Books