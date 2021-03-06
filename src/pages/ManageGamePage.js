import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';

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
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  }
});

function createMatchUp(players) {
  let maxPlayers = players.length,
      teamA = [],
      teamB = [],
      maxPlayersInTeam;

  switch(maxPlayers) {
    case 4:
      maxPlayersInTeam = maxPlayers/2;
      break;
    case 6:
        maxPlayersInTeam = maxPlayers/2;
        break;
    case 8:
      maxPlayersInTeam = maxPlayers/2;
      break;
    case 10:
        maxPlayersInTeam = maxPlayers/2;
        break;
    default:
      throw new Error("Players must have a length");
  }

  for( let player of players) {
    if( (Math.random() > 0.5 ? 1 : 0 ) === 1 && teamA.length < maxPlayersInTeam) {
      teamA.push(player)
    }else {
      if(teamB.length === maxPlayersInTeam) {
        teamA.push(player)
      }else {
        teamB.push(player)
      }
    }
  }

  return {
    teamA,
    teamB
  }
}

function getPlayerNameByID(playerList, playerID) {
  return playerList.filter(player => player._id === playerID)[0].name || 'no name'
}

class ManageGamePage extends React.Component {
  state = {
    isSubmitting: false,
    isFormValid: false,
    winners: [],
    losers: [],
    newPlayerName: "",
    errors: [],
    tabValue: 0,
    selectedPlayers: [],
    teamA: [],
    teamB: [],
    winningTeam: "",
    isTeamsShowing: false
  };

  handleTabChange = ( event, tabValue) => {
    this.setState({tabValue})
  }
  handleWinnerListChange = playerID => event => {
    const { winners } = this.state;
    
    winners.includes(playerID)
    ?  this.setState({
       winners: winners.filter(winnerPlayerID => playerID !== winnerPlayerID) 
    })
    :  this.setState({
      winners: [...winners, playerID]
    })
  }

  handleLoserListChange = playerID => event => {
    const { losers } = this.state;
    
    losers.includes(playerID)
    ?  this.setState({
        losers: losers.filter(loserPlayerID => playerID !== loserPlayerID) 
      })
    :  this.setState({
        losers: [...losers, playerID] 
      })
  }

  isGameValid = () => {
    const { winners, losers} = this.state;
    let errors = [];

    // teams must have equal numbers
    if( winners.length !== losers.length) {
      errors.push('- Both teams must have equal numbers of players');
    }
    // a team must have at least 2 players but less than 5
    if( winners.length < 3) {
      errors.push("- Winning team must have at least 3 players")
    }
    if( losers.length < 3) {
      errors.push('- Losing team must have at least 3 players')
    }
    if( winners.length > 5) {
      errors.push("- Winning team must have less than 5 players")
    }
    if( losers.length > 5) {
      errors.push('- Losing team must have less than 5 players')
    }
    // a player can not be in both teams
    for(let player of winners ) {
      if(losers.includes(player)) {
        errors.push(`- ${player} can not be in both teams`)
      }
    }

    if(errors.length === 0) {
      this.setState({errors: []})
      return true;
    }else {
      this.setState({errors: []})
      this.setState({errors})
      return false;
    }

  }
  handleGameSubmit = (event) => {
    event.preventDefault();
    if(!this.isGameValid()) return;

    const game = {},
      {game: unmodifiedGame } = this.props,
      gameID = this.props.match.params.id;

    // todo update game
    if(gameID) {
      // todo wrong logic, there is no game property in the local state
      const { game: modifiedGame } =  this.state;
    
      for( let key in modifiedGame) {
        if(unmodifiedGame[key] !== modifiedGame[key]) {
          game[key] = modifiedGame[key]
        }
      }
    }

    this.setState({isSubmitting: true})

    const {winners, losers} = this.state;
    
    game.winners = winners
    game.losers = losers

    this.props.dispatch(saveGame( game, gameID))
      .then( () => {
        this.props.history.push("/")
      })
      .catch( err => {
        this.setState({isSubmitting: false});
      });
    return;
  }

  handleAddPlayerOnChange = (event) => {
    this.setState({ newPlayerName: event.target.value})
  }

