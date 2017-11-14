import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import {MuiThemeProvider, Dialog, TextField, RaisedButton, FlatButton} from 'material-ui';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';

import Dots from './Dots.js';
import Dot from './Dot.js';
import '../css/App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: [],
      sentimentArr: [],
      sentiment: 'neutral',
      open: true,
      popupOpen: false,
      anchorEl: undefined,
      value: ""
    }
    this.xcord = undefined;
    this.ycord = undefined;
    this.size = '24px';
    this.color = 'yellow';
    // injectTapEventPlugin();
    this.handleClose = this.handleClose.bind(this);
    this.addDot = this.addDot.bind(this);
    this.closeAndSave = this.closeAndSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  componentDidMount() {
    axios.get('/dots')
    .then( response => {
      this.setState({
        dots: response.data
      })
    })
    .catch( error => console.log(error) );
  }

  colorSurprise() {
    function randomizer(){
      return Math.floor(Math.random() * (255 - 20) + 20);
    }
    this.color = `rgb(${randomizer()}, ${randomizer()}, ${randomizer()})`
  }

  addDot(e){
    this.showForm(e);
    this.colorSurprise();
    var $div = $('<div>');
    this.xcord = (e.clientX - 20) + 'px';
    this.ycord = (e.clientY - 12) + 'px';
    $div.css({
      top: this.ycord,
      left: this.xcord,
      position: 'absolute',
      width: this.size,
      height: this.size,
      borderRadius: this.size,
      border: '2px dashed #666666'
    });
    $div.addClass('temp');
    $('#room').append($div);
  }

  showForm(e) {
    e.preventDefault();
    this.setState({
      popupOpen: true,
      anchorEl: e.currentTarget,
    })
  }

  handleClose () {
    this.setState({open: false});
  };

  handleFormClose () {
    this.setState({popupOpen: false});
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  closeAndSave() {
    this.setState({
      popupOpen: false
    });
    axios.post('/dot', {
      note: this.state.value,
      ycord: this.ycord,
      xcord: this.xcord,
      size: this.size,
      color: this.color
    }, {
      headers: { Accept: "text/javascript"}
    }
  )
  .then( response => {
    let res = this.state.dots.concat(response.data);
    this.setState({
      dots: res,
      value: ''
    })
    $('.temp').remove();

  })
  .catch( error => console.log(error));
}

  render () {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        // onTouchTap={this.handleClose}
      />
    ];
    const style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
      zIndex: 20000
    };

    return (
      <MuiThemeProvider>
        <div id='room' onClick={this.addDot} >
          <div style={{marginTop:'20px', marginLeft: '15px', fontFamily: 'Helvetica'}}>There are {this.state.dots.length} dots and thoughts.</div>
          <Dots dots={this.state.dots} sentiment={this.state.sentimentArr}/>
          <Popover
            open={this.state.popupOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
            targetOrigin={{horizontal: 'middle', vertical: 'center'}}
            style={{padding: '10px'}}
            animation={PopoverAnimationVertical}
          >
            <TextField
              hintText="What's on your mind?"
              multiLine={true}
              rows={1}
              rowsMax={4}
              value={this.state.value}
              onChange={this.handleChange}
            />
            <RaisedButton label="Submit" primary={true} onClick={this.closeAndSave}/>
          </Popover>
          <Dialog
            title="Dot Dot Dots"
            // actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            style={{textAlign: 'center'}}>
            <h3>Leave a dot and a thought, then check back to see the page transform into a blur of thoughts and colors.</h3>
            <p style={{fontSize: '0.8em'}}>Inspired by <a href='https://www.designboom.com/art/yayoi-kusama-david-zwirner-obliteration-room-new-york-05-26-2015/'>yayoi kusama's dot-covered obliteration room</a>.</p>
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
