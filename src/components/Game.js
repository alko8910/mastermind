import React, { useState, useEffect} from 'react'
import Board from './Board'
import './game.css'

function Game() {
    const [styleActive, setStyleActive] = useState('')
    const [solution, setSolution] = useState('')
    const [viewSolution, setViewSolution] = useState(false)
    const [colorsToGuess, setColorsToGuess] = useState([])
    const arrayOfColors = ['red', 'green', 'pink', 'yellow', 'purple' ]
    const colorsToPick = [];
    const [pickedColor, setPickedColor] = useState('');
    const [currentGuess, setCurrentGuess] = useState([null, null, null, null]);
    const [checkPeg, setCheckPeg] = useState([null, null, null, null])
    const [disabled, setDisabled] = useState(true)
    const [message, setMessage] = useState('');
    const [colorCheckPegs, setColorCheckPegs] = useState([])
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
  //shuffle colors
useEffect(() => {
    const number = Math.floor(Math.random() * 5);
        const newArray = [...arrayOfColors];
        newArray.splice(number, 1)
        newArray.sort(() => .5 - Math.random() );
        setColorsToGuess(newArray)
    
}, [])
    
    
 
    // set button to active
    useEffect(() =>{
        if(currentGuess.includes(null)){
            setStyleActive('')
        }else{
            setStyleActive('blue')
        }
    },[currentGuess])
    const style = {
        color: `${styleActive}`
        
        }
        //check for win
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
                //if row is not correct
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
        if(currentGuess.includes(null)){
            return
        }else{
            for(let i = 0; i < currentGuess.length; i++){
            
                if(currentGuess[i] === colorsToGuess[i]){
                    index += 1;
                    colorCheckPegs.push('green');
                    myArray1.splice([index],1);
                    myArray2.splice([index-1],1);
                    console.log(colorCheckPegs)
                }
                
                setCheckPeg([null, null, null, null])
            }
            // set endgame for no more attemptws
            if(oldGuesses.length === 9){
                
                setMessage('You Lost');
                setSolution('Solution');
                setViewSolution(true);
                setPlayAgain('Play again?')
                setNextCheckPegs([  ])

            }
        }
       
        nextGuesses.pop();
        nextCheckPegs.pop();
        oldCheckPegs.push(checkPeg)
       // console.log(oldCheckPegs)
       
        setCheckPeg([null, null, null, null]);
        //setColorCheckPegs([])
        oldGuesses.push(currentGuess);
        setCurrentGuess([null, null, null, null]);
    }
   
    //set all parameter for new game
  const PlayAgain = () => {
    const number = Math.floor(Math.random() * 5);
    const newArray = [...arrayOfColors];
    newArray.splice(number, 1)
    newArray.sort(() => .5 - Math.random() );
    console.log(newArray)
    setColorsToGuess(newArray)
    console.log(colorsToGuess)
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

  const hasWon = () => {
    const lastGuess = oldGuesses.slice(-1)[0] || [];
    const exactMatches = lastGuess.filter((elem, i) => colorsToGuess[i] === elem);

    return exactMatches === 4;
  }

  const renderMessage = () => {

      if (hasWon()) {
          return 'You Won';
      } else {
          return 'You Lost';
      }
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
            style={style}
            colorsToGuess={colorsToGuess}
         />
         {(oldGuesses.length === 10 || hasWon()) && (
             <>
                <div>{renderMessage()}</div>
                <div>Solution</div>
                <div className='row'>
                    <div className='solution' style={{backgroundColor:colorsToGuess[0]}}></div>
                    <div className='solution' style={{backgroundColor:colorsToGuess[1]}}></div>
                    <div className='solution' style={{backgroundColor:colorsToGuess[2]}}></div>
                    <div className='solution' style={{backgroundColor:colorsToGuess[3]}}></div>
                </div>
                <div onClick={PlayAgain} className='play-again'>{playAgain}</div>
            </>
         )}
    </div>)
}

export default Game



