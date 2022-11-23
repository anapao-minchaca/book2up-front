import React from 'react';
import './Pagination.css'

const Pagination =({postPerPage, totalPosts, paginate})=> {
  const pageNumbers = []

  for (let i =0;i <Math.ceil(totalPosts/postPerPage);i++){
    pageNumbers.push(i);
  }
  return (
      <div>
        <ul className='pagination-area'>
          {pageNumbers.map((number)=>{
            return(
              <li key={number}>
                <div className='index-number' onClick={()=>{paginate(number+1)}}>{number+1}</div>
            </li>
            )
            
          })}
        </ul>
      </div>
  );
}

export default Pagination;