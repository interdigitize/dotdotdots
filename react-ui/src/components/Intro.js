import React from 'react';
import {Dialog, FlatButton} from 'material-ui';
import '../css/Intro.css';

const Intro = (props) => {
  const actions = [
    <FlatButton
      label="Close"
      primary={true}
      onClick={props.handleClose}
    />
  ];

  return (
    <Dialog
      modal={false}
      actions={actions}
      open={props.open}
      onRequestClose={props.handleClose}
      contentStyle={{ maxWidth: '800px'}}
      bodyStyle={{padding: "0px"}}
      style={{textAlign: "center", padding: "0px"}}
      >
        <div style={{height: '450px'}}>
          <span className="imgResponsive imgCenter" id="obliterationRoom"></span>
          <h1>Dot Dot Dots</h1>
          <p style={{fontSize: '1.2em', padding: '0px 30px', color: 'black'}}>Leave a dot and a lingering thought, then check back to see the page transform into a blur of thoughts and colors.</p>
          <p style={{fontSize: '0.8em'}}>Inspired by <span style={{color: 'rgb(0, 188, 212)', cursor: 'pointer'}} onClick={() => props.openInNewTab('https://www.designboom.com/art/yayoi-kusama-david-zwirner-obliteration-room-new-york-05-26-2015/')}>yayoi kusama's dot-covered obliteration room</span>.</p>
        </div>
      </Dialog>
  )

}

export default Intro;