  isPlayerValid = () => {
    const { newPlayerName  } = this.state;
    // todo update: player is now an object
    let playerNameList = this.props.playerList.map(player => player.name.toLowerCase());
    
    let errors = [];
    if(playerNameList.includes(newPlayerName.toLowerCase())) {
      errors.push(`- ${newPlayerName} is already in the list`)
    }
    if(newPlayerName.length < 3) {
      errors.push('- Player name must be more than 2 letters')
    }
    if(newPlayerName.length > 6) {
      errors.push('- Player name must be less than 7 letters')
    }

    if(errors.length === 0) {
      this.setState({errors: []})
      return true;
    }else {
      this.setState({errors: []})
      this.setState({errors})
      return false;
    }
  }
  handleAddPlayerOnSubmit = (event) => {
    if(!this.isPlayerValid()) return;
    this.props.dispatch(savePlayer({name: this.state.newPlayerName}))
      .then(() => {
        this.props.dispatch(loadPlayers())
        this.setState({ newPlayerName: ""})
      })
      .catch( err => console.log(err) )
  }

  handleAddPlayerSubmitOnKeyPress = (event) => {
    if(event.key === "Enter"){
      this.handleAddPlayerOnSubmit(event)
    }
  }

  handleAddSelectedPlayer = event => {
    const playerID = event.target.value;
    const { selectedPlayers } = this.state;

    if(!selectedPlayers.includes(playerID)) {
      this.setState({ selectedPlayers : [...selectedPlayers, playerID]})
    }else {
      this.setState({ selectedPlayers: [...selectedPlayers].filter( selectedPlayerID => selectedPlayerID !== playerID)})
    }
    
  }

  isSelectedPlayersListValid = () => {
    const {selectedPlayers} = this.state;
    let errors = [];
    // if not even
    if(selectedPlayers.length % 2 !== 0) {
      errors.push('Number of players must be even')
    }
    // if more than 10
    if( selectedPlayers.length > 10) {
      errors.push('Number of players must be equal or less than 10')
    }
    // if less than 6
    if(selectedPlayers.length < 6) {
      errors.push("Number of players must be at least 6 players")
    }
    
    if(errors.length === 0) {
      this.setState({errors: []})
      return true
    }else {
      this.setState({errors});
      return false
    }
  }
  handleTeamSubmit = event => {
    if(!this.isSelectedPlayersListValid()) return;
    const { isTeamsShowing, selectedPlayers } = this.state;
    let { teamA, teamB } = createMatchUp(selectedPlayers);
    this.setState({isTeamsShowing: !isTeamsShowing, teamA, teamB })
  }

  handleWinningTeamChange = event => {
    const targetValue = event.target.value;
    const { teamA, teamB } = this.state;
    if(targetValue === "a") {
      this.setState({winningTeam: targetValue, winners: teamA, losers: teamB})
    }else if(targetValue === "b"){
      this.setState({winningTeam: targetValue, losers: teamA, winners: teamB})
    }
  }

  handleCancleCreatingTeams = () => {
    this.props.history.goBack();
  }

