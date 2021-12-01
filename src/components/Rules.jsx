import React, {useState} from 'react'
import './rules.css'
export default function Rules() {
    
    const [showRules, setShowRules] = useState('Show Rules');
    const linkToWiki = 'https://en.wikipedia.org/wiki/Mastermind_(board_game)';
    const showRule = () => {
        showRules === ('Hide Rules') ? setShowRules('Show Rules') : setShowRules('Hide Rules');
     }
   const style = {
       display: showRules === ( 'Hide Rules') ? 'block' : 'none'
   }

    return (
        <div>
            <h1>Mastermind</h1>
            <div className='first-div'>
            <h2 onClick={showRule}> {showRules}</h2>
            <p style={style}>Try to guess the pattern, in both order and
        color, within ten turns. After submitting a row,
        a small green squared is show for each circle
        in a correct position and color. A yellow square
        indicates the existence of a correct color in an
        incorrect position. <br />
        More info on <a href={linkToWiki}>Wikipedia</a>.</p>
            </div>
            

        </div>
    )
}
