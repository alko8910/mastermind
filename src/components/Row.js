import './row.css'
import React from 'react'
import Peg from './Peg';


function Row(pickedColor) {
    let row = [];
 
    for (let i = 0; i < 4; i++) {
        row.push(
            <Peg 
           
            />
        )
    }
  /*  let tiles = [...row]
    const clickedRow = () => row.map((i, index) => {
        return <Peg value={row[index]} key={index} style={{backgroundColor:'red'}} onClick={colorPeg}/> 
    })
    
     <Peg key={i} style={{color: 'red'}} onClick={colorPeg}/>
     */
    //console.log(clickedRow)
    
    //console.log(pickedColor)
    return (
        <div className='row'>
            {row}
            <button className='check-button'>Check</button>
            <div className='check-pegs'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Row
