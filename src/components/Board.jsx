import React from 'react'
import Row from './Row';
function Board({
    pickedColor,
    oldGuesses,
    currentGuess,
    setCurrentGuess,
    checkFunction,
    colorsToGuess,
    viewSolution,
    isGameOver
}) {

    ///// probaj napraviti check pegs kao sto je napravljen render row
    const renderRow = (guessArray) => {
        if (oldGuesses.length < 10) {
            const data = guessArray.map((color, i) => {
                const onClick = () => {
                    if (!isGameOver) {
                        const newArray = [...currentGuess];
                        newArray[i] = pickedColor;
                        setCurrentGuess(newArray)
                    }
                };
                return <div className="peg" style={{ backgroundColor: color}} onClick={onClick} />
            });
            
            return (
                <div  className="row">
                    <div class="row">{data}</div>
                    <button
                        className='check-button'
                        disabled={currentGuess.includes(null)}
                        onClick={checkFunction}
                    >Check</button>
                    {renderCheckPegs([])}
                </div>
            );
        }
    }
       
    
    const renderOldRow = (guessArray) => {
        const data = guessArray.map((color, i) => {
            return <div className="peg" style={{ backgroundColor: color}} />
        });
        return (
            <div  className="row">
                <div  className="row">{data}</div>
                <button className='check-button'>Check</button>
                {renderCheckPegs(guessArray)}
            </div>
        );
    }

    const renderNextRow = () => {
        const data = [null, null, null, null].map((color, i) => {
            return <div className="peg" style={{ backgroundColor: color}} />
        });
        return (
            <div  className="row">
                <div  className="row">{data}</div>
                <button className='check-button' disabled>Check</button>
                {renderCheckPegs([])}
            </div>
        );
    }

    const renderNextRows = () => {
        const rowsToRender = 10 - oldGuesses.length - 1;
        const rows = [];

        for(let i = 0; i < rowsToRender; i++) {
            rows.push(renderNextRow());
        }

        return rows;
    }

    const renderCheckPegs = (guess) => {
        const exactMatches = guess.filter((elem, i) => colorsToGuess[i] === elem).length;
        let nonExactMatches = 0;

        const guessCopy = [...guess];
        for(let elem of colorsToGuess) {
            const index = guessCopy.indexOf(elem);
            if (index >= 0) {
                guessCopy.splice(index, 1);
                nonExactMatches++;
            }
        }
        nonExactMatches -= exactMatches;
        const remainder = 4 - nonExactMatches - exactMatches;

        const pegs = [];
        
        for (let i = 0; i < exactMatches; i++) {
            
            pegs.push(<div style={{backgroundColor: 'green'}} />);
        }
        for (let i = 0; i < nonExactMatches; i++) {
            pegs.push(<div style={{backgroundColor: 'yellow'}} />);
        }
        for (let i = 0; i < remainder; i++) {
            pegs.push(<div />);
        }

        return <div className='check-pegs' >{pegs}</div>
    }
    
  
    return (
        <div>
            
            {oldGuesses.map(renderOldRow)}
            {oldGuesses.length < 10 && renderRow(currentGuess)}
            {renderNextRows()}
        </div>
    )
}

export default Board