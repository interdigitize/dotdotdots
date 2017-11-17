import React from 'react';
import '../css/Dot.css';
import Twitter from 'react-icons/lib/fa/twitter';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import $ from 'jquery';

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
      <span className="tooltiptext">
        <div style={{padding: '20px'}}>{props.dot.note}</div>
        <div
          style={{
            backgroundColor: '#e9e9e9',
            fontSize: '1em',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px',
            borderRadius: '0 0 6px 6px'
          }}>
          <span
            className='icon'
            onClick={() => {
              props.incrementLike(props.dot)
              $(this).attr('disabled')
            }}
          >
            <ThumbsUp />
            <span
              style={{paddingLeft: '3px', fontSize: '.8em', cursor: 'pointer'}}
            >
              {props.dot.likes}
            </span>
          </span>

            <Twitter
              className='icon'
              onClick={() => props.openInNewTab(`https://twitter.com/share?ref_src=twsrc%5Etfw&hashtags=dotdotdots&text=${props.dot.note}`, '_target')}
              data-show-count="false"
            />

        </div>
      </span>
      {/* <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
    </div>
  )
}

export default Dot;
