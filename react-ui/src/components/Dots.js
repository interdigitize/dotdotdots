import React from 'react';
import Dot from './Dot.js';

const Dots = (props) => (

  <div>
    { props.dots.length === 0 ?
      <span></span> :
      props.dots.map((dot, index) => {
        // props.sentiment.push(dot.sentiment);
        return <Dot dot={dot} key={index} incrementLike={props.incrementLike} openInNewTab={props.openInNewTab}/>
      })
    }
  </div>
)

export default Dots;
