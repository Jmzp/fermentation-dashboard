import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import strings from '../../../localization';
import useStyles from './AlertDialog.styles';

const AlertDialog = (props) => {
  const classes = useStyles();
  const {
    isOpen, onClose, onCancel, onSave, title, textFieldLabel,
  } = props;
  const [textFieldValue, setTextFieldValue] = useState('');

  const onChangeTextField = (e) => {
    const { value } = e.target;
    if (Number(value) || value === '') {
      setTextFieldValue(value);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {strings.home.alertDialog.alertDescription}
        </DialogContentText>
        <div className={classes.modalInputContainer}>
          <TextField value={textFieldValue} label={textFieldLabel} variant="filled" onChange={onChangeTextField} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {strings.actions.cancel}
        </Button>
        <Button onClick={() => onSave(textFieldValue)} color="primary">
          {strings.actions.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  textFieldLabel: PropTypes.string.isRequired,
};

export default AlertDialog;
