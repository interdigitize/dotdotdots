import React from 'react';
import Dot from './Dot.js';
import '../css/Dots.css';

const Dots = (props) => {

  return (
    <div id='dots'>
      { props.dots.length === 0 ?
        <span></span> :
        props.dots.map((dot, index) => {
          // props.sentiment.push(dot.sentiment);
          return <Dot
                    dot={dot}
                    key={index}
                    incrementLike={props.incrementLike}
                    openInNewTab={props.openInNewTab}
                 />
        })
      }
      <div id='mobileOutro'>
        <span>Visit on your desktop for a bigger canvas.</span>
      </div>
      <div id='room' onClick={props.addDot}></div>
    </div>
  )
}
export default Dots;
