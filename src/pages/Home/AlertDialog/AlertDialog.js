import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import strings from '../../../localization';
import useStyles from './AlertDialog.styles';

const AlertDialog = (props) => {
  const classes = useStyles();
  const {
    isOpen, onClose, onDelete, onCancel, onSave, title, textFieldLabel, textFieldInitialValue,
  } = props;
  const [textFieldValue, setTextFieldValue] = useState('');

  const onChangeTextField = (e) => {
    const { value } = e.target;
    if (Number(value) || value === '') {
      setTextFieldValue(value);
    }
  };

  useEffect(() => {
    setTextFieldValue(textFieldInitialValue);
  }, [textFieldInitialValue]);

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
        <Button onClick={onDelete} color="secondary">
          {strings.actions.delete}
        </Button>
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
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  textFieldLabel: PropTypes.string.isRequired,
  textFieldInitialValue: PropTypes.string,
};

AlertDialog.defaultProps = {
  textFieldInitialValue: '',
};

export default AlertDialog;
