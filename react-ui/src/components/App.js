import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
// import {debounce} from 'throttle-debounce';
import {throttle} from 'throttle-debounce';

// import injectTapEventPlugin from 'react-tap-event-plugin';
import {MuiThemeProvider, Dialog, TextField, RaisedButton, FlatButton} from 'material-ui';

import Dots from './Dots.js';
import Form from './Form.js';
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
      value: "",
      charCountErr: false,
    }
    // this.str = '';
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
    this.openInNewTab = this.openInNewTab.bind(this);
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
    $('.temp').remove();
  };

  handleChange(event) {
    // this.str += ;
    if ( event.target.value.length > 140) {
      this.setState({charCountErr: true});
    } else {
      throttle( 200,
        this.setState({
            value: event.target.value,
            charCountErr: false
        })
      )
    }
  }

  closeAndSave() {
    this.setState({
      popupOpen: false,
      charCountErr: false
    });
    //calculate size based on value
    let valLength = this.state.value.length;
    if (valLength <= 15) {
      this.size = '10px';
    }
    if (valLength > 15 && valLength <= 30) {
      this.size = '20px'
    }
    if (valLength > 30 && valLength <= 60) {
      this.size = '40px'
    }
    if (valLength > 60 && valLength <= 120) {
      this.size = '80px'
    }
    if (valLength > 120 && valLength <= 140) {
      this.size = '120px'
    }
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
    $( ".tooltip" ).hover(
      function(event) {
        var dotSize = $(event.target).css('height');
        dotSize = dotSize.split('px')
        dotSize = parseInt(dotSize[0]) / 2;
        var div = $(event.target).children();
        var left = -105 + dotSize;
        $(div[0]).css({'top': dotSize, 'left': left});
      }
    );

  })
  .catch( error => console.log(error));
}

  openInNewTab(url) {;
    var win = window.open(url, '_blank');
    win.focus();
  }

  render () {
    $( ".tooltip" ).hover(
      function(event) {
        var dotSize = $(event.target).css('height');
        dotSize = dotSize.split('px')
        dotSize = parseInt(dotSize[0], 10) / 2;
        var div = $(event.target).children();
        var left = -105 + dotSize;
        $(div[0]).css({'top': dotSize, 'left': left});
      }
    );


    // const style = {
    //   height: 100,
    //   width: 100,
    //   margin: 20,
    //   textAlign: 'center',
    //   display: 'inline-block',
    //   zIndex: 20000
    // };

    var dialogAttrs = {
      modal: false,
      bodyStyle: {padding: "0px"},
      style: {textAlign: "center", padding: "0px"},
    }


    return (
      <MuiThemeProvider>
        <div id='room' onClick={this.addDot} >
          {/* <div style={{marginTop:'20px', marginLeft: '15px', fontFamily: 'Helvetica'}}>There are {this.state.dots.length} dots and thoughts.</div> */}
          <Dots dots={this.state.dots} sentiment={this.state.sentimentArr}/>
          <Form
            value={this.state.value}
            handleChange={this.handleChange}
            charCountErr={this.charCountErr}
            popupOpen={this.state.popupOpen}
            handleFormClose={this.handleFormClose}
          />
          <Intro
            open={this.state.open}
            handleClose={this.handleClose}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
