import React, { Component } from 'react';
import '../css/Dot.css';
import Twitter from 'react-icons/lib/fa/twitter';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';

class Dot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      mouseTracked: false,
    }
    this.divStyle = {
      position: 'absolute',
      top: this.props.dot.ycord,
      left: this.props.dot.xcord,
      width: this.props.dot.size,
      height: this.props.dot.size,
      borderRadius: this.props.dot.size,
      backgroundColor: this.props.dot.color,
      size: this.props.dot.size,
      // hover: props.hover,
    }
    // this.sentiment = props.dot.sentiment;
    // this.score = props.dot.score
    this.showPopover = this.showPopover.bind(this);
    this.hidePopover = this.hidePopover.bind(this);
    this.trackMouse = this.trackMouse.bind(this);
    this.untrackMouse = this.untrackMouse.bind(this);
  }

  showPopover() {
    this.setState({ isOpen: true });
  }

  hidePopover() {
    this.setState({ isOpen: false });
  }

  trackMouse() {
    this.setState({ mouseTracked: true });
    if (!this.state.isOpen) {
      this.showPopover();
    }
  }

  untrackMouse() {
    this.setState({ mouseTracked: false });
    setTimeout(() => {
      if (!this.state.mouseTracked) {
        this.hidePopover();
      }
    }, 100);
  }

  render() {
    let tooltipLeft = -80 + parseInt(this.props.dot.size, 10) / 2;
    let tooltipTop = parseInt(this.props.dot.size, 10) / 2;
    let dotXcord = parseInt(this.props.dot.xcord.split('px')[0], 10);
    let dotYcord = parseInt(this.props.dot.ycord.split('px')[0], 10);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight - 50;
    var popUpAltered = false;

    if (dotXcord - Math.abs(tooltipLeft) < 0 ) {
      let cushion = Math.abs(tooltipLeft) - dotXcord + 5 ;
      tooltipLeft += cushion
    } else if (dotXcord + Math.abs(tooltipLeft) + (parseInt(this.props.dot.size, 10)) > screenWidth ) {
      let cushion = dotXcord + Math.abs(tooltipLeft) + 5 + parseInt(this.props.dot.size, 10) - screenWidth;
      tooltipLeft -= cushion;
    }

    if (dotYcord + Math.abs(tooltipTop) < 80  && screenWidth < 769) {
      tooltipTop += 50;
    } else if (dotYcord + Math.abs(tooltipTop) + parseInt(this.props.dot.size, 10) > screenHeight ) {
      let cushion = dotYcord + Math.abs(tooltipTop) + 90 + parseInt(this.props.dot.size, 10) - screenHeight;
      tooltipTop -= cushion;
    }

    if (tooltipTop !== parseInt(this.props.dot.size, 10) / 2 || tooltipLeft !== -80 + parseInt(this.props.dot.size, 10) / 2) {
      popUpAltered = true;
    }


    var popoverBody = (
      <div
        style={{left: tooltipLeft, top: tooltipTop }}
        className={ popUpAltered ? "tooltiptext hidden" : "tooltiptext"}
        onMouseEnter={this.trackMouse}
        onMouseLeave={this.untrackMouse}
        onClick={this.untrackMouse}
      >
        <div id='note' style={{padding: '10px'}}> {this.props.dot.note}</div>
          <div>
            <span
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
                onClick={() => this.props.incrementLike(this.props.dot)}
              >
                <ThumbsUp />
                <span style={{paddingLeft: '3px', fontSize: '.8em'}}>
                  {this.props.dot.likes}
                </span>
              </span>
              <Twitter
                className='icon'
                onClick={() => this.props.openInNewTab(`https://twitter.com/share?ref_src=twsrc%5Etfw&hashtags=dotdotdots&text=${this.props.dot.note}`, '_target')}
                data-show-count="false"
              />
            </span>
          </div>
        </div>
    );

    return (

      <div
        onClick={this.trackMouse}
        className='tooltip'
        onMouseEnter={() => this.trackMouse(popoverBody)}
        onMouseLeave={this.untrackMouse}
        style={this.divStyle}>
        {this.state.isOpen ? popoverBody : <span></span>}
      </div>
    )
  }
}

export default Dot;
