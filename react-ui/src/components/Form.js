import React from 'react';
import {Dialog, TextField, RaisedButton} from 'material-ui';
import Clear from 'react-icons/lib/md/clear';

import '../css/Form.css';

const Form = (props) => {

  var textFieldAttrs = {
    hintText: "What's on your mind?",
    multiLine: true,
    rows: 1,
    rowsMax: 4,
    value: props.value,
    onChange: props.handleChange,
  };

  if (props.charCountErr) {
    textFieldAttrs['errorText'] = "Sorry, there is a 140 character limit. Let your concise skills shine!";
    textFieldAttrs['errorStyle'] = {lineHeight: '1.1em'};
  }

  var dialogAttrs = {
    modal: false,
    bodyStyle: {padding: "0px"},
    style: {textAlign: "center", padding: "0px"},
    open: props.popupOpen,
    onRequestClose: props.handleFormClose,
    contentStyle: { maxWidth: '300px'},
  }

  return (
    <Dialog
      {...dialogAttrs}
      >
        <span style={{display: 'flex', justifyContent: 'flex-end', padding: '10px 10px 0 0', cursor: 'pointer'}} >
          <Clear onClick={props.handleFormClose}>clear</Clear>
        </span>
        <TextField {...textFieldAttrs} autoFocus={true} style={{maxWidth: '90%'}}/>
        <RaisedButton
          label="Submit"
          primary={true}
          style={{display: 'block', marginTop: '10px', paddingRight: '10px', paddingLeft: '10px', paddingBottom: '10px'}}
          onClick={props.closeAndSave}/>
      </Dialog>
  )
}

export default Form;
