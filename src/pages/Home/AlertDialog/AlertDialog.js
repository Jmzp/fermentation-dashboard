import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import strings from '../../../localization';
import useStyles from './AlertDialog.styles';

const AlertDialog = (props) => {
  const classes = useStyles();
  const {
    isOpen, onClose, onCancel, onSave, title, textFieldLabel,
  } = props;
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
          <TextField label={textFieldLabel} variant="filled" />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {strings.actions.cancel}
        </Button>
        <Button onClick={onSave} color="primary">
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
