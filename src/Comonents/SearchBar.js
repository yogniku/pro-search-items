import React from 'react'
import {useEffect, useState } from 'react';

const SearchBar = () => {

    const[Data,setData]=useState([])
    const[searchTerm,setSerchTerm]=useState(" ")
    
    useEffect(()=>{
      const fechdata=async() => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
          const data= await response.json()
          console.log(data)
         setData(data)
  } catch (error){
    console.error('Error fetching data:', error);
  }
      }
      fechdata();
    },[])
  
    const handleSearch = () => {
      return Data.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
    
     
  
  
    const filteredData = handleSearch();
  return (
    
        
    <div className="App">
    <div style={{marginTop:"20px",marginLeft:"20px",marginRight:"20px",justifyContent:"space-evenly",display:"flex",gap:"5px"}}>
   <input type='text' placeholder='Search By Name or Symbol ' className="searchbar" 
   value={searchTerm} onChange={(e)=>setSerchTerm(e.target.value)}
   
   />
   
 
   <button  className="btn1" onClick={() => ('price_change_percentage_24h')}>Sort by percentage </button>
      <button className='btn2' onClick={() =>('market_cap')}>Sort by Market Cap </button>
      
   </div>
   <table style={{color:"white",width:"1300px",marginLeft:"30px"}}>
        <thead> 
          <tr style={{color:"white",width:"1300px"}}>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((coin) => (
            <tr key={coin.id}>
              <td><img src={coin.image} alt={coin.name} width="30" /></td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
              <td>${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
   
    </div>
  )
}

export default SearchBar