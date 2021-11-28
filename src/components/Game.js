import React, { useState, useEffect} from 'react'
import Board from './Board'
import './game.css'
/* <div className='red'></div>
            <div className='green'></div>
            <div className='pink'></div>
            <div className='yellow'></div>
            <div className='purple'></div>*/

function Game() {
    const [solution, setSolution] = useState('')
    const [viewSolution, setViewSolution] = useState(false)
    const colorsToGuess = ['red', 'green', 'pink', 'yellow']
    const arrayOfColors = ['red', 'green', 'pink', 'yellow', 'purple' ]
    const colorsToPick = [];
    const [pickedColor, setPickedColor] = useState('');
    const [currentGuess, setCurrentGuess] = useState([null, null, null, null]);
    const [checkPeg, setCheckPeg] = useState([null, null, null, null])
    const [disabled, setDisabled] = useState(true)
    const [message, setMessage] = useState('');
    const [colorCheckPegs, setColorCheckPegs] = useState([null, null, null, null])
    const [playAgain, setPlayAgain] = useState('')
    // klikom na check guram array u old guesses
    // 
    const [oldGuesses, setOldGuesses] = useState([])
    const [oldCheckPegs, setOldCheckPegs] = useState([]);
    const [nextGuesses, setNextGuesses] = useState([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ])
    const [nextCheckPegs, setNextCheckPegs] = useState([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ])
    

    for(let i = 0; i < 5; i++) {
        colorsToPick.push(
            <div key={i} className= {`${arrayOfColors[i]}`} onClick={(()=> setPickedColor(`${arrayOfColors[i]}`))}></div>
        )
        
    }


    const checkFunction = () => {
      
            //if(currentGuess !==colorsToGuess[i]){
                if(
                    Array.isArray(currentGuess) &&
                Array.isArray(colorsToGuess) &&
                currentGuess.length === colorsToGuess.length &&
                currentGuess.every((val, index) => val === colorsToGuess[index])
                ){
                won();
            }else{
                notCorrect();
             }
    }


    const won = () => {
        setMessage('You won!!!');
        ///setColorCheckPegs(['green'], ['green'], ['green'], ['green']);
        colorCheckPegs.push('green');
        colorCheckPegs.push('green');
        colorCheckPegs.push('green');
        colorCheckPegs.push('green');
        setPlayAgain('Play again?')
    }
    const notCorrect = () => {
        let index = 0;
        let myArray1 = [...currentGuess];
        let myArray2 = [...colorsToGuess];
        for(let i = 0; i < currentGuess.length; i++){
            index += 1;
            if(currentGuess[i] === colorsToGuess[i]){
                colorCheckPegs.push('green');
                myArray1.splice([index],1);
                myArray2.splice([index-1],1);
                console.log(colorCheckPegs)
            }
            
            setCheckPeg([null, null, null, null])
        }
        if(oldGuesses.length === 2){
            console.log('a')
            setMessage('You Lost');
            setSolution('Solution');
            setViewSolution(true);
            setPlayAgain('Play again?')
            
        }
        nextGuesses.pop();
        nextCheckPegs.pop();
        oldCheckPegs.push(checkPeg)
       // console.log(oldCheckPegs)
        console.log(oldGuesses)
        setCheckPeg([null, null, null, null]);
        //setColorCheckPegs([])
        oldGuesses.push(currentGuess);
        setCurrentGuess([null, null, null, null]);
    }
   
    
  const PlayAgain = () => {
    const colorsToPick = [];
    setSolution('');
    setViewSolution(false);
    setPickedColor('')
    setCurrentGuess([null, null, null, null]);
    setCheckPeg([null, null, null, null])
    setDisabled(true)
    setMessage('');
    setColorCheckPegs([])
    setPlayAgain('')
    setOldGuesses([])
    setOldCheckPegs([]);
    setNextGuesses([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ])
    setNextCheckPegs([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ])

  }


    return  (
    <div>
        <div className='color-picker'>
           {colorsToPick}
        </div>
        <Board 
            pickedColor={pickedColor}
            currentGuess={currentGuess}
            oldGuesses={oldGuesses}
            setCurrentGuess={setCurrentGuess}
            checkPeg = {checkPeg}
            setCheckPeg={setCheckPeg}
            nextGuesses={nextGuesses}
            nextCheckPegs={nextCheckPegs}
            checkFunction={checkFunction}
            colorCheckPegs={colorCheckPegs}
            oldCheckPegs={oldCheckPegs}
            disabled={disabled}
         />
         <div>{message}</div>
         <div>{solution}</div>
         { viewSolution &&
         <div className='row'>
            <div className='solution' style={{backgroundColor:colorsToGuess[0]}}></div>
            <div className='solution' style={{backgroundColor:colorsToGuess[1]}}></div>
            <div className='solution' style={{backgroundColor:colorsToGuess[2]}}></div>
            <div className='solution' style={{backgroundColor:colorsToGuess[3]}}></div>
         </div>
         }
         <div onClick={PlayAgain} className='play-again'>{playAgain}</div>
    </div>)
}

export default Game



