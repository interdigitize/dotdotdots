import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {throttle} from 'throttle-debounce';
import {MuiThemeProvider} from 'material-ui';
import MenuBtn from 'react-icons/lib/md/menu';

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
      charCountErr: false,
      drawerOpen: false,
    }
    this.xcord = undefined;
    this.ycord = undefined;
    this.size = '24px';
    this.color = 'yellow';
    // injectTapEventPlugin();
    this.handleIntroClose = this.handleIntroClose.bind(this);
    this.addDot = this.addDot.bind(this);
    this.closeAndSave = this.closeAndSave.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.incrementLike = this.incrementLike.bind(this);
    this.openInNewTab = this.openInNewTab.bind(this);
    this.dotHover = () => {
      return ($( ".tooltip" ).hover(
        function(event) {
          var dotSize = $(event.target).css('height');
          dotSize = dotSize.split('px')
          dotSize = parseInt(dotSize[0], 10) / 2;
          var div = $(event.target).children();
          var left = -90 + dotSize;
          $(div[0]).css({'top': dotSize, 'left': left});
        })
      )
    }
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
      this.dotHover();
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

  handleIntroClose () {
    this.setState({open: false, drawerOpen: true});
  };

  handleFormClose () {
    this.setState({popupOpen: false});
    $('.temp').remove();
  };

  handleFormInputChange(event) {
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
      this.dotHover();

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

  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  render () {
    this.dotHover();

    return (
      <MuiThemeProvider>
        <div>
          <div id='mobileIntro'>
            <h1>Dot Dot Dots</h1>
            <span style={{fontSize: '.8em'}}>Click to add a dot and a thought.</span>
          </div>
          <Intro
            open={this.state.open}
            handleClose={this.handleIntroClose}
            openInNewTab={this.openInNewTab}
          />
          <SideDrawer
            drawerOpen={this.state.drawerOpen}
            handleToggle={this.handleDrawerToggle}
            dots={this.state.dots}
            openInNewTab={this.openInNewTab}
            id='drawer'
          />
          <MenuBtn id='menuBtn' style={{zIndex: '100', paddingTop: '20px', paddingLeft: '20px'}}onClick={this.handleDrawerToggle}>menu</MenuBtn>

          <Dots
            dots={this.state.dots}
            incrementLike={this.incrementLike}
            openInNewTab={this.openInNewTab}
            addDot={this.addDot}
            dotHover={this.dotHover}

          />
          <Form
            value={this.state.value}
            handleChange={this.handleFormInputChange}
            charCountErr={this.charCountErr}
            popupOpen={this.state.popupOpen}
            handleFormClose={this.handleFormClose}
            closeAndSave={this.closeAndSave}
          />
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
