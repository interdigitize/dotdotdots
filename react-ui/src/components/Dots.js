import React from 'react';
import Dot from './Dot.js';

const Dots = (props) => {
  props.dotHover()
  
  return (
    <div id='dots'>
      { props.dots.length === 0 ?
        <span></span> :
        props.dots.map((dot, index) => {
          // props.sentiment.push(dot.sentiment);
          return <Dot dot={dot} key={index} incrementLike={props.incrementLike} openInNewTab={props.openInNewTab}/>
        })
      }
      <div id='room' onClick={props.addDot}></div>
      <div id='mobileOutro'>
        <span>Visit on your desktop for a bigger canvas.</span>
      </div>
    </div>
  )
}
export default Dots;
