import React from 'react';
import {Dialog, TextField, RaisedButton} from 'material-ui';
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
        <i className="clear material-icons clearIcon" onClick={props.handleFormClose}>clear</i>
        <TextField {...textFieldAttrs}/>
        <RaisedButton label="Submit" primary={true} className="raisedButton" onClick={props.closeAndSave}/>
      </Dialog>
  )
}

export default Form;
