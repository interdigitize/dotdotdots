import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {throttle} from 'throttle-debounce';
import {MuiThemeProvider} from 'material-ui';
import MenuBtn from 'react-icons/lib/md/menu';
import fns from '../helperfns'
// import {debounce} from 'throttle-debounce';
// import injectTapEventPlugin from 'react-tap-event-plugin';

import SideDrawer from './SideDrawer.js';
import Dots from './Dots.js';
import Form from './Form.js';
import Intro from './Intro.js';
import '../css/App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: [],
      // sentimentArr: [],
      // sentiment: 'neutral',
      open: false,
      popupOpen: false,
      anchorEl: undefined,
      value: "",
      charCountErr: [false, -1],
      drawerOpen: false,
    }
    this.xcord = undefined;
    this.ycord = undefined;
    this.size = '24px';
    this.color = 'yellow';
    // injectTapEventPlugin();
    this.handleIntroClose = this.handleIntroClose.bind(this);
    this.addDot = this.addDot.bind(this);
    this.closeFormSaveDot = this.closeFormSaveDot.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.incrementLike = this.incrementLike.bind(this);
    this.calculateDotSize = fns.calculateDotSize.bind(this);
    this.openInNewTab = fns.openInNewTab.bind(this);
  }

  componentDidMount() {
    axios.get('/dots')
    .then( response => {
      if (window.innerWidth > 769) {
        this.setState({
          dots: response.data,
          open: true
        })
      } else {
        this.setState({
          dots: response.data
        })
      }
    })
    .catch( error => console.log(error) );
  }

  addDot(e){
    this.showForm(e);
    this.color = fns.colorSurprise();
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

  handleIntroClose () {
    this.setState({open: false, drawerOpen: true});
  };

  handleFormClose () {
    this.setState({
      popupOpen: false,
      value: '',
      charCountErr: [false, -1]
    });
    $('.temp').remove();
  };

  handleFormInputChange(event) {
    if (event.target.value.length > 140) {
      this.setState({charCountErr: [true, 140]});
    } else {
      throttle( 200,
        this.setState({
            value: event.target.value,
            charCountErr: [false, -1]
        })
      )
    }
  }

  closeFormSaveDot() {
    if (this.state.value.length === 0) {
      this.setState({
        charCountErr: [true, 0]
      })
      return;
    }
    this.setState({
      popupOpen: false,
      charCountErr: false
    });
    this.size = this.calculateDotSize(this.state.value.length);
    axios.post('/dot', {
      note: this.state.value,
      ycord: this.ycord,
      xcord: this.xcord,
      size: this.size,
      color: this.color,
      likes: 0
    }, {
      headers: { Accept: "text/javascript"}
    })
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

  handleDrawerToggle() {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  incrementLike(dot) {
    dot.likes = ++dot.likes
    axios.put('/dot', {
      dot: dot
    }, {
      headers: { Accept: "text/javascript"}
    })
    .then( response => {
      // $(#).attr('disabled')
      axios.get('/dots')
      .then( response => {
        this.setState({
          dots: response.data
        })
      })
      .catch( error => console.log(error) );
    })
    .catch( error => console.log(error));
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Intro
            open={this.state.open}
            handleClose={this.handleIntroClose}
            openInNewTab={this.openInNewTab}
          />
          <div id='mobileIntro'>
            <h1>Dot Dot Dots</h1>
            <span className='font-sm'>Click to add a dot and a thought.</span>
          </div>
          <SideDrawer
            drawerOpen={this.state.drawerOpen}
            handleToggle={this.handleDrawerToggle}
            dots={this.state.dots}
            openInNewTab={this.openInNewTab}
            id='drawer'
          />
          <MenuBtn id='menuBtn' onClick={this.handleDrawerToggle}>menu</MenuBtn>
          <Dots
            dots={this.state.dots}
            incrementLike={this.incrementLike}
            openInNewTab={this.openInNewTab}
            addDot={this.addDot}
          />
          <Form
            value={this.state.value}
            handleChange={this.handleFormInputChange}
            charCountErr={this.state.charCountErr}
            popupOpen={this.state.popupOpen}
            handleFormClose={this.handleFormClose}
            closeAndSave={this.closeFormSaveDot}
          />
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
