import React, { useState, useEffect } from 'react'
import Board from './Board'
import './game.css'

function Game() {
    const [colorsToGuess, setColorsToGuess] = useState([])
    const arrayOfColors = ['red', 'green', 'pink', 'yellow', 'purple']
    const colorsToPick = [];
    const [pickedColor, setPickedColor] = useState('');
    const [currentGuess, setCurrentGuess] = useState([null, null, null, null]);
    // klikom na check guram array u old guesses
    // 
    const [oldGuesses, setOldGuesses] = useState([])


    for (let i = 0; i < 5; i++) {
        colorsToPick.push(
            <div key={i} className={`${arrayOfColors[i]}`} onClick={(() => setPickedColor(`${arrayOfColors[i]}`))}></div>
        )

    }
    console.log(colorsToGuess)
    //shuffle colors
    useEffect(() => {
        const number = Math.floor(Math.random() * 5);
        const newArray = [...arrayOfColors];
        newArray.splice(number, 1)
        newArray.sort(() => .5 - Math.random());
        setColorsToGuess(newArray)
    }, [])

    //check for win
    const checkFunction = () => {
        setOldGuesses([...oldGuesses, currentGuess]);
        setCurrentGuess([null, null, null, null]);
    }


    //set all parameter for new game
    const playAgain = () => {
        setOldGuesses([]);
        setCurrentGuess([null, null, null, null]);
    }

    const hasWon = () => {
        const lastGuess = oldGuesses.slice(-1)[0] || [];
        const exactMatches = lastGuess.filter((elem, i) => colorsToGuess[i] === elem).length;
        return exactMatches === 4;
    }

    const renderMessage = () => {

        if (hasWon()) {
            return 'You Won';
        } else {
            return 'You Lost';
        }
    }


    return (
        <div>
            <div className='color-picker'>
                {colorsToPick}
            </div>
            <Board
                pickedColor={pickedColor}
                currentGuess={currentGuess}
                oldGuesses={oldGuesses}
                setCurrentGuess={setCurrentGuess}
                colorsToGuess={colorsToGuess}
                checkFunction={checkFunction}
                isGameOver={oldGuesses.length === 10 || hasWon()}
            />
            {(oldGuesses.length === 10 || hasWon()) && (
                <>
                    <div>{renderMessage()}</div>
                    <div>Solution</div>
                    <div className='row'>
                        <div className='solution' style={{ backgroundColor: colorsToGuess[0] }}></div>
                        <div className='solution' style={{ backgroundColor: colorsToGuess[1] }}></div>
                        <div className='solution' style={{ backgroundColor: colorsToGuess[2] }}></div>
                        <div className='solution' style={{ backgroundColor: colorsToGuess[3] }}></div>
                    </div>
                    <div onClick={playAgain} className='play-again'>Play again</div>
                </>
            )}
        </div>)
}

export default Game



