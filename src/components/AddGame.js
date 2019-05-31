import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from 'classnames';

// Material UI library items
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Components
import AddPlayerInput from "../components/AddPlayerInput";

// Action Creators
import {saveGame} from "../actions/gameActions";
import {savePlayer, loadPlayers} from "../actions/playerActions";



const styles = theme => ({
  root: {
    display: 'flex',
  },
  tabRoot: {
    flexGrow: 1,
  },
  tableContainer: {
		maxHeight: 320,
		marginBottom: 100,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

function AddGame(props) {
  
    const { classes, playerList, winners, 
    losers, newPlayerName, errors, tabValue, isSumitting } = props;
    const {handleTabChange, handleWinnerListChange,
      handleGameSubmit, handleLoserListChange,
      handleAddPlayerOnChange, handleAddPlayerOnSubmit,
      handleAddPlayerSubmitOnKeyPress } = props;
     
    return (
      <div className={classes.root}>
        
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.tabRoot}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Create Match" />
                <Tab label="Add Game" />
              </Tabs>
            </Paper>
          </Grid>
          {errors.length > 0 && <Grid item xs={12}>
            <Paper className={classes.paperRoot}>
                <Typography component="h4" style={{"color":"red"}}>
                  ERROR
                </Typography>
              <ul>
              {errors.map( errorMessage => (
                <Typography key={errorMessage} component="li" style={{"color":"red"}}>
                  {errorMessage}
                </Typography>
              ))}
              </ul>
            </Paper>
          </Grid>}
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Winners</FormLabel>
                <FormGroup>
                  {playerList.map( player => (
                    !losers.includes(player) &&
                    <FormControlLabel
                      key={player}
                      control={
                        <Checkbox checked={winners.includes(player)} 
                          onChange={handleWinnerListChange(player)} 
                          value={player} 
                        />
                      }
                      label={player}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Losers</FormLabel>
                <FormGroup>
                  {playerList.map( player => (
                    !winners.includes(player) &&
                    <FormControlLabel
                      key={player}
                      control={
                        <Checkbox checked={losers.includes(player)} 
                          onChange={ e  => handleLoserListChange(player)} 
                          value={player} 
                        />
                      }
                      label={player}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="center">
            <IconButton aria-label="Delete" className={classes.margin}>
              <DeleteIcon />
            </IconButton>
            <AddPlayerInput 
              handleAddPlayerOnChange={e => handleAddPlayerOnChange()} 
              handleAddPlayerOnSubmit={e => handleAddPlayerOnSubmit()}
              handleAddPlayerSubmitOnKeyPress={e => handleAddPlayerSubmitOnKeyPress()}
              nameValue={newPlayerName} />
            <Button variant="contained" size="small" color="primary" className={classes.margin}
              onClick={e => handleGameSubmit()}
            >
              {isSumitting ? "Submitting...": "Submit"}
            </Button>
          </Grid>
        </Grid>
        
        
      </div>
    );
  }

export default withRouter((withStyles(styles)(AddGame)));