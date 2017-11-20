import React from 'react';
import {Drawer} from 'material-ui';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import Clear from 'react-icons/lib/md/clear';
import Facebook from 'react-icons/lib/fa/facebook';
import Twitter from 'react-icons/lib/fa/twitter';
import '../css/SideDrawer.css';


const SideDrawer = (props) => {
  var last = props.dots[props.dots.length - 1];

  var containerStyle = {
    padding: '20px',
    backgroundColor: '#ededed',
    display: 'flex',
    flexDirection: 'column'
  }

  return (
  <Drawer
    open={props.drawerOpen}
    containerStyle={containerStyle}
  >
    <span
      className='clear'
      style={{paddingBottom: '30px'}} >
      <Clear
        onClick={props.handleToggle} >clear
      </Clear>
    </span>
      <h1 style={{padding: '0'}}>Dot Dot Dots</h1>
      <div className='font-sm' style={{marginTop:'2px'}}>There are <span className='bold'>{props.dots.length}</span> dots and thoughts.</div>

      <div className='drawerText'>
        <span className='bold'>Click on the page where you think there should be a dot.</span>
        <span>The size of the dot depends on the length of the thought.</span>
      </div>

      <div className='font-sm drawerText'>Can you find the newest addition?</div>
      { last ? <h3 id='mostRecent' style={{color: `${last.color}`}}>{last.note}</h3> : <span></span>}

      <div className='font-sm' style={{justifyContent: 'flex-end', marginTop: 'auto'}}>
        <h3 style={{paddingBottom: '7px', marginBottom: '0px'}}>Like what you see?</h3>
        Share the site:
        <Facebook
          className='icon'
          data-href="https://dotdotdots.herokuapp.com/"
          data-layout="button"
          data-size="small"
          data-mobile-iframe="true"
          style={{paddingRight: '12px', paddingLeft: '20px' }}
          onClick={() => props.openInNewTab(`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdotdotdots.herokuapp.com%2F&amp;src=sdkpreparse`, '_target')}
        />
        <Twitter
          className='icon'
          onClick={() => props.openInNewTab(`https://twitter.com/share?ref_src=twsrc%5Etfw&hashtags=dotdotdots`, '_target')}
          data-show-count="false"
          style={{paddingRight: '20px', paddingLeft: '12px' }}
        />

          <span style={{display: 'block', lineHeight: '1.2em', paddingTop: '7px'}}>You can find more of my work at
          <span className='link' onClick={() => props.openInNewTab('http://interdigitize.com')}> interdigitize.com
          </span>.
        </span>
      </div>

    {/* <p>Do you think this would be an interesting VR app? </p>

    <ThumbsUp style={{paddingRight: '20px', fontSize: '1.1em' }}/>
    <ThumbsDown/> */}

  </Drawer>

  )
}

export default SideDrawer;
