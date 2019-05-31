import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 150,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
};

function AddPlayerInput(props) {
  const { classes, handleAddPlayerOnChange, handleAddPlayerOnSubmit, handleAddPlayerSubmitOnKeyPress, nameValue } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} placeholder="Add Name" onKeyPress={e => handleAddPlayerSubmitOnKeyPress(e)} onChange={e => handleAddPlayerOnChange(e)} value={nameValue} />
      <IconButton className={classes.iconButton} aria-label="Add Name" onClick={e => handleAddPlayerOnSubmit(e)}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
}

AddPlayerInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPlayerInput);