  handleClearSelectedPlayers = () => {
    this.setState({selectedPlayers : [], winners : [], losers : [], teamA : [], teamB: []})
  }
  render() {
    const { classes, playerList } = this.props,
          { winners, losers, newPlayerName,
          errors, tabValue, selectedPlayers, isTeamsShowing,
          teamA, teamB, winningTeam} = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>

          <Grid item xs={12}>
            <Paper className={classes.tabRoot}>
              <Tabs
                value={tabValue}
                onChange={this.handleTabChange}
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

          {/* create Game Tab */}
          { tabValue === 0 && 
            <React.Fragment>
              {
                isTeamsShowing
                  ? (
                    <React.Fragment>
                      <Typography variant="h6" className={classes.title}>
                        Select winning team after the game
                      </Typography>
                      <Grid container spacing={8}>
                        <Grid item xs={5}>
                          <Typography variant="h6">
                            <Radio
                              checked={winningTeam === 'a'}
                              onChange={this.handleWinningTeamChange}
                              value="a"
                              aria-label="a"
                            /> Team A
                          </Typography>
                          <div className={classes.demo}>
                            <List>
                              {teamA.map( playerID => (
                                <ListItem key={playerID} >
                                  <ListItemText
                                    primary={getPlayerNameByID(playerList, playerID)}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={16}
                          >
                            <Grid item>
                                <Typography variant="h6" color="secondary">
                                  VS
                                </Typography>
                            </Grid>
                            
                          </Grid>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography variant="h6">
                            <Radio
                              checked={winningTeam === 'b'}
                              onChange={this.handleWinningTeamChange}
                              value="b"
                              aria-label="b"
                            /> Team B
                          </Typography>
                          <div className={classes.demo}>
                            <List>
                              {teamB.map( playerID => (
                                <ListItem key={playerID} >
                                  <ListItemText
                                    primary={getPlayerNameByID(playerList, playerID)}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </div>
                        </Grid>
                          <Grid item xs={6}>
                            <Button variant="contained" size="small" color="secondary" className={classes.margin}
                              onClick={this.handleCancleCreatingTeams}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container direction="row-reverse">
                              <Grid>
                                <Button variant="contained" size="small" color="primary" className={classes.margin}
                                  onClick={this.handleGameSubmit}
                                >
                                  Submit
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          
                      </Grid>
                    </React.Fragment>
                  )
                  : ( 
                    <React.Fragment>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel component="legend">Select Players</FormLabel>
                          <FormGroup>
                            {playerList.map( player => (
                              <FormControlLabel
                                key={player._id}
                                control={
                                  <Checkbox checked={selectedPlayers.includes(player._id)} onChange={this.handleAddSelectedPlayer} value={player._id} />
                                }
                                label={player.name}
                              />
                            ))}
                          </FormGroup>
                        </FormControl>
                      </Paper>
                      
                      
                    </Grid>
        
                    <Grid item xs={6}>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                        spacing={8}
                      >

                        <Grid item xs={12}>
                          <Paper className={classes.paper}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Players {`(${selectedPlayers.length})`}</FormLabel>
                                <ul>
                                  {selectedPlayers.map( playerID => (        
                                    <li key={playerID}>{getPlayerNameByID(playerList, playerID)}</li>
                                  ))}
                                </ul>
                            </FormControl>
                          </Paper>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container direction="row-reverse">
                            <Button variant="contained" size="small" color="primary" className={classes.margin}
                              onClick={this.handleTeamSubmit}
                            >
                              Create Teams
                            </Button>
                          </Grid>
                        </Grid>

                      </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container
                          direction="row"
                          justify="space-between"
                          alignItems="center">
                          <AddPlayerInput 
                            handleAddPlayerOnChange={this.handleAddPlayerOnChange} 
                            handleAddPlayerOnSubmit={this.handleAddPlayerOnSubmit}
                            handleAddPlayerSubmitOnKeyPress={this.handleAddPlayerSubmitOnKeyPress}
                            nameValue={newPlayerName} 
                          />
                          <Button variant="contained" size="small" color="secondary" className={classes.margin}
                            onClick={this.handleClearSelectedPlayers}
                          >
                            Clear List
                          </Button>
                        
                          
                        </Grid>
                      
                    </Grid>
        
                    
                   </React.Fragment> )
              }
          
            </React.Fragment>
          }

          {/* add game tab */}
          { tabValue === 1 && 
            <React.Fragment>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Winners</FormLabel>
                    <FormGroup>
                      {playerList.map( player => (
                        !losers.includes(player._id) &&
                        <FormControlLabel
                          key={player._id}
                          control={
                            <Checkbox checked={winners.includes(player._id)} onChange={this.handleWinnerListChange(player._id)} value={player._id} />
                          }
                          label={player.name}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Lossers</FormLabel>
                    <FormGroup>
                      {playerList.map( player => (
                        !winners.includes(player._id) &&
                        <FormControlLabel
                          key={player._id}
                          control={
                            <Checkbox checked={losers.includes(player._id)} onChange={this.handleLoserListChange(player._id)} value={player._id} />
                          }
                          label={player.name}
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
                <Button variant="contained" size="small" color="secondary" className={classes.margin}
                  onClick={this.handleClearSelectedPlayers}
                >
                  Clear Checked
                </Button>
                <AddPlayerInput 
                  handleAddPlayerOnChange={this.handleAddPlayerOnChange} 
                  handleAddPlayerOnSubmit={this.handleAddPlayerOnSubmit}
                  handleAddPlayerSubmitOnKeyPress={this.handleAddPlayerSubmitOnKeyPress}
                  nameValue={newPlayerName} />
                <Button variant="contained" size="small" color="primary" className={classes.margin}
                  onClick={this.handleGameSubmit}
                >
                  {this.state.isSubmitting ? "Submitting...": "Submit"}
                </Button>
              </Grid>
            </React.Fragment>
          } 
        </Grid>
      </div>
    )
  }
}

ManageGamePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function selectById(games, id) {
  let game = Object.assign({},games.filter( item => item._id === id)[0]);
  if(!game) return null
  return game;
}

function mapStateToProps(state, ownProps){
  const { players, games } = state,
        gameId = ownProps.match.params.id;
  let game;
  // todo do manage game locgic
  if(!gameId) {
    game = {}
  }else if(games.gameList && games.gameList.length > 0 && gameId) {
    game = selectById([...games.gameList], gameId);
  }
  
  return {
    game,
    playerList: [...players]
  }
  
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ManageGamePage)));