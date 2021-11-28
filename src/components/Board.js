import React from 'react'
import Row from './Row';
function Board({
    pickedColor,
    oldGuesses,
    currentGuess,
    setCurrentGuess,
    checkPeg,
    setCheckPeg,
    nextGuesses,
    nextCheckPegs,
    checkFunction,
    colorCheckPegs,
    oldCheckPegs,
    disabled
}) {

    ///// probaj napraviti check pegs kao sto je napravljen render row
    const renderRow = (guessArray) => {
   
        const data = guessArray.map((color, i) => {
            //console.log(guessArray)
            const onClick = () => {
                const newArray = [...currentGuess];
                newArray[i] = pickedColor;
                setCurrentGuess(newArray)
            };
                return <div className="peg" style={{ backgroundColor: color}} onClick={onClick} />
        });
        
        return (
            <div  className="row">
            <div class="row">{data}</div>
            <button className='check-button' onClick={checkFunction} >Check</button>
           </div>
        );
    }
    
    const renderOldRow = (guessArray) => {
        const data = guessArray.map((color, i) => {
            return <div className="peg" style={{ backgroundColor: color}} />
        });
        return (
            <div  className="row">
                <div  className="row">{data}</div>
                <button className='check-button'>Check</button>
            </div>
        );
    }

    const renderCheckPegs = (checkPeg) => {
        const data = checkPeg.map((index, i) => {
            return <div key= {i + 1 } ></div>
        })
        return <div className='check-pegs' >{data}</div>
    }
    const renderNextGuesses = (emptyPegs) =>{
        const data = emptyPegs.map(() => {
            return <div className='peg'></div>
      
        })
        return <div className='row'>
            <div className='row'>{data}</div>
            <button className='check-button' disabled={disabled}>Check</button>
        </div>
    }
    const renderNextCheckPegs = (arr) => {
        const data = arr.map((i) => {
            return <div></div>
        })
        return <div className='row'>
            <div className='check-pegs'>{data}</div>
        </div>
    }
    const renderOldCheckPegs =(arr) => {
        const data = arr.map((color, i) => {
            return <div style={{backgroundColor : colorCheckPegs[i]}}></div>
        })
        return <div className='check-pegs'>{data}</div>
    }

    return (
        <div>
            
            <div className='row'>
                <div>
                    {oldGuesses.map(renderOldRow)}
                </div>
                <div>
                    {oldCheckPegs.map(renderOldCheckPegs)}
                </div>
            </div>
            
            <div className='row'>
                {renderRow(currentGuess)}
                {renderCheckPegs(checkPeg)}
            </div>
            <div className='row'>
                <div>
                    {nextGuesses.map(renderNextGuesses)}
                </div>
                <div>
                    {nextCheckPegs.map(renderNextCheckPegs)}
                </div>
            </div>
        </div>
    )
}

export default Board
