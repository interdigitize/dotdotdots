import React from 'react';
import '../css/Dot.css';

const Dot = (props) => {

  var divStyle = {
    position: 'absolute',
    top: props.dot.ycord,
    left: props.dot.xcord,
    width: props.dot.size,
    height: props.dot.size,
    borderRadius: props.dot.size,
    backgroundColor: props.dot.color,
    hover: props.hover,
  }
  // this.sentiment = props.dot.sentiment;
  // this.score = props.dot.score

  return (
    <div className="tooltip" style={divStyle}>
      <span className="tooltiptext">{props.dot.note}</span>
    </div>
  )
}

export default Dot;
