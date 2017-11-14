import React from 'react';
import Dialog from 'material-ui/Dialog';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';

class Dot extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      anchorEl: undefined
    }
    this.divStyle = {
      position: 'absolute',
      top: props.dot.ycord,
      left: props.dot.xcord,
      width: props.dot.size,
      height: props.dot.size,
      borderRadius: props.dot.size,
      backgroundColor: props.dot.color
    }
    this.note = props.dot.note
    this.sentiment = props.dot.sentiment;
    this.score = props.dot.score
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  handleOpen(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });

    setTimeout(() => {
      this.setState({
        open: false,
      });
    }, 2000);
  }

  handleClose() {

  }

  render() {
    return (
      <div>
        <div style={this.divStyle}
          label="Dialog"
          onMouseEnter={this.handleOpen} >
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'middle', vertical: 'top'}}
          style={{padding: '10px'}}
          onMouseLeave={this.handleClose}
          animation={PopoverAnimationVertical}>
          <div>{this.note}</div>
          <div style={{fontSize: '10px'}}>sentiment: {this.sentiment}</div>
        </Popover>

      </div>

    )
  }
}

export default Dot;
